import { Activity, BarChart2, TrendingUp, Info, Heart, Cpu } from 'lucide-react'

const navItems = [
  { id: 'predict',    icon: Activity,    label: 'Predict',    desc: 'Run prediction' },
  { id: 'eda',        icon: BarChart2,   label: 'EDA',        desc: 'Data analysis' },
  { id: 'evaluation', icon: TrendingUp,  label: 'Evaluation', desc: 'Model metrics' },
  { id: 'about',      icon: Info,        label: 'About',      desc: 'Project info' },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, height: '100%', width: '256px',
      background: 'var(--surface)', borderRight: '1px solid var(--border)',
      padding: '24px 16px', display: 'flex', flexDirection: 'column', zIndex: 20
    }}>
      {/* Logo */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Heart size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '15px', color: 'var(--text)' }}>CardioAI</div>
            <div style={{ fontSize: '9px', color: 'var(--muted)', letterSpacing: '0.1em' }}>HEART DISEASE PREDICTOR</div>
          </div>
        </div>
      </div>

      {/* API status */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px',
        padding: '8px 12px', borderRadius: '8px',
        background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.15)'
      }}>
        <div style={{ position: 'relative', width: '8px', height: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88' }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: '#00ff88',
            animation: 'pulse-ring 1.5s ease-out infinite'
          }} />
        </div>
        <span style={{ fontSize: '11px', color: '#00ff88', fontWeight: 600 }}>API Connected</span>
        <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: 'auto' }}>:5000</span>
      </div>

      {/* Nav label */}
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '8px', paddingLeft: '4px' }}>
        NAVIGATION
      </div>

      {/* Nav items */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(({ id, icon: Icon, label, desc }) => (
          <button key={id} onClick={() => onNavigate(id)} className={`nav-item ${activePage === id ? 'active' : ''}`}>
            <Icon size={16} />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{label}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 400 }}>{desc}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Cpu size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>Model Info</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: 1.7 }}>
            <div>Random Forest Classifier</div>
            <div>Cleveland Dataset · 303 samples</div>
            <div>13 features · Binary output</div>
          </div>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--muted)', textAlign: 'center', marginTop: '14px' }}>
          Built with Flask + React + sklearn
        </div>
      </div>
    </aside>
  )
}