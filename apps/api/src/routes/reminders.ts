import { Router, Response } from 'express';
import { prisma } from '../prisma';
import { CreateReminderSchema } from '@pets-care/validation';
import { AuthenticatedRequest, authenticateJwt } from '../middleware/auth';

const router = Router();

// GET /api/reminders
router.get('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { petId } = req.query;
    const where: any = { userId: req.user?.id };
    if (petId && typeof petId === 'string') {
      where.petId = petId;
    }

    const reminders = await prisma.reminder.findMany({
      where,
      include: {
        pet: {
          select: { name: true },
        },
      },
      orderBy: { scheduledTime: 'asc' },
    });

    const formatted = reminders.map((r) => ({
      id: r.id,
      petId: r.petId,
      userId: r.userId,
      petName: r.pet.name,
      title: r.title,
      reminderType: r.reminderType as any,
      scheduledTime: r.scheduledTime.toISOString(),
      repeatInterval: r.repeatInterval as any,
      isCompleted: r.isCompleted,
      completedAt: r.completedAt ? r.completedAt.toISOString() : undefined,
      notes: r.notes || undefined,
    }));

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// POST /api/reminders
router.post('/', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parseResult = CreateReminderSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation failed', errors: parseResult.error.flatten() });
    }

    const data = parseResult.data;
    const reminder = await prisma.reminder.create({
      data: {
        userId: req.user!.id,
        petId: data.petId,
        title: data.title,
        reminderType: data.reminderType,
        scheduledTime: new Date(data.scheduledTime),
        repeatInterval: data.repeatInterval || 'NONE',
        notes: data.notes,
      },
      include: {
        pet: { select: { name: true } },
      },
    });

    return res.status(201).json({
      id: reminder.id,
      petId: reminder.petId,
      userId: reminder.userId,
      petName: reminder.pet.name,
      title: reminder.title,
      reminderType: reminder.reminderType,
      scheduledTime: reminder.scheduledTime.toISOString(),
      repeatInterval: reminder.repeatInterval,
      isCompleted: reminder.isCompleted,
      notes: reminder.notes || undefined,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

// PATCH /api/reminders/:id/toggle
router.patch('/:id/toggle', authenticateJwt, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const existing = await prisma.reminder.findUnique({
      where: { id: req.params.id },
      include: { pet: { select: { name: true } } },
    });

    if (!existing) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    if (existing.userId !== req.user?.id && req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const nextCompleted = !existing.isCompleted;
    const updated = await prisma.reminder.update({
      where: { id: req.params.id },
      data: {
        isCompleted: nextCompleted,
        completedAt: nextCompleted ? new Date() : null,
      },
      include: { pet: { select: { name: true } } },
    });

    return res.json({
      id: updated.id,
      petId: updated.petId,
      userId: updated.userId,
      petName: updated.pet.name,
      title: updated.title,
      reminderType: updated.reminderType,
      scheduledTime: updated.scheduledTime.toISOString(),
      repeatInterval: updated.repeatInterval,
      isCompleted: updated.isCompleted,
      completedAt: updated.completedAt ? updated.completedAt.toISOString() : undefined,
      notes: updated.notes || undefined,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
});

export default router;
