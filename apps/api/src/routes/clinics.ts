import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /api/clinics
router.get('/', async (req: Request, res: Response) => {
  try {
    const { query, city, emergencyOnly } = req.query;

    const where: any = {};
    if (emergencyOnly === 'true') {
      where.isEmergency24x7 = true;
    }
    if (city && typeof city === 'string') {
      where.city = { contains: city };
    }
    if (query && typeof query === 'string') {
      where.OR = [
        { name: { contains: query } },
        { address: { contains: query } },
      ];
    }

    const clinics = await prisma.clinic.findMany({
      where,
      orderBy: [{ isEmergency24x7: 'desc' }, { rating: 'desc' }],
    });

    const formatted = clinics.map((c) => {
      let services: string[] = [];
      try {
        services = JSON.parse(c.servicesJson || '[]');
      } catch {
        services = [];
      }
      return {
        ...c,
        services,
        distanceKm: c.isEmergency24x7 ? 1.8 : 3.4, // Realistic simulated distance
      };
    });

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/clinics/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const clinic = await prisma.clinic.findUnique({
      where: { id: req.params.id },
      include: {
        veterinarians: true,
      },
    });

    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }

    let services: string[] = [];
    try {
      services = JSON.parse(clinic.servicesJson || '[]');
    } catch {
      services = [];
    }

    return res.json({
      ...clinic,
      services,
      distanceKm: 2.1,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
