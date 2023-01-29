import React, { createContext, ReactNode, useContext, useState } from 'react';

export type FontType = {
  name: string;
  fontFamily: string;
  fallback: string;
  url?: string;
};

const defaultFontList: FontType[] = [
  {
    name: 'Arial',
    fontFamily: '"Arial","Helvetica Neue","Helvetica"',
    fallback: 'sans-serif',
  },
  {
    name: 'Baskerville',
    fontFamily:
      '"Baskerville","Baskerville Old Face","Garamond","Times New Roman"',
    fallback: 'serif',
  },
  {
    name: 'Calisto MT',
    fontFamily:
      '"Calisto MT","Bookman Old Style","Bookman","Goudy Old Style","Garamond,Hoefler Text","Bitstream Charter","Georgia"',
    fallback: 'serif',
  },
  {
    name: 'Candara',
    fontFamily: '"Candara","Calibri","Segoe","Segoe UI","Optima","Arial"',
    fallback: 'sans-serif',
  },
  {
    name: 'Century Gothic',
    fontFamily: '"Century Gothic","CenturyGothic","AppleGothic"',
    fallback: 'sans-serif',
  },
  {
    name: 'Consolas',
    fontFamily: '"Consolas","monaco"',
    fallback: 'monospace',
  },
  {
    name: 'Copperplate Gothic',
    fontFamily: '"Copperplate","Copperplate Gothic Light"',
    fallback: 'fantasy',
  },
  {
    name: 'Courier New',
    fontFamily:
      '"Courier New","Courier","Lucida Sans Typewriter","Lucida Typewriter"',
    fallback: 'monospace',
  },
  {
    name: 'Dejavu Sans',
    fontFamily: '"Dejavu Sans","Arial","Verdana"',
    fallback: 'sans-serif',
  },
  {
    name: 'Garamond',
    fontFamily:
      '"Garamond","Baskerville","Baskerville Old Face","Hoefler Text","Times New Roman"',
    fallback: 'serif',
  },
  {
    name: 'Georgia',
    fontFamily: '"Georgia","Times","Times New Roman"',
    fallback: 'serif',
  },
  {
    name: 'Gill Sans',
    fontFamily: '"Gill Sans","Gill Sans MT","Calibri"',
    fallback: 'sans-serif',
  },
  {
    name: 'Helvetica',
    fontFamily: '"Helvetica Neue","Helvetica","Arial"',
    fallback: 'sans-serif',
  },
  {
    name: 'Impact',
    fontFamily:
      '"Impact","Charcoal","Helvetica Inserat","Bitstream Vera Sans Bold","Arial Black"',
    fallback: 'sans-serif',
  },
  {
    name: 'Optima',
    fontFamily: '"Optima","Segoe","Segoe UI","Candara","Calibri","Arial"',
    fallback: 'sans-serif',
  },
  {
    name: 'Palatino',
    fontFamily:
      '"Palatino","Palatino Linotype","Palatino LT STD","Book Antiqua","Georgia"',
    fallback: 'serif',
  },
  {
    name: 'Tahoma',
    fontFamily: '"Tahoma","Verdana","Segoe"',
    fallback: 'sans-serif',
  },
  {
    name: 'Trebuchet MS',
    fontFamily:
      '"Trebuchet MS","Lucida Grande","Lucida Sans Unicode","Lucida Sans"',
    fallback: 'sans-serif',
  },
  {
    name: 'Verdana',
    fontFamily: '"Verdana","Geneva"',
    fallback: 'sans-serif',
  },
  {
    name: 'Segoe script (Win)',
    fontFamily: '"Segoe script"',
    fallback: 'cursive',
  },
  {
    name: 'Snell Roundhand (Mac)',
    fontFamily: '"Snell Roundhand"',
    fallback: 'cursive',
  },
  {
    name: 'Lucida Handwriting (Mac)',
    fontFamily: '"Lucida Handwriting"',
    fallback: 'cursive',
  },
  {
    name: '游ゴシック',
    fontFamily: '"YuGothic","Yu Gothic"',
    fallback: 'sans-serif',
  },
  {
    name: '游明朝',
    fontFamily: '"YuMincho","Yu Mincho"',
    fallback: 'serif',
  },
  {
    name: 'メイリオ (Win)',
    fontFamily: '"Meiryo"',
    fallback: 'sans-serif',
  },
  {
    name: 'ヒラギノ角ゴシック (Mac)',
    fontFamily: '"Hiragino Sans"',
    fallback: 'sans-serif',
  },
  {
    name: 'ヒラギノ角ゴ ProN W3 (Mac)',
    fontFamily: '"Hiragino Kaku Gothic ProN"',
    fallback: 'sans-serif',
  },
  // {
  //   name: '',
  //   fontFamily: '',
  //   fallback: '',
  // },
  // {
  //   name: '',
  //   fontFamily: '',
  //   fallback: '',
  // },
  // {
  //   name: '',
  //   fontFamily: '',
  //   fallback: '',
  // },
  // font-family: 'Meiryo UI','Yu Gothic UI','ＭＳ ゴシック','ＭＳ Ｐゴシック','MS PGothic','MS UI Gothic','ＭＳ 明朝', 'MS Mincho','ＭＳ Ｐ明朝','MS PMincho',sans-serif;
  // font-family: 'ヒラギノ角ゴシック','Hiragino Sans','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3','ヒラギノ角ゴ StdN','Hiragino Kaku Gothic StdN','ヒラギノ明朝 ProN','Hiragino Mincho ProN','ヒラギノ丸ゴ ProN','Hiragino Maru Gothic ProN','klee','TsukuARdGothic-Regular','TsukuBRdGothic-Regular','Osaka','Hannotate SC','Hannotate TC','HanziPen SC','HanziPen TC','Wawati SC','Kaiti SC','Kaiti TC',
];

const fontListContext = createContext<FontType[]>([]);

export function FontListContextProvider({ children }: { children: ReactNode }) {
  const [fontList] = useState<FontType[]>(defaultFontList);

  return (
    <fontListContext.Provider value={fontList}>
      {children}
    </fontListContext.Provider>
  );
}

export function useFontList(): FontType[] {
  return useContext(fontListContext);
}
