module.exports = function create(opts) {
  if (!opts) {
    throw new Error('ns or opts.ns is needed!');
  }
  let ns = opts.ns || opts;
  if (!ns) {
    throw new Error('opts.ns is needed!');
  }

  return function* (next) {
    yield new Promise(ns.bind(function (resolve) {
      resolve();
    }));
    yield* next;
  };
};
