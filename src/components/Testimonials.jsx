import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote: "The GT-X is the closest thing to teleportation I've ever experienced. Geely didn't build a car — they built an obsession.",
    name: "Alessandro M.",
    title: "Professional Racing Driver",
    initials: "AM",
    color: "#4fc3f7",
  },
  {
    quote: "Every surface, every material — the craftsmanship is surgical. Sitting in an Geely is like wearing a bespoke suit at 300 km/h.",
    name: "Sofia Chen",
    title: "Automotive Journalist, Top Gear",
    initials: "SC",
    color: "#c084fc",
  },
  {
    quote: "The EV-1 destroyed every expectation I had about electric performance. The silence before the storm is utterly terrifying.",
    name: "Marcus Hartmann",
    title: "CEO, TechMotion Group",
    initials: "MH",
    color: "#34d399",
  },
];

function TestimonialCard({ quote, name, title, initials, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: '1',
        minWidth: '280px',
        maxWidth: '380px',
        padding: '2.5rem',
        borderRadius: '16px',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px', background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }} />

      {/* Quote mark */}
      <div style={{ fontFamily: 'Rajdhani', fontSize: '5rem', lineHeight: 0.6, color: `${color}20`, marginBottom: '1.5rem', fontWeight: 700 }}>"</div>

      <p style={{
        color: 'rgba(240,244,255,0.75)',
        fontFamily: 'Space Grotesk',
        fontSize: '0.92rem',
        lineHeight: 1.8,
        fontStyle: 'italic',
        marginBottom: '2rem',
      }}>{quote}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Avatar */}
        <div style={{
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          border: `1px solid ${color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem',
          color,
          flexShrink: 0,
        }}>{initials}</div>
        <div>
          <div style={{ color: '#f0f4ff', fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.88rem' }}>{name}</div>
          <div style={{ color: 'rgba(192,200,216,0.45)', fontFamily: 'Outfit', fontSize: '0.72rem', letterSpacing: '0.05em' }}>{title}</div>
        </div>
      </div>

      {/* Bottom right star rating */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '3px' }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={color} opacity="0.8">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="interior" style={{
      padding: '8rem 0',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0a12 0%, #060608 100%)',
    }}>
      <div className="ambient-blob" style={{ width: '600px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(124,58,237,0.04)', pointerEvents: 'none' }} />

      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, #c084fc)' }} />
            <span style={{ color: '#c084fc', fontFamily: 'Outfit', fontSize: '0.72rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Voices of Excellence</span>
            <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #c084fc, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani', fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            background: 'linear-gradient(135deg, #f0f4ff 30%, #c084fc 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            letterSpacing: '0.03em',
          }}>WHAT THEY SAY</h2>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {testimonials.map((t, i) => <TestimonialCard key={t.name} {...t} index={i} />)}
        </div>
      </div>
    </section>
  );
}
