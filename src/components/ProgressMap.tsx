import { motion } from 'framer-motion'
import type { Unit } from '../types/game'
import { useGameStore } from '../stores/gameStore'
import { LevelCard } from './LevelCard'

interface Props {
  units: Unit[]
  onSelectLesson: (lessonId: string) => void
}

export function ProgressMap({ units, onSelectLesson }: Props) {
  const { isLessonUnlocked, getLessonProgress } = useGameStore()

  return (
    <div className="flex flex-col items-center gap-12 py-12 px-4 max-w-2xl mx-auto w-full">
      {units.map((unit, unitIdx) => (
        <motion.div
          key={unit.id}
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: unitIdx * 0.08 }}
        >
          <div
            className="rounded-2xl p-1 mb-6"
            style={{ backgroundColor: unit.color + '22', border: `2px solid ${unit.color}44` }}
          >
            <div className="px-5 py-4 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: unit.color, color: '#fff' }}
              >
                {unitIdx + 1}
              </div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                  {unit.title}
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                  {unit.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            {unit.lessons.map((lesson, lessonIdx) => {
              const unlocked = isLessonUnlocked(lesson.id)
              const lessonProgress = getLessonProgress(lesson.id)
              const isLeft = lessonIdx % 2 === 0

              return (
                <motion.div
                  key={lesson.id}
                  className="w-full flex"
                  style={{ justifyContent: isLeft ? 'flex-start' : 'flex-end' }}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: unitIdx * 0.08 + lessonIdx * 0.05 }}
                >
                  <LevelCard
                    lesson={lesson}
                    unlocked={unlocked}
                    progress={lessonProgress}
                    unitColor={unit.color}
                    onClick={() => unlocked && onSelectLesson(lesson.id)}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
