/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    'vetur.useWorkspaceDependencies': true,
    'vetur.experimental.templateInterpolationService': true,
  },
  projects: [
    {
      root: './apps/fav-choons-frontend/',
      package: '../../../package.json',
      tsconfig: './tsconfig.json',
      globalComponents: ['./src/components/**/*.vue'],
    },
  ],
};
