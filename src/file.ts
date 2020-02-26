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
