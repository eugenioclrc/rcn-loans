export function promisify(contractFunction) {
  return (...args) => new Promise((resolve, reject) => {
    args.push((err, ...res) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(res);
    });
    return contractFunction.call(...args);
  });
}

export function contractPromisify(contract) {
  const namedFuncs = {};
  Object.getOwnPropertyNames(contract)
    .filter(property => typeof contract[property] === 'function')
    .forEach((method) => {
      namedFuncs[method] = promisify(contract[method]);
    });
  return namedFuncs;
}
