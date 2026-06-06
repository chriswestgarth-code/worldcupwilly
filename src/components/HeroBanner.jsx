// src/components/HeroBanner.jsx

export default function HeroBanner() {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        overflow: 'hidden',
        borderRadius: '12px',
        borderBottom: '4px solid #ccff00',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }}>
        <img 
          src="/banner-bg.jpg"
          alt="World Cup Classic Moments Banner"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>

      <h1 style={{
        fontFamily: '"Impact", "Teko", sans-serif',
        fontSize: 'clamp(48px, 10vw, 64px)', 
        lineHeight: '1.1',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: '#ffffff',
        marginTop: '20px',
        marginBottom: '5px',
        textShadow: '0 0 20px rgba(204, 255, 0, 0.4)'
      }}>
        World Cup <span style={{ color: '#ccff00' }}>Willy</span>
      </h1>
      <p style={{
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '18px',
        letterSpacing: '6px',
        color: '#ffffff',
        textTransform: 'uppercase',
        margin: '0',
        opacity: 0.8
      }}>
        Official Draft Tracker '26
      </p>
    </div>
  );
}
