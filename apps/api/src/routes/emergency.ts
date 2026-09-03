import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { AuthenticatedRequest, optionalAuth } from '../middleware/auth';

const router = Router();

// GET /api/emergency/sos?petId=xyz
router.get('/sos', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId } = req.query;

    let pet: any = null;
    if (petId && typeof petId === 'string') {
      pet = await prisma.pet.findUnique({
        where: { id: petId },
        include: {
          owner: { select: { fullName: true, phone: true } },
          medications: { where: { isActive: true } },
        },
      });
    } else {
      // Pick first pet of the logged-in user or first seeded pet
      const where = req.user ? { ownerId: req.user.id } : {};
      pet = await prisma.pet.findFirst({
        where,
        include: {
          owner: { select: { fullName: true, phone: true } },
          medications: { where: { isActive: true } },
        },
      });
    }

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found for emergency SOS generation' });
    }

    let allergies: string[] = [];
    try {
      allergies = JSON.parse(pet.allergiesJson || '[]');
    } catch {
      allergies = [];
    }

    // Fetch 24/7 Emergency hospitals
    const emergencyClinics = await prisma.clinic.findMany({
      where: { isEmergency24x7: true },
      take: 5,
    });

    const nearbyEmergencyHospitals = emergencyClinics.map((c) => {
      let services: string[] = [];
      try {
        services = JSON.parse(c.servicesJson || '[]');
      } catch {
        services = [];
      }
      return {
        ...c,
        services,
        distanceKm: 1.8,
      };
    });

    return res.json({
      pet: {
        ...pet,
        allergies,
        dob: pet.dob.toISOString(),
        createdAt: pet.createdAt.toISOString(),
        updatedAt: pet.updatedAt.toISOString(),
      },
      ownerName: pet.owner?.fullName || 'Pet Parent',
      ownerPhone: pet.owner?.phone || '+91 98765 43210',
      emergencyContacts: [
        { name: pet.owner?.fullName || 'Primary Owner', phone: pet.owner?.phone || '+91 98765 43210', relationship: 'Owner' },
        { name: 'City Pet Ambulance & Trauma SOS', phone: '1962', relationship: 'National Pet Ambulance' },
      ],
      criticalAllergies: allergies,
      activeMedications: pet.medications.map((m: any) => ({
        ...m,
        startDate: m.startDate.toISOString(),
        endDate: m.endDate ? m.endDate.toISOString() : undefined,
        createdAt: m.createdAt.toISOString(),
      })),
      primaryClinic: {
        name: 'Apex 24/7 Emergency Veterinary Care & Trauma Center',
        phone: '+91 80 2525 9999',
      },
      nearbyEmergencyHospitals,
    });
  } catch (err: any) {
    console.error('Emergency SOS error:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
