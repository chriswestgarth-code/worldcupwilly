import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Leaderboard() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamsData = snapshot.docs.map(doc => doc.data());
      
      // 1. Group by Owner and Calculate Points
      const ownerMap = {};
      
      teamsData.forEach(team => {
        // Run your scoring system
        const pts = (team.wins * 3) + (team.ties * 1) + (team.cleanSheets * 1) - (team.redCards * 1);
        
        if (!ownerMap[team.owner]) {
          ownerMap[team.owner] = { 
            name: team.owner, 
            totalPoints: 0, 
            roster: [] 
          };
        }
        
        ownerMap[team.owner].totalPoints += pts;
        ownerMap[team.owner].roster.push(team.name);
      });

      // 2. Convert to Array and Sort by Points
      const sortedOwners = Object.values(ownerMap).sort((a, b) => b.totalPoints - a.totalPoints);
      
      setOwners(sortedOwners);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Visual Setup for the top 3
  const getRankStyle = (index) => {
    if (index === 0) return { bg: '#FFD700', color: 'black', icon: '🏆' }; // Gold
    if (index === 1) return { bg: '#C0C0C0', color: 'black', icon: '🥈' }; // Silver
    if (index === 2) return { bg: '#CD7F32', color: 'white', icon: '🥄' }; // Bronze Spoon
    return { bg: '#2a2a2a', color: 'white', icon: '' }; // Everyone else
  };

  if (loading) return <h2 style={{ color: 'white', textAlign: 'center' }}>Loading Pitch...</h2>;

  return (
    <div style={{ fontFamily: '"Montserrat", sans-serif' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {owners.map((owner, index) => {
          const rank = getRankStyle(index);
          
          return (
            <div key={owner.name} style={{ 
              background: rank.bg, 
              color: rank.color,
              padding: '20px', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: '28px', textTransform: 'uppercase' }}>
                  {index + 1}. {owner.name} {rank.icon}
                </h2>
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: 0.8 }}>
                  {owner.roster.join(', ')}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '42px', fontWeight: '900' }}>{owner.totalPoints}</span>
                <span style={{ fontSize: '16px', display: 'block', textTransform: 'uppercase', letterSpacing: '2px' }}>PTS</span>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}