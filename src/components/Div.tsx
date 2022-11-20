import React from 'react';

export type DivProps = {
  children?: React.ReactNode | null;
  divProps?: any;
};

export default function Div(props: DivProps) {
  const { children, divProps } = props;
  return <div {...divProps}>{children}</div>;
}
