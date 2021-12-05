package info.hildegynoid.cuecon.loader

import info.hildegynoid.cue.converter.loader.CueLoader
import org.junit.jupiter.api.Test
import java.io.File

class CueLoaderTest {

    @Test
    fun load() {
        val file = javaClass.classLoader.getResource("sample-1.cue")!!.toURI()
        println(file)
        val cue = CueLoader(File(file))
        val sheet = cue.load()
        println(sheet)
    }
}
