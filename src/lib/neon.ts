import { db, users, userProgress, userStories, aiInteractions, pdfDownloads, userAchievements } from './database';
import { eq, and, desc } from 'drizzle-orm';
import type { NewUser, NewUserProgress, NewUserStory, NewAIInteraction, NewPDFDownload, NewUserAchievement } from './schema';

// Simple session management (you might want to use NextAuth.js or similar for production)
let currentUserId: string | null = null;

export const setCurrentUser = (userId: string) => {
  currentUserId = userId;
};

export const getCurrentUserId = () => currentUserId;

// User functions
export const createUser = async (userData: NewUser) => {
  try {
    const [user] = await db.insert(users).values(userData).returning();
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return { data: user || null, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserById = async (id: string) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return { data: user || null, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Progress functions
export const saveProgress = async (moduleId: string, stepId: string, timeSpent: number) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const progressData: NewUserProgress = {
      userId: currentUserId,
      moduleId,
      stepId,
      timeSpentMinutes: timeSpent,
      attempts: 1
    };

    // Use upsert-like behavior: try to update, if not exists then insert
    const existing = await db.select().from(userProgress)
      .where(and(
        eq(userProgress.userId, currentUserId),
        eq(userProgress.moduleId, moduleId),
        eq(userProgress.stepId, stepId)
      ));

    if (existing.length > 0) {
      const [updated] = await db.update(userProgress)
        .set({ 
          completedAt: new Date(),
          timeSpentMinutes: timeSpent,
          attempts: existing[0].attempts + 1
        })
        .where(eq(userProgress.id, existing[0].id))
        .returning();
      return { data: updated, error: null };
    } else {
      const [inserted] = await db.insert(userProgress).values(progressData).returning();
      return { data: inserted, error: null };
    }
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserProgress = async (moduleId?: string) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    let query = db.select().from(userProgress).where(eq(userProgress.userId, currentUserId));
    
    if (moduleId) {
      query = query.where(eq(userProgress.moduleId, moduleId));
    }

    const data = await query;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Story functions
export const saveUserStory = async (storyData: Omit<NewUserStory, 'userId'>) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const [story] = await db.insert(userStories).values({
      ...storyData,
      userId: currentUserId
    }).returning();
    return { data: story, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserStories = async (moduleId?: string) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    let query = db.select().from(userStories)
      .where(eq(userStories.userId, currentUserId))
      .orderBy(desc(userStories.lastModified));
    
    if (moduleId) {
      query = query.where(eq(userStories.moduleId, moduleId));
    }

    const data = await query;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const updateUserStory = async (storyId: string, updates: Partial<NewUserStory>) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const [story] = await db.update(userStories)
      .set({ ...updates, lastModified: new Date() })
      .where(and(
        eq(userStories.id, storyId),
        eq(userStories.userId, currentUserId)
      ))
      .returning();
    return { data: story, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// AI Interaction functions
export const saveAIInteraction = async (
  moduleId: string, 
  stepId: string, 
  userPrompt: string, 
  aiResponse: string
) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const [interaction] = await db.insert(aiInteractions).values({
      userId: currentUserId,
      moduleId,
      stepId,
      userPrompt,
      aiResponse
    }).returning();
    return { data: interaction, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getAIInteractions = async (moduleId?: string) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    let query = db.select().from(aiInteractions)
      .where(eq(aiInteractions.userId, currentUserId))
      .orderBy(desc(aiInteractions.createdAt));
    
    if (moduleId) {
      query = query.where(eq(aiInteractions.moduleId, moduleId));
    }

    const data = await query;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// PDF Download tracking
export const trackPDFDownload = async (moduleId: string, pdfType: 'guide' | 'workbook' | 'reference' | 'certificate') => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const [download] = await db.insert(pdfDownloads).values({
      userId: currentUserId,
      moduleId,
      pdfType
    }).returning();
    return { data: download, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Achievement functions
export const awardAchievement = async (achievementType: string, moduleId?: string) => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const [achievement] = await db.insert(userAchievements).values({
      userId: currentUserId,
      achievementType,
      moduleId
    }).returning();
    return { data: achievement, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserAchievements = async () => {
  if (!currentUserId) return { data: null, error: new Error('Not authenticated') };

  try {
    const data = await db.select().from(userAchievements)
      .where(eq(userAchievements.userId, currentUserId))
      .orderBy(desc(userAchievements.earnedAt));
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

// Simple authentication (for demo purposes - use NextAuth.js in production)
export const signUp = async (email: string, name: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser.data) {
      return { data: null, error: new Error('User already exists') };
    }

    const userData: NewUser = { email, name };
    const result = await createUser(userData);
    
    if (result.data) {
      setCurrentUser(result.data.id);
    }
    
    return result;
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const signIn = async (email: string) => {
  try {
    const result = await getUserByEmail(email);
    
    if (result.data) {
      setCurrentUser(result.data.id);
      return { data: result.data, error: null };
    } else {
      return { data: null, error: new Error('User not found') };
    }
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const signOut = async () => {
  currentUserId = null;
  return { error: null };
};
