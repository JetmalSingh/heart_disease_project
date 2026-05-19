import { Heart, Code2, Database, Cpu } from 'lucide-react'

const techStack = [
  { layer: 'Data Science', items: ['Python 3.10', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],          color: '#fbbf24' },
  { layer: 'ML Models',    items: ['Logistic Regression', 'Decision Tree', 'Random Forest', 'GridSearchCV', 'Cross-Val'],color: '#a78bfa' },
  { layer: 'Backend API',  items: ['Flask', 'Flask-CORS', 'Joblib', 'REST API', 'JSON responses'],                       color: '#00d4ff' },
  { layer: 'Frontend',     items: ['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'Axios', 'Lucide Icons'],             color: '#00ff88' },
]

const phases = [
  { num: '01', title: 'Data Collection',   desc: 'Cleveland Heart Disease dataset from UCI ML Repository. 303 patient records with 13 clinical features and binary target variable.' },
  { num: '02', title: 'EDA & Preprocessing',desc: 'Handled missing values, standardized features with StandardScaler, analyzed correlations and visualized all distributions.' },
  { num: '03', title: 'Model Building',    desc: 'Trained Logistic Regression, Decision Tree, and Random Forest. Used GridSearchCV for hyperparameter tuning and 5-fold cross-validation.' },
  { num: '04', title: 'Flask API',         desc: 'Deployed the best model (Random Forest) as a REST API using Flask with CORS enabled for frontend communication on port 5000.' },
  { num: '05', title: 'React Dashboard',   desc: 'Full-stack web interface with prediction form, EDA visualizations, and model evaluation metrics using Recharts and Tailwind CSS.' },
]

export default function AboutPage() {
  return (
    <div className="fade-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ width: '3px', height: '28px', background: '#ff4d6d', borderRadius: '2px' }} />
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '26px', color: 'var(--text)' }}>
            About This Project
          </h1>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginLeft: '15px' }}>
          AI-Based Heart Disease Prediction System with Full-Stack Deployment
        </p>
      </div>

      {/* Hero */}
      <div className="card" style={{ padding: '24px', marginBottom: '24px', borderColor: 'rgba(255,77,109,0.2)', background: 'linear-gradient(135deg, rgba(255,77,109,0.05), rgba(0,212,255,0.03))' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Heart size={24} style={{ color: '#ff4d6d' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>
              Heart Disease Prediction System
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Heart disease is the leading cause of death globally. This project applies machine learning to the Cleveland Heart Disease dataset to predict cardiovascular disease risk from 13 clinical parameters. The trained Random Forest model achieves 88.5% accuracy and is deployed as a full-stack web application enabling real-time predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div style={{ marginBottom: '24px' }}>
        <div className="section-title"><Code2 size={12} /> Project Phases</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {phases.map(p => (
            <div key={p.num} className="card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'Space Mono', fontSize: '20px', fontWeight: 700, color: 'var(--border)', flexShrink: 0, width: '32px' }}>{p.num}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{p.title}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div style={{ marginBottom: '24px' }}>
        <div className="section-title"><Cpu size={12} /> Technology Stack</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {techStack.map(t => (
            <div key={t.layer} className="card" style={{ padding: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: t.color, marginBottom: '10px' }}>{t.layer.toUpperCase()}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {t.items.map(item => (
                  <span key={item} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: `${t.color}10`, border: `1px solid ${t.color}25`, color: 'var(--text)', fontFamily: 'Space Mono' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dataset */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div className="section-title"><Database size={12} /> Dataset Details</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7 }}>
            The <strong style={{ color: 'var(--text)' }}>Cleveland Heart Disease Dataset</strong> from UCI ML Repository contains clinical data from 303 patients collected at the Cleveland Clinic Foundation. Target variable indicates presence (1) or absence (0) of heart disease confirmed by angiography.
          </p>
          <div>
            {[['Samples','303 patients'],['Features','13 clinical attributes'],['Target','Binary (0=No, 1=Yes)'],['Missing Values','6 (filled with median)'],['Train/Test Split','80% / 20%']].map(([k,v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontSize: '12px', fontFamily: 'Space Mono', color: 'var(--text)' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
        <p style={{ fontSize: '12px', color: '#fbbf24', lineHeight: 1.6 }}>
          <strong>⚠️ Medical Disclaimer:</strong> This application is developed for educational and research purposes only. It is not intended for clinical use. All predictions are probabilistic and should never replace professional medical diagnosis. Always consult a licensed physician for any health concerns.
        </p>
      </div>
    </div>
  )
}