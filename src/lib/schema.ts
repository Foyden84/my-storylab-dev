import { pgTable, text, integer, timestamp, boolean, uuid, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  age: integer('age'),
  subscriptionType: text('subscription_type', { enum: ['free', 'premium'] }).default('free'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User progress tracking
export const userProgress = pgTable('user_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull(),
  stepId: text('step_id').notNull(),
  completedAt: timestamp('completed_at').defaultNow(),
  timeSpentMinutes: integer('time_spent_minutes').default(0),
  attempts: integer('attempts').default(1),
}, (table) => ({
  uniqueUserModuleStep: unique().on(table.userId, table.moduleId, table.stepId),
}));

// User-generated stories and content
export const userStories = pgTable('user_stories', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  moduleId: text('module_id').notNull(),
  stepId: text('step_id').notNull(),
  isFavorite: boolean('is_favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  lastModified: timestamp('last_modified').defaultNow(),
});

// AI interaction history
export const aiInteractions = pgTable('ai_interactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull(),
  stepId: text('step_id').notNull(),
  userPrompt: text('user_prompt').notNull(),
  aiResponse: text('ai_response').notNull(),
  rating: integer('rating'), // 1-5 stars
  createdAt: timestamp('created_at').defaultNow(),
});

// PDF download tracking
export const pdfDownloads = pgTable('pdf_downloads', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  moduleId: text('module_id').notNull(),
  pdfType: text('pdf_type', { enum: ['guide', 'workbook', 'reference', 'certificate'] }).notNull(),
  downloadedAt: timestamp('downloaded_at').defaultNow(),
});

// User achievements/badges
export const userAchievements = pgTable('user_achievements', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  achievementType: text('achievement_type').notNull(),
  moduleId: text('module_id'),
  earnedAt: timestamp('earned_at').defaultNow(),
}, (table) => ({
  uniqueUserAchievement: unique().on(table.userId, table.achievementType, table.moduleId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  progress: many(userProgress),
  stories: many(userStories),
  aiInteractions: many(aiInteractions),
  pdfDownloads: many(pdfDownloads),
  achievements: many(userAchievements),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
}));

export const userStoriesRelations = relations(userStories, ({ one }) => ({
  user: one(users, {
    fields: [userStories.userId],
    references: [users.id],
  }),
}));

export const aiInteractionsRelations = relations(aiInteractions, ({ one }) => ({
  user: one(users, {
    fields: [aiInteractions.userId],
    references: [users.id],
  }),
}));

export const pdfDownloadsRelations = relations(pdfDownloads, ({ one }) => ({
  user: one(users, {
    fields: [pdfDownloads.userId],
    references: [users.id],
  }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
}));

// TypeScript types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
export type UserStory = typeof userStories.$inferSelect;
export type NewUserStory = typeof userStories.$inferInsert;
export type AIInteraction = typeof aiInteractions.$inferSelect;
export type NewAIInteraction = typeof aiInteractions.$inferInsert;
export type PDFDownload = typeof pdfDownloads.$inferSelect;
export type NewPDFDownload = typeof pdfDownloads.$inferInsert;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type NewUserAchievement = typeof userAchievements.$inferInsert;
