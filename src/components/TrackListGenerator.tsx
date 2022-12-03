import React from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Frame from 'react-frame-component';
import html2canvas from 'html2canvas';

import BGSelector from './BGSelector';
import ColorPickerButton from './ColorPickerButton';
import TextField from './TextField';
import Button from './Button';
import DrawArea from './DrawArea';
import Checkbox from './Checkbox';

export type TrackListGeneratorProps = {
  performer: string;
  title: string;
  tracks: Array<string>;
  baseFileName: string;
};

export default function TrackListGenerator({
  performer: performer_,
  title: title_,
  tracks: tracks_,
  baseFileName,
}: TrackListGeneratorProps) {
  const getTitle = () => {
    if (title_ && performer_) return `${title_} by ${performer_}`;
    if (title_) return title_;
    if (performer_) return `By ${performer_}`;
    return '';
  };

  const [title, setTitle] = React.useState(getTitle());
  const [tracks, setTracks] = React.useState(tracks_);
  const [background, setBackground] = React.useState('');
  const [opacity, setOpacity] = React.useState(0.7);
  const [backgroundColor, setBackgroundColor] = React.useState('#000000');
  const [textColor, setTextColor] = React.useState('#FFFFFF');
  const [titleFontSize, setTitleFontSize] = React.useState(1.8);
  const [bodyFontSize, setBodyFontSize] = React.useState(1.0);
  const [indexNumber, setIndexNumber] = React.useState(false);

  const iframeRef = React.useRef<any>(null);

  const getFirstValue = <T,>(val: T | T[]) =>
    Array.isArray(val) ? val[0] : val;

  const handleBackgroundChange = (e: SelectChangeEvent) => {
    setBackground(e.target.value);
  };

  const handleOpacityChange = (e: Event, value: number | number[]) => {
    setOpacity(getFirstValue(value) / 100);
  };

  const handleBackgroundColorChange = (value: string) => {
    setBackgroundColor(value);
  };

  const handleTextColorChange = (value: string) => {
    setTextColor(value);
  };

  const handleTitleFontSizeChange = (e: Event, value: number | number[]) => {
    setTitleFontSize(getFirstValue(value));
  };
  const handleBodyFontSizeChange = (e: Event, value: number | number[]) => {
    setBodyFontSize(getFirstValue(value));
  };

  const handleTrackListChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTracks(e.target.value.split(/\r?\n/));
  };

  const handleIndexNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexNumber(e.target.checked);
  };

  const handleSaveImage = () => {
    const src =
      iframeRef.current?.contentWindow?.document.getElementById('draw-area');
    if (src === null) return;

    html2canvas(src, { scale: 2 }).then((canvas) => {
      const url = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseFileName}.png`;
      a.click();
      a.remove();
    });
  };

  // const draw = () => {
  //   const src =
  //     iframeRef.current?.contentWindow?.document.getElementById('draw-area');
  //   if (src) {
  //     html2canvas(src, {
  //       scale: 2,
  //     }).then((canvas) => {
  //       const placeholder = document.getElementById('canvasPlaceholder');
  //       if (placeholder) {
  //         placeholder.lastElementChild?.remove();
  //         placeholder.appendChild(canvas);
  //       }
  //     });
  //   }
  // };
  //
  // const handleMounted = () => {
  //   draw();
  // };

  return (
    <Box sx={{ minWidth: 800 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Tracklist editor
      </Typography>
      <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <BGSelector onChange={handleBackgroundChange} />
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Typography id="background-opacity-slider" gutterBottom>
            Background opacity
          </Typography>
          <Slider
            defaultValue={70}
            min={0}
            max={100}
            onChange={handleOpacityChange}
            aria-labelledby="background-opacity-slider"
          />
        </FormControl>
        <ColorPickerButton
          defaultColor="#000"
          onChange={handleBackgroundColorChange}
          label="Background"
        />
      </Stack>
      <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <Typography id="title-font-size-slider" gutterBottom>
            Title font size: {titleFontSize}rem
          </Typography>
          <Slider
            defaultValue={1.8}
            min={0.4}
            max={6.0}
            step={0.1}
            onChange={handleTitleFontSizeChange}
            aria-labelledby="title-font-size-slider"
          />
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Typography id="body-font-size-slider" gutterBottom>
            Body font size: {bodyFontSize}rem
          </Typography>
          <Slider
            defaultValue={1.0}
            min={0.4}
            max={6.0}
            step={0.1}
            onChange={handleBodyFontSizeChange}
            aria-labelledby="body-font-size-slider"
          />
        </FormControl>
        <ColorPickerButton
          defaultColor="#FFF"
          onChange={handleTextColorChange}
          label="Text"
        />
        <FormControlLabel
          control={<Checkbox onChange={handleIndexNumberChange} />}
          label="Index number"
        />
        <Box sx={{ flexGrow: 1 }} />

        {/*  <Button type="button" onClick={draw}> */}
        {/*     redraw */}
        {/*   </Button> */}

        <Button type="button" onClick={handleSaveImage} size="large">
          <SaveIcon />
        </Button>
      </Stack>
      <Frame
        ref={iframeRef}
        head={
          <link
            rel="stylesheet"
            href={`${process.env.PUBLIC_URL}/iframe.css`}
          />
        }
        // contentDidMount={handleMounted}
        scrolling="no"
        style={{ width: '512px', height: '512px', border: 'none' }}
      >
        <DrawArea
          title={title}
          titleFontSize={titleFontSize}
          bodyFontSize={bodyFontSize}
          textColor={textColor}
          backgroundColor={backgroundColor}
          backgroundOpacity={opacity}
          backgroundImage={background}
          tracks={tracks}
          indexNumber={indexNumber}
        />
      </Frame>

      {/* <div id="canvasPlaceholder" /> */}

      <Box width="800px">
        <FormControl fullWidth sx={{ my: 2 }}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2 }}>
          <TextField
            label="Track list"
            variant="outlined"
            value={tracks.join('\n')}
            onChange={handleTrackListChange}
            multiline
          />
        </FormControl>
      </Box>
    </Box>
  );
}
