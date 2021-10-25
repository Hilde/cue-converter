package info.hildegynoid.cue.converter.entity

import info.hildegynoid.cue.converter.loader.EOL
import info.hildegynoid.cue.converter.loader.INDENT
import info.hildegynoid.cue.converter.loader.escape

data class CueTrackInfo(
    var number: Int,
    var title: String = "",
    var performer: String = "",
    var fileName: String = "",
    var indices: MutableMap<Int, CueTrackIndex> = mutableMapOf()
) {
    override fun toString(): String {
        return String.format("TRACK %02d AUDIO", number) + EOL +
            INDENT + "TITLE \"${title.escape()}\"" + EOL +
            INDENT + "PERFORMER \"${performer.escape()}\"" + EOL +
            indices.map { INDENT + String.format("INDEX %02d", it.key) + " " + it.value + EOL }
                .joinToString("")
    }
}
