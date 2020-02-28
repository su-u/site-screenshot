# site-screenshot
サイトの参考サイトのimgを取得します。
扱いには十分注意を払ってください。

```
src/data.json
```

にて取得するサイトを指定します。
すべてのURLに対して指定のデバイスでのimgを保存します。

出力後は
```
yarn run ejs
```
を実行し`out.json`から`index.html`を生成できます。