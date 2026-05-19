import { useState } from 'react'
import Sidebar from './components/Sidebar'
import PredictPage from './pages/PredictPage'
import EDAPage from './pages/EDAPage'
import EvaluationPage from './pages/EvaluationPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const [page, setPage] = useState('predict')

  const pages = {
    predict: PredictPage,
    eda: EDAPage,
    evaluation: EvaluationPage,
    about: AboutPage
  }
  const PageComponent = pages[page]

  return (
    <div className="relative min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <div className="bg-grid" />
      <div className="bg-glow" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)', top: '-200px', left: '-100px' }} />
      <div className="bg-glow" style={{ background: 'radial-gradient(circle, rgba(255,77,109,0.04) 0%, transparent 70%)', bottom: '-200px', right: '-100px' }} />

      <Sidebar activePage={page} onNavigate={setPage} />

      <main className="relative flex-1 z-10" style={{ marginLeft: '256px', padding: '32px' }}>
        <PageComponent />
      </main>
    </div>
  )
}