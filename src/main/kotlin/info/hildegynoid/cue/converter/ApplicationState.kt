package info.hildegynoid.cue.converter

import info.hildegynoid.cue.converter.loader.CueLoader
import kotlinx.coroutines.DelicateCoroutinesApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.File
import java.nio.file.Path

class ApplicationState {
    private var saveJob: Job? = null

    suspend fun open(inputFile: File) {
        val outputFile = getOutputFilename(inputFile)

        if (outputFile == null) {
            showPopupMessage("Can't create output file.")
            return
        }

        try {
            val content = inputFile.readTextAsync()
            val cue = CueLoader(content)
            val sheet = cue.load()

            saveJob?.cancel()
            saveJob = outputFile.launchSaving(sheet.toString())
            saveJob?.join()
            showPopupMessage("File is saved: $outputFile")
        } catch (ex: Exception) {
            ex.printStackTrace()
            showPopupMessage("File isn't saved: $outputFile")
        }
    }

    private fun getOutputFilename(input: File): File? {
        if (!input.isFile) {
            return null
        }

        val outputFilebase = Path.of(input.parent, input.nameWithoutExtension)
        var outputFile = File(outputFilebase.toString() + "-1." + input.extension)
        for (i in 1..10) {
            if (!outputFile.exists()) {
                return outputFile
            }
            outputFile = File(outputFilebase.toString() + "-$i." + input.extension)
        }
        return null
    }
}

@OptIn(DelicateCoroutinesApi::class)
private fun File.launchSaving(text: String) = GlobalScope.launch {
    writeTextAsync(text)
}

private suspend fun File.writeTextAsync(text: String) = withContext(Dispatchers.IO) {
    writeText(text)
}

private suspend fun File.readTextAsync() = withContext(Dispatchers.IO) {
    readText()
}
