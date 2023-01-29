import React, { useState } from 'react';
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { ImageProps, useImageList } from '../hooks/useImageList';

export default function BGSelector({
  label,
  defaultValue = '',
  onChange,
}: {
  label: string;
  defaultValue?: string;
  onChange: (event: SelectChangeEvent) => void;
}) {
  const imageList = useImageList();

  const [image, setImage] = useState(defaultValue);

  const handleChange = (e: SelectChangeEvent) => {
    setImage(e.target.value);
    onChange(e);
  };

  return (
    <>
      <InputLabel id="background-image-select-label">{label}</InputLabel>
      <Select
        labelId="background-image-select-label"
        id="background-image"
        label={label}
        value={image}
        onChange={handleChange}
      >
        {imageList.map((img: ImageProps) => (
          <MenuItem value={img.name} key={`${img.name}`}>
            {img.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
