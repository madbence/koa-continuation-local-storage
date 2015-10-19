module.exports = function create(opts) {
  if (!opts.ns) {
    throw new Error('opts.ns is needed!');
  }

  return function* (next) {
    yield new Promise(opts.ns.bind(function (resolve) {
      resolve();
    }));
    yield* next;
  };
};
