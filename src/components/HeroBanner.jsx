// src/components/HeroBanner.jsx
export default function HeroBanner() {
  return (
    <div style={{
      textAlign: 'center', // Center everything
      marginBottom: '40px'
    }}>
      {/* 1. Contained, responsive image */}
      <div style={{
        maxWidth: '1200px', // Limits width on massive desktop screens
        margin: '0 auto', // Centers the container
        padding: '0 20px', // Space on sides for mobile
        overflow: 'hidden',
        borderRadius: '12px', // Add slight radius for premium look
        borderBottom: '4px solid #ccff00', // Neon accent line
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)' // Add depth
      }}>
        <img 
          src="/banner-bg.jpg" // Accesses the image from your public folder
          alt="World Cup Classic Moments Banner"
          style={{
            width: '100%', // Makes it fluid/responsive
            height: 'auto', // Maintains aspect ratio
            display: 'block' // Removes weird whitespace below images
          }}
        />
      </div>

      {/* 2. New, clean, non-overlaid title below */}
      <h1 style={{
        fontFamily: '"Impact", "Teko", sans-serif',
        fontSize: '64px', // Slightly smaller for better balance
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: '#ffffff',
        marginTop: '20px', // Space below the image
        marginBottom: '5px',
        textShadow: '0 0 20px rgba(204, 255, 0, 0.4)' // Soft neon glow
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
