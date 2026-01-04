
export enum AppView {
  LOGIN = 'login',
  ONBOARDING = 'onboarding',
  DASHBOARD = 'dashboard',
  WORKOUT_SESSION = 'workout_session',
  REST_TIMER = 'rest_timer',
  SUMMARY = 'summary',
  PROGRESS = 'progress',
  AI_COACH = 'ai_coach'
}

export interface SetLog {
  id: string;
  weight: number;
  reps: number;
  rpe: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  instruction: string;
  sets: SetLog[];
  previousBest?: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  week: number;
  day: number;
  exercises: Exercise[];
}

export interface UserProfile {
  name: string;
  goal: string;
  experience: string;
  environment: string;
  streak: number;
  weight: number;
  bodyFat: number;
}
