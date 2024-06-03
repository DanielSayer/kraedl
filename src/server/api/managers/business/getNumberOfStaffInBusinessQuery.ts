import businessRepository from '../../repositories/businessesRepository'

class GetNumberOfStaffInBusinessQuery {
  async count(businessId: string): Promise<number> {
    return await businessRepository.getNumberOfStaff(businessId)
  }
}

export const getNumberOfStaffInBusinessQuery =
  new GetNumberOfStaffInBusinessQuery()
