import React from 'react';
import Input from './Input';

const stories = {
  title: 'Threads/Input',
  component: Input,
  argTypes: {
    innerRef: {
      control: false,
    },
  },
};

export default stories;

const TemplateStory = (args) => <Input {...args} />;

const withTypeText = TemplateStory.bind({});
withTypeText.args = {
  label: 'Name',
  type: 'text',
};

export { withTypeText };
