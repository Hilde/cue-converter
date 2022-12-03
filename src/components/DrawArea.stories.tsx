import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DrawArea from './DrawArea';

export default {
  title: 'Components/DrawArea',
  component: DrawArea,
  argTypes: {},
} as ComponentMeta<typeof DrawArea>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate({
  title,
  titleFontSize,
  bodyFontSize,
  textColor,
  backgroundColor,
  tracks,
}: {
  title: string;
  titleFontSize: number;
  bodyFontSize: number;
  textColor: string;
  backgroundColor: string;
  tracks: Array<string>;
}) {
  return (
    <DrawArea
      title={title}
      titleFontSize={titleFontSize}
      bodyFontSize={bodyFontSize}
      textColor={textColor}
      backgroundColor={backgroundColor}
      tracks={tracks}
      backgroundImage=""
      backgroundOpacity={1}
    />
  );
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
Default.args = {
  title: 'Glittering girls mix by DJ Hildeko',
  titleFontSize: 28,
  bodyFontSize: 20,
  textColor: '#ffffff',
  backgroundColor: '#000000',
  tracks: ['a', 'b', 'c', 'd'],
};
