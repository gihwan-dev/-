function solution(priorities, location) {
  const queue = [...priorities];

  let trackingLocation = location;

  let count = 0;

  let keep = 1;

  while (keep) {
    const cur = queue[0];
    queue.shift();

    const isCanExcute = queue.filter((item) => item > cur).length === 0;

    if (isCanExcute) {
      count++;
      if (trackingLocation === 0) {
        return count;
      }
    } else {
      queue.push(cur);
    }
    trackingLocation = getLocation(queue.length, trackingLocation);
  }
  return count;
}

function getLocation(length, location) {
  if (location === 0) {
    return length - 1;
  } else {
    return location - 1;
  }
}
