import { CueSheet } from '../entity/CueSheet';
import { CueFileInfo } from '../entity/CueFileInfo';
import { CueTrackInfo } from '../entity/CueTrackInfo';
import { CueTrackIndex } from '../entity/CueTrackIndex';
import { Command } from './Command';
import { CommandType } from './CommandType';

const RECORDED_BY = 'RECORDED_BY';
const REKORDBOX_DJ = 'rekordbox-dj';

export class CueLoader {
  private cueSheet = new CueSheet();

  private currentFileInfo: CueFileInfo | null = null;

  private currentTrackInfo: CueTrackInfo | null = null;

  private rekordboxDjMode: boolean = false;

  private indentPattern = /^\s*/;

  private argsPattern = /([^"]\S*|"[^"]*")\s*/g;

  load(content: string): CueSheet {
    content.split(/\r?\n/).forEach((line) => {
      if (line.trim() !== '') {
        const command: Command | null = this.parseCommand(line);
        if (command !== null) {
          this.processCommand(command);
        }
      }
    });

    return this.cueSheet;
  }

  private processCommand = (command: Command) => {
    switch (command.type) {
      case CommandType.TITLE:
        if (this.currentTrackInfo === null) {
          [this.cueSheet.title] = command.args;
        } else {
          [this.currentTrackInfo.title] = command.args;
        }
        break;
      case CommandType.PERFORMER:
        if (this.currentTrackInfo === null) {
          [this.cueSheet.performer] = command.args;
        } else {
          [this.currentTrackInfo.performer] = command.args;
        }
        break;
      case CommandType.REM:
        this.cueSheet.remarks.set(command.args[0], command.args[1]);
        if (
          command.args[0] === RECORDED_BY &&
          command.args[1] === REKORDBOX_DJ
        ) {
          this.rekordboxDjMode = true;
        }
        break;
      case CommandType.FILE:
        if (command.level === 0) {
          this.currentFileInfo = new CueFileInfo(
            command.args[0],
            command.args[1]
          );
          this.cueSheet.files.push(this.currentFileInfo);
        }
        break;
      case CommandType.TRACK:
        if (this.currentFileInfo !== null) {
          this.currentTrackInfo = new CueTrackInfo(
            parseInt(command.args[0], 10)
          );
          this.currentFileInfo!!.tracks.push(this.currentTrackInfo);
        }
        break;
      case CommandType.INDEX:
        if (this.currentTrackInfo !== null) {
          let index: CueTrackIndex | null = null;
          if (this.rekordboxDjMode) {
            index = CueLoader.parseIndexOfRekordbox(command.args[1]);
          } else {
            index = CueLoader.parseIndex(command.args[1]);
          }

          if (index !== null) {
            this.currentTrackInfo.indices.set(
              parseInt(command.args[0], 10),
              index
            );
          }
        }
        break;
      default:
      // TODO Error!
    }
  };

  private parseCommand(input: string): Command | null {
    let indentLevel = 0;
    const matched = input.match(this.indentPattern);
    if (matched) {
      indentLevel = matched[0].length;
    }

    const temp = input.trim();
    // for (const [key, value] of Object.entries(CommandType)) {
    for (let i = 0; i < Object.entries(CommandType).length; i += 1) {
      const [key, value] = Object.entries(CommandType)[i];
      if (temp.startsWith(key)) {
        const list = [];
        // let m;
        // while ((m = this.argsPattern.exec(temp.substring(key.length + 1))) !== null) {
        let m = this.argsPattern.exec(temp.substring(key.length + 1));
        while (m !== null) {
          list.push(m[1].replaceAll('"', ''));
          m = this.argsPattern.exec(temp.substring(key.length + 1));
        }
        return new Command(indentLevel, CommandType[value], list);
      }
    }

    // No command matched
    return null;
  }

  private static parseIndex(index: String): CueTrackIndex | null {
    const split = index.split(':');
    if (split.length < 3) {
      return null;
    }
    return new CueTrackIndex(
      parseInt(split[0], 10),
      parseInt(split[1], 10),
      parseInt(split[2], 10)
    );
  }

  private static parseIndexOfRekordbox(index: String): CueTrackIndex | null {
    const split = index.split(':');
    if (split.length < 3) {
      return null;
    }
    return new CueTrackIndex(
      parseInt(split[1], 10),
      parseInt(split[2], 10),
      0,
      parseInt(split[0], 10)
    );
  }
}
