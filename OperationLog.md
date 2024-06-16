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



以前使っていたtsconfig.json

```
{
  "compilerOptions": {
    "pretty": true,
    "target": "esnext",
    "module": "esnext",
    "allowSyntheticDefaultImports": true,
    "preserveConstEnums": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "lib": ["es2017", "dom"],
    "types": [
      "inferno"
    ],
    "jsx": "preserve",
    "noUnusedLocals": true,
    "baseUrl": "./src",
    "noEmit": true,
    "skipLibCheck": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "node_modules/inferno/dist/index.d.ts"
  ]
}
```



#### Inferno

https://www.infernojs.org/docs/guides/getting-started

だいぶ忘れているので、Getting Startedから。

```
$ npm install --save inferno
$ npm install --save-dev babel-plugin-inferno
```

https://github.com/infernojs/inferno-typescript-example



`typescript`は、dependendiesじゃなくて、devDependenciesだった。



tslintは終わってた。

https://github.com/palantir/tslint/issues/4534



```
import path from 'path';
^^^^^^

SyntaxError: Cannot use import statemant outside a module.
```



https://stackoverflow.com/questions/41553291/can-you-import-nodes-path-module-using-import-path-from-path



`npm run build`を通すまで。



`import ～`は、package.jsonで、`type: "module"`の指定が必要。

https://webpack.js.org/guides/ecma-script-modules/#flagging-modules-as-esm

typeには、`module`と`commonjs`があり、`commonjs`の場合、`require`で外部ファイルを読み込む。

> CommonJs Syntax is not available: `require`, `module`, `exports`, `__filename`, `__dirname`.



__dirnameをエミュレートするスクリプト

```
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
```

https://nodejs.org/docs/latest-v15.x/api/esm.html#esm_import_meta_url

> ##### `import.meta.url`
>
> -  The absolute `file:` URL of the module.

https://nodejs.org/docs/latest-v15.x/api/url.html#url_url_fileurltopath_url

> - `url` \<URL> | \<String> The file URL string or URL object to convert to a path.
> - Returns:  \<string> The fully-resolved platform-specific Node.js file path.



わざわざ、CommonJSの`__dirname`に名前を寄せなくてもいいか。



#### ESLint

https://eslint.org/docs/latest/use/getting-started

```
$ npm install --save-dev eslint
$ npm init @eslint/config@latest
```



`npm init`中のwarning

```
npm WARN using --force Recommended protections disabled.
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: eslint-plugin-react@7.34.1
npm WARN Found: eslint@9.3.0
npm WARN node_modules/eslint
npm WARN   dev eslint@"9.x" from the root project
npm WARN   1 more (@eslint-community/eslint-utils)
npm WARN
npm WARN Could not resolve dependency:
npm WARN peer eslint@"^3 || ^4 || ^5 || ^6 || ^7 || ^8" from eslint-plugin-react@7.34.1
npm WARN node_modules/eslint-plugin-react
npm WARN   dev eslint-plugin-react@"*" from the root project
npm WARN
npm WARN Conflicting peer dependency: eslint@8.57.0
npm WARN node_modules/eslint
npm WARN   peer eslint@"^3 || ^4 || ^5 || ^6 || ^7 || ^8" from eslint-plugin-react@7.34.1
npm WARN   node_modules/eslint-plugin-react
npm WARN     dev eslint-plugin-react@"*" from the root project
npm WARN ERESOLVE overriding peer dependency
npm WARN ERESOLVE overriding peer dependency
npm WARN ERESOLVE overriding peer dependency
npm WARN ERESOLVE overriding peer dependency
npm WARN While resolving: typescript-eslint@7.10.0
npm WARN Found: eslint@9.3.0
npm WARN node_modules/eslint
npm WARN   dev eslint@"9.x" from the root project
npm WARN   1 more (@eslint-community/eslint-utils)
npm WARN
npm WARN Could not resolve dependency:
npm WARN peer eslint@"^8.56.0" from typescript-eslint@7.10.0
npm WARN node_modules/typescript-eslint
npm WARN   dev typescript-eslint@"*" from the root project
npm WARN
npm WARN Conflicting peer dependency: eslint@8.57.0
npm WARN node_modules/eslint
npm WARN   peer eslint@"^8.56.0" from typescript-eslint@7.10.0
npm WARN   node_modules/typescript-eslint
npm WARN     dev typescript-eslint@"*" from the root project
npm WARN ERESOLVE overriding peer dependency
```



とりあえず、実行

```
$ npx eslint src/
Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .

/home/stone/workspace/calendar/ts_inferno/src/calendar_app.tsx
  3:8  error  'React' must be in scope when using JSX  react/react-in-jsx-scope

✖ 1 problem (1 error, 0 warnings)
```



https://ja.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint

> eslint-plugin-reactを使用している場合、`react/jsx-uses-react` と `react/react-in-jsx-scope` のルールは不要になりますので、無効にするか削除することができます。



何も考えずにeslint v9をインストールしたけど、eslint-plugin-infernoがeslint v8までにしか対応してない。

インストールし直し。



```
## eslint v8をインストール
$ npm install --save-dev eslint@8

## 初期化
$ npm init @eslint/config
Need to install the following packages:
@eslint/create-config@1.1.1
Ok to proceed? (y) y
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser
The config that you've selected requires the following dependencies:

eslint@9.x, globals, @eslint/js, typescript-eslint
✔ Would you like to install them now? · No / Yes
Successfully created /home/stone/workspace/calendar/ts_inferno/node_modules/eslint.config.js file.
You will need to install the dependencies yourself.

## 依存パッケージをインストール
$ npm install --save-dev globals @eslint/js typescript-eslint

## infernoプラグインをインストール
 $ npm install --save-dev eslint-plugin-inferno
```



> This config system is feature complete but not enabled by default. To opt-in, place an `eslint.config.js` file in the root of your project or set the `ESLINT_USE_FLAT_CONFIG` environment variable to `true`.



#### テストフレームワーク

以前は、[chai](https://www.npmjs.com/package/chai)、[mocha](https://www.npmjs.com/package/mocha)を触っていたけど、そんな本格的でもない。

メインストリームは、[jest](https://www.npmjs.com/package/jest)かな？

Weekly Downloadは、chai 105万、mocha 75万、jest 225万。

「以前から使っていたもの」という縛りからは外れるが、jestを採用する。

IntelliJもデフォルトでjestに対応してるみたいだし。



https://jestjs.io/docs/getting-started



インストールは、実際にテストを書く段階になったときに。



#### SASS

```json
{
        mode: 'development',
        entry: './src/calendar.sass',
        module: {
            rules: [
                {
                    test: /\.sass/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: 'calendar.css'}),
        ],
        output: {
            filename: 'calendar_sass.js',
            path: dir_name + 'htdocs'
        },
    },
```

そういえば、一緒に.jsが出力されるんだった。

https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151

.jsファイルを削除するプラグイン

https://www.npmjs.com/package/webpack-fix-style-only-entries



### 実装メモ

#### イベント

例えば、下位コンポーネントからコールバックして欲しいとき、

```jsx
<Switcher weekStartDate={this.state.weekStartDate} onChanged={this.weekStartDateChanged}/>
```

と、関数をそのまま指定すると、`'this' is not object`みたいなエラーになる。

これは、thisのスコープの話なので、`{this.weekStartDateChanged.bind(this)}`と書けば、エラーは解消できる。



けど、Inferno的には`linkEvent`というヘルパーを使うのが作法みたい

https://www.infernojs.org/docs/guides/event-handling



```
linkEvent<string, Event>
```

なんだけど。。。？？？



#### そもそもInfernojs

スピード面で[solidjs](https://www.solidjs.com/)に抜かれてる。

今後、新しいプロジェクトで採用するメリットが無くなっちゃった。



#### 月の移動

本当は、`http://hostname/2024/6`みたいな形にしたいけど、このURLのままリロードすると、NotFoundになってしまう。

何か方法があるのかもしれないけど、ちょっとわからない。

仕方がないので、`http://hostname/#/2024/6`とhashを変える方法で対応する。

