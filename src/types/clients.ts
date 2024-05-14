import type { State } from "./misc";

export type Client = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  businessId: string;
};

export type ClientAddresss = {
  streetAddress: string;
  city: string;
  suburb: string;
  state: State;
  postcode: string;
};
