/**
 * 
 * @param {string[]} players 
 * @param {string[]} callings 
 * @returns 
 */

function solution(players, callings) {
  const targetPlayers = [...players];
  const map = new Map();
  players.forEach((item, index) => {
    map.set(item, index);
  })

  callings.forEach((item, index) => {
    // 인덱스부터 맵에서 가져온다.
    const callingPlayerIndex = map.get(item);
    const originPlayerIndex = callingPlayerIndex - 1;
    // 맵에서 가져온 인덱스 기반으로 교환한다.
    const temp = targetPlayers[originPlayerIndex];
    targetPlayers[originPlayerIndex] = targetPlayers[callingPlayerIndex];
    targetPlayers[callingPlayerIndex] = temp;
    // 맵 인덱스도 초기화 시켜준다.
    map.set(item, originPlayerIndex);
    map.set(temp, callingPlayerIndex);

  })
  return targetPlayers;
}

solution(["mumu", "soe", "poe", "kai", "mine"], ["kai", "kai", "mine", "mine"]);
