// src/data/initialTeams.js
const defaultStats = { wins: 0, ties: 0, cleanSheets: 0, redCards: 0 };

export const initialTeams = [
  // Pot 1
  { id: "spain", name: "Spain", pot: 1, owner: "Chris", ...defaultStats },
  { id: "france", name: "France", pot: 1, owner: "Ling-chiu", ...defaultStats },
  { id: "argentina", name: "Argentina", pot: 1, owner: "Geoffrey", ...defaultStats },
  { id: "england", name: "England", pot: 1, owner: "Tracey", ...defaultStats },
  { id: "portugal", name: "Portugal", pot: 1, owner: "Becky", ...defaultStats },
  { id: "netherlands", name: "Netherlands", pot: 1, owner: "Player 6", ...defaultStats },
  { id: "brazil", name: "Brazil", pot: 1, owner: "Player 7", ...defaultStats },
  { id: "morocco", name: "Morocco", pot: 1, owner: "Player 8", ...defaultStats },
  // Pot 2
  { id: "belgium", name: "Belgium", pot: 2, owner: "Chris", ...defaultStats },
  { id: "germany", name: "Germany", pot: 2, owner: "Ling-chiu", ...defaultStats },
  { id: "croatia", name: "Croatia", pot: 2, owner: "Geoffrey", ...defaultStats },
  { id: "colombia", name: "Colombia", pot: 2, owner: "Tracey", ...defaultStats },
  { id: "senegal", name: "Senegal", pot: 2, owner: "Becky", ...defaultStats },
  { id: "mexico", name: "Mexico", pot: 2, owner: "Player 6", ...defaultStats },
  { id: "usa", name: "USA", pot: 2, owner: "Player 7", ...defaultStats },
  { id: "uruguay", name: "Uruguay", pot: 2, owner: "Player 8", ...defaultStats },
  // Pot 3
  { id: "japan", name: "Japan", pot: 3, owner: "Chris", ...defaultStats },
  { id: "switzerland", name: "Switzerland", pot: 3, owner: "Ling-chiu", ...defaultStats },
  { id: "ir_iran", name: "IR Iran", pot: 3, owner: "Geoffrey", ...defaultStats },
  { id: "korea_republic", name: "Korea Republic", pot: 3, owner: "Tracey", ...defaultStats },
  { id: "ecuador", name: "Ecuador", pot: 3, owner: "Becky", ...defaultStats },
  { id: "turkiye", name: "Türkiye", pot: 3, owner: "Player 6", ...defaultStats },
  { id: "austria", name: "Austria", pot: 3, owner: "Player 7", ...defaultStats },
  { id: "australia", name: "Australia", pot: 3, owner: "Player 8", ...defaultStats },
  // Pot 4
  { id: "algeria", name: "Algeria", pot: 4, owner: "Chris", ...defaultStats },
  { id: "egypt", name: "Egypt", pot: 4, owner: "Ling-chiu", ...defaultStats },
  { id: "canada", name: "Canada", pot: 4, owner: "Geoffrey", ...defaultStats },
  { id: "norway", name: "Norway", pot: 4, owner: "Tracey", ...defaultStats },
  { id: "panama", name: "Panama", pot: 4, owner: "Becky", ...defaultStats },
  { id: "cote_divoire", name: "Côte d'Ivoire", pot: 4, owner: "Player 6", ...defaultStats },
  { id: "paraguay", name: "Paraguay", pot: 4, owner: "Player 7", ...defaultStats },
  { id: "scotland", name: "Scotland", pot: 4, owner: "Player 8", ...defaultStats },
  // Pot 5
  { id: "sweden", name: "Sweden", pot: 5, owner: "Chris", ...defaultStats },
  { id: "czechia", name: "Czechia", pot: 5, owner: "Ling-chiu", ...defaultStats },
  { id: "tunisia", name: "Tunisia", pot: 5, owner: "Geoffrey", ...defaultStats },
  { id: "congo_dr", name: "Congo DR", pot: 5, owner: "Tracey", ...defaultStats },
  { id: "uzbekistan", name: "Uzbekistan", pot: 5, owner: "Becky", ...defaultStats },
  { id: "qatar", name: "Qatar", pot: 5, owner: "Player 6", ...defaultStats },
  { id: "iraq", name: "Iraq", pot: 5, owner: "Player 7", ...defaultStats },
  { id: "south_africa", name: "South Africa", pot: 5, owner: "Player 8", ...defaultStats },
  // Pot 6
  { id: "saudi_arabia", name: "Saudi Arabia", pot: 6, owner: "Chris", ...defaultStats },
  { id: "jordan", name: "Jordan", pot: 6, owner: "Ling-chiu", ...defaultStats },
  { id: "bosnia", name: "Bosnia and Herzegovina", pot: 6, owner: "Geoffrey", ...defaultStats },
  { id: "cabo_verde", name: "Cabo Verde", pot: 6, owner: "Tracey", ...defaultStats },
  { id: "ghana", name: "Ghana", pot: 6, owner: "Becky", ...defaultStats },
  { id: "curacao", name: "Curaçao", pot: 6, owner: "Player 6", ...defaultStats },
  { id: "haiti", name: "Haiti", pot: 6, owner: "Player 7", ...defaultStats },
  { id: "new_zealand", name: "New Zealand", pot: 6, owner: "Player 8", ...defaultStats }
];