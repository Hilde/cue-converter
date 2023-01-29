import React from 'react';
import { Box, Typography } from '@mui/material';
import { FontType } from '../hooks/useFontList';

export default function DrawArea({
  title,
  titleFontSize,
  titleFont,
  bodyFontSize,
  bodyFont,
  textColor,
  backgroundColor,
  backgroundOpacity,
  backgroundImage,
  tracks,
  indexNumber = false,
}: {
  title: string;
  titleFontSize: number;
  titleFont?: FontType;
  bodyFontSize: number;
  bodyFont?: FontType;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundImage: string;
  tracks: Array<string>;
  indexNumber?: boolean;
}) {
  const getTitleFontSize = (): string => `${titleFontSize}rem`;
  const getBodyFontSize = (): string => `${bodyFontSize}rem`;
  const getListPadding = (): string => {
    if (bodyFontSize < 20) return `${bodyFontSize * 2}rem`;
    return `${bodyFontSize + 20}rem`;
  };

  return (
    <Box
      id="draw-area"
      className="draw-area"
      style={{ backgroundColor, color: textColor }}
    >
      <Box
        className="background-area"
        style={{
          opacity: backgroundOpacity,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
        }}
      />
      <Box className="list-area">
        <Typography
          style={{
            margin: 0,
            fontSize: getTitleFontSize(),
            fontFamily: titleFont
              ? `${titleFont.fontFamily},${titleFont.fallback}`
              : 'sans-serif',
          }}
        >
          {title}
        </Typography>
        {indexNumber && (
          <ol style={{ paddingLeft: getListPadding() }}>
            {tracks.map((track, index) => (
              <li
                style={{
                  fontSize: getBodyFontSize(),
                  fontFamily: bodyFont
                    ? `${bodyFont.fontFamily},${bodyFont.fallback}`
                    : 'sans-serif',
                }}
                key={index.toString() + track}
              >
                {track}
              </li>
            ))}
          </ol>
        )}
        {!indexNumber && (
          <div style={{ marginTop: '1rem' }}>
            {tracks.map((track, index) => (
              <Typography
                style={{
                  margin: '0.1rem 0',
                  fontSize: getBodyFontSize(),
                  fontFamily: bodyFont
                    ? `${bodyFont.fontFamily},${bodyFont.fallback}`
                    : 'sans-serif',
                }}
                key={index.toString() + track}
              >
                {track}
              </Typography>
            ))}
          </div>
        )}
      </Box>
    </Box>
  );
}
