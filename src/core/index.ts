import * as fs from 'fs'
import * as path from 'path'
import archiver from 'archiver'

const pwd = process.cwd()

export function resolvePath(pathName: string): string {
  if (path.isAbsolute(pathName)) {
    return pathName
  }
  return path.join(pwd, pathName)
}

export default {}
