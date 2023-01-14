import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4">権利</Typography>
      <Typography variant="body1">
        Tracklist editorのデフォルト画像(starrysky*.png,
        sunsetsky*.png)を利用して生成した画像は、自由に利用して頂けます。ユーザご自身が用意した画像を利用して生成した画像は当方は責任を負いません。
      </Typography>
    </Container>
  );
}
