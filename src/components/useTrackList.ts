import { createContext, useContext } from 'react';

export type TrackListContextType = {
  title: string;
  trackList: Array<string>;
  baseFileName: string;
};

export const UseTrackList = createContext<TrackListContextType>({
  title: '',
  trackList: [],
  baseFileName: '',
});

export function useTrackList(): TrackListContextType {
  return useContext(UseTrackList);
}
