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

      // 2. Algorithm: Calculate owner points and aggregate stats
      const ownerStats = {};
      allTeams.forEach((team) => {
        const ownerName = team.owner || 'Unassigned';
        
        // --- Calculate Points (as before) ---
        const totalPoints = 
          (team.wins * 3) + 
          (team.ties * 1) + 
          (team.cleanSheets * 1) - 
          (team.redCards * 1);

        if (!ownerStats[ownerName]) {
          ownerStats[ownerName] = { 
            totalPoints: 0, 
            roster: [],
            // --- New Stat Buckets ---
            wins: 0,
            ties: 0,
            cleanSheets: 0,
            redCards: 0
          };
        }
        
        // --- Aggregate Stats ---
        ownerStats[ownerName].totalPoints += totalPoints;
        ownerStats[ownerName].wins += team.wins;
        ownerStats[ownerName].ties += team.ties;
        ownerStats[ownerName].cleanSheets += team.cleanSheets;
        ownerStats[ownerName].redCards += team.redCards;

        // Don't list 'Unassigned' teams on the leaderboard
        if (ownerName !== 'Unassigned') {
          ownerStats[ownerName].roster.push(team.name);
        }
      });

      // 3. Convert to array and sort by points
      const sortedOwners = Object.entries(ownerStats)
        .map(([name, data]) => ({
          name,
          totalPoints: data.totalPoints,
          roster: data.roster.sort(), // Sort roster alphabetically
          // --- Pass Stats Through ---
          wins: data.wins,
          ties: data.ties,
          cleanSheets: data.cleanSheets,
          redCards: data.redCards
        }))
        // Hide "Unassigned" from the main display
        .filter(owner => owner.name !== 'Unassigned') 
        .sort((a, b) => b.totalPoints - a.totalPoints);

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
      
      {/* 1. Header Row for the Statistical Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 60px 60px 60px 60px 100px', // Defined column widths
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
            // --- THE PREMIUM GLASSMORPHISM STYLE ---
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            
            // Layout and Spacing using CSS Grid
            display: 'grid',
            gridTemplateColumns: '80px 1fr 60px 60px 60px 60px 100px',
            alignItems: 'center',
            gap: '15px',
            padding: '20px 30px',
            marginBottom: '10px', // Tighter spacing for rows
            borderRadius: '12px',
            textAlign: 'center', // Center numbers by default
            
            // Borders and Highlights
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderLeft: medal ? `5px solid ${medal.color}` : '1px solid rgba(255, 255, 255, 0.08)', // Medal bar on left
            
            // Shadows for depth
            boxShadow: medal 
              ? `0 10px 30px -10px ${medal.color}40` 
              : '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          }}>
            
            {/* 1. Rank Number */}
            <div style={{
              fontFamily: '"Impact", sans-serif',
              fontSize: '48px',
              fontWeight: 'bold',
              color: medal ? medal.color : 'rgba(255,255,255,0.2)',
              textShadow: medal ? `0 0 15px ${medal.color}` : 'none'
            }}>
              {index + 1}
            </div>

            {/* 2. Owner Info and Roster (Left-Aligned) */}
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
                textOverflow: 'ellipsis' // Truncate long names
              }}>
                {medal && <span style={{ marginRight: '8px' }}>{medal.emoji}</span>}
                {owner.name}
              </h2>
              
              {/* Roster Badges (Tighter, cleaner) */}
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

            {/* 3-6. Statistical Subsets (Clean, Centralized Numbers) */}
            {[owner.wins, owner.ties, owner.cleanSheets, owner.redCards].map((statValue, i) => (
              <div key={i} style={{
                fontFamily: '"Impact", sans-serif', // Use bold broadcast font
                fontSize: '32px',
                color: i === 3 && statValue > 0 ? '#ff4d4d' : '#ffffff', // Highlight Red Cards in red
                textShadow: i === 3 && statValue > 0 ? '0 0 10px #ff4d4d' : 'none',
                opacity: statValue === 0 ? 0.3 : 1 // Dim zeros for focus
              }}>
                {statValue}
              </div>
            ))}

            {/* 7. Total Points (Final massive column) */}
            <div style={{ 
              fontFamily: '"Impact", sans-serif', 
              fontSize: '54px', // Sized down slightly for grid
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
  );
}
