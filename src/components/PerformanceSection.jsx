import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function StatBar({ label, value, pct, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ color: 'rgba(192,200,216,0.65)', fontFamily: 'Outfit', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
        <span style={{ color, fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '1rem' }}>{value}</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg, ${color}80, ${color})`, transformOrigin: 'left', borderRadius: '2px' }}
        />
      </div>
    </div>
  );
}

export default function PerformanceSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="performance" ref={ref} style={{
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #060608 100%)',
    }}>
      {/* Decorative lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <svg style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', opacity: 0.04, width: '50%', height: '100%' }} viewBox="0 0 500 600">
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="500" y1={i * 55} x2="0" y2={i * 55 + 80} stroke="#4fc3f7" strokeWidth="0.8" />
          ))}
        </svg>
      </div>

      <div className="section-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>

          {/* Left: Big number showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, #ff3d5e, transparent)' }} />
              <span style={{ color: '#ff3d5e', fontFamily: 'Outfit', fontSize: '0.72rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Performance DNA</span>
            </div>

            <h2 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
              letterSpacing: '0.03em',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              <span style={{ color: '#f0f4ff', display: 'block' }}>ENGINEERED FOR</span>
              <span style={{
                background: 'linear-gradient(135deg, #ff3d5e, #f0c040)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
              }}>SUPREMACY</span>
            </h2>

            <p style={{ color: 'rgba(192,200,216,0.55)', fontFamily: 'Space Grotesk', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '420px' }}>
              The Geely GT-X houses a hand-assembled twin-turbocharged V8 producing 1,080 horsepower.
              From a standstill to 340 km/h, feel the full weight of precision engineering.
            </p>

            {/* Stat bars */}
            <StatBar label="Power Output" value="1,080 HP" pct={90} color="#ff3d5e" delay={0.1} />
            <StatBar label="Peak Torque" value="1,250 Nm" pct={95} color="#f0c040" delay={0.2} />
            <StatBar label="Top Speed" value="340 km/h" pct={85} color="#4fc3f7" delay={0.3} />
            <StatBar label="Lateral G-Force" value="1.8G" pct={78} color="#c084fc" delay={0.4} />

            <motion.a
              href="#models"
              className="btn-primary"
              style={{ marginTop: '2rem', display: 'inline-flex', background: 'linear-gradient(135deg, #ff3d5e, #f0c040)' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Specifications
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: Big visual */}
          <motion.div style={{ y }} initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            {/* Large abstract engine / speedometer */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer ring */}
              <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: '440px' }}>
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff3d5e" />
                    <stop offset="100%" stopColor="#f0c040" />
                  </linearGradient>
                  <filter id="ringGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Outer decorative circles */}
                <circle cx="200" cy="200" r="175" stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="155" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />

                {/* Main gauge arc */}
                <path d="M 60 280 A 155 155 0 1 1 340 280" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="20" strokeLinecap="round" />
                <motion.path
                  d="M 60 280 A 155 155 0 1 1 340 280"
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 0.82 } : {}}
                  transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  filter="url(#ringGlow)"
                />

                {/* Inner ring */}
                <circle cx="200" cy="200" r="110" fill="rgba(10,10,20,0.6)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

                {/* Speed ticks */}
                {[...Array(20)].map((_, i) => {
                  const a = (-225 + i * (270 / 19)) * Math.PI / 180;
                  const r1 = 130, r2 = i % 5 === 0 ? 145 : 138;
                  return (
                    <line key={i}
                      x1={200 + r1 * Math.cos(a)} y1={200 + r1 * Math.sin(a)}
                      x2={200 + r2 * Math.cos(a)} y2={200 + r2 * Math.sin(a)}
                      stroke={i % 5 === 0 ? '#ff3d5e' : 'rgba(255,255,255,0.2)'}
                      strokeWidth={i % 5 === 0 ? 2.5 : 1}
                    />
                  );
                })}

                {/* Main display */}
                <text x="200" y="185" textAnchor="middle" fill="#f0f4ff" fontSize="56" fontFamily="Rajdhani" fontWeight="700">340</text>
                <text x="200" y="215" textAnchor="middle" fill="rgba(192,200,216,0.5)" fontSize="11" fontFamily="Outfit" letterSpacing="5">km/h</text>
                <text x="200" y="250" textAnchor="middle" fill="#ff3d5e" fontSize="14" fontFamily="Rajdhani" fontWeight="600" letterSpacing="2">VMAX</text>

                {/* Needle */}
                <motion.line
                  x1="200" y1="200"
                  x2="200"
                  y2="70"
                  stroke="#ff3d5e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ rotate: -135, originX: '200px', originY: '200px' }}
                  animate={inView ? { rotate: 90 } : { rotate: -135 }}
                  transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: '200px 200px' }}
                  filter="url(#ringGlow)"
                />
                <circle cx="200" cy="200" r="10" fill="#ff3d5e" filter="url(#ringGlow)" />
                <circle cx="200" cy="200" r="5" fill="#fff" />

                {/* Labels */}
                <text x="60" y="305" fill="rgba(192,200,216,0.4)" fontSize="10" fontFamily="Outfit" textAnchor="middle">0</text>
                <text x="340" y="305" fill="rgba(192,200,216,0.4)" fontSize="10" fontFamily="Outfit" textAnchor="middle">340</text>

                {/* Corner badges */}
                <g>
                  <rect x="155" y="295" width="90" height="28" rx="6" fill="rgba(255,61,94,0.12)" stroke="rgba(255,61,94,0.3)" strokeWidth="1" />
                  <text x="200" y="312" textAnchor="middle" fill="#ff3d5e" fontSize="10" fontFamily="Rajdhani" fontWeight="600" letterSpacing="2">Geely GT-X</text>
                </g>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
