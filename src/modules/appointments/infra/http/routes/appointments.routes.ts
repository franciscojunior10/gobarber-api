/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

// appointmentsRouter.get('/', async (request: Request, response: Response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

export default appointmentsRouter;
