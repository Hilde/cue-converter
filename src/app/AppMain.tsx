import React, { useCallback, useState } from 'react';
import { Container } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import './AppMain.css';

import Button from '../components/Button';
import Header from '../components/Header';
import Copyright from '../components/Copyright';
import Paper from '../components/Paper';
import { CueLoader } from '../cue/loader/CueLoader';
import { fetchAsText } from '../cue/Utils';
import StyledDropZone from '../components/StyledDropZone';
import { useSnackbar } from '../utils/snackbar/useSnackbar';
import TrackListGenerator from '../components/TrackListGenerator';

export default function AppMain() {
  const { showSnackbar } = useSnackbar();

  const [tracks, setTracks] = useState<Array<string>>([]);
  const [performer, setPerformer] = useState('');
  const [title, setTitle] = useState('');

  const getDownloadFileName = (filename: string) =>
    filename.replace('.', '-1.');

  const download = async (filename: string, data: string) => {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
  };

  const fileHandler = async (file?: File) => {
    if (file) {
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
      setTitle(cue.getTitle());
      setPerformer(cue.getPerformer());

      const filename = getDownloadFileName(file.name);
      download(filename, cue.toString()).then(() => {
        showSnackbar(`ファイルをダウンロードしています: ${filename}`, 'info');
      });
    }
  };

  const onDrop = useCallback(async (files: File[]) => {
    await fileHandler(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
      maxSize: 512000,
      maxFiles: 1,
      accept: {
        'text/plain': ['.cue'],
      },
    });

  fileRejections.forEach(({ file }) => {
    showSnackbar(`非対応のファイルです: ${file.name}`, 'error');
  });

  return (
    <>
      <Header />
      <StyledDropZone getRootProps={getRootProps} isDragActive={isDragActive}>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper>
            <p>
              Rekordboxが出力するcueファイルを、Mixcloudでタイムスタンプが反映されるように変換します。ファイルの内容はブラウザ内で変換され、サーバ側には送信しません。
            </p>
            <p>
              Convert the cue file output by Rekordbox so that the timestamp is
              reflected in mixcloud. The contents of the file will be converted
              in your browser and not be sent to the server.
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
          {tracks.length > 0 &&
            <Paper>
              <TrackListGenerator performer={performer} title={title} tracks={tracks}/>
            </Paper>
          }
        </Container>
      </StyledDropZone>
      <Copyright />
    </>
  );
}
