package info.hildegynoid.cue.converter

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.WindowState
import androidx.compose.ui.window.singleWindowApplication
import info.hildegynoid.cue.converter.view.Toast
import kotlinx.coroutines.launch
import java.awt.datatransfer.DataFlavor
import java.awt.dnd.DnDConstants
import java.awt.dnd.DropTarget
import java.awt.dnd.DropTargetAdapter
import java.awt.dnd.DropTargetDropEvent
import java.io.File

private val toastMessage: MutableState<String> = mutableStateOf("")
private val toastState: MutableState<Boolean> = mutableStateOf(false)

fun main() = singleWindowApplication(
    title = "Cue sheet converter",
    state = WindowState(width = 400.dp, height = 400.dp)
) {
    val state = remember { ApplicationState() }
    val scope = rememberCoroutineScope()

    LaunchedEffect(Unit) {
        window.dropTarget = DropTarget().apply {
            addDropTargetListener(object : DropTargetAdapter() {
                @Synchronized
                override fun drop(evt: DropTargetDropEvent) {
                    try {
                        evt.acceptDrop(DnDConstants.ACTION_REFERENCE)
                        val droppedFiles = evt.transferable.getTransferData(DataFlavor.javaFileListFlavor) as List<*>
                        droppedFiles.first()?.let {
                            scope.launch { state.open(it as File) }
                        }
                    } catch (ex: Exception) {
                        ex.printStackTrace()
                        showPopupMessage("Error: $ex.message")
                    }
                }
            })
        }
    }

    MaterialTheme {
        Surface {
            Column(Modifier.fillMaxSize(), Arrangement.spacedBy(5.dp)) {
                Text("Drop Rekordbox CUE sheet here to convert.")
            }
        }
    }

    Toast(toastMessage.value, toastState)
}

fun showPopupMessage(text: String) {
    toastMessage.value = text
    toastState.value = true
}
