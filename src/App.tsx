import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout'
import { ProgressMap } from './components/ProgressMap'
import { GameScreen } from './components/GameScreen'
import { UNITS } from './data/levels'

type Screen = { type: 'map' } | { type: 'game'; lessonId: string }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'map' })

  const goToGame = (lessonId: string) => setScreen({ type: 'game', lessonId })
  const goToMap = () => setScreen({ type: 'map' })

  const isGame = screen.type === 'game'

  return (
    <Layout
      title={isGame ? 'Lección' : undefined}
      onBack={isGame ? goToMap : undefined}
    >
      <AnimatePresence mode="wait">
        {screen.type === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ProgressMap units={UNITS} onSelectLesson={goToGame} />
          </motion.div>
        )}

        {screen.type === 'game' && (
          <motion.div
            key={screen.lessonId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col flex-1"
          >
            <GameScreen
              lessonId={screen.lessonId}
              onBack={goToMap}
              onNext={goToGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}
