import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {},
} as ComponentMeta<typeof Header>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return <Header />;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
