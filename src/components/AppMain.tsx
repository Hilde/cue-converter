import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { FileRejection, useDropzone } from 'react-dropzone';

import './AppMain.css';

import Button from './Button';
import Paper from './Paper';
import StyledDropZone from './StyledDropZone';
import TrackListGenerator from './TrackListGenerator';
import { CueLoader } from '../cue/loader/CueLoader';
import { fetchAsText, fetchAsDataURL } from '../cue/Utils';
import { useSnackbar } from '../hooks/snackbar/useSnackbar';
import { useSetImageList, ImageProps } from '../hooks/useImageList';

export default function AppMain() {
  const { showSnackbar } = useSnackbar();

  const [tracks, setTracks] = useState<Array<string>>([]);
  const [title, setTitle] = useState('');
  const [baseFileName, setBaseFileName] = useState('');

  const setImageList = useSetImageList();

  const getTitle = (title_: string, performer_: string) => {
    if (title_ && performer_) return `${title_} by ${performer_}`;
    if (title_) return title_;
    if (performer_) return `By ${performer_}`;
    return '';
  };

  const getDownloadFileName = (filename: string) =>
    filename.replace('.', '-1.');

  const getBaseFileName = (filename: string) => filename.replace(/\..+$/, '');

  const download = async (filename: string, data: string) => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
  };

  const cueFileHandler = async (file: File) => {
    if (!file.name.endsWith('.cue')) {
      showSnackbar('ファイル名が.cueで終わっていません', 'warning');
      return;
    }

    if (file.size > 512000) {
      showSnackbar('ファイルサイズは500kb以内にしてください', 'warning');
      return;
    }

    const text = await fetchAsText(file);

    const cueLoader = new CueLoader();
    const cue = cueLoader.load(text);
    setTracks(cue.getTracks());
    setTitle(getTitle(cue.getTitle(), cue.getPerformer()));
    setBaseFileName(getBaseFileName(file.name));

    const filename = getDownloadFileName(file.name);
    download(filename, cue.toString()).then(() => {
      showSnackbar(`ファイルをダウンロードしています: ${filename}`, 'info');
    });
  };

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
      } else if (file.name.endsWith('.cue')) {
        await cueFileHandler(file);
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

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
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
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper>
          <p>
            rekordboxが出力するcueファイルを、Mixcloudでタイムスタンプが反映されるように変換します。ファイルの内容はブラウザ内で変換され、サーバ側には送信しません。
          </p>
          <p>
            Convert the cue file output by rekordbox so that the timestamp is
            reflected in Mixcloud. The contents of the file will be converted in
            your browser and not be sent to the server.
          </p>
        </Paper>
        <Paper>
          <p>.cueファイルをここにドロップするか、クリックして選択</p>
          <p>Drop here or choose a .cue file</p>
          <input {...getInputProps()} />
          <Button type="button" onClick={open}>
            Select file
          </Button>
        </Paper>

        <Paper>
          <TrackListGenerator
            title={title}
            setTitle={setTitle}
            tracks={tracks}
            setTracks={setTracks}
            baseFileName={baseFileName}
            open={open}
          />
        </Paper>
      </Container>
    </StyledDropZone>
  );
}
