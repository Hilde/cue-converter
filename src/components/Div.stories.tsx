import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Div from './Div';

export default {
  title: 'Components/Div',
  component: Div,
  argTypes: {},
} as ComponentMeta<typeof Div>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return <Div>Hello</Div>;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
