import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Copyright from './Copyright';

export default {
  title: 'Components/Copyright',
  component: Copyright,
  argTypes: {},
} as ComponentMeta<typeof Copyright>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return <Copyright />;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
