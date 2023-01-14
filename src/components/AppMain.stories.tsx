import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppMain from './AppMain';

export default {
  title: 'App/AppMain',
  component: AppMain,
  argTypes: {},
} as ComponentMeta<typeof AppMain>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return <AppMain />;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
