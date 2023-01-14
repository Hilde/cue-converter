import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export type ImageProps = {
  name: string;
  url: string;
};

const NO_IMAGE = 'No Image';

const defaultImages = [
  NO_IMAGE,
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

const imageListContext = createContext<ImageProps[]>([]);
const setImageListContext = createContext<
  Dispatch<SetStateAction<ImageProps[]>>
>(() => undefined);

export function ImageListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [imageList, setImageList] = useState<ImageProps[]>([]);

  useEffect(() => {
    setImageList(
      defaultImages.map((item) => ({
        name: item,
        url:
          item !== NO_IMAGE
            ? `${process.env.PUBLIC_URL}/backgrounds/${item}`
            : '',
      }))
    );
  }, []);

  return (
    <imageListContext.Provider value={imageList}>
      <setImageListContext.Provider value={setImageList}>
        {children}
      </setImageListContext.Provider>
    </imageListContext.Provider>
  );
}

//   const addImage = useCallback((image: ImageProps) => {
//     setImageList((currentList) => [image, ...currentList]);
//     setImageNameList((currentList) => [image.name, ...currentList]);
//   }, []);
//
//   const getImageURL = useCallback((name: string): string => {
//     if (name !== NO_IMAGE) {
//       for (let i = 0; i < imageList.length; i += 1) {
//         if (imageList[i].name === name) {
//           return imageList[i].url;
//         }
//       }
//     }
//     return '';
//   }, []);
//
//   return { imageList, setImageList, addImage, imageNameList, getImageURL };
// }

export function useImageList(): ImageProps[] {
  return useContext(imageListContext);
}

export function useSetImageList(): Dispatch<SetStateAction<ImageProps[]>> {
  return useContext(setImageListContext);
}
