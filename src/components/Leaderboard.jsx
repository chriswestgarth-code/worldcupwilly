// src/components/Leaderboard.jsx
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { flagMap } from '../data/flagMap';

export default function Leaderboard() {
  const [rankedOwners, setRankedOwners] = useState([]);

  useEffect(() => {
    // 1. Listen to the 48 teams in real-time
    const q = query(collection(db, 'teams'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allTeams = [];
      querySnapshot.forEach((doc) => {
        allTeams.push(doc.data());
      });

      // 2. Algorithm: Calculate owner points
      const ownerPoints = {};
      allTeams.forEach((team) => {
        const ownerName = team.owner || 'Unassigned';
        
        const totalPoints = 
          (team.wins * 3) + 
          (team.ties * 1) + 
          (team.cleanSheets * 1) - 
          (team.redCards * 1);

        if (!ownerPoints[ownerName]) {
          ownerPoints[ownerName] = { total: 0, roster: [] };
        }
        ownerPoints[ownerName].total += totalPoints;
        // Don't list 'Unassigned' teams on the leaderboard
        if (ownerName !== 'Unassigned') {
          ownerPoints[ownerName].roster.push(team.name);
        }
      });

      // 3. Convert to array and sort by points
      const sortedOwners = Object.entries(ownerPoints)
        .map(([name, data]) => ({
          name,
          total: data.total,
          roster: data.roster.sort() // Sort roster alphabetically
        }))
        // Hide "Unassigned" from the main display
        .filter(owner => owner.name !== 'Unassigned') 
        .sort((a, b) => b.total - a.total);

      setRankedOwners(sortedOwners);
    });

    return () => unsubscribe();
  }, []);

  // Medal Logic
  const getMedal = (index) => {
    if (index === 0) return { emoji: "🥇", color: "#FFD700" }; // Gold
    if (index === 1) return { emoji: "🥈", color: "#C0C0C0" }; // Silver
    if (index === 2) return { emoji: "🥉", color: "#CD7F32" }; // Bronze
    return null;
  };

  return (
    <div style={{ fontFamily: '"Montserrat", sans-serif', paddingBottom: '40px' }}>
      {rankedOwners.map((owner, index) => {
        const medal = getMedal(index);
        
        return (
          <div key={owner.name} style={{
            // --- THE PREMIUM GLASSMORPHISM STYLE ---
            background: 'rgba(255, 255, 255, 0.03)', // Highly translucent white
            backdropFilter: 'blur(10px)', // The core frosted glass effect
            WebkitBackdropFilter: 'blur(10px)', // Safari support
            
            // Layout and Spacing
            display: 'flex',
            alignItems: 'center',
            padding: '20px 30px',
            marginBottom: '15px',
            borderRadius: '12px',
            
            // Borders and Highlights
            border: '1px solid rgba(255, 255, 255, 0.08)', // Soft global border
            borderTop: medal ? `3px solid ${medal.color}` : '1px solid rgba(255, 255, 255, 0.08)', // Medal color highlight on top
            
            // Shadows for depth
            boxShadow: medal 
              ? `0 10px 30px -10px ${medal.color}40` // Subtle glow matching medal
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          }}>
            
            {/* Rank Number (Broadcast Style) */}
            <div style={{
              fontFamily: '"Impact", sans-serif',
              fontSize: '48px',
              fontWeight: 'bold',
              color: medal ? medal.color : 'rgba(255,255,255,0.2)',
              width: '60px',
              textAlign: 'center',
              marginRight: '20px',
              textShadow: medal ? `0 0 15px ${medal.color}` : 'none' // Neon rank glow
            }}>
              {index + 1}
            </div>

            {/* Owner Info and Roster */}
            <div style={{ flex: 1 }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: '24px', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                fontWeight: 700,
                color: medal ? '#ffffff' : 'rgba(255,255,255,0.7)'
              }}>
                {medal && <span style={{ marginRight: '10px' }}>{medal.emoji}</span>}
                {owner.name}
              }</h2>
              
              {/* Roster Badges (Cleaned up) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {owner.roster.map(teamName => (
                  <span key={teamName} style={{ 
                    background: 'rgba(0, 0, 0, 0.3)', // Darker badge bg
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '13px', 
                    fontWeight: 500,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {flagMap[teamName] || "🏳️"} {teamName}
                  </span>
                ))}
              </div>
            </div>

            {/* Total Points (Massive, Imposing) */}
            <div style={{ textAlign: 'center', marginLeft: '30px' }}>
              <div style={{ 
                fontFamily: '"Impact", sans-serif', // Broadcast typography
                fontSize: '72px', // Massive size
                color: '#ccff00', // Neon Green
                lineHeight: 1,
                textShadow: '0 0 20px rgba(204, 255, 0, 0.5)' // Soft neon glow
              }}>
                {owner.total}
              </div>
              <div style={{ 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '3px', 
                opacity: 0.5, 
                marginTop: '-5px' 
              }}>
                TOTAL PTS
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
