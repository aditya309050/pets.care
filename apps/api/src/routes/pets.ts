import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { CreatePetSchema } from '@pets-care/validation';
import { AuthenticatedRequest, authenticateJwt, optionalAuth } from '../middleware/auth';
import { randomUUID } from 'crypto';

const router = Router();

// Helper to format pet and parse allergies JSON
const formatPet = (pet: any) => {
  let allergies: string[] = [];
  try {
    allergies = JSON.parse(pet.allergiesJson || '[]');
  } catch {
    allergies = [];
  }

  // Calculate age string
  const dob = new Date(pet.dob);
  const now = new Date();
  const diffMonths = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  let ageFormatted = '';
  if (diffMonths < 12) {
    ageFormatted = `${diffMonths} month${diffMonths === 1 ? '' : 's'}`;
  } else {
    const years = Math.floor(diffMonths / 12);
    const remMonths = diffMonths % 12;
    ageFormatted = `${years} yr${years === 1 ? '' : 's'}${remMonths > 0 ? ` ${remMonths} mo` : ''}`;
  }

  return {
    ...pet,
    allergies,
    ageFormatted,
    dob: pet.dob.toISOString(),
    createdAt: pet.createdAt.toISOString(),
    updatedAt: pet.updatedAt.toISOString(),
  };
};

// GET /api/pets — list user's pets
router.get('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const isSuperAdmin = req.user?.role === 'ADMIN';
    const where = isSuperAdmin ? {} : { ownerId: req.user?.id };

    const pets = await prisma.pet.findMany({
      where,
      include: {
        vaccinations: {
          orderBy: { dueDate: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = pets.map((p) => {
      const base = formatPet(p);
      const upcoming = p.vaccinations.find((v) => new Date(v.dueDate) >= new Date());
      const overdue = p.vaccinations.find((v) => new Date(v.dueDate) < new Date() && v.status !== 'COMPLETED');

      return {
        ...base,
        vaccinationStatus: overdue ? 'OVERDUE' : upcoming ? 'DUE_SOON' : 'UP_TO_DATE',
        nextVaccine: upcoming ? { name: upcoming.vaccineName, dueDate: upcoming.dueDate.toISOString() } : undefined,
      };
    });

    return res.json(formatted);
  } catch (err: any) {
    console.error('Error fetching pets:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/pets/passport/:passportUuid — public/vet passport lookup
router.get('/passport/:passportUuid', optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { passportUuid } = req.params;
    const pet = await prisma.pet.findUnique({
      where: { passportUuid },
      include: {
        owner: {
          select: { fullName: true, phone: true, email: true },
        },
        vaccinations: {
          orderBy: { dueDate: 'asc' },
        },
        medications: {
          where: { isActive: true },
        },
        healthRecords: {
          orderBy: { recordedAt: 'desc' },
        },
      },
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet Health Passport not found' });
    }

    const formattedPet = formatPet(pet);

    const vaccinations = pet.vaccinations.map((v) => ({
      ...v,
      administeredDate: v.administeredDate.toISOString(),
      dueDate: v.dueDate.toISOString(),
      nextDueDate: v.nextDueDate ? v.nextDueDate.toISOString() : undefined,
      createdAt: v.createdAt.toISOString(),
    }));

    const medications = pet.medications.map((m) => ({
      ...m,
      startDate: m.startDate.toISOString(),
      endDate: m.endDate ? m.endDate.toISOString() : undefined,
      createdAt: m.createdAt.toISOString(),
    }));

    const healthRecords = pet.healthRecords.map((r) => {
      let documentUrls: string[] = [];
      try {
        documentUrls = JSON.parse(r.documentUrlsJson || '[]');
      } catch {
        documentUrls = [];
      }
      return {
        ...r,
        documentUrls,
        recordedAt: r.recordedAt.toISOString(),
        createdAt: r.createdAt.toISOString(),
      };
    });

    return res.json({
      pet: formattedPet,
      owner: pet.owner,
      vaccinations,
      medications,
      healthRecords,
    });
  } catch (err: any) {
    console.error('Error fetching passport:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/pets/:id — single pet details
router.get('/:id', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: req.params.id },
      include: {
        vaccinations: { orderBy: { dueDate: 'asc' } },
        medications: true,
        healthRecords: { orderBy: { recordedAt: 'desc' } },
        reminders: { orderBy: { scheduledTime: 'asc' } },
      },
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.ownerId !== req.user?.id && req.user?.role !== 'ADMIN' && req.user?.role !== 'VET') {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(formatPet(pet));
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /api/pets — create pet
router.post('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = CreatePetSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const data = parseResult.data;
    const pet = await prisma.pet.create({
      data: {
        ownerId: req.user!.id,
        name: data.name,
        species: data.species,
        breed: data.breed,
        gender: data.gender,
        dob: new Date(data.dob),
        weightKg: data.weightKg,
        microchipNumber: data.microchipNumber,
        isNeutered: data.isNeutered ?? false,
        bloodType: data.bloodType,
        allergiesJson: JSON.stringify(data.allergies || []),
        dietaryNotes: data.dietaryNotes,
        passportUuid: `pass-${data.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${randomUUID().slice(0, 8)}`,
        avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      },
    });

    return res.status(201).json(formatPet(pet));
  } catch (err: any) {
    console.error('Error creating pet:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// PATCH /api/pets/:id
router.patch('/:id', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const existing = await prisma.pet.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (existing.ownerId !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { allergies, ...otherFields } = req.body;
    const updateData: any = { ...otherFields };
    if (allergies) {
      updateData.allergiesJson = JSON.stringify(allergies);
    }
    if (updateData.dob) {
      updateData.dob = new Date(updateData.dob);
    }

    const updated = await prisma.pet.update({
      where: { id: req.params.id },
      data: updateData,
    });

    return res.json(formatPet(updated));
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// DELETE /api/pets/:id
router.delete('/:id', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const existing = await prisma.pet.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    if (existing.ownerId !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await prisma.pet.delete({ where: { id: req.params.id } });
    return res.json({ message: 'Pet deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
