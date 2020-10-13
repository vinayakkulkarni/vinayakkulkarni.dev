module.exports = () => {
  return {
    require: ['./test/ava.setup.js'],
    ignoredByWatcher: ['!**/*.{js,vue}'],
    babel: true,
    tap: false,
    verbose: true,
    color: true,
  };
};
