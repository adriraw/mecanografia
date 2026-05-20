import { motion } from 'framer-motion'
import type { Lesson, LessonProgress } from '../types/game'

interface Props {
  lesson: Lesson
  unlocked: boolean
  progress: LessonProgress | null
  unitColor: string
  onClick: () => void
}

export function LevelCard({ lesson, unlocked, progress, unitColor, onClick }: Props) {
  const stars = progress?.stars ?? 0
  const completed = stars > 0

  return (
    <motion.button
      onClick={onClick}
      disabled={!unlocked}
      whileHover={unlocked ? { scale: 1.04 } : {}}
      whileTap={unlocked ? { scale: 0.97 } : {}}
      className="w-64 rounded-2xl p-4 text-left transition-all"
      style={{
        backgroundColor: completed
          ? unitColor + '22'
          : unlocked
            ? 'var(--color-surface)'
            : 'var(--color-surface)',
        border: `2px solid ${completed ? unitColor : unlocked ? 'var(--color-card)' : '#333'}`,
        cursor: unlocked ? 'pointer' : 'not-allowed',
        opacity: unlocked ? 1 : 0.45,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-bold text-sm" style={{ color: unlocked ? 'var(--color-text)' : 'var(--color-muted)' }}>
            {lesson.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
            {lesson.description}
          </p>
        </div>
        {!unlocked && (
          <span className="text-lg">🔒</span>
        )}
        {completed && (
          <span className="text-lg">✅</span>
        )}
      </div>

      <div className="flex gap-1 mt-3">
        {[1, 2, 3].map(i => (
          <span key={i} style={{ fontSize: '1rem', opacity: i <= stars ? 1 : 0.2 }}>
            ⭐
          </span>
        ))}
      </div>

      {progress && (
        <div className="flex gap-3 mt-2 text-xs" style={{ color: 'var(--color-muted)' }}>
          <span>{progress.bestWpm} PPM</span>
          <span>{progress.bestAccuracy}% preciso</span>
        </div>
      )}

      {!progress && lesson.keys.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {lesson.keys.slice(0, 8).map(k => (
            <span
              key={k}
              className="text-xs px-1.5 py-0.5 rounded font-mono"
              style={{ backgroundColor: unitColor + '33', color: unitColor }}
            >
              {k}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  )
}
