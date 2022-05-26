import * as fs from 'fs'
import archiver from 'archiver'
import * as path from 'path'
import { resolvePath } from '../utils'

export function compress(level: number = 6) {
  const output = fs.createWriteStream(path.join(resolvePath('/asd'), '/example.zip'))
  const archive = archiver('zip', {
    zlib: {
      level
    }
  })

  archive.pipe(output)
}

export default {}
