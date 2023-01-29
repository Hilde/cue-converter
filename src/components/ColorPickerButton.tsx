import React, { ReactNode, useState } from 'react';
import { Box, Button } from '@mui/material';
import { ColorResult, SketchPicker } from 'react-color';

export type ColorPickerButtonProps = {
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  defaultColor: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;
};

export default function ColorPickerButton(props: ColorPickerButtonProps) {
  const {
    label = '',
    startIcon,
    endIcon,
    defaultColor,
    onChange = () => {},
    onChangeComplete = () => {},
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const styles = {
    swatch: {
      padding: '5px',
      marginRight: '5px',
      marginTop: '-3px',
      background: color,
      borderRadius: '1px',
      borderColor: 'info',
      borderStyle: 'solid',
      borderWidth: '1px',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '4',
      marginTop: '2em',
    },
    cover: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (_color: ColorResult) => {
    setColor(_color.hex);
    onChange(_color.hex);
  };

  const handleChangeComplete = (_color: ColorResult) => {
    setColor(_color.hex);
    onChangeComplete(_color.hex);
  };

  return (
    <>
      <Button onClick={handleClick} variant="outlined">
        {startIcon}
        <div style={styles.swatch} />
        {label}
        {endIcon}
      </Button>
      {isOpen ? (
        <Box sx={styles.popover}>
          <Box sx={styles.cover} onClick={handleClose} />
          <SketchPicker
            color={color}
            disableAlpha
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
      ) : null}
    </>
  );
}
