import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4">権利</Typography>
      <Typography variant="body1">
        Tracklist editorで生成した画像は自由に利用して頂いて構いません。
      </Typography>
    </Container>
  );
}
