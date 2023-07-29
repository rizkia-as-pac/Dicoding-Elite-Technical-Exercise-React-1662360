import React from 'react';
import Button from './Button';

const stories = {
  title: 'Threads/Button',
  component: Button,
};

export default stories;

const TemplateStory = (args) => <Button {...args} />;

const withTypeSubmit = TemplateStory.bind({});
withTypeSubmit.args = {
  text: 'Button',
  type: 'submit',
};

const withTypeButton = TemplateStory.bind({});
withTypeButton.args = {
  text: 'Button',
  type: 'button',
};

export { withTypeSubmit, withTypeButton };
