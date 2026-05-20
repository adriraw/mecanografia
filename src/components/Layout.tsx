import type { ReactNode } from 'react'
import { useGameStore } from '../stores/gameStore'

interface Props {
  children: ReactNode
  title?: string
  onBack?: () => void
}

export function Layout({ children, title, onBack }: Props) {
  const { progress } = useGameStore()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <header
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: 'var(--color-card)', backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-lg font-bold cursor-pointer"
              style={{ color: 'var(--color-muted)' }}
            >
              ←
            </button>
          )}
          <span className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>
            ⌨️ MecanoES
          </span>
          {title && (
            <span className="text-sm" style={{ color: 'var(--color-muted)' }}>
              / {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <span>🔥</span>
            <span className="font-bold" style={{ color: 'var(--color-warning)' }}>
              {progress.streak}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚡</span>
            <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
              {progress.xp} XP
            </span>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ opacity: i < progress.hearts ? 1 : 0.2 }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}
