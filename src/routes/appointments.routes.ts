import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.status(200).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (request: Request, response: Response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

export default appointmentsRouter;
