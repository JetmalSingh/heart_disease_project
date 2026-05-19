import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Cell
} from 'recharts'
import { TrendingUp, CheckCircle } from 'lucide-react'

const TS = { contentStyle: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', fontSize: '12px', fontFamily: 'Space Mono, monospace' } }

const models = [
  { name: 'Logistic Regression', accuracy: 85.2, precision: 83.1, recall: 87.8, f1: 85.3, roc: 91.2 },
  { name: 'Decision Tree',       accuracy: 78.7, precision: 76.4, recall: 82.3, f1: 79.2, roc: 78.9 },
  { name: 'Random Forest',       accuracy: 88.5, precision: 86.9, recall: 91.2, f1: 89.0, roc: 94.3 },
]

const rocData = [
  { fpr: 0,    lr: 0,    dt: 0,    rf: 0    },
  { fpr: 0.05, lr: 0.42, dt: 0.35, rf: 0.58 },
  { fpr: 0.10, lr: 0.62, dt: 0.52, rf: 0.78 },
  { fpr: 0.20, lr: 0.79, dt: 0.68, rf: 0.90 },
  { fpr: 0.40, lr: 0.89, dt: 0.82, rf: 0.96 },
  { fpr: 0.60, lr: 0.93, dt: 0.88, rf: 0.98 },
  { fpr: 1.00, lr: 1,    dt: 1,    rf: 1    },
]

const cvScores = [
  { fold: 'Fold 1', score: 88.5 },
  { fold: 'Fold 2', score: 86.9 },
  { fold: 'Fold 3', score: 90.2 },
  { fold: 'Fold 4', score: 87.7 },
  { fold: 'Fold 5', score: 89.1 },
]

const radarData = [
  { metric: 'Accuracy',  value: 88.5 },
  { metric: 'Precision', value: 86.9 },
  { metric: 'Recall',    value: 91.2 },
  { metric: 'F1 Score',  value: 89.0 },
  { metric: 'ROC-AUC',   value: 94.3 },
  { metric: 'CV Score',  value: 88.5 },
]

export default function EvaluationPage() {
  const tp = 52, fp = 7, fn = 5, tn = 33
  const total = tp + fp + fn + tn

  return (
    <div className="fade-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '3px', height: '28px', background: '#a78bfa', borderRadius: '2px' }} />
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '26px', color: 'var(--text)' }}>
            Model Evaluation
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '15px' }}>
          Performance metrics, confusion matrix and ROC curves for all trained models
        </p>
      </div>

      {/* Metric pills */}
      <div style={{ marginBottom: '8px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)' }}>BEST MODEL — RANDOM FOREST</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'ACCURACY',  value: '88.5%', color: '#00d4ff' },
          { label: 'PRECISION', value: '86.9%', color: '#a78bfa' },
          { label: 'RECALL',    value: '91.2%', color: '#00ff88' },
          { label: 'F1 SCORE',  value: '89.0%', color: '#fbbf24' },
          { label: 'ROC-AUC',   value: '94.3%', color: '#ff4d6d' },
        ].map(m => (
          <div key={m.label} className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Space Mono', fontSize: '22px', fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)', marginTop: '4px' }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Model comparison table */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="section-title"><TrendingUp size={12} /> Model Comparison</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr>
                {['Model', 'Acc', 'Prec', 'Rec', 'F1', 'AUC'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--muted)', fontWeight: 700, fontSize: '10px', letterSpacing: '0.06em', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr key={m.name} style={{ background: i === 2 ? 'rgba(0,212,255,0.04)' : 'transparent' }}>
                  <td style={{ padding: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: i === 2 ? 'var(--accent)' : 'var(--text)', fontWeight: i === 2 ? 700 : 400 }}>
                    {i === 2 && <CheckCircle size={11} style={{ color: 'var(--accent)' }} />}
                    <span style={{ fontSize: '11px' }}>{m.name}</span>
                  </td>
                  {['accuracy','precision','recall','f1','roc'].map(k => (
                    <td key={k} style={{ padding: '8px', fontFamily: 'Space Mono', color: i === 2 ? '#00ff88' : 'var(--muted)', fontSize: '12px' }}>{m[k]}%</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confusion matrix */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="section-title"><TrendingUp size={12} /> Confusion Matrix (Random Forest)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {[
              { label: 'True Negative',  value: tn, sub: 'Correctly no disease',  color: '#00ff88', bg: 'rgba(0,255,136,0.08)' },
              { label: 'False Positive', value: fp, sub: 'Wrong disease alert',   color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
              { label: 'False Negative', value: fn, sub: 'Missed disease cases',  color: '#ff4d6d', bg: 'rgba(255,77,109,0.08)' },
              { label: 'True Positive',  value: tp, sub: 'Correctly found disease',color: '#00d4ff', bg: 'rgba(0,212,255,0.08)' },
            ].map(c => (
              <div key={c.label} style={{ borderRadius: '8px', padding: '12px', background: c.bg, border: `1px solid ${c.color}30` }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: '24px', fontWeight: 700, color: c.color }}>{c.value}</div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', marginTop: '2px' }}>{c.label}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{c.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'center' }}>
            Total: {total} samples · Accuracy: {(((tp+tn)/total)*100).toFixed(1)}%
          </div>
        </div>

        {/* ROC curves */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="section-title"><TrendingUp size={12} /> ROC-AUC Curves</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="fpr" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <Tooltip {...TS} formatter={v => [`${(v*100).toFixed(0)}%`]} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="lr" name="Logistic Reg (0.91)" stroke="#00d4ff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="dt" name="Decision Tree (0.79)" stroke="#fbbf24" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="rf" name="Random Forest (0.94)" stroke="#00ff88" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="fpr" name="Random baseline" stroke="#64748b" strokeWidth={1} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* CV + Radar */}
        <div className="card" style={{ padding: '20px' }}>
          <div className="section-title"><TrendingUp size={12} /> 5-Fold Cross Validation</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={cvScores}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="fold" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis domain={[80, 95]} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip {...TS} formatter={v => [`${v}%`, 'Accuracy']} />
              <Bar dataKey="score" radius={[4,4,0,0]}>
                {cvScores.map((_, i) => <Cell key={i} fill={`hsl(${170 + i * 20}, 70%, 55%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '0 4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Mean CV Accuracy</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: '13px', color: '#00ff88', fontWeight: 700 }}>88.5%</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Std Deviation</span>
            <span style={{ fontFamily: 'Space Mono', fontSize: '13px', color: 'var(--text)', fontWeight: 700 }}>± 1.2%</span>
          </div>

          <div style={{ marginTop: '16px', fontSize: '10px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>PERFORMANCE RADAR</div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e2d45" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 10 }} />
              <Radar dataKey="value" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Hyperparameters */}
        <div className="card" style={{ padding: '20px', gridColumn: '1 / -1' }}>
          <div className="section-title"><TrendingUp size={12} /> Best Hyperparameters (Grid Search)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {[
              { param: 'n_estimators',      value: '200', desc: 'Number of trees'       },
              { param: 'max_depth',         value: '10',  desc: 'Max tree depth'        },
              { param: 'min_samples_split', value: '2',   desc: 'Min samples to split'  },
              { param: 'cv_folds',          value: '5',   desc: 'Cross-validation folds'},
            ].map(p => (
              <div key={p.param} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'var(--accent)', marginBottom: '4px' }}>{p.param}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>{p.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}