import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Signature Series', href: '#models' },
  { label: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`immersive-nav ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '1rem 4rem' : '2.5rem 4rem',
        transition: 'padding 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        background: scrolled ? 'rgba(6, 6, 8, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
      }}
    >
      {/* Dynamic Sleek Logo */}
      <a href="#hero" style={{ textDecoration: 'none' }} className="nav-logo">
        <Logo width={42} showText />
      </a>

      {/* Interactive Links Container */}
      <div 
        className="nav-links" 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActive(null)}
        style={{
          display: 'flex',
          gap: '2.5rem',
          position: 'relative',
          padding: '0.8rem 1.5rem',
          borderRadius: '100px',
          background: scrolled ? 'rgba(255,255,255,0.02)' : 'transparent',
          border: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
          overflow: 'hidden'
        }}
      >
        {/* Glow Hover effect (follows mouse inside links container) */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: mousePos.y - 40,
                left: mousePos.x - 40,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle at center, rgba(79,195,247,0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
                filter: 'blur(8px)',
                zIndex: 0
              }}
            />
          )}
        </AnimatePresence>

        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onMouseEnter={() => setActive(label)}
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: active === label ? '#4fc3f7' : 'rgba(192,200,216,0.7)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 1
            }}
          >
            {label}
            {active === label && (
              <motion.div
                layoutId="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #4fc3f7, transparent)',
                }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </a>
        ))}
      </div>

      {/* Interactive CTA Button */}
      <motion.a 
        href="#book-drive"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: '0.8rem 2rem',
          background: 'linear-gradient(135deg, rgba(79,195,247,0.1) 0%, rgba(124,58,237,0.1) 100%)',
          border: '1px solid rgba(79,195,247,0.3)',
          borderRadius: '4px',
          color: '#fff',
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          fontSize: '0.9rem',
          textDecoration: 'none',
          boxShadow: '0 0 20px rgba(79,195,247,0.1)',
          transition: 'box-shadow 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.boxShadow = '0 0 30px rgba(79,195,247,0.3)'}
        onMouseLeave={(e) => e.target.style.boxShadow = '0 0 20px rgba(79,195,247,0.1)'}
      >
        Book a Drive
      </motion.a>
    </motion.nav>
  );
}
