import * as path from 'path'
import * as fs from 'fs'
import argv from 'minimist'
import { ICompressParams } from '../types'

export const pwd = process.cwd()

export function resolvePath(pathName: string) {
  if (path.isAbsolute(pathName)) {
    return pathName
  }
  return path.join(pwd, pathName)
}

export function isFile(pathName: string) {
  return fs.lstatSync(resolvePath(pathName)).isFile()
}

export function isDir(pathName: string) {
  return fs.lstatSync(resolvePath(pathName)).isDirectory()
}

export function getExtName(pathName: string) {
  return path.extname(pathName)
}

export function getFileName(pathName: string) {
  if (isFile(pathName)) {
    const ext = getExtName(pathName)
    return path.basename(pathName, ext)
  }
  return path.basename(pathName)
}

export function getFileNameWithExt(pathName: string) {
  return path.basename(pathName)
}

export function getDirName(pathName: string) {
  return path.dirname(pathName)
}

export function formatCompressParams(argv: argv.ParsedArgs): ICompressParams {
  const {
    f: inputPathName,
    o: outputPathName = argv.o || getDirName(inputPathName),
    l: level = 6,
    n: outputFileName = argv.n || getFileName(inputPathName)
  } = argv

  return {
    inputPathName,
    outputPathName,
    level,
    outputFileName
  }
}
