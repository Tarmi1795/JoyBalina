import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function useTypewriter(words, speed = 80, pause = 2500) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    let timer;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timer = setTimeout(() => setText(currentWord.substring(0, text.length - 1)), speed / 2);
      }
    } else {
      if (text === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      } else {
        timer = setTimeout(() => setText(currentWord.substring(0, text.length + 1)), speed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

export function AnimatedInput({ label, type = "text", placeholders = [] }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const placeholderText = useTypewriter(placeholders);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative' }}>
      <label style={{
        color: focused ? '#4fc3f7' : 'rgba(255,255,255,0.7)',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        transition: 'color 0.3s ease'
      }}>
        {label}
      </label>
      
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? '' : placeholderText}
          style={{
            background: focused ? 'rgba(79,195,247,0.05)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${focused ? 'rgba(79,195,247,0.4)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: focused ? '0 0 15px rgba(79,195,247,0.1)' : 'none',
            color: '#fff',
            padding: '1.2rem',
            borderRadius: '8px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.4s ease',
            width: '100%'
          }}
        />
        {/* Animated bottom border glow */}
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #4fc3f7, transparent)',
                borderRadius: '0 0 8px 8px'
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function AnimatedTextarea({ label, placeholders = [] }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const placeholderText = useTypewriter(placeholders);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative' }}>
      <label style={{
        color: focused ? '#7c3aed' : 'rgba(255,255,255,0.7)',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: 600,
        transition: 'color 0.3s ease'
      }}>
        {label}
      </label>
      
      <div style={{ position: 'relative' }}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? '' : placeholderText}
          style={{
            background: focused ? 'rgba(124,58,237,0.05)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${focused ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: focused ? '0 0 15px rgba(124,58,237,0.1)' : 'none',
            color: '#fff',
            padding: '1.2rem',
            borderRadius: '8px',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.4s ease',
            width: '100%',
            minHeight: '180px',
            resize: 'vertical'
          }}
        />
        <AnimatePresence>
          {focused && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: 'absolute',
                bottom: '4px',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
                borderRadius: '0 0 8px 8px'
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
