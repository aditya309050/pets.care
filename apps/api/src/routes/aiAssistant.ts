import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { AskAIAssistantSchema } from '@pets-care/validation';
import { randomUUID } from 'crypto';

const router = Router();

// POST /api/ai-assistant/chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const parseResult = AskAIAssistantSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const { petId, message } = parseResult.data;

    let petContext = '';
    if (petId) {
      const pet = await prisma.pet.findUnique({
        where: { id: petId },
        include: { medications: { where: { isActive: true } } },
      });
      if (pet) {
        let allergies: string[] = [];
        try {
          allergies = JSON.parse(pet.allergiesJson || '[]');
        } catch {
          allergies = [];
        }
        petContext = `Pet Context: Name: ${pet.name}, Species: ${pet.species}, Breed: ${pet.breed}, Weight: ${pet.weightKg}kg, Allergies: ${allergies.join(', ') || 'None reported'}. Current medications: ${pet.medications.map((m) => m.medicationName).join(', ') || 'None'}.`;
      }
    }

    const lower = message.toLowerCase();

    // Red flag / Emergency keywords
    const isEmergency =
      lower.includes('poison') ||
      lower.includes('chocolate') ||
      lower.includes('bleeding') ||
      lower.includes('cannot breathe') ||
      lower.includes('trouble breathing') ||
      lower.includes('seizure') ||
      lower.includes('unconscious') ||
      lower.includes('vomiting blood') ||
      lower.includes('xylitol');

    let content = '';
    let suggestedAction: { label: string; route: string } | undefined;

    if (isEmergency) {
      content = `🚨 **CRITICAL VETERINARY ALERT**: Based on the symptoms described ("${message}"), this is a potential medical emergency that requires **immediate in-person veterinary intervention**.

Please do NOT wait or attempt home remedies:
1. Keep your pet calm, warm, and in a secure carrier or blanket.
2. If ingested a toxin/chocolate, bring the packaging or take a photo for the vet.
3. Immediately proceed to the nearest 24/7 veterinary emergency hospital.

*(Disclaimer: This AI tool cannot diagnose or treat life-threatening conditions. Please contact an emergency clinic immediately.)*`;

      suggestedAction = {
        label: '🚨 Open 24/7 Emergency SOS Mode',
        route: '/emergency',
      };
    } else if (lower.includes('not eating') || lower.includes('lethargic') || lower.includes('tired')) {
      content = `I understand you're worried about your pet's appetite and energy levels.

**Clinical Insights:**
- If an adult dog or cat has refused food for **more than 24 hours** (or a puppy/kitten for >12 hours) and appears lethargic, it can be an early indicator of fever, gastrointestinal upset, dental discomfort, or an infection.
- **Hydration check**: Check if their gums are moist and pink. Pale or sticky gums suggest dehydration.
- Offer small amounts of plain boiled chicken and white rice (unless allergic to chicken) or warm bone broth with zero onions or garlic.

⚠️ **Veterinary Recommendation**: Because lethargy combined with anorexia can escalate rapidly, we strongly advise scheduling a clinical checkup or video consultation with a vet if symptoms persist into tomorrow.`;

      suggestedAction = {
        label: '🩺 Book Vet Consultation',
        route: '/vets',
      };
    } else if (lower.includes('vaccine') || lower.includes('vaccination') || lower.includes('rabies')) {
      content = `Immunization is the cornerstone of preventive pet healthcare!

**Standard Core Vaccination Guidelines:**
- **Dogs**: Rabies (annual booster), DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza — typically every 1 to 3 years), and Leptospirosis / Bordetella (Kennel cough) before boarding or social contact.
- **Cats**: FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) and Rabies.

You can view your pet's exact countdown and record booster batches directly in your **Pet Health Passport**.`;

      suggestedAction = {
        label: '📋 View Health Passport',
        route: '/dashboard',
      };
    } else if (lower.includes('food') || lower.includes('diet') || lower.includes('nutrition') || lower.includes('weight')) {
      content = `Optimal nutrition depends on species, life-stage (puppy/kitten vs adult vs senior), and activity level.

**Key Nutrition Guidelines:**
- Ensure proteins are sourced as the primary ingredient.
- Avoid human foods that are toxic to pets: onions, garlic, grapes/raisins, chocolate, avocado, macadamia nuts, and artificial sweeteners (xylitol).
- Always transition to any new food gradually over 7 to 10 days to prevent gastrointestinal upset.

*(Note: Always consult your primary vet before introducing specialized prescription or hypoallergenic diets.)*`;

      suggestedAction = {
        label: '🩺 Consult a Vet Nutritionist',
        route: '/vets',
      };
    } else {
      content = `Hello! I'm your **pets.care AI Assistant**.

Based on your question:
*"${message}"*

Here are general pet parenting guidelines:
1. **Monitor Behavior & Vitals**: Keep an eye on water intake, stool consistency, energy levels, and temperature.
2. **Document Any Changes**: Take clear photos or short videos of any unusual physical symptoms (limping, skin redness, discharge) to show your veterinarian.
3. **Preventive Care**: Routine health checkups every 6 to 12 months catch health conditions before they become serious.

*⚠️ Disclaimer: I provide general educational pet guidance based on veterinary literature. I do not replace a licensed veterinarian's examination or clinical diagnosis.*`;

      suggestedAction = {
        label: '🩺 Find Nearby Vets',
        route: '/vets',
      };
    }

    return res.json({
      id: randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date().toISOString(),
      suggestedAction,
    });
  } catch (err: any) {
    console.error('AI assistant error:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
