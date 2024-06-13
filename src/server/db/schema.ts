import { relations, sql } from 'drizzle-orm'
import {
  date,
  decimal,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { type AdapterAccount } from 'next-auth/adapters'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kraedl_${name}`)

export const state = pgEnum('state', [
  'ACT',
  'NSW',
  'NT',
  'QLD',
  'SA',
  'TAS',
  'WA',
])

export const role = pgEnum('role', ['ADMIN', 'USER'])
export const pricingModel = pgEnum('pricingModel', ['SET', 'VALUE'])

export const businesses = createTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  phoneNumber: varchar('phoneNumber', { length: 255 }).notNull(),
  streetAddress: varchar('streetAddress', { length: 255 }).notNull(),
  suburb: varchar('suburb', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  postcode: varchar('postcode', { length: 8 }).notNull(),
  state: state('state').notNull(),
  pricingModel: pricingModel('pricingModel').notNull().default('SET'),
})

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  users: many(users),
  clients: many(clients),
  events: many(events),
  eventExceptions: many(eventExceptions),
  pricing: many(pricing),
  bankAccounts: one(bankAccounts, {
    fields: [businesses.id],
    references: [bankAccounts.businessId],
  }),
  inovices: many(invoices),
}))

export const users = createTable('user', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
  }).default(sql`CURRENT_TIMESTAMP`),
  password: varchar('password', { length: 255 }).notNull(),
  role: role('role').notNull().default('USER'),
  image: varchar('image', { length: 255 }),
})

export const usersRelations = relations(users, ({ one, many }) => ({
  businesses: one(businesses, {
    fields: [users.businessId],
    references: [businesses.id],
  }),
  accounts: many(accounts),
}))

export const accounts = createTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_userId_idx').on(account.userId),
  }),
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  }),
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const verificationTokens = createTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const clients = createTable('clients', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phoneNumber: varchar('phoneNumber', { length: 255 }).notNull(),
})

export const clientsRelations = relations(clients, ({ one, many }) => ({
  businesses: one(businesses, {
    fields: [clients.businessId],
    references: [businesses.id],
  }),
  clientAddresses: one(clientAddresses, {
    fields: [clients.id],
    references: [clientAddresses.clientId],
  }),
  invoice: many(invoices),
}))

export const events = createTable('events', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  clientId: uuid('clientId').notNull(),
  startTime: timestamp('startTime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  endTime: timestamp('endTime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  rrule: varchar('rrule').notNull().default('FREQ=NONE'),
  until: timestamp('until', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
})

export const eventsRelations = relations(events, ({ one, many }) => ({
  clients: one(clients, {
    fields: [events.clientId],
    references: [clients.id],
  }),
  businesses: one(businesses, {
    fields: [events.businessId],
    references: [businesses.id],
  }),
  eventPricings: many(eventPricings),
  invoice: one(invoiceEventLink, {
    fields: [events.id],
    references: [invoiceEventLink.eventId],
  }),
  eventExceptions: many(eventExceptions),
}))

export const pricing = createTable('pricing', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  label: varchar('name', { length: 255 }).notNull(),
  price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
})

export const pricingRelations = relations(pricing, ({ one, many }) => ({
  businesses: one(businesses, {
    fields: [pricing.businessId],
    references: [businesses.id],
  }),
  eventPricings: many(eventPricings),
}))

export const eventPricings = createTable('eventPricings', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  eventId: uuid('eventId')
    .notNull()
    .references(() => events.id),
  pricingId: uuid('pricingId')
    .notNull()
    .references(() => pricing.id),
  quantity: decimal('quantity', { precision: 10, scale: 1 }).notNull(),
  totalPrice: decimal('totalPrice', { precision: 12, scale: 2 }).notNull(),
})

export const eventPricingRelations = relations(eventPricings, ({ one }) => ({
  events: one(events, {
    fields: [eventPricings.eventId],
    references: [events.id],
  }),
  pricing: one(pricing, {
    fields: [eventPricings.pricingId],
    references: [pricing.id],
  }),
}))

export const clientAddresses = createTable('clientAddresses', {
  clientId: uuid('clientId')
    .notNull()
    .references(() => clients.id)
    .primaryKey(),
  streetAddress: varchar('streetAddress', { length: 255 }).notNull(),
  suburb: varchar('suburb', { length: 255 }).notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  postcode: varchar('postcode', { length: 8 }).notNull(),
  state: state('state').notNull(),
})

export const clientAddressesRelations = relations(
  clientAddresses,
  ({ one }) => ({
    clients: one(clients, {
      fields: [clientAddresses.clientId],
      references: [clients.id],
    }),
  }),
)

export const bankAccounts = createTable('bankAccounts', {
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id)
    .primaryKey(),
  accountName: varchar('accountName', { length: 255 }).notNull(),
  bsb: varchar('bsb').notNull(),
  accountNumber: varchar('accountNumber').notNull(),
})

export const bankAccountRelations = relations(bankAccounts, ({ one }) => ({
  businesses: one(businesses, {
    fields: [bankAccounts.businessId],
    references: [businesses.id],
  }),
}))

export const invoices = createTable('invoices', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  invoiceNumber: integer('invoiceNumber').notNull(),
  clientId: uuid('clientId')
    .notNull()
    .references(() => clients.id),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
  invoiceAmount: decimal('invoiceAmount', {
    precision: 12,
    scale: 2,
  }).notNull(),
  issueDate: date('issueDate', { mode: 'string' }),
  dueDate: date('dueDate', { mode: 'string' }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', withTimezone: true })
    .notNull()
    .defaultNow(),
  invoicedAt: timestamp('invoicedAt', { mode: 'date', withTimezone: true }),
  paidAt: timestamp('paidAt', { mode: 'date', withTimezone: true }),
})

export const invoiceRelations = relations(invoices, ({ one }) => ({
  clients: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  businesses: one(businesses, {
    fields: [invoices.businessId],
    references: [businesses.id],
  }),
  invoices: one(invoiceEventLink, {
    fields: [invoices.id],
    references: [invoiceEventLink.invoiceId],
  }),
}))

export const invoiceEventLink = createTable('invoiceEventLink', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  invoiceId: uuid('invoiceId')
    .notNull()
    .references(() => invoices.id),
  eventId: uuid('eventId')
    .notNull()
    .references(() => events.id)
    .unique(),
})

export const invoiceEventLinkRelations = relations(
  invoiceEventLink,
  ({ one, many }) => ({
    invoices: many(invoices),
    events: one(events, {
      fields: [invoiceEventLink.eventId],
      references: [events.id],
    }),
  }),
)

export const eventExceptions = createTable('eventExceptions', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  eventId: uuid('eventId')
    .notNull()
    .references(() => events.id),
  name: varchar('name', { length: 255 }).notNull(),
  clientId: uuid('clientId').notNull(),
  eventStartTime: timestamp('eventStartTime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  startTime: timestamp('startTime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  endTime: timestamp('endTime', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  businessId: uuid('businessId')
    .notNull()
    .references(() => businesses.id),
})

export const eventExceptionsRelations = relations(
  eventExceptions,
  ({ one, many }) => ({
    clients: one(clients, {
      fields: [eventExceptions.clientId],
      references: [clients.id],
    }),
    events: one(events, {
      fields: [eventExceptions.eventId],
      references: [events.id],
    }),
    businesses: one(businesses, {
      fields: [eventExceptions.businessId],
      references: [businesses.id],
    }),
    eventExceptionPricings: many(eventExceptionPricings),
  }),
)

export const eventExceptionPricings = createTable('eventExceptionPricings', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  eventExceptionId: uuid('eventExceptionId')
    .notNull()
    .references(() => eventExceptions.id),
  pricingId: uuid('pricingId')
    .notNull()
    .references(() => pricing.id),
  quantity: decimal('quantity', { precision: 10, scale: 1 }).notNull(),
  totalPrice: decimal('totalPrice', { precision: 12, scale: 2 }).notNull(),
})

export const eventExceptionPricingRelations = relations(
  eventExceptionPricings,
  ({ one }) => ({
    eventExceptions: one(eventExceptions, {
      fields: [eventExceptionPricings.eventExceptionId],
      references: [eventExceptions.id],
    }),
    pricing: one(pricing, {
      fields: [eventExceptionPricings.pricingId],
      references: [pricing.id],
    }),
  }),
)
