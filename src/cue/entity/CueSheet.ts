import { CueFileInfo } from './CueFileInfo';
import { EOL, escapeString } from '../Utils';

export class CueSheet {
  title: string = '';

  performer: string = '';

  remarks: Map<string, string> = new Map();

  files: Array<CueFileInfo> = [];

  getTracks(): Array<string> {
    let list = Array<string>();
    this.files.forEach((file) => {
      list = list.concat(file.getTrackList());
    });
    return list;
  }

  toString = (): string => {
    let result = '';

    this.remarks.forEach((value, key) => {
      result += `REM ${key} "${escapeString(value)}"${EOL}`;
    });

    result += `TITLE "${escapeString(this.title)}"${EOL}`;
    result += `PERFORMER "${escapeString(this.performer)}"${EOL}`;
    result += this.files.join('');
    return result;
  };
}
