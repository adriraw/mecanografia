interface Props {
  wpm: number
  accuracy: number
  errors: number
  elapsedSeconds: number
  hearts: number
}

export function StatsBar({ wpm, accuracy, errors, elapsedSeconds, hearts }: Props) {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  const timeStr = `${minutes}:${String(seconds).padStart(2, '0')}`

  return (
    <div
      className="flex items-center justify-between px-6 py-3 rounded-xl mb-6"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <div className="font-bold text-2xl tabular-nums" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
            {wpm}
          </div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>PPM</div>
        </div>

        <div className="text-center">
          <div className="font-bold text-2xl tabular-nums" style={{ color: accuracy >= 95 ? 'var(--color-accent)' : accuracy >= 80 ? 'var(--color-warning)' : 'var(--color-danger)', fontFamily: 'var(--font-mono)' }}>
            {accuracy}%
          </div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>Precisión</div>
        </div>

        <div className="text-center">
          <div className="font-bold text-2xl tabular-nums" style={{ color: errors === 0 ? 'var(--color-accent)' : 'var(--color-danger)', fontFamily: 'var(--font-mono)' }}>
            {errors}
          </div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>Errores</div>
        </div>

        <div className="text-center">
          <div className="font-bold text-2xl tabular-nums" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
            {timeStr}
          </div>
          <div style={{ color: 'var(--color-muted)', fontSize: '0.7rem' }}>Tiempo</div>
        </div>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-lg" style={{ opacity: i < hearts ? 1 : 0.2 }}>❤️</span>
        ))}
      </div>
    </div>
  )
}
