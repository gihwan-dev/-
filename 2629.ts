type F = (x: number) => number;

function compose(functions: F[]): F {
  const targetFunctions = [...functions].reverse();
  return function (x) {
    let value = x;
    targetFunctions.forEach((f) => {
      value = f(value);
    });
    return value;
  };
}

// const fn = compose([(x) => x + 1, (x) => 2 * x]);
// fn(4); // 9
