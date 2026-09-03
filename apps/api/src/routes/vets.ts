import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/vets
router.get('/', async (req: Request, res: Response) => {
  try {
    const { clinicId } = req.query;
    const where: any = {};
    if (clinicId && typeof clinicId === 'string') {
      where.clinicId = clinicId;
    }

    const vets = await prisma.veterinarian.findMany({
      where,
      include: {
        clinic: {
          select: { name: true, address: true, city: true },
        },
      },
      orderBy: { rating: 'desc' },
    });

    const formatted = vets.map((v) => ({
      id: v.id,
      userId: v.userId,
      clinicId: v.clinicId || undefined,
      clinicName: v.clinic?.name,
      fullName: v.fullName,
      specialization: v.specialization,
      experienceYears: v.experienceYears,
      consultationFee: v.consultationFee,
      bio: v.bio,
      rating: v.rating,
      avatarUrl: v.avatarUrl || undefined,
      availableDays: v.availableDays.split(','),
      isAvailableToday: v.isAvailableToday,
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/vets/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const v = await prisma.veterinarian.findUnique({
      where: { id: req.params.id },
      include: {
        clinic: true,
      },
    });

    if (!v) {
      return res.status(404).json({ message: 'Veterinarian not found' });
    }

    return res.json({
      id: v.id,
      userId: v.userId,
      clinicId: v.clinicId || undefined,
      clinicName: v.clinic?.name,
      fullName: v.fullName,
      specialization: v.specialization,
      experienceYears: v.experienceYears,
      consultationFee: v.consultationFee,
      bio: v.bio,
      rating: v.rating,
      avatarUrl: v.avatarUrl || undefined,
      availableDays: v.availableDays.split(','),
      isAvailableToday: v.isAvailableToday,
      clinic: v.clinic,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
