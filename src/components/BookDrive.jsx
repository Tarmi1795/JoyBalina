import { motion } from 'framer-motion';
import { AnimatedInput } from './AnimatedInput';

export default function BookDrive() {
  return (
    <section id="book-drive" style={{ padding: '8rem 0', background: 'linear-gradient(180deg, #0a0a0f 0%, #060608 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="ambient-blob" style={{ width: '600px', height: '600px', top: '10%', right: '-10%', background: 'rgba(79,195,247,0.05)', pointerEvents: 'none' }} />
      <div className="ambient-blob" style={{ width: '400px', height: '400px', bottom: '10%', left: '-5%', background: 'rgba(124,58,237,0.04)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ maxWidth: '1000px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, #4fc3f7)' }} />
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ color: '#4fc3f7', fontFamily: 'Outfit', fontSize: '0.75rem', textTransform: 'uppercase' }}
            >
              Experience It
            </motion.span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, #4fc3f7, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: '1rem'
          }}>Book Your <span className="gradient-text">Drive</span></h2>
          <p style={{ color: 'rgba(192,200,216,0.55)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            Schedule an exclusive, uninterrupted test drive at a location near you with an expert specialist.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(15,15,24,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '4rem',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
        >
          <form style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
            {/* Input Groups */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.1 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={labelStyle}>Select Model</label>
              <select style={{ ...inputStyle, appearance: 'none' }}>
                <option value="jb-gtx">JB GT-X Performance</option>
                <option value="jb-ev1">JB EV-1 Electric</option>
                <option value="jb-rst">JB RST Hyper</option>
              </select>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={labelStyle}>Preferred Location</label>
              <select style={{ ...inputStyle, appearance: 'none' }}>
                <option value="ny">New York Showroom</option>
                <option value="la">Los Angeles Center</option>
                <option value="mia">Miami Specialist Center</option>
                <option value="other">Other (Contact Me)</option>
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={labelStyle}>Preferred Date</label>
              <input type="date" style={inputStyle} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.4 }}>
              <AnimatedInput 
                label="Full Name" 
                type="text" 
                placeholders={['Julian Vance', 'Sophia Laurent', 'Bruce Wayne']} 
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.5 }}>
              <AnimatedInput 
                label="Email Address" 
                type="email" 
                placeholders={['julian@jbmotors.com', 'sophia@motors.io', 'concierge@apex.dev']} 
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.6 }}>
              <AnimatedInput 
                label="Phone Number" 
                type="tel" 
                placeholders={['+1 (800) JB-SPEED', '+44 20 7946 0958', '+81 90-1234-5678']} 
              />
            </motion.div>
            
            {/* Full width submit */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.7 }} style={{ gridColumn: '1 / -1', marginTop: '2rem' }}>
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(79,195,247,0.3)' }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem' }}>
                Confirm Reservation Request
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

const labelStyle = {
  color: 'rgba(255,255,255,0.7)', 
  fontSize: '0.8rem', 
  letterSpacing: '0.1em', 
  textTransform: 'uppercase',
  fontFamily: 'Outfit, sans-serif',
  fontWeight: 600
};

const inputStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  padding: '1.2rem',
  borderRadius: '8px',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s, background 0.3s',
  width: '100%',
  cursor: 'pointer'
};
