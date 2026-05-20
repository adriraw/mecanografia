import { useState, useEffect, useCallback, useRef } from 'react'
import type { CharState, GameStatus } from '../types/game'

interface UseTypingGameOptions {
  text: string
  onFinish?: (wpm: number, accuracy: number) => void
}

interface UseTypingGameReturn {
  chars: CharState[]
  cursor: number
  status: GameStatus
  wpm: number
  accuracy: number
  errors: number
  elapsedSeconds: number
  onKeyDown: (e: KeyboardEvent) => void
  reset: () => void
}

export function useTypingGame({ text, onFinish }: UseTypingGameOptions): UseTypingGameReturn {
  const [chars, setChars] = useState<CharState[]>(() => buildChars(text))
  const [cursor, setCursor] = useState(0)
  const [status, setStatus] = useState<GameStatus>('idle')
  const [errors, setErrors] = useState(0)
  const [totalTyped, setTotalTyped] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onFinishRef = useRef(onFinish)
  onFinishRef.current = onFinish

  function buildChars(t: string): CharState[] {
    return t.split('').map(char => ({ char, status: 'pending' }))
  }

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setChars(buildChars(text))
    setCursor(0)
    setStatus('idle')
    setErrors(0)
    setTotalTyped(0)
    setElapsedSeconds(0)
    startTimeRef.current = null
  }, [text])

  useEffect(() => {
    reset()
  }, [text])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const calcWpm = useCallback((correctChars: number, seconds: number) => {
    if (seconds === 0) return 0
    return Math.round((correctChars / 5) / (seconds / 60))
  }, [])

  const calcAccuracy = useCallback((correct: number, total: number) => {
    if (total === 0) return 100
    return Math.round((correct / total) * 100)
  }, [])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (status === 'finished') return

    if (e.key === 'Tab') {
      e.preventDefault()
      reset()
      return
    }

    if (e.key === 'Backspace') {
      if (cursor === 0) return
      const newCursor = cursor - 1
      setChars(prev => {
        const next = [...prev]
        next[newCursor] = { ...next[newCursor], status: 'pending' }
        return next
      })
      setCursor(newCursor)
      return
    }

    if (e.key.length !== 1) return

    if (status === 'idle') {
      startTimeRef.current = Date.now()
      setStatus('playing')
      timerRef.current = setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current!) / 1000))
      }, 500)
    }

    const expected = chars[cursor]?.char
    if (!expected) return

    const isCorrect = e.key === expected
    const newCursor = cursor + 1

    setChars(prev => {
      const next = [...prev]
      next[cursor] = { ...next[cursor], status: isCorrect ? 'correct' : 'wrong' }
      return next
    })

    if (!isCorrect) setErrors(prev => prev + 1)
    setTotalTyped(prev => prev + 1)
    setCursor(newCursor)

    if (newCursor === chars.length) {
      if (timerRef.current) clearInterval(timerRef.current)
      setStatus('finished')
      const secs = Math.max(1, Math.floor((Date.now() - startTimeRef.current!) / 1000))
      const correctCount = chars.filter((c, i) => i === cursor ? isCorrect : c.status === 'correct').length
      const wpm = calcWpm(correctCount, secs)
      const acc = calcAccuracy(correctCount, newCursor)
      onFinishRef.current?.(wpm, acc)
    }
  }, [status, cursor, chars, reset, calcWpm, calcAccuracy])

  const correctCount = chars.filter(c => c.status === 'correct').length
  const wpm = calcWpm(correctCount, elapsedSeconds)
  const accuracy = calcAccuracy(correctCount, totalTyped)

  return { chars, cursor, status, wpm, accuracy, errors, elapsedSeconds, onKeyDown, reset }
}
