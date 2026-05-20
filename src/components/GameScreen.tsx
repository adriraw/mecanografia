import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTypingGame } from '../hooks/useTypingGame'
import { useGameStore } from '../stores/gameStore'
import { getLessonById, getNextLessonId } from '../data/levels'
import { TypingArea } from './TypingArea'
import { StatsBar } from './StatsBar'
import { ResultScreen } from './ResultScreen'

interface Props {
  lessonId: string
  onBack: () => void
  onNext: (nextId: string) => void
}

function calcStars(accuracy: number, wpm: number, minWpm: number): number {
  if (accuracy >= 95 && wpm >= minWpm) return 3
  if (accuracy >= 80) return 2
  return 1
}

function calcXp(stars: number): number {
  return [0, 10, 20, 35][stars] ?? 0
}

export function GameScreen({ lessonId, onBack, onNext }: Props) {
  const result = getLessonById(lessonId)
  const { completedLesson, updateStreak, progress } = useGameStore()
  const [textIndex, setTextIndex] = useState(0)
  const [finalResult, setFinalResult] = useState<{ wpm: number; accuracy: number; stars: number; xp: number } | null>(null)

  const lesson = result?.lesson
  const currentText = lesson?.texts[textIndex] ?? ''

  const handleFinish = useCallback((wpm: number, accuracy: number) => {
    if (!lesson) return
    const stars = calcStars(accuracy, wpm, lesson.minWpmForThreeStars)
    const xp = calcXp(stars)
    completedLesson(lessonId, { stars, bestWpm: wpm, bestAccuracy: accuracy })
    updateStreak()
    setFinalResult({ wpm, accuracy, stars, xp })
  }, [lesson, lessonId, completedLesson, updateStreak])

  const { chars, cursor, status, wpm, accuracy, errors, elapsedSeconds, onKeyDown, reset } = useTypingGame({
    text: currentText,
    onFinish: handleFinish,
  })

  if (!lesson || !result) return null

  const nextId = getNextLessonId(lessonId)

  const handleRetry = () => {
    setFinalResult(null)
    const nextTextIdx = (textIndex + 1) % lesson.texts.length
    setTextIndex(nextTextIdx)
    reset()
  }

  const handleContinue = () => {
    if (nextId) {
      onNext(nextId)
    } else {
      onBack()
    }
  }

  return (
    <div className="flex flex-col flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold" style={{ color: result.unit.color }}>
            {result.unit.title}
          </span>
          <span style={{ color: 'var(--color-muted)' }}>›</span>
          <span className="text-sm" style={{ color: 'var(--color-text)' }}>
            {lesson.title}
          </span>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          {lesson.description}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {finalResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultScreen
              wpm={finalResult.wpm}
              accuracy={finalResult.accuracy}
              stars={finalResult.stars}
              xpEarned={finalResult.xp}
              onContinue={handleContinue}
              onRetry={handleRetry}
              hasNext={Boolean(nextId)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StatsBar
              wpm={wpm}
              accuracy={accuracy}
              errors={errors}
              elapsedSeconds={elapsedSeconds}
              hearts={progress.hearts}
            />

            <TypingArea
              chars={chars}
              cursor={cursor}
              status={status}
              onKeyDown={onKeyDown}
            />

            <div className="flex items-center justify-between mt-4 text-xs" style={{ color: 'var(--color-muted)' }}>
              <span>Tab para reiniciar</span>
              <span>Texto {textIndex + 1} de {lesson.texts.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
