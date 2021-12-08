# cue-converter
This is a tool to convert the timestamps of the cue file output by Rekordbox DJ.

Rekordbox DJが出力するcueファイルのタイムスタンプを変換するツールです。
一般的なcueファイルのタイムスタンプは `分:秒:フレーム` ですが、Rekordboxでは `時:分:秒` となっていて、mixcloud等でタイムスタンプが機能しません。このツールにドロップするとタイムスタンプを置換し、別のファイルに出力します。
