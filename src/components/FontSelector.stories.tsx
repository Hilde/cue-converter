import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, FormControl } from '@mui/material';

import FontSelector from './FontSelector';
import { FontListContextProvider } from '../hooks/useFontList';

export default {
  title: 'Components/FontSelector',
  component: FontSelector,
  argTypes: {},
} as ComponentMeta<typeof FontSelector>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate({
  onChange,
  props,
}: {
  onChange: () => void;
  props: any;
}) {
  return (
    <FontListContextProvider>
      <Box sx={{ maxWidth: 150 }}>
        <FormControl fullWidth>
          <FontSelector onChange={onChange} {...props} />
        </FormControl>
      </Box>
    </FontListContextProvider>
  );
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
