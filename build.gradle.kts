import org.jetbrains.compose.compose
import org.jetbrains.compose.desktop.application.dsl.TargetFormat
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	kotlin("jvm") version "1.5.31"
	id("org.jetbrains.compose") version "1.0.0"
	id("org.jlleitschuh.gradle.ktlint") version "10.2.0"
	id("com.google.osdetector") version "1.6.2"
}

group = "info.hildegynoid"
version = 1.0

repositories {
	google()
	mavenCentral()
	maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
}

dependencies {
	implementation(compose.desktop.currentOs)
	testImplementation(kotlin("test"))
}

tasks.withType<KotlinCompile> {
	kotlinOptions.jvmTarget = "16"
	kotlinOptions.freeCompilerArgs += "-Xuse-experimental=true -Xopt-in=kotlin.RequiresOptIn"
}

tasks.test {
	useJUnitPlatform()
}

compose.desktop {
	application {
		mainClass = "info.hildegynoid.cue.converter.MainKt"
		nativeDistributions {
			targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
			packageName = "cue-converter"
			packageVersion = "1.0.0"

			val iconsRoot = project.file("src/main/resources/images")
			macOS {
				iconFile.set(iconsRoot.resolve("icon.icns"))
			}
			windows {
				iconFile.set(iconsRoot.resolve("icon.ico"))
			}
		}
	}
}

tasks.register<Zip>("zip") {
	dependsOn("createDistributable")
	archiveFileName.set("${project.buildDir}/distributions/cue-converter-${osdetector.classifier}.zip")
	from("${project.buildDir}/compose/binaries/main/app")
}
