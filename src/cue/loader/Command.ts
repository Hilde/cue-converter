export class Command {
  level: number;

  type: string; // CommandType

  args: Array<string>;

  constructor(level: number, type: string, args: Array<string>) {
    this.level = level;
    this.type = type;
    this.args = args;
  }
}
