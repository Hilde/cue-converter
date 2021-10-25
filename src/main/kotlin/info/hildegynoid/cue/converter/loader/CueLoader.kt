package info.hildegynoid.cue.converter.loader

import info.hildegynoid.cue.converter.entity.CueFileInfo
import info.hildegynoid.cue.converter.entity.CueSheet
import info.hildegynoid.cue.converter.entity.CueTrackIndex
import info.hildegynoid.cue.converter.entity.CueTrackInfo
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader
import java.io.Reader
import java.io.StringReader
import java.util.regex.Matcher
import java.util.regex.Pattern

class CueLoader {
    private val cueSheet = CueSheet()
    private var reader: Reader
    private var currentFileInfo: CueFileInfo? = null
    private var currentTrackInfo: CueTrackInfo? = null
    private var rekordboxDjMode: Boolean = false

    companion object {
        const val RECORDED_BY = "RECORDED_BY"
        const val REKORDBOX_DJ = "rekordbox-dj"
    }

    constructor(input: String) {
        reader = StringReader(input)
    }

    constructor(inputStream: InputStream) {
        reader = InputStreamReader(inputStream)
    }

    constructor(file: File) {
        reader = FileReader(file)
    }

    fun load(): CueSheet {
        try {
            BufferedReader(reader).use { bufferedReader ->
                do {
                    val line: String = bufferedReader.readLine() ?: break
                    if (line.trim().isEmpty()) {
                        continue
                    }
                    val command: Command = parseCommand(line) ?: continue
                    processCommand(command)
                } while (true)
            }
        } catch (ex: IOException) {
        }

        return cueSheet
    }

    private fun processCommand(command: Command) {
        when (command.type) {
            CommandType.TITLE -> {
                if (currentTrackInfo == null) {
                    cueSheet.title = command.args[0]
                } else {
                    currentTrackInfo!!.title = command.args[0]
                }
            }
            CommandType.PERFORMER -> {
                if (currentTrackInfo == null) {
                    cueSheet.performer = command.args[0]
                } else {
                    currentTrackInfo!!.performer = command.args[0]
                }
            }
            CommandType.REM -> {
                cueSheet.remarks[command.args[0]] = command.args[1]
                if (command.args[0] == RECORDED_BY && command.args[1] == REKORDBOX_DJ) {
                    rekordboxDjMode = true
                }
            }
            CommandType.FILE -> {
                if (command.level == 0) {
                    currentFileInfo = CueFileInfo(fileName = command.args[0], fileType = command.args[1])
                    cueSheet.files.add(currentFileInfo!!)
                }
            }
            CommandType.TRACK -> {
                if (currentFileInfo != null && currentFileInfo != null) {
                    currentTrackInfo = CueTrackInfo(command.args[0].toInt())
                    currentFileInfo!!.tracks.add(currentTrackInfo!!)
                }
            }
            CommandType.INDEX -> {
                currentTrackInfo?.run {
                    when (rekordboxDjMode) {
                        true -> parseIndexOfRekordbox(command.args[1])
                        false -> parseIndex(command.args[1])
                    }?.let {
                        indices.put(command.args[0].toInt(), it)
                    }
                }
            }
        }
    }

    private val indentPattern = Pattern.compile("^\\s*")
    private val argsPattern = Pattern.compile("([^\"]\\S*|\"[^\"]*\")\\s*")

    private fun parseCommand(input: String): Command? {
        var indentLevel = 0
        val indentMatch = indentPattern.matcher(input)
        while (indentMatch.find()) {
            indentLevel = indentMatch.group(0).length
        }
        val temp = input.trim()
        for (type in CommandType.values()) {
            if (temp.startsWith(type.name)) {
                val list: MutableList<String> = ArrayList()
                val m: Matcher = argsPattern.matcher(temp.substring(type.name.length + 1))
                while (m.find()) list.add(m.group(1).replace("\"", ""))
                return Command(indentLevel, type, list)
            }
        }
        return null
    }

    private fun parseIndex(index: String): CueTrackIndex? {
        val split = index.split(":").toTypedArray()
        return if (split.size < 3) null else CueTrackIndex(split[0].toInt(), split[1].toInt(), split[2].toInt())
    }

    private fun parseIndexOfRekordbox(index: String): CueTrackIndex? {
        val split = index.split(":").toTypedArray()
        return if (split.size < 3) null else CueTrackIndex(
            hours = split[0].toInt(),
            minutes = split[1].toInt(),
            seconds = split[2].toInt(),
            frames = 0
        )
    }
}
