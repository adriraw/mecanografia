import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CharState, GameStatus } from '../types/game'

interface Props {
  chars: CharState[]
  cursor: number
  status: GameStatus
  onKeyDown: (e: KeyboardEvent) => void
}

export function TypingArea({ chars, cursor, status, onKeyDown }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKeyDown(e)
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onKeyDown])

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  const charColor = (status: CharState['status']) => {
    if (status === 'correct') return 'var(--color-correct)'
    if (status === 'wrong') return 'var(--color-danger)'
    return 'var(--color-pending)'
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative rounded-2xl p-8 outline-none select-none"
      style={{ backgroundColor: 'var(--color-surface)', minHeight: '120px' }}
    >
      {status === 'idle' && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl text-sm"
          style={{ color: 'var(--color-muted)', pointerEvents: 'none', zIndex: 1 }}
        >
          Pulsa cualquier tecla para comenzar · Tab para reiniciar
        </div>
      )}

      <div
        className="flex flex-wrap gap-0 leading-relaxed"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.5rem',
          lineHeight: '2.2',
          filter: status === 'idle' ? 'blur(3px)' : 'none',
          transition: 'filter 0.2s',
        }}
      >
        {chars.map((c, i) => (
          <span
            key={i}
            className="relative"
            style={{
              color: charColor(c.status),
              opacity: c.status === 'pending' ? 0.5 : 1,
            }}
          >
            {i === cursor && (
              <motion.span
                className="absolute"
                style={{
                  left: 0,
                  top: '0.1em',
                  bottom: '0.1em',
                  width: '2px',
                  backgroundColor: 'var(--color-cursor)',
                  borderRadius: '1px',
                }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'steps(1)' }}
              />
            )}
            {c.char === ' ' ? ' ' : c.char}
          </span>
        ))}

        {cursor === chars.length && (
          <AnimatePresence>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              style={{
                display: 'inline-block',
                width: '2px',
                backgroundColor: 'var(--color-cursor)',
                verticalAlign: 'text-bottom',
                height: '1.2em',
              }}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
