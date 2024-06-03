import dashboardRepository from '../../repositories/dashboardRespository'

export const getNumberOfUnpaidInvoicesQuery = async (businessId: string) => {
  return await dashboardRepository.getNumberOfUnpaidInvoices(businessId)
}
