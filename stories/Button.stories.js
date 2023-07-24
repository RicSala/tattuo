
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

import Button from "../components/Button";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    label: 'I m a button',
    onClick: undefined,
    disabled: false,
    outline: false,
    small: false,
    icon: undefined,
    type: 'button',
    className: 'bg-primary',
  },
};
