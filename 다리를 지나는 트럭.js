function solution(bridge_length, weight, truck_weights) {
  // bridge_length = 최대 올라갈 수 있는 트럭 수
  // weight 최대 견딜 수 있는 무게
  // 순서대로 오른다.

  const wait = truck_weights.map((item) => {
    return {
      weight: item,
      distance: 0,
    };
  });

  let doing = [];

  let count = 0;

  while (wait.length !== 0 || doing.length !== 0) {
    let weightSum = 0;

    for (let i = 0; i < doing.length; i++) {
      weightSum += doing[i].weight;
      doing[i].distance++;
    }

    if (doing[0] !== undefined && doing[0].distance >= bridge_length) {
      weightSum -= doing[0].weight;
      doing.shift();
    }

    const next = wait[0];

    if (
      next !== undefined &&
      next.weight + weightSum <= weight &&
      doing.length < bridge_length
    ) {
      doing.push(next);
      wait.shift();
    }

    count++;
  }
  return count;
}
