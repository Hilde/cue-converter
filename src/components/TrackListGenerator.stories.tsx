import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TrackListGenerator, {
  TrackListGeneratorProps,
} from './TrackListGenerator';

export default {
  title: 'Components/TrackListGenerator',
  component: TrackListGenerator,
  argTypes: {},
} as ComponentMeta<typeof TrackListGenerator>;

type StoryTemplateType = ComponentStory<typeof StoryTemplate>;

function StoryTemplate({ tracks, performer, title }: TrackListGeneratorProps) {
  return <TrackListGenerator tracks={tracks} performer={performer} title={title}/>;
}

export const Default = StoryTemplate.bind({}) as StoryTemplateType;
const tracks = [
  'Kizuna AI (キズナアイ) & Moe Shop - RADIO LOVE HIGHWAY',
  'Moe Shop - Baby Pink (feat. YUC\'e)',
  '宇多田ヒカル - traveling (PLANITb remix)',
  'ミカヅキBIGWAVE - I Wanna Be With You',
  'm-flo loves MINMI - Lotta Love',
  'AZALEA - 空中恋愛論',
  'μ\'s - Shangri-La Shower',
  'TEMPLIME - ネオンライト (feat. 星宮とと)',
  'COLTEMONIKHA - そらとぶひかり',
  'MEG - MAGIC',
  'Lazy Gung - Strawberry Fiction (Pandaboy Remix) [feat. Pandaboy]',
  'わか・ふうり・すなお from STAR☆ANIS - カレンダーガール [kz Remix]',
  '大槻唯 (CV: 山下七海) - Radio Happy',
];
Default.args = {
  title: 'キラキラミックス',
  performer: 'DJ Hildeko',
  tracks,
};
