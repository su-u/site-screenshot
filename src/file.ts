// @ts-ignore
import * as fs from "fs";
const path = require("path");

export const checkDir = (dir: string) => {
  fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, error => {
    if (error) {
      if (error.code === "ENOENT") {
        fs.mkdirSync(dir);
      } else {
        return;
      }
    }
  });
};

export const rename = (fileName: string) => {
  return fileName.replace(/[\.\"\,\\\/\=\[\]\:\;\|\s]/g, "");
};

const walk = function(p: any, callback: any) {
  let results: any = [];

  fs.readdir(p, function(err, files) {
    if (err) throw err;

    let pending = files.length;
    if (!pending) return callback(null, results); //全てのファイル取得が終わったらコールバックを呼び出す

    files
      .map(function(file) {
        //リスト取得
        return path.join(p, file);
      })
      .filter(function(file) {
        if (fs.statSync(file).isDirectory())
          walk(file, function(err: any, res: any) {
            //ディレクトリだったら再帰
            results.push({ name: path.basename(file), children: res }); //子ディレクトリをchildrenインデックス配下に保存
            if (!--pending) callback(null, results);
          });
        return fs.statSync(file).isFile();
      })
      .forEach(function(file) {
        //ファイル名を保存
        const stat = fs.statSync(file);
        results.push({ file: path.basename(file), size: stat.size });
        if (!--pending) callback(null, results);
      });
  });
};

const dir = "./docs/img";
export const out = () => {
  walk(dir, function (err: any, results: any) {
    if (err) throw err;
    const data = {name: "root", children: results};
    console.log(JSON.stringify(data)); //一覧出力
    fs.writeFileSync('./out.json', JSON.stringify(data));
  });
};