/**
1. 속한 노래가 많이 재생된 장르
2. 장르 내에서 많이 재생된 노래
3. 고유 번호가 낮은 노래

* @param {genres} string[]
* @param {plays} number[]
* returns {number[]} - 고유번호
*/

function solution(genres, plays) {
  // 장르 순서로 정렬한다
  const genresKeyPlayMap = new Map();
  const genresTotalPlayMap = new Map();
  const genresTotalPlayArr = [];
  // genresKeyPlayMap에 "장르" : [[재생수, 키값], [재생수, 키값]] 형태의 배열을 저장한다.
  genres.forEach((item, key) => {
    const isExisting = genresKeyPlayMap.get(item);
    if (isExisting !== undefined) {
      const newValue = [...isExisting, [plays[key], key]];
      genresKeyPlayMap.set(item, newValue);
    } else {
      genresKeyPlayMap.set(item, [[plays[key], key]]);
    }
  });
  // 값을 이터레이션 하며 정렬한다. 같은 경우 고유 번호가 낮은 순으로 정렬한다.
  genresKeyPlayMap.forEach((value, key) => {
    const unsortedArr = [...value];
    const sortedArr = unsortedArr.sort((a, b) => compareFunction(a, b));
    genresKeyPlayMap.set(key, sortedArr);
  });
  // genresTotalPlayMap 에 "장르": 총 재생수 로 저장한다.
  genres.forEach((item, key) => {
    const isExisting = genresTotalPlayMap.get(item);
    if (isExisting !== undefined) {
      const sum = isExisting + plays[key];
      genresTotalPlayMap.set(item, sum);
    } else {
      genresTotalPlayMap.set(item, plays[key]);
    }
  });
  // 맵을 통해 genresTotalPlayArr에 [[장르, 재생수], [장르, 재생수]] 로 저장해서 정렬한다.
  genresTotalPlayMap.forEach((value, key) => {
    genresTotalPlayArr.push([key, value]);
  });

  if (genresTotalPlayArr.length > 1) {
    genresTotalPlayArr.sort((a, b) => b[1] - a[1]);
  }
  const result = [];
  // genresTotalPlayArr의 장르 순서로
  // genresKeyPlayMap을 이터레이션 하며 result 배열에 키값을 추가한다.
  genresTotalPlayArr.forEach((item) => {
    const sortedValueList = genresKeyPlayMap.get(item[0]);
    for (let i = 0; i <= 1; i++) {
      if (sortedValueList[i] && sortedValueList[i][1] !== undefined) {
        result.push(sortedValueList[i][1]);
      }
    }
  });
  //반환한다.
  return result;
}

function compareFunction(a, b) {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  }
  return b[0] - a[0];
}
