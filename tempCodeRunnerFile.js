    const unsortedArr = [...value];
    const sortedArr = unsortedArr.sort((a, b) => compareFunction(a, b));
    genresKeyPlayMap.set(key, sortedArr);