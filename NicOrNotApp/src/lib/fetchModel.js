import RNFS from 'react-native-fs'
import { compileModel } from 'react-native-coreml'
const fetchModel = async modelURL => {
  const modelName = modelURL.match(/([^\/]+)(?=\.\w+$)/)[0]
  const mlc = modelName + '.mlmodelc'
  const ml = modelName + '.mlmodel'
  const compiledPath = RNFS.DocumentDirectoryPath + '/' + mlc
  if (await RNFS.exists(compiledPath)) {
    return compiledPath
  }
  const toFile = RNFS.TemporaryDirectoryPath + ml
  if (!(await RNFS.exists(toFile))) {
    const { promise, _jobId } = RNFS.downloadFile({
      fromUrl: modelURL,
      toFile: toFile
    })
    await promise
  }
  const tempPath = await compileModel(toFile)
  await RNFS.moveFile(tempPath, compiledPath)
  return 'file://' + compiledPath
}

export default fetchModel
