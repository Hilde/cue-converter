import { CueTrackIndex } from './CueTrackIndex';
import { EOL, escapeString, INDENT, zeroFill } from '../Utils';

export class CueTrackInfo {
  number: number;

  title: string;

  performer: string;

  fileName: string;

  indices: Map<number, CueTrackIndex> = new Map();

  constructor(
    number: number,
    title?: string,
    performer?: string,
    fileName?: string
  ) {
    this.number = number;
    this.title = title ?? '';
    this.performer = performer ?? '';
    this.fileName = fileName ?? '';
  }

  getTrack(): string {
    return `${this.number}.${this.performer} - ${this.title}`;
  }

  toString(): string {
    let indices: string = '';
    this.indices.forEach((value, key) => {
      indices += `${INDENT}INDEX ${zeroFill(key)} ${value}${EOL}`;
    });

    return `TRACK ${zeroFill(
      this.number
    )} AUDIO${EOL}${INDENT}TITLE "${escapeString(
      this.title
    )}"${EOL}${INDENT}PERFORMER "${escapeString(
      this.performer
    )}"${EOL}${indices}`;
  }
}
