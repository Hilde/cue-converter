import React, { useState, ReactNode } from 'react';
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useImageList } from '../hooks/useImageList';

export default function BGSelector({
  onChange,
}: {
  onChange: (event: SelectChangeEvent) => void;
}) {
  const imageList = useImageList();

  const imageItems: Array<ReactNode> = [];
  const [image, setImage] = useState('');

  imageList.forEach((img) => {
    imageItems.push(
      <MenuItem value={img.name} key={`${img.name}`}>
        {img.name}
      </MenuItem>
    );
  });

  const handleChange = (e: SelectChangeEvent) => {
    setImage(e.target.value);
    onChange(e);
  };

  return (
    <>
      <InputLabel id="background-image-select-label">
        Background image
      </InputLabel>
      <Select
        labelId="background-image-select-label"
        id="background-image"
        label="Background image"
        defaultValue=""
        value={image}
        onChange={handleChange}
      >
        {imageItems}
      </Select>
    </>
  );
}
