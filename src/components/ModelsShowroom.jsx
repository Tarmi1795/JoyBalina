import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const models = [
  {
    id: 'gtx',
    name: 'Geely GT-X',
    type: 'Hypercar',
    price: '€ 2,400,000',
    badge: 'Signature',
    color: '#4fc3f7',
    specs: { power: '1,080 HP', speed: '340 km/h', accel: '2.4s', range: '—' },
    desc: 'Track-bred, road-legal perfection. Uncompromising performance for the discerning collector.',
  },
  {
    id: 'ev1',
    name: 'Geely EV-1',
    type: 'Electric GT',
    price: '€ 380,000',
    badge: 'Electric',
    color: '#34d399',
    specs: { power: '800 HP', speed: '290 km/h', accel: '3.1s', range: '620 km' },
    desc: 'Zero emissions, infinite presence. The electric future has never felt so alive.',
  },
  {
    id: 'rst',
    name: 'Geely RST',
    type: 'Sport Tourer',
    price: '€ 185,000',
    badge: 'Grand Tourer',
    color: '#f0c040',
    specs: { power: '650 HP', speed: '310 km/h', accel: '3.4s', range: '—' },
    desc: 'Continent-crossing comfort with supercar soul. The grand tourer, reimagined.',
  },
];

function ModelCard({ model, index, selected, onSelect }) {
  const active = selected === model.id;
  return (
    <motion.div
      onClick={() => onSelect(model.id)}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 6 }}
      style={{
        cursor: 'pointer',
        padding: '1.5rem 1.8rem',
        borderRadius: '12px',
        border: `1px solid ${active ? model.color + '60' : 'rgba(255,255,255,0.06)'}`,
        background: active ? `${model.color}08` : 'rgba(255,255,255,0.02)',
        marginBottom: '1rem',
        transition: 'border-color 0.3s, background 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {active && (
        <motion.div layoutId="activeBar" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
          background: `linear-gradient(180deg, ${model.color}, transparent)`,
          borderRadius: '0 2px 2px 0',
        }} />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ background: `${model.color}20`, color: model.color, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Outfit', padding: '0.15rem 0.5rem', borderRadius: '3px', fontWeight: 600 }}>{model.badge}</span>
          </div>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.3rem', color: '#f0f4ff', letterSpacing: '0.05em' }}>{model.name}</div>
          <div style={{ color: 'rgba(192,200,216,0.45)', fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{model.type}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Rajdhani', fontWeight: 600, fontSize: '1rem', color: model.color }}>{model.price}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ModelsShowroom() {
  const [selected, setSelected] = useState('gtx');
  const activeModel = models.find(m => m.id === selected);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const carY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="technology" ref={ref} style={{
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #060608 0%, #0a0a12 100%)',
    }}>
      <div className="ambient-blob" style={{ width: '500px', height: '500px', bottom: 0, left: '30%', background: `${activeModel.color}06`, pointerEvents: 'none', transition: 'background 0.6s' }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '48px', background: `linear-gradient(90deg, transparent, ${activeModel.color})`, transition: 'background 0.4s' }} />
            <span style={{ color: activeModel.color, fontFamily: 'Outfit', fontSize: '0.72rem', letterSpacing: '0.4em', textTransform: 'uppercase', transition: 'color 0.4s' }}>The Collection</span>
            <div style={{ height: '1px', width: '48px', background: `linear-gradient(90deg, ${activeModel.color}, transparent)`, transition: 'background 0.4s' }} />
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani', fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, #f0f4ff 30%, #c0c8d8 70%, #4fc3f7 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '0.03em',
          }}>SELECT YOUR Geely</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: model list */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            {models.map((model, i) => (
              <ModelCard key={model.id} model={model} index={i} selected={selected} onSelect={setSelected} />
            ))}
          </motion.div>

          {/* Right: detail view */}
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ position: 'relative' }}
          >
            {/* Model name big */}
            <div style={{
              fontFamily: 'Rajdhani', fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              lineHeight: 0.9,
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
            }}>
              <span style={{ color: 'rgba(240,244,255,0.12)', display: 'block', fontSize: '0.6em', letterSpacing: '0.2em' }}>Geely</span>
              <span style={{
                background: `linear-gradient(135deg, #f0f4ff, ${activeModel.color})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>{activeModel.name.replace('Geely ', '')}</span>
            </div>
            <div style={{ color: 'rgba(192,200,216,0.45)', fontFamily: 'Outfit', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2rem' }}>{activeModel.type}</div>

            {/* SVG Car placeholder illustration */}
            <motion.div style={{ y: carY }}>
              <svg viewBox="0 0 600 260" fill="none" style={{ width: '100%', filter: `drop-shadow(0 0 40px ${activeModel.color}30)` }}>
                <defs>
                  <linearGradient id={`bodyC-${activeModel.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a2e" />
                    <stop offset="60%" stopColor="#2a2a4a" />
                    <stop offset="100%" stopColor="#0f0f1a" />
                  </linearGradient>
                  <linearGradient id={`glassC-${activeModel.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={activeModel.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.1)" />
                  </linearGradient>
                  <filter id="cGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <ellipse cx="300" cy="228" rx="260" ry="18" fill={`${activeModel.color}15`} />
                {/* Body */}
                <path d="M 60 185 Q 70 168 110 160 L 210 128 Q 265 94 320 90 L 400 90 Q 468 90 500 125 L 545 148 Q 572 158 578 178 L 582 192 L 60 192 Z"
                  fill={`url(#bodyC-${activeModel.id})`} stroke={`${activeModel.color}25`} strokeWidth="1" />
                {/* Lower */}
                <path d="M 75 192 L 580 192 L 580 208 Q 570 218 540 220 L 100 220 Q 77 217 75 208 Z" fill="#090913" />
                {/* Windshield */}
                <path d="M 205 130 L 260 95 L 380 95 L 415 130 Z" fill={`url(#glassC-${activeModel.id})`} stroke={`${activeModel.color}50`} strokeWidth="1" />
                {/* Rear glass */}
                <path d="M 418 130 L 450 100 L 498 115 L 518 130 Z" fill={`url(#glassC-${activeModel.id})`} stroke={`${activeModel.color}35`} strokeWidth="0.8" opacity="0.7" />
                {/* Headlights */}
                <g filter="url(#cGlow)">
                  <path d="M 88 174 L 118 170 L 120 183 L 85 184 Z" fill={activeModel.color} opacity="0.85" />
                  <rect x="91" y="177" width="26" height="2" rx="1" fill={activeModel.color} />
                </g>
                {/* Taillights */}
                <g filter="url(#cGlow)">
                  <path d="M 553 170 L 578 178 L 574 190 L 550 185 Z" fill={activeModel.id === 'ev1' ? '#34d399' : '#ff3d5e'} opacity="0.85" />
                </g>
                {/* Door line */}
                <line x1="210" y1="162" x2="490" y2="162" stroke={`${activeModel.color}40`} strokeWidth="1" />
                {/* Wheels */}
                {[165, 455].map((cx, i) => (
                  <g key={i}>
                    <circle cx={cx} cy="218" r="38" fill="#0f0f1e" stroke={`${activeModel.color}40`} strokeWidth="1.5" />
                    <circle cx={cx} cy="218" r="32" fill="none" stroke={`${activeModel.color}15`} strokeWidth="1" />
                    <circle cx={cx} cy="218" r="22" fill="#0a0a14" stroke="rgba(192,200,216,0.2)" strokeWidth="1" />
                    {[0, 60, 120, 180, 240, 300].map(a => (
                      <line key={a}
                        x1={cx + 9 * Math.cos(a * Math.PI / 180)} y1={218 + 9 * Math.sin(a * Math.PI / 180)}
                        x2={cx + 30 * Math.cos(a * Math.PI / 180)} y2={218 + 30 * Math.sin(a * Math.PI / 180)}
                        stroke="rgba(192,200,216,0.5)" strokeWidth="2" strokeLinecap="round" />
                    ))}
                    <circle cx={cx} cy="218" r="6" fill={activeModel.color} opacity="0.7" filter="url(#cGlow)" />
                    <circle cx={cx} cy="218" r="3" fill="#00e5ff" />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Price */}
            <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ color: 'rgba(192,200,216,0.4)', fontFamily: 'Outfit', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Starting From</span>
              <div style={{
                fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '2.2rem',
                background: `linear-gradient(135deg, #f0f4ff, ${activeModel.color})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                marginTop: '0.2rem',
              }}>{activeModel.price}</div>
            </div>

            {/* Specs grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {Object.entries(activeModel.specs).map(([key, val]) => (
                <div key={key} style={{
                  padding: '1rem 1.2rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px',
                }}>
                  <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1.4rem', color: activeModel.color }}>{val}</div>
                  <div style={{ color: 'rgba(192,200,216,0.45)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2px' }}>
                    {{ power: 'Max Power', speed: 'Top Speed', accel: '0–100 km/h', range: 'EV Range' }[key]}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: 'rgba(192,200,216,0.5)', fontFamily: 'Space Grotesk', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              {activeModel.desc}
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <motion.a href="#" className="btn-primary" whileHover={{ scale: 1.04 }} style={{ background: `linear-gradient(135deg, ${activeModel.color}, #7c3aed)` }}>
                Configure Now
              </motion.a>
              <motion.a href="#" className="btn-outline" whileHover={{ scale: 1.04 }}>
                Request Info
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
