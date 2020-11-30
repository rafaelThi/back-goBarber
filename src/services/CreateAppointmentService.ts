/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositoreis/AppontimentsRepository';

import AppError from '../errors/AppError';

// os erros;
// 1° recebimentos das informacoes
// 2°Tratamento de erros/excessoes
// 3° acesso ao repositorio

interface RequestDTO {
  date: Date;
  provider_id: string;
}

class CreateAppointmentsService {
  public async execute({ date, provider_id }:RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already Booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentsService;
