import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AppMain from './AppMain';
import { FontListContextProvider } from '../hooks/useFontList';
import { ImageListContextProvider } from '../hooks/useImageList';

export default {
  title: 'App/AppMain',
  component: AppMain,
  argTypes: {},
} as ComponentMeta<typeof AppMain>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return (
    <ImageListContextProvider>
      <FontListContextProvider>
        <AppMain />
      </FontListContextProvider>
    </ImageListContextProvider>
  );
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
