import { relations, sql } from "drizzle-orm";
import {
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
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `kraedl_${name}`);

export const state = pgEnum("state", [
  "ACT",
  "NSW",
  "NT",
  "QLD",
  "SA",
  "TAS",
  "WA",
]);

export const role = pgEnum("role", ["ADMIN", "USER"]);
export const pricingModel = pgEnum("pricingModel", ["SET", "VALUE"]);

export const businesses = createTable("businesses", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }).notNull(),
  streetAddress: varchar("streetAddress", { length: 255 }).notNull(),
  suburb: varchar("suburb", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  postcode: varchar("postcode", { length: 8 }).notNull(),
  state: state("state").notNull(),
  pricingModel: pricingModel("pricingModel").notNull().default("SET"),
});

export const businessesRelations = relations(businesses, ({ many }) => ({
  users: many(users),
  clients: many(clients),
  events: many(events),
  pricing: many(pricing),
}));

export const users = createTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  businessId: uuid("businessId")
    .notNull()
    .references(() => businesses.id),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  password: varchar("password", { length: 255 }).notNull(),
  role: role("role").notNull().default("USER"),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  businesses: one(businesses, {
    fields: [users.businessId],
    references: [businesses.id],
  }),
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const clients = createTable("clients", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  businessId: uuid("businessId")
    .notNull()
    .references(() => businesses.id),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }).notNull(),
});

export const clientsRelations = relations(clients, ({ one }) => ({
  businesses: one(businesses, {
    fields: [clients.businessId],
    references: [businesses.id],
  }),
}));

export const events = createTable("events", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  clientId: uuid("clientId").notNull(),
  startTime: timestamp("startTime", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  endTime: timestamp("endTime", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  businessId: uuid("businessId")
    .notNull()
    .references(() => businesses.id),
});

export const eventsRelations = relations(events, ({ one }) => ({
  clients: one(clients, {
    fields: [events.clientId],
    references: [clients.id],
  }),
  businesses: one(businesses, {
    fields: [events.businessId],
    references: [businesses.id],
  }),
}));

export const pricing = createTable("pricing", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  label: varchar("name", { length: 255 }).notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  businessId: uuid("businessId")
    .notNull()
    .references(() => businesses.id),
});

export const pricingRelations = relations(pricing, ({ one }) => ({
  businesses: one(businesses, {
    fields: [pricing.businessId],
    references: [businesses.id],
  }),
}));
