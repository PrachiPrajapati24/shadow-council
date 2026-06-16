const ROLES = require("./roles");

// Decide how many special roles based on player count
const getRoleDistribution = (playerCount) => {
  if (playerCount <= 5) {
    return {
      shadowAgents: 1,
      oracles: 1,
    };
  }

  if (playerCount <= 8) {
    return {
      shadowAgents: 2,
      oracles: 1,
    };
  }

  return {
    shadowAgents: 3,
    oracles: 1,
  };
};

// Generate role list before shuffle
const generateRoles = (playerCount) => {
  const { shadowAgents, oracles } =
    getRoleDistribution(playerCount);

  const roles = [];

  for (let i = 0; i < shadowAgents; i++) {
    roles.push(ROLES.SHADOW_AGENT);
  }

  for (let i = 0; i < oracles; i++) {
    roles.push(ROLES.ORACLE);
  }

  while (roles.length < playerCount) {
    roles.push(ROLES.COUNCIL_MEMBER);
  }

  return roles;
};

// Fisher-Yates shuffle (correct randomizer)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

// Final assignment function
const assignRoles = (players) => {
  const roles = generateRoles(players.length);

  const shuffledRoles = shuffleArray(roles);

  return players.map((player, index) => ({
    ...player,
    role: shuffledRoles[index],
  }));
};

// ✅ IMPORTANT: EXPORT EVERYTHING
module.exports = {
  assignRoles,
  generateRoles,
  shuffleArray,
  getRoleDistribution,
};