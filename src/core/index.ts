import { ICompressParams } from '../types'
import { isFile } from '../utils'
import { compressDir, compressSingleFile } from './compression'

export default function compression(compressParams: ICompressParams) {
  if (isFile(compressParams.inputPathName)) {
    compressSingleFile(compressParams)
  } else {
    compressDir(compressParams)
  }
}
