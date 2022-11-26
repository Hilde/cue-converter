import React from 'react';
import { Container } from '@mui/material';
import Paper from '../components/Paper';
import TrackListGenerator from '../components/TrackListGenerator';

export default function Editor() {
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper>
        <TrackListGenerator
          performer=""
          title=""
          tracks={[]}
          baseFileName="tracklist"
        />
      </Paper>
    </Container>
  );
}
