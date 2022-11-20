import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { DropzoneRootProps } from 'react-dropzone';

export default function StyledDropZone({
  children,
  getRootProps,
  isDragActive,
}: {
  children: React.ReactNode;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragActive: boolean;
}) {
  const baseStyle = {
    p: 1,
  };

  const focusedStyle = {
    backgroundColor: '#e1e7f0',
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? focusedStyle : {}),
    }),
    [isDragActive]
  );

  return <Box {...getRootProps({ style })}>{children}</Box>;
}
