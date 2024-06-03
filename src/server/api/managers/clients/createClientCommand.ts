import type { z } from 'zod'
import clientsRepository from '../../repositories/clientsRepository'
import type { registerClientSchema } from '@/lib/validations/clients'

type ClientRequest = z.infer<typeof registerClientSchema>

class CreateClientCommand {
  async create(client: ClientRequest, businessId: string) {
    return await clientsRepository.create({
      ...client,
      businessId,
    })
  }
}

const createClientCommand = new CreateClientCommand()
export default createClientCommand
