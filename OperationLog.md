## 作業ログ



### 開発準備

事前に、nvmでnode v20系をインストール済み。

```
$ npm init

package name: (ts_inferno) calendar
version: (1.0.0)
description: Implementation of calendar with TypeScript and Inferno
entry point: (index.js) app.js
test command:
git repository: https://github.com/stonejpn/calendar_ts_inferno
keywords:
author: S.Tonegawa
license: (ISC)
About to write to /home/stone/workspace/calendar/ts_inferno/package.json:
```



関係ないけど、ctrl+cでコピーが慣れない。



### npmパッケージ



#### WebPack

https://webpack.js.org/guides/getting-started/

```
$ npm install --save-dev webpack webpack-cli http-server
```

ひとまず、buildして、http-serverでアクセスできるように。



package.json

```json5
  "scripts": {
    "start": "http-server htdocs",
    "build": "webpack",
  },

  "devDependencies": {
    "http-server": "^14.1.1",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  }
```



http-serverが止められない。

`ps ax`して、PIDを探して、`kill`する。

きちんと止められる方法を探す。



→シェルスクリプト書いた。bin/http_server_ctl.sh



ターミナルから、`npm run start`とすると、http-serverが立ち上がるけど、IntelliJから、起動すると、http-serverが立ち上がらない。（←これは後回し。TODO)



#### TypeScript

https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.htm

https://webpack.js.org/guides/typescript/



```
$ npm intall --save typescript
```



tsconfig.json

```
$ npm install --save-dev @tsconfig/node20
```

https://www.npmjs.com/package/@tsconfig/node20

今は、TSConfig Baseを使うのがおすすめの方法らしい。

実際のtsconfig.jsonの中身はこれ↓

```json5
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```





#### Inferno

https://www.infernojs.org/docs/guides/getting-started

だいぶ忘れているので、Getting Startedから。

```
$ npm install --save inferno
```
