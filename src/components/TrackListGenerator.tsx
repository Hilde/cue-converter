import React, { Dispatch, SetStateAction, useState } from 'react';
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
import UploadIcon from '@mui/icons-material/Upload';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import OpacityIcon from '@mui/icons-material/Opacity';
import Frame from 'react-frame-component';
import html2canvas from 'html2canvas';

import BGSelector from './BGSelector';
import ColorPickerButton from './ColorPickerButton';
import TextField from './TextField';
import Button from './Button';
import DrawArea from './DrawArea';
import Checkbox from './Checkbox';
import { useImageList } from '../hooks/useImageList';
import { useFontList } from '../hooks/useFontList';
import FontSelector from './FontSelector';

const getFirstValue = <T,>(val: T | T[]) => (Array.isArray(val) ? val[0] : val);

export type TrackListGeneratorProps = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  tracks: Array<string>;
  setTracks: Dispatch<SetStateAction<Array<string>>>;
  baseFileName: string;
  open: Function;
};

export default function TrackListGenerator({
  title,
  setTitle,
  tracks,
  setTracks,
  baseFileName,
  open,
}: TrackListGeneratorProps) {
  const imageList = useImageList();
  const fontList = useFontList();

  const [background, setBackground] = useState('');
  const [opacity, setOpacity] = useState(0.7);
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [titleFontSize, setTitleFontSize] = useState(1.8);
  const [titleFont, setTitleFont] = useState(fontList[0]);
  const [bodyFontSize, setBodyFontSize] = useState(1.0);
  const [bodyFont, setBodyFont] = useState(fontList[0]);
  const [indexNumber, setIndexNumber] = useState(false);

  const iframeRef = React.useRef<any>(null);

  const handleBackgroundChange = (e: SelectChangeEvent) => {
    // const url = getImageURL(e.target.value);
    // setBackground(url);
    const name = e.target.value;
    for (let i = 0; i < imageList.length; i += 1) {
      if (imageList[i].name === name) {
        setBackground(imageList[i].url);
      }
    }
  };

  const handleTitleFontChange = (e: SelectChangeEvent) => {
    const name = e.target.value;
    for (let i = 0; i < fontList.length; i += 1) {
      if (fontList[i].name === name) {
        setTitleFont(fontList[i]);
      }
    }
  };

  const handleBodyFontChange = (e: SelectChangeEvent) => {
    const name = e.target.value;
    for (let i = 0; i < fontList.length; i += 1) {
      if (fontList[i].name === name) {
        setBodyFont(fontList[i]);
      }
    }
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
      <Stack direction="row" spacing={3} sx={{ mb: 2, alignItems: 'center' }}>
        <Typography sx={{ width: '5.5rem' }}>Background</Typography>
        <FormControl>
          <ColorPickerButton
            defaultColor="#000"
            onChange={handleBackgroundColorChange}
            startIcon={<FormatColorFillIcon />}
          />
        </FormControl>
        <FormControl sx={{ width: 180 }} size="small">
          <BGSelector label="Image" onChange={handleBackgroundChange} />
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <OpacityIcon sx={{ opacity: 0.3 }} />
            <Slider
              defaultValue={70}
              min={0}
              max={100}
              onChange={handleOpacityChange}
              aria-labelledby="background-opacity-slider"
            />
            <OpacityIcon />
          </Stack>
        </FormControl>
        <FormControl>
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => {
              open();
            }}
          >
            Upload image
          </Button>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: 2, alignItems: 'center' }}>
        <Typography sx={{ width: '5.5rem' }}>Title</Typography>
        <FormControl sx={{ minWidth: 180 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormatSizeIcon />
            <Slider
              defaultValue={1.8}
              min={0.4}
              max={6.0}
              step={0.1}
              onChange={handleTitleFontSizeChange}
              aria-labelledby="title-font-size-slider"
              valueLabelDisplay="auto"
            />
          </Stack>
        </FormControl>
        <FormControl size="small" sx={{ width: 180 }}>
          <FontSelector onChange={handleTitleFontChange} />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ mb: 2, alignItems: 'center' }}>
        <Typography sx={{ width: '5.5rem' }}>Body</Typography>
        <FormControl sx={{ minWidth: 180 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormatSizeIcon />
            <Slider
              defaultValue={1.0}
              min={0.4}
              max={6.0}
              step={0.1}
              onChange={handleBodyFontSizeChange}
              aria-labelledby="body-font-size-slider"
              valueLabelDisplay="auto"
            />
          </Stack>
        </FormControl>
        <FormControl size="small" sx={{ width: 180 }}>
          <FontSelector onChange={handleBodyFontChange} />
        </FormControl>
        <ColorPickerButton
          defaultColor="#FFF"
          onChange={handleTextColorChange}
          startIcon={<FormatColorTextIcon />}
        />
        <FormControlLabel
          control={<Checkbox onChange={handleIndexNumberChange} />}
          label="Show index"
        />
        <Box sx={{ flexGrow: 1 }} />

        {/*  <Button type="button" onClick={draw}> */}
        {/*     redraw */}
        {/*   </Button> */}

        <Button
          type="button"
          onClick={handleSaveImage}
          startIcon={<SaveIcon />}
          size="large"
        >
          Save
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
          titleFont={titleFont}
          bodyFontSize={bodyFontSize}
          bodyFont={bodyFont}
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
