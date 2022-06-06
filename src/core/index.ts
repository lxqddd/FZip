import * as fs from 'fs'
import archiver from 'archiver'
import * as path from 'path'
import CliProgress from 'cli-progress'
import ansiColors from 'ansi-colors'
import {
  resolvePath, getFileNameWithExt, isFile, getDirSize
} from '../utils'
import { ICompressParams } from '../types'

function compressSingleFile(compressParams: ICompressParams) {
  const destPath = path.join(path.join(
    resolvePath(compressParams.outputPathName),
    `${compressParams.outputFileName}.zip`
  ))
  const output = fs.createWriteStream(destPath)
  const archive = archiver('zip', {
    zlib: {
      level: compressParams.level
    }
  })
  archive.pipe(output)
  const stream = fs.createReadStream(resolvePath(compressParams.inputPathName))
  archive.append(stream, {
    name: getFileNameWithExt(compressParams.inputPathName)
  })
  archive.finalize()
  console.log(`输出位置：${ansiColors.yellow(destPath)}`)
}

function compressDir(compressParams: ICompressParams) {
  const dirSize = getDirSize(compressParams.inputPathName)
  const destPath = path.join(path.join(
    resolvePath(compressParams.outputPathName),
    `${compressParams.outputFileName}.zip`
  ))
  const output = fs.createWriteStream(destPath)
  const archive = archiver('zip', {
    zlib: {
      level: compressParams.level
    }
  })
  archive.pipe(output)
  archive.directory(compressParams.inputPathName, compressParams.outputFileName)
  const progressBar = new CliProgress.SingleBar({
    format: `压缩进度 |${ansiColors.green('{bar}')}| {percentage}%`,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  })
  progressBar.start(dirSize, 0)
  archive.on('progress', (progress) => {
    progressBar.increment()
    progressBar.update(progress.fs.processedBytes)
  })
  archive.on('finish', () => {
    progressBar.increment()
    progressBar.update(dirSize)
    progressBar.stop()
    console.log(`输出位置：${ansiColors.yellow(destPath)}`)
  })
  archive.finalize()
}

export default function compress(compressParams: ICompressParams) {
  if (isFile(compressParams.inputPathName)) {
    compressSingleFile(compressParams)
  } else {
    compressDir(compressParams)
  }
}
