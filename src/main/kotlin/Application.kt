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
import kotlinx.html.div
import kotlinx.html.fileInput
import kotlinx.html.footer
import kotlinx.html.form
import kotlinx.html.head
import kotlinx.html.header
import kotlinx.html.id
import kotlinx.html.label
import kotlinx.html.meta
import kotlinx.html.nav
import kotlinx.html.p
import kotlinx.html.script
import kotlinx.html.section
import kotlinx.html.span
import kotlinx.html.styleLink
import kotlinx.html.submitInput
import kotlinx.html.title
import kotlinx.html.unsafe

const val titleValue = "cue-converter: Timestamp converter for Rekordbox CUE file"

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module(testing: Boolean = false) {
    routing {
        var fileName = ""
        var result = ""

        static("/static") {
            resources("static")
        }

        get("/") {
            call.respondHtml {
                head {
                    title { +titleValue }
                    styleLink("https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css")
                    meta(name="viewport", content="width=device-width, initial-scale=1")
                }
                body {
                    nav("navbar") {
                        div("navbar-brand") {
                            a(classes = "navbar-item") { +titleValue }
                        }
                    }

                    section("section") {
                        id = "dropArea"

                        div("container") {
                            p("has-text-grey") { + "ファイルをここにドロップするか、クリックして選択" }
                            p("has-text-grey") { + "Drop a file here or choose a file" }

                            br()

                            form(
                                "/submit",
                                classes = "pure-form-stacked",
                                encType = FormEncType.multipartFormData,
                                method = FormMethod.post
                            ) {
                                acceptCharset = "utf-8"

                                div("field is-horizontal") {
                                    div("file") {
                                        label("file-label") {
                                            fileInput(classes= "file-input") {
                                                name = "file"
                                                id = "file-input"
                                            }
                                            span("file-cta") {
                                                span("file-label") { +"Choose a file..." }
                                            }
                                            span("file-name") { + "No file selected" }
                                        }
                                    }
                                    submitInput(classes = "button is-primary") { value = "Upload" }
                                }
                            }

                            br()

                            div("card") {
                                div("card-content") {
                                    p { +"Rekordboxが出力するcueファイルを、Mixcloudでタイムスタンプが反映されるように変換します。ファイルの内容はサーバ側には保存しません。" }
                                    p { +"Convert the cue file output by Rekordbox so that the timestamp is reflected in mixcloud. The contents of the file will not be stored on the server." }

                                    br()

                                    p { +"Rekordbox 5.3以降ならPerformanceモードで直接Mixcloudにアップロードできます。"
                                        a("https://cdn.rekordbox.com/files/20200402083423/rekordbox6.0.0_manual_JA.pdf") { +"マニュアル(pdf)" }
                                        +"154ページ参照"
                                    }
                                }
                            }

                            br()

                            div("card") {
                                header("card-header") {
                                    p("card-header-title") {
                                        +"更新履歴"
                                    }
                                }
                                div("card-content") {
                                    p { +"2022-06-10 追加: ファイルのドラッグ＆ドロップに対応しました。" }
                                    p { +"2022-03-07 修正: 1時間を超えるタイムスタンプを反映できていませんでした。" }
                                }
                            }
                        }
                    }

                    footer("footer") {
                        div("content") {
                            p { +"Contact" }
                            p {
                                +"Twitter: "
                                a("https://twitter.com/hilde") { +"@hilde" }
                            }
                            p {
                                +"Discord: Hildeko#1039"
                            }
                        }
                    }

                    script {
                        unsafe {
                            raw("""
                                const dropArea = document.getElementById('dropArea');
                                const fileInput = document.getElementById('file-input');
                                dropArea.addEventListener('dragover', function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.style.background = '#e1e7f0';
                                }, false);
                                dropArea.addEventListener('dragleave', function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.style.background = '#fff';
                                }, false);
                                dropArea.addEventListener('drop', function(e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    this.style.background = '#fff';
                                    if (e.dataTransfer.files.length > 0) {
                                      fileInput.files = e.dataTransfer.files;
                                      const fileName = document.querySelector('.file-name');
                                      fileName.textContent = fileInput.files[0].name;
                                    }
                                }, false);

                                fileInput.onchange = () => {
                                  if (fileInput.files.length > 0) {
                                    const fileName = document.querySelector('.file-name');
                                    fileName.textContent = fileInput.files[0].name;
                                  }
                                }
                        """)
                        }
                    }
                }
            }
        }

        post("/submit") {
            val multipartData = call.receiveMultipart()
            val part = multipartData.readPart()
            if (part != null && part is PartData.FileItem) {
                part.streamProvider().use { stream ->
                    val cue = CueLoader(stream)
                    val sheet = cue.load()
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
