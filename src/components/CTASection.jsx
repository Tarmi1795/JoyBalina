import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="configure" ref={ref} style={{
      padding: '8rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#060608',
      textAlign: 'center',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Radial burst */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: '900px', height: '900px',
          background: 'radial-gradient(ellipse, rgba(79,195,247,0.07) 0%, rgba(124,58,237,0.05) 30%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Concentric rings */}
        <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, width: '800px', height: '800px' }} viewBox="0 0 800 800">
          {[100, 180, 260, 340, 380].map(r => (
            <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#4fc3f7" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #4fc3f7)' }} />
            <span style={{ color: '#4fc3f7', fontFamily: 'Outfit', fontSize: '0.72rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Begin Your Journey</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #4fc3f7, transparent)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Rajdhani', fontWeight: 700,
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
          }}>
            <span style={{ color: '#f0f4ff', display: 'block' }}>CLAIM YOUR</span>
            <span style={{
              background: 'linear-gradient(135deg, #4fc3f7 0%, #7c3aed 50%, #00e5ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'block',
              filter: 'drop-shadow(0 0 30px rgba(79,195,247,0.3))',
            }}>Geely</span>
          </h2>

          <p style={{
            color: 'rgba(192,200,216,0.55)', fontFamily: 'Space Grotesk',
            fontSize: '1.05rem', lineHeight: 1.8,
            maxWidth: '520px', margin: '0 auto 3rem',
          }}>
            Only 48 units of the Geely GT-X are allocated per year. Configure yours and secure your place in automotive history.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ fontSize: '1rem', padding: '1rem 2.8rem' }}>
              Configure My Geely
            </motion.button>
            <motion.button className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ fontSize: '1rem', padding: '1rem 2.8rem' }}>
              Book a Private Showing
            </motion.button>
          </div>

          {/* Dealership info row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { icon: '📍', label: 'Showrooms', val: '14 Global' },
              { icon: '🚗', label: 'Test Drives', val: 'By Appointment' },
              { icon: '🏆', label: 'Delivery', val: 'White Glove' },
            ].map(({ icon, label, val }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{icon}</div>
                <div style={{ color: '#f0f4ff', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.88rem' }}>{val}</div>
                <div style={{ color: 'rgba(192,200,216,0.35)', fontFamily: 'Outfit', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
