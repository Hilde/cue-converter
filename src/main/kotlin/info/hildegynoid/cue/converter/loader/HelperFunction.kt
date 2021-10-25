package info.hildegynoid.cue.converter.loader

const val INDENT = "\t"
const val EOL = "\r\n"

fun String.escape(): String = this.replace("\"", "\\\"")
