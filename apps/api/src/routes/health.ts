import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { CreateVaccinationSchema, CreateMedicationSchema } from '@pets-care/validation';
import { AuthenticatedRequest, authenticateJwt } from '../middleware/auth';

const router = Router();

// GET /api/health/vaccinations?petId=xyz
router.get('/vaccinations', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId } = req.query;
    if (!petId || typeof petId !== 'string') {
      return res.status(400).json({ message: 'petId query parameter is required' });
    }

    const vaccinations = await prisma.vaccination.findMany({
      where: { petId },
      orderBy: { dueDate: 'asc' },
    });

    const formatted = vaccinations.map((v) => ({
      ...v,
      administeredDate: v.administeredDate.toISOString(),
      dueDate: v.dueDate.toISOString(),
      nextDueDate: v.nextDueDate ? v.nextDueDate.toISOString() : undefined,
      createdAt: v.createdAt.toISOString(),
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /api/health/vaccinations
router.post('/vaccinations', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = CreateVaccinationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const data = parseResult.data;
    const vaccination = await prisma.vaccination.create({
      data: {
        petId: data.petId,
        vaccineName: data.vaccineName,
        administeredDate: new Date(data.administeredDate),
        dueDate: new Date(data.dueDate),
        nextDueDate: data.nextDueDate ? new Date(data.nextDueDate) : null,
        batchNumber: data.batchNumber,
        vetName: data.vetName,
        clinicName: data.clinicName,
        notes: data.notes,
        certificateUrl: data.certificateUrl,
        status: new Date(data.dueDate) < new Date() ? 'OVERDUE' : 'COMPLETED',
      },
    });

    return res.status(201).json({
      ...vaccination,
      administeredDate: vaccination.administeredDate.toISOString(),
      dueDate: vaccination.dueDate.toISOString(),
      nextDueDate: vaccination.nextDueDate ? vaccination.nextDueDate.toISOString() : undefined,
      createdAt: vaccination.createdAt.toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/health/medications?petId=xyz
router.get('/medications', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId } = req.query;
    if (!petId || typeof petId !== 'string') {
      return res.status(400).json({ message: 'petId query parameter is required' });
    }

    const medications = await prisma.medication.findMany({
      where: { petId },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = medications.map((m) => ({
      ...m,
      startDate: m.startDate.toISOString(),
      endDate: m.endDate ? m.endDate.toISOString() : undefined,
      createdAt: m.createdAt.toISOString(),
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /api/health/medications
router.post('/medications', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = CreateMedicationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const data = parseResult.data;
    const medication = await prisma.medication.create({
      data: {
        petId: data.petId,
        medicationName: data.medicationName,
        dosage: data.dosage,
        frequency: data.frequency,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        instructions: data.instructions,
        isActive: true,
      },
    });

    return res.status(201).json({
      ...medication,
      startDate: medication.startDate.toISOString(),
      endDate: medication.endDate ? medication.endDate.toISOString() : undefined,
      createdAt: medication.createdAt.toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// GET /api/health/records?petId=xyz
router.get('/records', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId } = req.query;
    if (!petId || typeof petId !== 'string') {
      return res.status(400).json({ message: 'petId query parameter is required' });
    }

    const records = await prisma.healthRecord.findMany({
      where: { petId },
      orderBy: { recordedAt: 'desc' },
    });

    const formatted = records.map((r) => {
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

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
