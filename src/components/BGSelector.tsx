import React from 'react';
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export default function BGSelector({
  onChange,
}: {
  onChange: (event: SelectChangeEvent) => void;
}) {
  const images = [
    'starrysky1.png',
    'starrysky2.png',
    'starrysky3.png',
    'starrysky4.png',
    'sunsetsky1.png',
    'sunsetsky2.png',
    'sunsetsky3.png',
    'sunsetsky4.png',
    'sunsetsky5.png',
    'sunsetsky6.png',
  ];
  const imageList: Array<React.ReactNode> = [];
  images.forEach((img) => {
    const url = `${process.env.PUBLIC_URL}/backgrounds/${img}`;
    imageList.push(
      <MenuItem value={url} key={img}>
        {img}
      </MenuItem>
    );
  });

  const [image, setImage] = React.useState('');

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
        {imageList}
      </Select>
    </>
  );
}
