import type { ProcedureUseQuery } from 'node_modules/@trpc/react-query/dist/createTRPCReact'

export type TPRCReturnType<T> = TRPCOutputType<T> | undefined

type TRPCOutputType<T> =
  T extends ProcedureUseQuery<infer D> ? D['output'] : never
