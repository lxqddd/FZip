import * as fs from 'fs'
import archiver from 'archiver'
import * as path from 'path'
import {
  resolvePath, getFileNameWithExt, isFile
} from '../utils'
import { ICompressParams } from '../types'

export function compressSingleFile(compressParams: ICompressParams) {
  const output = fs.createWriteStream(path.join(
    resolvePath(compressParams.outputPathName),
    `${compressParams.outputFileName}.zip`
  ))

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
}

export function compressDir(compressParams: ICompressParams) {
  const output = fs.createWriteStream(path.join(
    resolvePath(compressParams.outputPathName),
    `${compressParams.outputFileName}.zip`
  ))
  const archive = archiver('zip', {
    zlib: {
      level: compressParams.level
    }
  })
  archive.pipe(output)
  archive.directory(compressParams.inputPathName, compressParams.outputFileName)
  archive.finalize()
}

export default function compress(compressParams: ICompressParams) {
  if (isFile(compressParams.inputPathName)) {
    compressSingleFile(compressParams)
  } else {
    compressDir(compressParams)
  }
}
