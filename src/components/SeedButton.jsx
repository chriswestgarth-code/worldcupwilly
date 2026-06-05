// src/components/SeedButton.jsx
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { initialTeams } from '../data/initialTeams';

export default function SeedButton() {
  const handleSeedDatabase = async () => {
    if (!window.confirm("Are you sure you want to upload the 48 teams?")) return;

    const batch = writeBatch(db);

    initialTeams.forEach((team) => {
      const teamRef = doc(db, 'teams', team.id);
      batch.set(teamRef, {
        name: team.name,
        owner: team.owner,
        pot: team.pot, // Added the Pot variable!
        wins: team.wins,
        ties: team.ties,
        cleanSheets: team.cleanSheets,
        redCards: team.redCards,
        pin: '1007' // <--- ADD YOUR PIN HERE!
      });
    });

    try {
      await batch.commit();
      alert("Success! All 48 teams are in the cloud.");
    } catch (error) {
      console.error("Error uploading: ", error);
      alert("Upload failed.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <button 
        onClick={handleSeedDatabase} 
        style={{ background: 'red', color: 'white', padding: '15px 30px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '8px' }}
      >
        🚨 TEMPORARY: SEED 48 TEAMS 🚨
      </button>
    </div>
  );
}