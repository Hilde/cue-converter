package info.hildegynoid.cue.converter.entity

data class CueTrackIndex(
    var minutes: Int,
    var seconds: Int,
    var frames: Int,
    var hours: Int = 0 // rekordbox-dj
) {
    override fun toString(): String {
        return String.format("%02d:%02d:%02d", minutes, seconds, frames)
    }
}
