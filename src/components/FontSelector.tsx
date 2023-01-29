import React, { useId, useState } from 'react';
import { InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { FontType, useFontList } from '../hooks/useFontList';

export default function FontSelector({
  name = '',
  defaultValue,
  onChange,
}: {
  name?: string;
  defaultValue?: string;
  onChange: (event: SelectChangeEvent) => void;
}) {
  const id = useId();
  const fontList = useFontList();

  const [fontName, setFontName] = useState(defaultValue || fontList[0].name);

  const handleChange = (e: SelectChangeEvent) => {
    setFontName(e.target.value);
    onChange(e);
  };

  return (
    <>
      <InputLabel id={`font-${id}-select-label`}>{name} Font</InputLabel>
      <Select
        labelId={`font-${id}-select-label`}
        id={`font-${id}`}
        label={`${name} Font`}
        value={fontName}
        onChange={handleChange}
      >
        {fontList.map((font: FontType) => (
          <MenuItem value={font.name} key={font.name}>
            {font.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
