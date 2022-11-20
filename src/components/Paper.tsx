import React from 'react';
import MUIPaper, { PaperProps as MUIPaperProps } from '@mui/material/Paper';

export type PaperProps = {} & MUIPaperProps;

export default function Paper(props: PaperProps) {
  const { ...muiProps } = props;
  return (
    <MUIPaper
      elevation={3}
      sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}
      {...muiProps}
    />
  );
}
