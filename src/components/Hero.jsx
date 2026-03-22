import { useRef, useEffect, useState, useCallback } from 'react';

const FRAME_COUNT = 100;
const IMAGE_PATH = 'Car_disassembly_frames/frame_';

function AnimatedStat({ value, suffix = '', label, delay = 0, isInView }) {
  const [displayVal, setDisplayVal] = useState(0);
  const numericVal = parseFloat(value);
  const ref = useRef(null);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayVal(eased * numericVal);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => requestAnimationFrame(animate), delay);
    return () => clearTimeout(timeoutId);
  }, [isInView, numericVal, delay]);

  const isDecimal = String(value).includes('.');
  const formatted = isDecimal ? displayVal.toFixed(1) : Math.round(displayVal);

  return (
    <div className="animated-stat" ref={ref}>
      <div className="animated-stat-value">
        {formatted}{suffix}
      </div>
      <div className="animated-stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const currentFrameRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = `${IMAGE_PATH}${num}.png`;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          setAllLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetX = 0;
      offsetY = (rect.height - drawHeight) / 2;
    } else {
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      offsetX = (rect.width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    if (!allLoaded) return;
    drawFrame(0);

    let rafId;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const container = containerRef.current;
        const sticky = stickyRef.current;
        if (!container || !sticky) return;

        const rect = container.getBoundingClientRect();
        const scrollableHeight = rect.height - sticky.offsetHeight;

        const scrollTop = -rect.top;
        const rawProgress = scrollTop / scrollableHeight;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        setProgress(clampedProgress);

        const frameIndex = Math.min(Math.floor(clampedProgress * FRAME_COUNT), FRAME_COUNT - 1);

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [allLoaded, drawFrame]);

  useEffect(() => {
    if (!allLoaded) return;
    const render = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [allLoaded, drawFrame]);

  const getSectionStyle = (start, end) => {
    if (progress <= start) return { opacity: 0, transform: 'translateY(40px)', pointerEvents: 'none', transition: 'none' };
    if (progress >= end) return { opacity: 0, transform: 'translateY(-40px)', pointerEvents: 'none', transition: 'none' };

    const duration = end - start;
    const current = progress - start;
    const localRatio = current / duration;

    let opacity = 1;
    let transform = 'translateY(0)';

    if (localRatio < 0.2) {
      opacity = localRatio / 0.2;
      transform = `translateY(calc(-50% + ${40 - (localRatio / 0.2) * 40}px))`;
    } else if (localRatio > 0.8) {
      opacity = (1 - localRatio) / 0.2;
      transform = `translateY(calc(-50% - ${(localRatio - 0.8) / 0.2 * 40}px))`;
    } else {
      transform = 'translateY(-50%)';
    }

    // Use slightly smoother transform dynamically here
    return { opacity, transform, pointerEvents: opacity > 0.5 ? 'auto' : 'none' };
  };

  const getHeroIntroStyle = () => {
    const fadeOutEnd = 0.15;
    if (progress >= fadeOutEnd) return { opacity: 0, transform: 'translate(-50%, -100%)', pointerEvents: 'none' };

    const localRatio = progress / fadeOutEnd;
    const opacity = 1 - localRatio;
    const translateY = -50 - (localRatio * 20); // Moves from center upward slightly

    return {
      opacity,
      transform: `translate(-50%, ${translateY}%)`,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none'
    };
  };

  return (
    <section ref={containerRef} className="disassembly-section" id="hero" style={{ height: '500vh', margin: 0 }}>
      {/* Background grid from original hero */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04 }}>
        <svg style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4fc3f7" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div ref={stickyRef} className="disassembly-sticky-wrapper">
        <canvas ref={canvasRef} className="disassembly-canvas" />
        <div className="disassembly-overlay-vignette" />

        {/* HERO INTRO */}
        <div className="hero-intro-text" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          textAlign: 'center',
          zIndex: 10,
          ...getHeroIntroStyle()
        }}>
          <div className="hero-pretitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #4fc3f7)' }} />
            <span style={{ color: '#4fc3f7', fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 500 }}>
              2026 Collection
            </span>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #4fc3f7, transparent)' }} />
          </div>

          <h1 className="hero-headline" style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: 'clamp(3.5rem, 9vw, 8rem)',
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #f0f4ff 0%, #c0c8d8 40%, #00e5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}>Geely</span>
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #4fc3f7 50%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
              filter: 'drop-shadow(0 0 40px rgba(79,195,247,0.3))',
            }}>by Joy Balina</span>
          </h1>

          <p className="hero-subtext" style={{
            color: 'rgba(192,200,216,0.65)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 300,
            letterSpacing: '0.03em',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}>
            Engineering perfection at every curve. JB Motorsport redefines what it means to command the road. Scroll to deconstruct.
          </p>

          <div className="scroll-indicator" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'rgba(192,200,216,0.35)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginTop: '3rem',
          }}>
            <span>Scroll Down</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* OVERLAYS */}
        <div className="disassembly-overlay-card overlay-left" style={getSectionStyle(0.20, 0.45)}>
          <div className="section-tag">01 — Engineering</div>
          <h2 className="section-title">Deconstructed<br /><span className="gradient-text">Perfection</span></h2>
          <p className="section-desc">Every component engineered to deliver an unparalleled driving experience. Scope how 4,217 precision parts come together.</p>
        </div>

        <div className="disassembly-overlay-card overlay-right" style={getSectionStyle(0.45, 0.70)}>
          <div className="section-tag">02 — Performance</div>
          <h2 className="section-title">Raw <span className="gradient-text">Power</span></h2>
          <div className="stats-grid" style={{ marginTop: '2rem' }}>
            <AnimatedStat value="2.4" suffix="s" label="0–100 km/h" delay={0} isInView={progress > 0.40} />
            <AnimatedStat value="1080" suffix="" label="Horsepower" delay={150} isInView={progress > 0.40} />
            <AnimatedStat value="340" suffix="" label="km/h Vmax" delay={300} isInView={progress > 0.40} />
            <AnimatedStat value="4" suffix="WD" label="Torque Vector" delay={450} isInView={progress > 0.40} />
          </div>
        </div>

        <div className="disassembly-overlay-card overlay-left" style={getSectionStyle(0.70, 0.99)}>
          <div className="section-tag">03 — Chassis</div>
          <h2 className="section-title">Carbon Fiber<br /><span className="gradient-text">Monocoque</span></h2>
          <p className="section-desc">A lightweight yet incredibly rigid T800 carbon fiber piece forms the backbone of the JB. Weighing just 142kg.</p>
        </div>

        {!allLoaded && (
          <div className="canvas-loader">
            <div className="canvas-loader-inner">
              <div className="canvas-loader-brand" style={{ fontFamily: 'Rajdhani', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '0.3em', background: 'linear-gradient(135deg, #f0f4ff, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>JB</div>
              <div className="canvas-loader-sub" style={{ color: 'rgba(192,200,216,0.3)', fontSize: '0.6rem', letterSpacing: '0.5em', margin: '0.5rem 0 2rem' }}>MOTORS</div>
              <div className="canvas-loader-bar-wrap" style={{ width: '200px' }}>
                <div className="canvas-loader-bar-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', margin: '0 0 0.5rem 0', color: 'rgba(192,200,216,0.5)' }}>
                  <span>Loading Cinematic Header</span>
                  <span className="canvas-loader-percent" style={{ color: '#4fc3f7' }}>{loadProgress}%</span>
                </div>
                <div className="canvas-loader-bar-track" style={{ height: '2px', background: 'rgba(255,255,255,0.1)' }}>
                  <div className="canvas-loader-bar-fill" style={{ height: '100%', width: `${loadProgress}%`, background: '#4fc3f7' }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
