export function togglePlayer(player) {
  return player === 'playerOne' ? 'playerTwo' : 'playerOne';
};

export function matchingCoordinates(arrayA, arrayB) {
  return arrayA[0] === arrayB[0] && arrayA[1] === arrayB[1];
};
