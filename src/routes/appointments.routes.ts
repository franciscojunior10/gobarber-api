import { Router, Request, Response } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request: Request, response: Response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'This appointment is already booked.' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.status(200).json(appointment);
});

export default appointmentsRouter;
