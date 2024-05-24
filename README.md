## カレンダー

カレンダーをTypeScript、Infernoで実装する

### 仕様

* 2015～2034年までの20年間を表示する
* 月別カレンダー、年間カレンダーの２通りを選択できる
* 日曜始まり、月曜始まりを選択できる
* 日本の暦の休日、祝日を表示する
  * 2025年以降の春分の日、秋分の日は暫定的にそれぞれ3/20、9/22とする
  * 休日・祝日の「〇〇の日」もあわせて表示する
* URLで表示する年月を指定できる
  * 月別 2024年1月：`/2024/01`
  * 年別 2024年：`/2024`



## 開発環境

WSL2のAlmaLinux9上で開発を行った。

エディタは、IntelliJ IDEA。

node.jsは、`v20.13.1` (nvm)

