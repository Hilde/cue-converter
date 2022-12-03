import React from 'react';
import { Box, Typography } from '@mui/material';

export default function DrawArea({
  title,
  titleFontSize,
  bodyFontSize,
  textColor,
  backgroundColor,
  backgroundOpacity,
  backgroundImage,
  tracks,
  indexNumber = false,
}: {
  title: string;
  titleFontSize: number;
  bodyFontSize: number;
  textColor: string;
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundImage: string;
  tracks: Array<string>;
  indexNumber?: boolean;
}) {
  const getListPadding = (): number => {
    if (bodyFontSize < 20) return bodyFontSize * 2;
    return bodyFontSize + 20;
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
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <Box className="list-area">
        <Typography
          sx={{ m: 0 }}
          style={{ margin: 0, fontSize: titleFontSize }}
        >
          {title}
        </Typography>
        {indexNumber && (
          <ol style={{ paddingLeft: getListPadding() }}>
            {tracks.map((track, index) => (
              <li
                style={{ fontSize: bodyFontSize }}
                key={index.toString() + track}
              >
                {track}
              </li>
            ))}
          </ol>
        )}
        {!indexNumber && (
          <>
            {tracks.map((track, index) => (
              <Typography
                variant="body1"
                style={{ fontSize: bodyFontSize }}
                key={index.toString() + track}
              >
                {track}
              </Typography>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}
