import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GameProgress, LessonProgress } from '../types/game'
import { ALL_LESSON_IDS } from '../data/levels'

const MAX_HEARTS = 5

interface GameStore {
  progress: GameProgress
  completedLesson: (lessonId: string, result: LessonProgress) => void
  getLessonProgress: (lessonId: string) => LessonProgress | null
  isLessonUnlocked: (lessonId: string) => boolean
  loseHeart: () => void
  refillHearts: () => void
  updateStreak: () => void
}

const INITIAL_PROGRESS: GameProgress = {
  lessons: {},
  xp: 0,
  streak: 0,
  lastPlayedDate: null,
  hearts: MAX_HEARTS,
}

function xpForStars(stars: number) {
  return [0, 10, 20, 35][stars] ?? 0
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      progress: INITIAL_PROGRESS,

      completedLesson: (lessonId, result) => {
        set(state => {
          const existing = state.progress.lessons[lessonId]
          const isImprovement = !existing || result.stars > existing.stars
          const xpGain = isImprovement ? xpForStars(result.stars) - xpForStars(existing?.stars ?? 0) : 0

          return {
            progress: {
              ...state.progress,
              xp: state.progress.xp + xpGain,
              lessons: {
                ...state.progress.lessons,
                [lessonId]: {
                  stars: Math.max(result.stars, existing?.stars ?? 0),
                  bestWpm: Math.max(result.bestWpm, existing?.bestWpm ?? 0),
                  bestAccuracy: Math.max(result.bestAccuracy, existing?.bestAccuracy ?? 0),
                },
              },
            },
          }
        })
      },

      getLessonProgress: (lessonId) => {
        return get().progress.lessons[lessonId] ?? null
      },

      isLessonUnlocked: (lessonId) => {
        const allIds = ALL_LESSON_IDS
        const idx = allIds.indexOf(lessonId)
        if (idx === 0) return true
        const prevId = allIds[idx - 1]
        return Boolean(get().progress.lessons[prevId])
      },

      loseHeart: () => {
        set(state => ({
          progress: {
            ...state.progress,
            hearts: Math.max(0, state.progress.hearts - 1),
          },
        }))
      },

      refillHearts: () => {
        set(state => ({
          progress: { ...state.progress, hearts: MAX_HEARTS },
        }))
      },

      updateStreak: () => {
        const today = new Date().toDateString()
        set(state => {
          const last = state.progress.lastPlayedDate
          const yesterday = new Date(Date.now() - 86400000).toDateString()
          const streak =
            last === today ? state.progress.streak :
            last === yesterday ? state.progress.streak + 1 : 1

          return {
            progress: {
              ...state.progress,
              streak,
              lastPlayedDate: today,
            },
          }
        })
      },
    }),
    { name: 'mecanografia-progress' }
  )
)
