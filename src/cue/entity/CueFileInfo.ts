import { EOL, escapeString, prependIndent } from '../Utils';
import { CueTrackInfo } from './CueTrackInfo';

export class CueFileInfo {
  fileName: string = '';

  fileType: string = '';

  tracks: Array<CueTrackInfo> = [];

  constructor(fileName: string, fileType: string) {
    this.fileName = fileName;
    this.fileType = fileType;
  }

  getTrackList(): Array<string> {
    const list = Array<string>();
    this.tracks.forEach((track) => {
      list.push(track.getTrack());
    });
    return list;
  }

  toString(): string {
    // return prependIndent(
    //   `FILE "${escapeString(this.fileName)}" ${
    //     this.fileType
    //   }${EOL}${this.tracks.join('')}`
    return `FILE "${escapeString(this.fileName)}" ${
      this.fileType
    }${EOL}${prependIndent(this.tracks.join(''))}`;
  }
}
