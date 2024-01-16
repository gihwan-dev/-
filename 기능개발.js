function solution(progresses, speeds) {
  // 기능 개발 중 100%일 때 서비스에 반영 가능
  // 개발 속도는 다름
  // 뒤에있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있음
  // 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포된다
  // 각 배포마다 몇 개의 기능이 배포되는가

  // que를 활용한다.
  const que = [...progresses];

  // que길이가 0이라면 빈배열을 리턴한다.
  if (que.length === 0) {
    return [];
  }

  // 처음으로 que의 맨 앞 요소에서 100까지 몇일이 지나야 100%가 되는지 계산한다.
  let day = calRemainDay(que[0], speeds[0]);

  // 첫 que를 빼고 count를 1더한다.
  que.shift();
  speeds.shift();
  let count = 1;

  let result = [];

  // que가 빌태까지 while문을 돈다.
  // que를 순회한다.
  while (que.length !== 0) {
    // que의 맨 앞 요소가 speed와 day를 곱했을 때 100%가 되는가?
    const canDeploy = que[0] + speeds[0] * day >= 100;
    // 맞고 flag가 트루라면: que의 맨 앞 요소를 빼고 count를 + 1한다.
    if (canDeploy) {
      que.shift();
      speeds.shift();
      count++;
    } else {
      // count 를 결과 배열에 삽입하고 1로 초기화한다.
      result.push(count);
      count = 1;
      // 첫 요소가 deploy 되기 위해 필요한 시간을 계산한다.
      day = calRemainDay(que[0], speeds[0]);
      que.shift();
      speeds.shift();
    }
  }
  result.push(count);
  return result;
}

function calRemainDay(deploy, speed) {
  let day = Math.floor((100 - deploy) / speed);
  return (100 - deploy) % speed > 0 ? day + 1 : day;
}
