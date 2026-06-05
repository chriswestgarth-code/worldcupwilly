import AdminPanel from './components/AdminPanel';
import Leaderboard from './components/Leaderboard';
import SeedButton from './components/SeedButton';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a1f14', // Deep Stadium Green
      padding: '40px 20px',
      color: 'white'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontFamily: '"Impact", sans-serif', 
            fontSize: '54px', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#ccff00' // Neon Accent
          }}>
            World Cup Draft '26
          </h1>
          <p style={{ margin: '10px 0', fontSize: '18px', letterSpacing: '4px', opacity: 0.7 }}>
            OFFICIAL LEADERBOARD
          </p>
        </header>

        <SeedButton /> {/* Drop it right here */}
        
        <Leaderboard />
        
        <AdminPanel />
      </div>
    </div>
  );
}

export default App;