import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { FileRejection, useDropzone } from 'react-dropzone';

import Paper from '../components/Paper';
import TrackListGenerator from '../components/TrackListGenerator';
import StyledDropZone from '../components/StyledDropZone';
import { useSnackbar } from '../hooks/snackbar/useSnackbar';
import { ImageProps, useSetImageList } from '../hooks/useImageList';
import { fetchAsDataURL } from '../cue/Utils';

export default function Editor() {
  const { showSnackbar } = useSnackbar();

  const [tracks, setTracks] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');

  const setImageList = useSetImageList();

  const imageFileHandler = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showSnackbar('画像ではないようです', 'warning');
      return;
    }

    const img: ImageProps = {
      name: file.name,
      url: await fetchAsDataURL(file),
    };
    setImageList((currentList) => [img, ...currentList]);

    showSnackbar(`Added image for background: ${file.name}`, 'info');
  };

  const fileHandler = async (file?: File) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        await imageFileHandler(file);
      } else {
        showSnackbar('非対応のファイルです', 'warning');
      }
    }
  };

  const onDropAccepted = useCallback(
    (files: File[]) => Promise.all(files.map(fileHandler)),
    [fileHandler]
  );

  const onDropRejected = useCallback(
    (files: FileRejection[]) => {
      console.info('File rejected');
      console.warn(files);
      // console.info(e);

      showSnackbar(`非対応のファイルです: ${files[0].file.name}`, 'error');
    },
    [showSnackbar]
  );

  const { getRootProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxSize: 5120000,
    maxFiles: 1,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
      'text/plain': ['.cue'],
    },
    onDropAccepted,
    onDropRejected,
  });

  return (
    <StyledDropZone getRootProps={getRootProps} isDragActive={isDragActive}>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper>
          <TrackListGenerator
            title={title}
            setTitle={setTitle}
            tracks={tracks}
            setTracks={setTracks}
            baseFileName="tracklist"
            open={open}
          />
        </Paper>
      </Container>
    </StyledDropZone>
  );
}
