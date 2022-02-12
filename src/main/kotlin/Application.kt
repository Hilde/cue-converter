package info.hildegynoid.cue.converter

import info.hildegynoid.cue.converter.loader.CueLoader
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.html.respondHtml
import io.ktor.http.ContentDisposition
import io.ktor.http.HttpHeaders
import io.ktor.http.content.PartData
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.http.content.streamProvider
import io.ktor.request.receiveMultipart
import io.ktor.response.header
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import kotlinx.html.FormEncType
import kotlinx.html.FormMethod
import kotlinx.html.a
import kotlinx.html.body
import kotlinx.html.br
import kotlinx.html.fileInput
import kotlinx.html.form
import kotlinx.html.h2
import kotlinx.html.p
import kotlinx.html.submitInput

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module(testing: Boolean = false) {
    routing {
        var fileName = ""
        var result = ""

        static("/static") {
            resources("files")
        }

        get("/") {
            call.respondHtml {
                body {
                    h2 { +"Timestamp converter for CUE file" }

                    form(
                        "/submit",
                        classes = "pure-form-stacked",
                        encType = FormEncType.multipartFormData,
                        method = FormMethod.post
                    ) {
                        acceptCharset = "utf-8"
                        fileInput { name = "file" }
                        submitInput(classes = "pure-button pure-button-primary") { value = "Upload" }
                    }

                    br()

                    p { +"Rekordboxが出力するcueファイルを、mixcloudでタイムスタンプが反映されるように変換します。ファイルの内容はサーバ側には保存しません。" }
                    p { +"Convert the cue file output by Rekordbox so that the timestamp is reflected in mixcloud. The contents of the file will not be stored on the server."}

                    p {
                        +"Contact: "
                        a(href = "https://twitter.com/hilde") { +"@hilde" }
                    }
                }
            }
        }

        post("/submit") {
            val multipartData = call.receiveMultipart()
            val part = multipartData.readPart()
            if (part != null && part is PartData.FileItem) {
                part.streamProvider().use { stream ->
                    var cue = CueLoader(stream)
                    var sheet = cue.load()
                    result = sheet.toString()
                }
                fileName = downloadFileName(part.originalFileName) ?: "cuesheet.cue"
            }

            call.response.header(
                HttpHeaders.ContentDisposition, ContentDisposition.Attachment.withParameter(
                    ContentDisposition.Parameters.FileName, fileName
                ).toString()
            )
            call.respondText(result)
        }
    }
}

private fun downloadFileName(filename: String?): String? {
    if (filename == null) return null
    return filename.replace(".", "-1.")
}
