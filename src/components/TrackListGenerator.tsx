import React from 'react';
import {
  Box,
  FormControl,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import html2canvas from 'html2canvas';

import BGSelector from './BGSelector';
import ColorPickerButton from './ColorPickerButton';
import TextField from './TextField';
import Button from './Button';

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
  const [titleFontSize, setTitleFontSize] = React.useState(18);
  const [bodyFontSize, setBodyFontSize] = React.useState(14);

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

  const handleSaveImage = () => {
    const target = document.getElementById('track-list-box');
    if (target === null) return;

    html2canvas(target).then((canvas) => {
      const url = canvas.toDataURL('image/png', 1.0);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseFileName}.png`;
      a.click();
      a.remove();
    });
  };

  const boxStyle = {
    position: 'relative',
    width: 800,
    height: 800,
    color: textColor,
    opacity: 1,
    backgroundColor,
    zIndex: 1,
    '&:before': {
      opacity,
      content: '""',
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: 'inherit',
      height: 'inherit',
      position: 'absolute',
      zIndex: 2,
    },
    '&>div': {
      position: 'absolute',
      zIndex: 3,
      m: 4,
    },
    // Workaround for list glitch of html2canvas
    // See: https://github.com/niklasvh/html2canvas/issues/177#issuecomment-1183693634
    '& ol li:before': {
      content: '""',
    },
  };

  const getListPadding = (): number => {
    if (bodyFontSize < 20) return bodyFontSize * 2;
    return bodyFontSize + 20;
  };

  // @ts-ignore
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
            Title font size: {titleFontSize}px
          </Typography>
          <Slider
            defaultValue={18}
            min={6}
            max={120}
            onChange={handleTitleFontSizeChange}
            aria-labelledby="title-font-size-slider"
          />
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Typography id="body-font-size-slider" gutterBottom>
            Body font size: {bodyFontSize}px
          </Typography>
          <Slider
            defaultValue={14}
            min={6}
            max={120}
            onChange={handleBodyFontSizeChange}
            aria-labelledby="body-font-size-slider"
          />
        </FormControl>
        <ColorPickerButton
          defaultColor="#FFF"
          onChange={handleTextColorChange}
          label="Text"
        />
        <Box sx={{ flexGrow: 1 }} />
        <FormControl margin="normal">
          <Button type="button" onClick={handleSaveImage}>
            <SaveIcon />
          </Button>
        </FormControl>
      </Stack>
      <Box id="track-list-box" sx={boxStyle}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1, fontSize: titleFontSize }}>
            {title}
          </Typography>
          <ol style={{ paddingLeft: getListPadding() }}>
            {tracks.map((track, index) => (
              <li
                style={{ fontSize: bodyFontSize }}
                key={index.toString() + track}
              >
                <Typography
                  key={index.toString() + track}
                  variant="body1"
                  component="span"
                  sx={{ fontSize: bodyFontSize }}
                >
                  {track}
                </Typography>
              </li>
            ))}
          </ol>
        </Box>
      </Box>

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
