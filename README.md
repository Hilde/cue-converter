# cue-converter
This is a tool to convert the timestamps of the cue file output by Rekordbox DJ.

Rekordbox DJが出力するcueファイルのタイムスタンプを変換するツールです。
一般的なcueファイルのタイムスタンプは `分:秒:フレーム` ですが、Rekordboxでは `時:分:秒` となっていて、mixcloud等でタイムスタンプが機能しません。このツールにドロップするとタイムスタンプを置換し、別のファイルに出力します。


## Resources
- [Bulma](https://bulma.io/): CSS framework
- [kotlinx.html](https://kotlinlang.org/docs/typesafe-html-dsl.html): Typesafe HTML DSL


## Local development

### Continuous build
```shell
./gradlew build -t
```

### Run local web server
```shell
./gradlew run
```


## How to deploy on Heroku

### Prerequisite
- Git installation
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Deploy (on the master branch)

```shell
git push heroku master
```

### Deploy (on the non-master branch)

```shell
git push heroku <current-branch>:master
```
