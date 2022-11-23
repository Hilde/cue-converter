import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box, FormControl } from '@mui/material';

import BGSelector from './BGSelector';

export default {
  title: 'Components/BGSelector',
  component: BGSelector,
  argTypes: {},
} as ComponentMeta<typeof BGSelector>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate({ onChange }: { onChange: () => void }) {
  return (
    <Box sx={{ maxWidth: 150 }}>
      <FormControl fullWidth>
        <BGSelector onChange={onChange} />
      </FormControl>
    </Box>
  );
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
