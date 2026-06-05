import AdminPanel from './components/AdminPanel';
import Leaderboard from './components/Leaderboard';
import HeroBanner from './components/HeroBanner';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a1f14', 
      paddingBottom: '40px', 
      color: 'white'
    }}>
      
      <HeroBanner />
      
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
        <Leaderboard />
        <AdminPanel />
      </div>
      
    </div>
  );
}

export default App;
