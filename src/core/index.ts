import * as fs from 'fs'
import archiver from 'archiver'
import * as path from 'path'
import {
  getFileName, resolvePath, getDirName, getExtName, getFileNameWithExt
} from '../utils'

function compressSingleFile(inputPathName: string, outputPathName: string, level: number = 6) {
  const output = fs.createWriteStream(path.join(resolvePath(outputPathName), `${getFileName(inputPathName)}.zip`))
  const archive = archiver('zip', {
    zlib: {
      level
    }
  })
  archive.pipe(output)
  const stream = fs.createReadStream(resolvePath(inputPathName))
  archive.append(stream, {
    name: getFileNameWithExt(inputPathName)
  })
}

export default {}
