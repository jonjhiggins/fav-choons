/** @type {import('vls').VeturConfig} */
module.exports = {
  projects: [
    {
      root: './apps/fav-choons-frontend/',
      package: '../../../package.json',
      tsconfig: './tsconfig.json',
      globalComponents: ['./src/components/**/*.vue'],
    },
  ],
};
