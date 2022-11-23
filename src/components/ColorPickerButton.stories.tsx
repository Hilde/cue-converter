import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ColorPickerButton from './ColorPickerButton';

export default {
  title: 'Components/ColorPickerButton',
  component: ColorPickerButton,
  argTypes: {},
} as ComponentMeta<typeof ColorPickerButton>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate(props: any) {
  return <ColorPickerButton defaultColor="#fff" {...props} />;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
