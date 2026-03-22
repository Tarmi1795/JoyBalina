import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── 3D Card Component ── */
function Card3D({ title, subtitle, accent, stats, icon, delay, imageUrl }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        cursor: 'pointer',
        flex: '1',
        minWidth: '300px',
        maxWidth: '400px',
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '480px',
          background: '#0f0f18',
          border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.08)'}`,
          boxShadow: hovered
            ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${accent}50, inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'border-color 0.3s, box-shadow 0.4s',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: 0
        }} />

        {/* Dynamic Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: hovered 
            ? 'linear-gradient(to bottom, rgba(6,6,8,0.2) 0%, rgba(6,6,8,0.4) 40%, rgba(6,6,8,0.95) 100%)'
            : 'linear-gradient(to bottom, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.6) 50%, rgba(6,6,8,0.9) 100%)',
          transition: 'background 0.4s ease',
          zIndex: 1
        }} />

        {/* Content Layer (Preserve 3D) */}
        <div style={{ 
          position: 'relative',
          padding: '2.5rem', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          zIndex: 2,
          transform: 'translateZ(40px)'
        }}>
          {/* Top Icon */}
          <div style={{
            position: 'absolute',
            top: '2.5rem',
            left: '2.5rem',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hovered ? 'translateZ(20px)' : 'translateZ(0px)',
            transition: 'transform 0.4s'
          }}>
            {icon}
          </div>

          <div style={{ transform: 'translateZ(30px)' }}>
            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.2rem' }}>
              {stats.map(({ val, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    color: accent,
                    lineHeight: 1,
                    textShadow: `0 0 20px ${accent}60`
                  }}>{val}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>

            <h3 style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700,
              fontSize: '2rem',
              letterSpacing: '0.05em',
              color: '#ffffff',
              marginBottom: '0.5rem',
            }}>{title}</h3>

            <p style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '0.88rem', 
              lineHeight: 1.6, 
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: '1rem'
            }}>{subtitle}</p>

            {/* Explore Link */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: accent,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
            }}>
              Discover Detail
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Global Shimmer Highlight */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: hovered ? '100%' : '-100%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.06), transparent)',
          transition: hovered ? 'left 1s ease' : 'none',
          pointerEvents: 'none',
          zIndex: 3
        }} />
      </motion.div>
    </motion.div>
  );
}

const cards = [
  {
    title: 'Performance',
    subtitle: 'Track-ready dynamics paired with electric instant torque for extreme precision.',
    accent: '#4fc3f7',
    imageUrl: 'https://i1.autocango.com/admin/news/45492475cdea43f2b95e530018a61786.webp',
    stats: [{ val: '1080', label: 'HP' }, { val: '2.4s', label: '0–100' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    delay: 0.1,
  },
  {
    title: 'Interior',
    subtitle: 'A high-fidelity cockpit using sustainable materials and artisan craftsmanship.',
    accent: '#c084fc',
    imageUrl: 'https://www.geely.com/-/media/project/web-portal/2024/news/yinhe-e8-muse-award/muse-yinhe-e8-interior.jpg',
    stats: [{ val: '45"', label: '8K OLED' }, { val: 'Hi-Fi', label: 'Audio' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M1 12h4M19 12h4" /></svg>,
    delay: 0.15,
  },
  {
    title: 'Technology',
    subtitle: 'Level 4 autonomous capability powered by real-time neural processing.',
    accent: '#00e5ff',
    imageUrl: 'https://static-oss.icartea.com/article/content/608fc08c6cbdc58e872b84b3db0b7cfd.jpg?x-oss-process=image/format,webp/interlace,1/quality,q_60/resize,w_1200',
    stats: [{ val: 'LiDAR', label: 'Vision' }, { val: 'OTA', label: 'Ready' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00e5ff" strokeWidth="2"><rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" /><rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" /></svg>,
    delay: 0.2,
  },
  {
    title: 'Aerodynamics',
    subtitle: 'Active morphing surfaces designed for minimum drag and absolute stability.',
    accent: '#fb7185',
    imageUrl: 'https://media.ford.com/content/fordmedia/feu/en/news/2023/09/14/mustang-gtd-has-an-aerodynamic-advantage-most-race-cars-dont-to-/jcr:content/image.img.881.495.jpg/1694685777476.jpg',
    stats: [{ val: '0.19', label: 'Cd' }, { val: '+340', label: 'kg Down' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="2"><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
    delay: 0.25,
  },
  {
    title: 'Powertrain',
    subtitle: 'Thor PHEV architecture delivering ultra-long range and pure electric thrust.',
    accent: '#f0c040',
    imageUrl: 'https://carsofmalaysia.com/wp-content/uploads/2024/09/Geely-Thor-PHEV-1.jpg',
    stats: [{ val: '1300', label: 'KM Range' }, { val: 'Thor', label: 'PHEV' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0c040" strokeWidth="2"><path d="M12 2v20M2 12h20" /></svg>,
    delay: 0.3,
  },
  {
    title: 'Connectivity',
    subtitle: 'Direct-to-satellite linking ensuring zero latency globally.',
    accent: '#34d399',
    imageUrl: 'https://st.arenaev.com/news/24/02/geely-launched-second-batch-of-highly-precise-positioning-satellites/-828x414/arenaev_001.jpg',
    stats: [{ val: 'Sat-Link', label: 'Global' }, { val: '6G', label: 'Speed' }],
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 014 10" /></svg>,
    delay: 0.35,
  },
];

export default function CardGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="models" style={{ padding: '10rem 0', position: 'relative', overflow: 'hidden', background: '#060608' }}>
      {/* Background Decor */}
      <div className="ambient-blob" style={{ width: '800px', height: '800px', top: '-300px', right: '-100px', background: 'rgba(79,195,247,0.03)', pointerEvents: 'none' }} />
      
      <div className="section-container">
        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #4fc3f7)' }} />
            <span style={{ color: '#4fc3f7', fontFamily: 'Outfit', fontSize: '0.75rem', letterSpacing: '0.5em', textTransform: 'uppercase', fontWeight: 600 }}>Signature Series</span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #4fc3f7, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: '#ffffff',
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
            lineHeight: 1
          }}>GEELY <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>SIGNATURE</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            A fusion of avant-garde design and pioneering technology. Witness the next evolution in automotive craftsmanship.
          </p>
        </motion.div>

        {/* Improved Mosaic Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
          gap: '2.5rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {cards.map((card) => (
            <Card3D key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
