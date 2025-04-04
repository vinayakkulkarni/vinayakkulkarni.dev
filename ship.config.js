export default {
  installCommand: () => 'pnpm i',
  buildCommand: () => null,
  publishCommand: ({ tag }) =>
    `echo "Releasing ${tag} version of Vinayak Kulkarni :: Portfolio Frontend Webapp"`,
};
