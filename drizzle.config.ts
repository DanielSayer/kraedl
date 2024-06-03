import { type Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ['kraedl_*'],
} satisfies Config
