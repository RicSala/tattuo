const path = require('path');


/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/app': path.resolve(__dirname, '../app'),
      '@/providers': path.resolve(__dirname, '../providers'),
      '@/components': path.resolve(__dirname, '../components'),
      '@/hooks': path.resolve(__dirname, '../hooks'),
      '@/utils': path.resolve(__dirname, '../utils'),
      //libs
      '@/libs': path.resolve(__dirname, '../libs'),
      //actios
      '@/actions': path.resolve(__dirname, '../actions'),
    };

    return config;
  },

  staticDirs: ['../public'],

};
export default config;
