/* eslint-disable camelcase */
import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.status(200).json(appointment);
});

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// export default appointmentsRouter;
