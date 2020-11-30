/* eslint-disable camelcase */

import { Router } from 'express';
import { parseISO } from 'date-fns';// startOfHour inicia a hora no Zero ----- parseISO converte de string para objetoDate
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositoreis/AppontimentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/list', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);// alterando a hora

  const createAppointement = new CreateAppointmentService();

  const appointment = await createAppointement.execute({ date: parsedDate, provider_id });

  return response.json(appointment);
});

export default appointmentsRouter;
