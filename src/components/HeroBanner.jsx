// src/components/HeroBanner.jsx

export default function HeroBanner() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '350px', // Makes it a massive, imposing header
      backgroundImage: `
        linear-gradient(to bottom, rgba(10, 31, 20, 0.4), rgba(10, 31, 20, 0.95)), 
        url('/banner-bg.jpg')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '4px solid #ccff00', // Neon accent line
      marginBottom: '40px',
      overflow: 'hidden'
    }}>
      
      {/* The Main Title */}
      <h1 style={{
        fontFamily: '"Impact", "Teko", sans-serif',
        fontSize: '84px',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '4px',
        color: '#ffffff',
        textShadow: '0px 0px 20px rgba(204, 255, 0, 0.6), 4px 4px 0px #000000',
        zIndex: 2
      }}>
        World Cup <span style={{ color: '#ccff00' }}>Willy</span>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '20px',
        letterSpacing: '8px',
        color: '#ffffff',
        textTransform: 'uppercase',
        margin: '10px 0 0 0',
        opacity: 0.8,
        zIndex: 2
      }}>
        Official Draft Tracker '26
      </p>

    </div>
  );
}
