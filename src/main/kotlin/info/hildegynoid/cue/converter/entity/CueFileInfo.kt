package info.hildegynoid.cue.converter.entity

import info.hildegynoid.cue.converter.loader.EOL
import info.hildegynoid.cue.converter.loader.INDENT
import info.hildegynoid.cue.converter.loader.escape

data class CueFileInfo(
    var fileName: String,
    var fileType: String,
    var tracks: MutableList<CueTrackInfo> = mutableListOf()
) {
    override fun toString(): String {
        return "FILE \"${fileName.escape()}\" $fileType" + EOL +
            tracks.joinToString("") { it.toString() }
                .prependIndent(INDENT)
    }
}
