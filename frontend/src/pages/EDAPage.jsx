import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { BarChart2 } from 'lucide-react'

const TS = { contentStyle: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '8px', fontSize: '12px', fontFamily: 'Space Mono, monospace' } }

const targetDist   = [{ name: 'No Disease', count: 138, fill: '#00ff88' }, { name: 'Heart Disease', count: 165, fill: '#ff4d6d' }]
const ageGroups    = [
  { age: '29-35', noDisease: 4,  disease: 2  },
  { age: '36-42', noDisease: 12, disease: 8  },
  { age: '43-49', noDisease: 22, disease: 18 },
  { age: '50-56', noDisease: 38, disease: 42 },
  { age: '57-63', noDisease: 40, disease: 55 },
  { age: '64-70', noDisease: 18, disease: 32 },
  { age: '71-77', noDisease: 4,  disease: 8  },
]
const genderData   = [{ gender: 'Female', noDisease: 72, disease: 25 }, { gender: 'Male', noDisease: 66, disease: 140 }]
const cpData       = [
  { type: 'Typical Angina', noDisease: 16, disease: 7   },
  { type: 'Atypical',       noDisease: 41, disease: 9   },
  { type: 'Non-anginal',    noDisease: 68, disease: 18  },
  { type: 'Asymptomatic',   noDisease: 13, disease: 131 },
]
const cholData     = [
  { range: '<200',   noDisease: 28, disease: 36 },
  { range: '200-240',noDisease: 52, disease: 68 },
  { range: '240-280',noDisease: 38, disease: 42 },
  { range: '280+',   noDisease: 20, disease: 19 },
]
const thalData     = [{ name: 'Normal', value: 54, fill: '#00d4ff' }, { name: 'Fixed Defect', value: 18, fill: '#fbbf24' }, { name: 'Reversible', value: 229, fill: '#ff4d6d' }]
const featImportance = [
  { feature: 'thalach', importance: 0.142 },
  { feature: 'cp',      importance: 0.138 },
  { feature: 'ca',      importance: 0.128 },
  { feature: 'thal',    importance: 0.121 },
  { feature: 'oldpeak', importance: 0.098 },
  { feature: 'exang',   importance: 0.087 },
  { feature: 'age',     importance: 0.076 },
  { feature: 'sex',     importance: 0.065 },
  { feature: 'trestbps',importance: 0.058 },
  { feature: 'chol',    importance: 0.045 },
  { feature: 'slope',   importance: 0.022 },
  { feature: 'fbs',     importance: 0.013 },
  { feature: 'restecg', importance: 0.007 },
].sort((a, b) => b.importance - a.importance)

function Card({ title, children }) {
  return (
    <div className="card" style={{ padding: '20px' }}>
      <div className="section-title"><BarChart2 size={12} /> {title}</div>
      {children}
    </div>
  )
}

export default function EDAPage() {
  return (
    <div className="fade-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '3px', height: '28px', background: '#fbbf24', borderRadius: '2px' }} />
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '26px', color: 'var(--text)' }}>
            Exploratory Data Analysis
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '15px' }}>
          Cleveland Heart Disease Dataset · 303 patients · 14 features
        </p>
      </div>

      {/* Stat pills */}
      <div style={{ marginBottom: '24px' }}>
        {[
          { label: 'Total Patients', value: '303',          color: 'var(--accent)' },
          { label: 'Heart Disease',  value: '165 (54.5%)',  color: '#ff4d6d'       },
          { label: 'No Disease',     value: '138 (45.5%)',  color: '#00ff88'       },
          { label: 'Avg Age',        value: '54.4 yrs',     color: '#fbbf24'       },
          { label: 'Features',       value: '13',           color: '#a78bfa'       },
        ].map(s => (
          <span key={s.label} style={{
            display: 'inline-block', marginRight: '10px', marginBottom: '10px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '10px 16px'
          }}>
            <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em' }}>{s.label}</div>
            <div style={{ fontFamily: 'Space Mono', fontSize: '16px', fontWeight: 700, color: s.color }}>{s.value}</div>
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        <Card title="Disease Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={targetDist} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip {...TS} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {targetDist.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Thalassemia Types">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={thalData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {thalData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip {...TS} formatter={v => [v, 'Patients']} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Age Groups vs Heart Disease">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="age" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip {...TS} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="noDisease" name="No Disease" fill="#00ff88" radius={[3,3,0,0]} />
              <Bar dataKey="disease"   name="Disease"    fill="#ff4d6d" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Gender vs Heart Disease">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={genderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="gender" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip {...TS} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="noDisease" name="No Disease" fill="#00d4ff" radius={[3,3,0,0]} />
              <Bar dataKey="disease"   name="Disease"    fill="#ff4d6d" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Chest Pain Type vs Disease">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cpData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="type" tick={{ fill: '#64748b', fontSize: 10 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip {...TS} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="noDisease" name="No Disease" fill="#00d4ff" radius={[3,3,0,0]} />
              <Bar dataKey="disease"   name="Disease"    fill="#ff4d6d" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Cholesterol Levels vs Disease">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={cholData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
              <XAxis dataKey="range" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip {...TS} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="noDisease" name="No Disease" fill="#a78bfa" radius={[3,3,0,0]} />
              <Bar dataKey="disease"   name="Disease"    fill="#ff4d6d" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Full-width feature importance */}
        <div className="card" style={{ padding: '20px', gridColumn: '1 / -1' }}>
          <div className="section-title"><BarChart2 size={12} /> Feature Importance (Random Forest)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={featImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${(v*100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="feature" width={70} tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'Space Mono' }} />
              <Tooltip {...TS} formatter={v => [`${(v*100).toFixed(1)}%`, 'Importance']} />
              <Bar dataKey="importance" radius={[0,4,4,0]}>
                {featImportance.map((_, i) => <Cell key={i} fill={`hsl(${200 - i * 12}, 80%, 60%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}