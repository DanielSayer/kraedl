import type { State } from './misc'

export type ClientWithAddress = {
  id: string
  name: string
  email: string
  phoneNumber: string
  businessId: string
  clientAddresses?: {
    streetAddress: string
    suburb: string
  }
}

export type ClientAddresss = {
  streetAddress: string
  city: string
  suburb: string
  state: State
  postcode: string
}
