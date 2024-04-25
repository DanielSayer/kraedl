const validStates = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "WA"] as const;
export type State = (typeof validStates)[number];
export const state = {
  validate(state: string): state is State {
    return validStates.includes(state as State);
  },
};
