const benchPromise = (label, promise) => {
  const t1 = Date.now();
  return promise.then(result => {
    const t2 = Date.now();
    console.log(`${label} took ${t2 - t1}ms`);
    return result;
  })
}

module.exports = benchPromise;
