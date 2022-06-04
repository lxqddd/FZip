import * as path from 'path'
import * as fs from 'fs'
import argv from 'minimist'
import { ICompressParams, IFillObj } from '../types'

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
    f: inputPathName = argv.f || argv._[0],
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

function getDirSubFilesInfo(path: string, filesList: IFillObj[]) {
  const files = fs.readdirSync(path)
  function walk(file: string) {
    const states = fs.statSync(`${path}/${file}`)
    if (states.isDirectory()) {
      getDirSubFilesInfo(`${path}/${file}`, filesList)
    } else {
      const obj: IFillObj = {
        size: 0,
        name: '',
        path: ''
      }
      obj.size = states.size
      obj.name = file
      obj.path = `${path}/${file}`
      filesList.push(obj)
    }
  }
  files.forEach(walk)
}
export function getDirSize(path: string) {
  const filesList: IFillObj[] = []
  getDirSubFilesInfo(path, filesList)
  let totalSize = 0
  for (let i = 0; i < filesList.length; i++) {
    const item = filesList[i]
    totalSize += item.size
  }
  return totalSize
}
