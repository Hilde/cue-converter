const INDENT = '\t';
const EOL = '\r\n';

function fetchAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onload = () => {
      const { result } = fr;
      if (result) {
        if (typeof result !== 'string') {
          reject(new Error('FileReader did not return as string'));
          return;
        }
        resolve(result);
      } else {
        reject(fr.error);
      }
    };

    fr.readAsText(file);
  });
}

function escapeString(str: string): string {
  return str.replace('"', '\\"');
}

function prependIndent(str: string, indent: string = INDENT) {
  const regex = /^(?!\s*$)/gm;
  return str.replace(regex, indent);
}

function zeroFill(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }
  return num.toString();
}

export { INDENT, EOL };
export { fetchAsText, escapeString, prependIndent, zeroFill };
