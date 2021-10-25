package info.hildegynoid.cue.converter

import info.hildegynoid.cue.converter.loader.CueLoader
import javafx.application.Application
import javafx.application.Platform
import javafx.scene.Scene
import javafx.scene.control.Label
import javafx.scene.input.TransferMode
import javafx.scene.layout.VBox
import javafx.stage.Stage
import java.io.File
import java.nio.file.Path

class Main : Application() {
    companion object {
        const val TITLE = "cue-converter"
        const val VERSION = "1.0"
        const val WIDTH = 400.0
        const val HEIGHT = 400.0
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

    override fun start(stage: Stage) {
        val root = VBox()
        val log = VBox()
        log.children.add(Label("Drop Rekordbox CUE sheet here to convert."))
        root.children.add(log)

        try {
            root.setOnDragOver { event ->
                if (event.dragboard.hasFiles()) {
                    event.acceptTransferModes(TransferMode.MOVE)
                }
            }

            root.setOnDragDropped { event ->
                val board = event.dragboard
                if (board.hasFiles()) {
                    board.files.forEach { file ->
                        getOutputFilename(file)?.let { outputFile ->
                            log.children.add(Label("Input: ${file.absolutePath}"))
                            log.children.add(Label("Output: ${outputFile.absolutePath}"))
                            val cue = CueLoader(file)
                            val sheet = cue.load()
                            outputFile.writeText(sheet.toString())
                        } ?: log.children.add(Label("Failed to convert ${file.name}"))
                    }
                    event.isDropCompleted = true
                } else {
                    event.isDropCompleted = false
                }
            }

            val scene = Scene(root, WIDTH, HEIGHT)
            stage.title = "$TITLE v.$VERSION"
            stage.scene = scene
            stage.show()
        } catch (e: Exception) {
            log.children.add(Label("Error: ${e.message}"))
            e.printStackTrace()
        }
    }

    override fun stop() {
        Platform.exit()
    }
}
