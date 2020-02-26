// @ts-ignore
import * as fs from "fs";

export const checkDir = (dir: string) =>{
  fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, (error) => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.mkdirSync(dir);
      } else {
        return;
      }
    }
  });
};

export const readUrls = (fileName: string): string[] => {
  const text = fs.readFileSync(fileName, 'utf8');
  const lines = text.toString().split('¥n');
  return lines;
};

export const rename = (fileName: string) => {
  return fileName.replace(/[\.\"\,\\\/\=\[\]\:\;\|\s]/g,'');
};