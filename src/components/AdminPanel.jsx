import { useState, useEffect } from 'react';
import { doc, updateDoc, collection, onSnapshot, increment } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { flagMap } from '../data/flagMap';

export default function AdminPanel() {
  const [pin, setPin] = useState('');
  const [teams, setTeams] = useState([]);
  
  // Match States
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [goalsA, setGoalsA] = useState(0);
  const [goalsB, setGoalsB] = useState(0);
  const [redCardsA, setRedCardsA] = useState(0);
  const [redCardsB, setRedCardsB] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'teams'), (snapshot) => {
      const teamList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      teamList.sort((a, b) => a.name.localeCompare(b.name));
      setTeams(teamList);
    });
    return () => unsubscribe();
  }, []);

  const handleLogMatch = async (e) => {
    e.preventDefault();
    if (!teamA || !teamB) return alert("Select both teams!");
    if (teamA === teamB) return alert("A team cannot play itself.");
    if (!pin) return alert("PIN required.");

    // Match Logic Calculations
    const numGoalsA = Number(goalsA);
    const numGoalsB = Number(goalsB);
    
    const teamAWon = numGoalsA > numGoalsB;
    const teamBWon = numGoalsB > numGoalsA;
    const isTie = numGoalsA === numGoalsB;
    
    const teamACleanSheet = numGoalsB === 0;
    const teamBCleanSheet = numGoalsA === 0;

    try {
      // 1. Build the payload for Team A
      const updateA = { pin };
      if (teamAWon) updateA.wins = increment(1);
      if (isTie) updateA.ties = increment(1);
      if (teamACleanSheet) updateA.cleanSheets = increment(1);
      if (Number(redCardsA) > 0) updateA.redCards = increment(Number(redCardsA));

      // 2. Build the payload for Team B
      const updateB = { pin };
      if (teamBWon) updateB.wins = increment(1);
      if (isTie) updateB.ties = increment(1);
      if (teamBCleanSheet) updateB.cleanSheets = increment(1);
      if (Number(redCardsB) > 0) updateB.redCards = increment(Number(redCardsB));

      // 3. Fire both updates to Firebase
      await updateDoc(doc(db, 'teams', teamA), updateA);
      await updateDoc(doc(db, 'teams', teamB), updateB);
      
      alert("Match logged successfully!");
      
      // Reset form
      setGoalsA(0); setGoalsB(0);
      setRedCardsA(0); setRedCardsB(0);
      setPin('');
      
    } catch (error) {
      console.error(error);
      alert("Update failed. Check your PIN.");
    }
  };

  return (
    <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', borderRadius: '12px', marginTop: '40px' }}>
      <h3 style={{ borderBottom: '2px solid #ccff00', paddingBottom: '10px' }}>Log Match Result</h3>
      
      <form onSubmit={handleLogMatch} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Team A Block */}
          <div style={{ flex: 1, background: '#2a2a2a', padding: '15px', borderRadius: '8px' }}>
            <select value={teamA} onChange={(e) => setTeamA(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
              <option value="">Home Team</option>
              {teams.map(t => (
  <option key={t.id} value={t.id}>
    {flagMap[t.name] || "🏳️"} {t.name}
  </option>
))}
            </select>
            <label>Goals:</label>
            <input type="number" value={goalsA} onChange={(e) => setGoalsA(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <label>Red Cards:</label>
            <input type="number" value={redCardsA} onChange={(e) => setRedCardsA(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>

          <strong style={{ color: '#ccff00', fontSize: '24px' }}>VS</strong>

          {/* Team B Block */}
          <div style={{ flex: 1, background: '#2a2a2a', padding: '15px', borderRadius: '8px' }}>
            <select value={teamB} onChange={(e) => setTeamB(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
              <option value="">Away Team</option>
              {teams.map(t => (
  <option key={t.id} value={t.id}>
    {flagMap[t.name] || "🏳️"} {t.name}
  </option>
))}
            </select>
            <label>Goals:</label>
            <input type="number" value={goalsB} onChange={(e) => setGoalsB(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
            <label>Red Cards:</label>
            <input type="number" value={redCardsB} onChange={(e) => setRedCardsB(e.target.value)} style={{ width: '100%', padding: '8px' }} />
          </div>
        </div>

        <input 
          type="password" 
          placeholder="4-Digit Auth PIN" 
          value={pin} 
          onChange={(e) => setPin(e.target.value)} 
          style={{ padding: '10px', textAlign: 'center', fontSize: '18px', letterSpacing: '4px' }}
        />

        <button type="submit" style={{ background: '#ccff00', color: 'black', padding: '15px', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          SUBMIT FINAL SCORE
        </button>
      </form>
    </div>
  );
}