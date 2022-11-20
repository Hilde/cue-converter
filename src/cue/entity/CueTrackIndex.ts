import { zeroFill } from '../Utils';

export class CueTrackIndex {
  minutes: number;

  seconds: number;

  frames: number;

  hours: number | null; // for rekordbox-dj

  constructor(
    minutes: number,
    seconds: number,
    frames: number,
    hours?: number
  ) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.frames = frames;
    this.hours = hours ?? null;
  }

  toString = (): string => {
    if (this.hours) {
      const min = this.minutes + this.hours * 60;
      return `${zeroFill(min)}:${zeroFill(this.seconds)}:${zeroFill(
        this.frames
      )}`;
    }
    return `${zeroFill(this.minutes)}:${zeroFill(this.seconds)}:${zeroFill(
      this.frames
    )}`;
  };
}
