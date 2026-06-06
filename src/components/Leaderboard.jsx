// src/components/Leaderboard.jsx
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { flagMap } from '../data/flagMap';

export default function Leaderboard() {
  const [rankedOwners, setRankedOwners] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'teams'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allTeams = [];
      querySnapshot.forEach((doc) => {
        allTeams.push(doc.data());
      });

      const ownerStats = {};
      allTeams.forEach((team) => {
        const ownerName = team.owner || 'Unassigned';
        
        const totalPoints = 
          (team.wins * 3) + 
          (team.ties * 1) + 
          (team.cleanSheets * 1) - 
          (team.redCards * 1);

        if (!ownerStats[ownerName]) {
          ownerStats[ownerName] = { 
            totalPoints: 0, 
            roster: [],
            wins: 0,
            ties: 0,
            cleanSheets: 0,
            redCards: 0
          };
        }
        
        ownerStats[ownerName].totalPoints += totalPoints;
        ownerStats[ownerName].wins += team.wins;
        ownerStats[ownerName].ties += team.ties;
        ownerStats[ownerName].cleanSheets += team.cleanSheets;
        ownerStats[ownerName].redCards += team.redCards;

        if (ownerName !== 'Unassigned') {
          ownerStats[ownerName].roster.push(team.name);
        }
      });

      const sortedOwners = Object.entries(ownerStats)
        .map(([name, data]) => ({
          name,
          totalPoints: data.totalPoints,
          roster: data.roster.sort(), 
          wins: data.wins,
          ties: data.ties,
          cleanSheets: data.cleanSheets,
          redCards: data.redCards
        }))
        .filter(owner => owner.name !== 'Unassigned') 
        .sort((a, b) => b.totalPoints - a.totalPoints);

      setRankedOwners(sortedOwners);
    });

    return () => unsubscribe();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return { emoji: "🥇", color: "#FFD700" }; 
    if (index === 1) return { emoji: "🥈", color: "#C0C0C0" }; 
    if (index === 2) return { emoji: "🥉", color: "#CD7F32" }; 
    return null;
  };

  return (
    <div style={{ fontFamily: '"Montserrat", sans-serif', paddingBottom: '40px' }}>
      
      {/* Horizontal Scroll Wrapper for Mobile */}
      <div style={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
        
        {/* Minimum width lock prevents crushing */}
        <div style={{ minWidth: '850px', padding: '0 5px' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 60px 60px 60px 60px 100px', 
            gap: '15px',
            padding: '10px 30px',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontSize: '12px',
            letterSpacing: '3px',
            opacity: 0.5,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div>Rank</div>
            <div style={{ textAlign: 'left' }}>Owner / Roster</div>
            <div>W</div>
            <div>T</div>
            <div>CS</div>
            <div>RC</div>
            <div>PTS</div>
          </div>

          {rankedOwners.map((owner, index) => {
            const medal = getMedal(index);
            
            return (
              <div key={owner.name} style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'grid',
                gridTemplateColumns: '80px 1fr 60px 60px 60px 60px 100px',
                alignItems: 'center',
                gap: '15px',
                padding: '20px 30px',
                marginBottom: '10px', 
                borderRadius: '12px',
                textAlign: 'center', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderLeft: medal ? `5px solid ${medal.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: medal 
                  ? `0 10px 30px -10px ${medal.color}40` 
                  : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
              }}>
                
                <div style={{
                  fontFamily: '"Impact", sans-serif',
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: medal ? medal.color : 'rgba(255,255,255,0.2)',
                  textShadow: medal ? `0 0 15px ${medal.color}` : 'none'
                }}>
                  {index + 1}
                </div>

                <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '22px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    fontWeight: 700,
                    color: medal ? '#ffffff' : 'rgba(255,255,255,0.7)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {medal && <span style={{ marginRight: '8px' }}>{medal.emoji}</span>}
                    {owner.name}
                  </h2>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {owner.roster.map(teamName => (
                      <span key={teamName} style={{ 
                        background: 'rgba(0, 0, 0, 0.3)',
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 500,
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: 'rgba(255,255,255,0.8)'
                      }}>
                        {flagMap[teamName] || "🏳️"} {teamName}
                      </span>
                    ))}
                  </div>
                </div>

                {[owner.wins, owner.ties, owner.cleanSheets, owner.redCards].map((statValue, i) => (
                  <div key={i} style={{
                    fontFamily: '"Impact", sans-serif',
                    fontSize: '32px',
                    color: i === 3 && statValue > 0 ? '#ff4d4d' : '#ffffff', 
                    textShadow: i === 3 && statValue > 0 ? '0 0 10px #ff4d4d' : 'none',
                    opacity: statValue === 0 ? 0.3 : 1 
                  }}>
                    {statValue}
                  </div>
                ))}

                <div style={{ 
                  fontFamily: '"Impact", sans-serif', 
                  fontSize: '54px',
                  color: '#ccff00', 
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(204, 255, 0, 0.5)' 
                }}>
                  {owner.totalPoints}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
