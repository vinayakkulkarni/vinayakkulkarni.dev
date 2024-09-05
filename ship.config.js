export default {
  installCommand: () => 'bun i',
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of Vinayak Kulkarni :: Portfolio Frontend Webapp"`,
};
