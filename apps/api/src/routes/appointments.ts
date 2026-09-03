import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { BookAppointmentSchema } from '@pets-care/validation';
import { AuthenticatedRequest, authenticateJwt } from '../middleware/auth';

const router = Router();

// GET /api/appointments
router.get('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user!;
    let where: any = {};

    if (user.role === 'OWNER') {
      where.userId = user.id;
    } else if (user.role === 'VET') {
      const vet = await prisma.veterinarian.findUnique({ where: { userId: user.id } });
      if (vet) {
        where.vetId = vet.id;
      }
    }
    // ADMIN sees all

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        pet: { select: { name: true } },
        vet: {
          select: {
            fullName: true,
            clinic: { select: { name: true } },
          },
        },
      },
      orderBy: { scheduledAt: 'desc' },
    });

    const formatted = appointments.map((a) => ({
      id: a.id,
      userId: a.userId,
      petId: a.petId,
      petName: a.pet.name,
      vetId: a.vetId,
      vetName: a.vet.fullName,
      clinicName: a.vet.clinic?.name,
      serviceType: a.serviceType as any,
      scheduledAt: a.scheduledAt.toISOString(),
      status: a.status as any,
      consultationFee: a.consultationFee,
      notes: a.notes || undefined,
      meetingLink: a.meetingLink || undefined,
      createdAt: a.createdAt.toISOString(),
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /api/appointments
router.post('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = BookAppointmentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const data = parseResult.data;
    const vet = await prisma.veterinarian.findUnique({
      where: { id: data.vetId },
      include: { clinic: true },
    });

    if (!vet) {
      return res.status(404).json({ message: 'Selected veterinarian not found' });
    }

    const pet = await prisma.pet.findUnique({
      where: { id: data.petId },
    });

    if (!pet) {
      return res.status(404).json({ message: 'Selected pet not found' });
    }

    const scheduledDate = new Date(data.scheduledAt);
    const meetingLink =
      data.serviceType === 'VIDEO_CONSULT'
        ? `https://meet.pets.care/consult-${Date.now().toString(36)}`
        : undefined;

    const appointment = await prisma.appointment.create({
      data: {
        userId: req.user!.id,
        petId: data.petId,
        vetId: data.vetId,
        serviceType: data.serviceType,
        scheduledAt: scheduledDate,
        status: 'CONFIRMED',
        consultationFee: vet.consultationFee,
        notes: data.notes,
        meetingLink,
      },
      include: {
        pet: { select: { name: true } },
        vet: {
          select: {
            fullName: true,
            clinic: { select: { name: true } },
          },
        },
      },
    });

    // Also auto-create a reminder for the pet owner
    await prisma.reminder.create({
      data: {
        userId: req.user!.id,
        petId: data.petId,
        title: `🩺 Appointment: ${vet.fullName} (${vet.clinic?.name || 'Clinic'})`,
        reminderType: 'APPOINTMENT',
        scheduledTime: scheduledDate,
        notes: data.notes,
      },
    });

    return res.status(201).json({
      id: appointment.id,
      userId: appointment.userId,
      petId: appointment.petId,
      petName: appointment.pet.name,
      vetId: appointment.vetId,
      vetName: appointment.vet.fullName,
      clinicName: appointment.vet.clinic?.name,
      serviceType: appointment.serviceType,
      scheduledAt: appointment.scheduledAt.toISOString(),
      status: appointment.status,
      consultationFee: appointment.consultationFee,
      notes: appointment.notes || undefined,
      meetingLink: appointment.meetingLink || undefined,
      createdAt: appointment.createdAt.toISOString(),
    });
  } catch (err: any) {
    console.error('Booking error:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// PATCH /api/appointments/:id/cancel
router.patch('/:id/cancel', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const existing = await prisma.appointment.findUnique({
      where: { id: req.params.id },
      include: {
        pet: { select: { name: true } },
        vet: { select: { fullName: true } },
      },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (existing.userId !== req.user?.id && req.user?.role !== 'ADMIN' && req.user?.role !== 'VET') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { status: 'CANCELLED' },
      include: {
        pet: { select: { name: true } },
        vet: { select: { fullName: true } },
      },
    });

    return res.json({
      id: updated.id,
      userId: updated.userId,
      petId: updated.petId,
      petName: updated.pet.name,
      vetId: updated.vetId,
      vetName: updated.vet.fullName,
      serviceType: updated.serviceType,
      scheduledAt: updated.scheduledAt.toISOString(),
      status: updated.status,
      consultationFee: updated.consultationFee,
      createdAt: updated.createdAt.toISOString(),
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
