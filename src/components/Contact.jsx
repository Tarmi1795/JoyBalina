import { motion } from 'framer-motion';
import { AnimatedInput, AnimatedTextarea } from './AnimatedInput';

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '8rem 0 12rem', background: '#030305', position: 'relative', overflow: 'hidden' }}>
      <div className="ambient-blob" style={{ width: '800px', height: '800px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="section-container" style={{ maxWidth: '800px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, #7c3aed)' }} />
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ color: '#c084fc', fontFamily: 'Outfit', fontSize: '0.75rem', textTransform: 'uppercase' }}
            >
              Get in Touch
            </motion.span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, #7c3aed, transparent)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: '#fff',
            letterSpacing: '0.02em',
            marginBottom: '1rem'
          }}>Contact <span style={{ background: 'linear-gradient(135deg, #c084fc, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>JB Motors</span></h2>
          <p style={{ color: 'rgba(192,200,216,0.55)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            Our concierges are available 24/7 to answer your inquiries and provide unparalleled service.
          </p>
        </motion.div>

        <div>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.1 }}>
                <AnimatedInput 
                  label="First Name" 
                  type="text" 
                  placeholders={['Julian', 'Sophia', 'Alexander']} 
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.2 }}>
                <AnimatedInput 
                  label="Last Name" 
                  type="text" 
                  placeholders={['Vance', 'Laurent', 'Pierce']} 
                />
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.3 }}>
              <AnimatedInput 
                label="Email Address" 
                type="email" 
                placeholders={['inquiry@jbmotors.com', 'press@motors.io', 'concierge@apex.dev']} 
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <label style={labelStyle}>Inquiry Type</label>
              <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="sales">Vehicle Sales</option>
                <option value="service">Service & Maintenance</option>
                <option value="pr">Press & Media</option>
                <option value="other">General Inquiry</option>
              </select>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.5 }}>
              <AnimatedTextarea 
                label="Your Message" 
                placeholders={[
                  'I am interested in acquiring the Signature Series GT-X...', 
                  'Could I schedule a private viewing at my estate?',
                  'I need to arrange service for my bespoke RST model...'
                ]} 
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: 0.6 }}>
              <motion.button 
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 15px 40px rgba(124,58,237,0.5)' }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                style={{
                  marginTop: '1rem',
                  padding: '1.2rem',
                  width: '100%',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #4fc3f7 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(124,58,237,0.3)',
                  transition: 'background 0.3s'
                }}
              >
                Send Message
              </motion.button>
            </motion.div>
          </form>
        </div>
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
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fff',
  padding: '1.2rem',
  borderRadius: '8px',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s, background 0.3s',
  width: '100%'
};
