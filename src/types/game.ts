export type CharStatus = 'pending' | 'correct' | 'wrong'

export interface CharState {
  char: string
  status: CharStatus
}

export type GameStatus = 'idle' | 'playing' | 'finished'

export interface LessonResult {
  stars: number
  wpm: number
  accuracy: number
  xpEarned: number
}

export interface Lesson {
  id: string
  title: string
  description: string
  keys: string[]
  texts: string[]
  minWpmForThreeStars: number
}

export interface Unit {
  id: string
  title: string
  description: string
  color: string
  lessons: Lesson[]
}

export type LessonStatus = 'locked' | 'available' | 'completed'

export interface LessonProgress {
  stars: number
  bestWpm: number
  bestAccuracy: number
}

export interface GameProgress {
  lessons: Record<string, LessonProgress>
  xp: number
  streak: number
  lastPlayedDate: string | null
  hearts: number
}
