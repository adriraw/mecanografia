import { motion } from 'framer-motion'

interface Props {
  wpm: number
  accuracy: number
  stars: number
  xpEarned: number
  onContinue: () => void
  onRetry: () => void
  hasNext: boolean
}

export function ResultScreen({ wpm, accuracy, stars, xpEarned, onContinue, onRetry, hasNext }: Props) {
  const message =
    stars === 3 ? '¡Perfecto! Eres increíble 🎉' :
    stars === 2 ? '¡Muy bien! Sigue practicando 💪' :
    '¡Lo lograste! La práctica te hará mejor 🌱'

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 py-16 px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="text-center">
        <div className="text-5xl mb-4">
          {stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉'}
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          {message}
        </h2>
        <div className="flex gap-2 justify-center mt-4">
          {[1, 2, 3].map(i => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: i <= stars ? 1 : 0.7, rotate: 0 }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              style={{ fontSize: '2.5rem', opacity: i <= stars ? 1 : 0.2 }}
            >
              ⭐
            </motion.span>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-6 rounded-2xl p-6 w-full max-w-sm"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="text-center">
          <div className="text-3xl font-bold tabular-nums" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
            {wpm}
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>PPM</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold tabular-nums" style={{ color: accuracy >= 95 ? 'var(--color-accent)' : 'var(--color-warning)', fontFamily: 'var(--font-mono)' }}>
            {accuracy}%
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>Precisión</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold tabular-nums" style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-mono)' }}>
            +{xpEarned}
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>XP</div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
          style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-text)' }}
        >
          Repetir
        </button>
        {hasNext && (
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
          >
            Continuar →
          </motion.button>
        )}
        {!hasNext && (
          <motion.button
            onClick={onContinue}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 rounded-xl font-bold text-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
          >
            Ver mapa →
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
