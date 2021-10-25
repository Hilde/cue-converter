package info.hildegynoid.cue.converter.entity

import info.hildegynoid.cue.converter.loader.EOL
import info.hildegynoid.cue.converter.loader.escape

data class CueSheet(
    var title: String = "",
    var performer: String = "",
    var remarks: MutableMap<String, String> = mutableMapOf(),
    var files: MutableList<CueFileInfo> = mutableListOf()
) {
    override fun toString(): String {
        return remarks.map {
            "REM ${it.key} \"${it.value.escape()}\"" + EOL
        }.joinToString("") +
            "TITLE \"${title.escape()}\"" + EOL +
            "PERFORMER \"${performer.escape()}\"" + EOL +
            files.joinToString("") { it.toString() }
    }
}
