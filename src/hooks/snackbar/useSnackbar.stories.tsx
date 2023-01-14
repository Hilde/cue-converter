import React from 'react';
import { ComponentStory } from '@storybook/react';

import SnackbarContextProvider, { useSnackbar } from './useSnackbar';

function DummyChild() {
  const { showSnackbar } = useSnackbar();
  return (
    <div>
      <button type="button" onClick={() => showSnackbar('Success', 'success')}>
        Success
      </button>
      <button type="button" onClick={() => showSnackbar('Error', 'error')}>
        Error
      </button>
    </div>
  );
}

export default {
  title: 'utils/useSnackbar',
  component: DummyChild,
  argTypes: {},
};

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate() {
  return (
    <SnackbarContextProvider>
      <DummyChild />
    </SnackbarContextProvider>
  );
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
