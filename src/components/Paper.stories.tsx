import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Paper from './Paper';

export default {
  title: 'Components/Paper',
  component: Paper,
  argTypes: {},
} as ComponentMeta<typeof Paper>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return <Paper>Hello</Paper>;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
