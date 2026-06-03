import { useState } from 'react'
import axios from 'axios'
import { Activity, User, Zap, AlertTriangle, CheckCircle, XCircle, RefreshCw, Send, Info } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

// const API = 'https://jeetusingh.pythonanywhere.com'
const API = 'http://localhost:5000'

const FIELDS = [
  { key: 'age',      label: 'Age',                    placeholder: '63',  type: 'number', tip: 'Patient age in years' },
  { key: 'sex',      label: 'Sex',                    type: 'select',     tip: 'Biological sex',
    options: [{ v: '1', l: 'Male' }, { v: '0', l: 'Female' }] },
  { key: 'cp',       label: 'Chest Pain Type',        type: 'select',     tip: '0=Typical Angina, 3=Asymptomatic',
    options: [{ v: '0', l: 'Typical Angina' }, { v: '1', l: 'Atypical Angina' }, { v: '2', l: 'Non-anginal Pain' }, { v: '3', l: 'Asymptomatic' }] },
  { key: 'trestbps', label: 'Resting BP (mm Hg)',     placeholder: '145', type: 'number', tip: 'Resting blood pressure' },
  { key: 'chol',     label: 'Cholesterol (mg/dl)',    placeholder: '233', type: 'number', tip: 'Serum cholesterol' },
  { key: 'fbs',      label: 'Fasting Blood Sugar',    type: 'select',     tip: '>120 mg/dl?',
    options: [{ v: '1', l: '> 120 mg/dl (True)' }, { v: '0', l: '≤ 120 mg/dl (False)' }] },
  { key: 'restecg',  label: 'Rest ECG Result',        type: 'select',     tip: 'Resting ECG',
    options: [{ v: '0', l: 'Normal' }, { v: '1', l: 'ST-T Abnormality' }, { v: '2', l: 'LV Hypertrophy' }] },
  { key: 'thalach',  label: 'Max Heart Rate',         placeholder: '150', type: 'number', tip: 'Maximum heart rate achieved' },
  { key: 'exang',    label: 'Exercise Induced Angina',type: 'select',     tip: 'Angina during exercise?',
    options: [{ v: '1', l: 'Yes' }, { v: '0', l: 'No' }] },
  { key: 'oldpeak',  label: 'ST Depression',          placeholder: '2.3', type: 'number', step: '0.1', tip: 'ST depression by exercise' },
  { key: 'slope',    label: 'ST Slope',               type: 'select',     tip: 'Slope of peak exercise ST',
    options: [{ v: '0', l: 'Upsloping' }, { v: '1', l: 'Flat' }, { v: '2', l: 'Downsloping' }] },
  { key: 'ca',       label: 'Major Vessels (0–3)',    placeholder: '0',   type: 'number', min: 0, max: 3, tip: 'Vessels by fluoroscopy' },
  { key: 'thal',     label: 'Thalassemia',            type: 'select',     tip: 'Blood disorder type',
    options: [{ v: '1', l: 'Normal' }, { v: '2', l: 'Fixed Defect' }, { v: '3', l: 'Reversible Defect' }] },
]

const DEMO = {
  age:'63', sex:'1', cp:'3', trestbps:'145', chol:'233', fbs:'1',
  restecg:'0', thalach:'150', exang:'0', oldpeak:'2.3', slope:'0', ca:'0', thal:'1'
}

const EMPTY = Object.fromEntries(FIELDS.map(f => [f.key, '']))

const TS = { contentStyle: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', fontSize: '12px' } }

export default function PredictPage() {
  const [form, setForm]       = useState(EMPTY)
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async () => {
    setError('')
    const missing = FIELDS.filter(f => form[f.key] === '').map(f => f.label)
    if (missing.length) { setError(`Please fill in: ${missing.join(', ')}`); return }
    setLoading(true)
    try {
      const payload = Object.fromEntries(FIELDS.map(f => [f.key, parseFloat(form[f.key])]))
      const { data } = await axios.post(`${API}/predict`, payload)
      if (data.success) setResult(data.data)
      else setError(data.error)
    } catch {
      setError('Cannot connect to Flask API. Make sure python app.py is running on port 5000.')
    }
    setLoading(false)
  }

  const riskColor = result
    ? result.risk_level === 'High Risk'     ? '#ff4d6d'
    : result.risk_level === 'Moderate Risk' ? '#fbbf24'
    : '#00ff88'
    : '#00d4ff'

  const pieData = result
    ? [{ name: 'Disease', value: result.probability_disease }, { name: 'No Disease', value: result.probability_no_disease }]
    : []

  return (
    <div className="fade-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '3px', height: '28px', background: 'var(--accent)', borderRadius: '2px' }} />
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '26px', color: 'var(--text)' }}>
            Heart Disease Prediction
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '15px' }}>
          Enter patient clinical data to predict cardiovascular disease risk using AI
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '24px' }}>

        {/* ── Form ── */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="section-title" style={{ margin: 0 }}>
              <User size={13} /> Patient Data
            </div>
            <button onClick={() => { setForm(DEMO); setResult(null) }}
              style={{ fontSize: '11px', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', background: 'none', border: 'none' }}>
              <RefreshCw size={11} /> Load Demo
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {FIELDS.map(f => (
              <div key={f.key}>
                <label className="lbl">
                  {f.label}
                  <span title={f.tip} style={{ marginLeft: '4px', cursor: 'help', opacity: 0.5 }}>
                    <Info size={10} style={{ display: 'inline' }} />
                  </span>
                </label>
                {f.type === 'select' ? (
                  <select className="inp" value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}>
                    <option value="">Select...</option>
                    {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                ) : (
                  <input className="inp" type="number"
                    placeholder={f.placeholder} min={f.min} max={f.max} step={f.step || '1'}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '12px', borderRadius: '8px', background: 'rgba(255,77,109,0.08)', border: '1px solid rgba(255,77,109,0.2)' }}>
              <AlertTriangle size={14} style={{ color: '#ff4d6d', marginTop: '1px' }} />
              <span style={{ fontSize: '12px', color: '#ff4d6d' }}>{error}</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button onClick={handleSubmit} disabled={loading} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '13px',
              background: loading ? 'var(--border)' : 'var(--accent)',
              color: loading ? 'var(--muted)' : '#000',
              cursor: loading ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s'
            }}>
              {loading
                ? <><Activity size={15} style={{ animation: 'spin-slow 1s linear infinite' }} /> Analyzing...</>
                : <><Send size={15} /> Run Prediction</>}
            </button>
            <button onClick={() => { setForm(EMPTY); setResult(null); setError('') }} style={{
              padding: '12px 16px', borderRadius: '8px', background: 'var(--surface2)',
              border: '1px solid var(--border)', color: 'var(--muted)', fontSize: '13px', cursor: 'pointer'
            }}>Clear</button>
          </div>
        </div>

        {/* ── Result ── */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Main result card */}
            <div className="card" style={{ padding: '24px', borderColor: `${riskColor}30`, boxShadow: `0 0 30px ${riskColor}10` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                {result.prediction === 1
                  ? <XCircle size={24} style={{ color: '#ff4d6d' }} />
                  : <CheckCircle size={24} style={{ color: '#00ff88' }} />}
                <div>
                  <div style={{ fontWeight: 800, fontSize: '18px', color: riskColor }}>{result.result_label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em' }}>
                    {result.risk_level.toUpperCase()}
                  </div>
                </div>
              </div>

              {[
                { label: 'Disease Probability',    val: result.probability_disease,    color: '#ff4d6d' },
                { label: 'No Disease Probability', val: result.probability_no_disease, color: '#00ff88' },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{label}</span>
                    <span style={{ fontSize: '13px', fontFamily: 'Space Mono', fontWeight: 700, color }}>{val}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pie chart */}
            <div className="card" style={{ padding: '20px', flex: 1 }}>
              <div className="section-title"><Zap size={12} /> Risk Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                    <Cell fill="#ff4d6d" />
                    <Cell fill="#00ff88" />
                  </Pie>
                  <Tooltip {...TS} formatter={v => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                {pieData.map((d, i) => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#ff4d6d' : '#00ff88' }} />
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                      {d.name}: <strong style={{ color: 'var(--text)' }}>{d.value}%</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <p style={{ fontSize: '11px', color: '#fbbf24', lineHeight: 1.5 }}>
                ⚠️ AI-based tool for educational purposes only. Always consult a licensed physician.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}