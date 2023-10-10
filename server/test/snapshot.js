import chalk from 'chalk'
import path from 'path'
import url from 'url'
import fs from 'fs'

const callingFilePath = (stack) => {
  const callingStack = stack.split('\n')[2].split(/\s/)
  const callingFile = url.fileURLToPath(
    callingStack[callingStack.length - 1].replace(/[()]/g, '').replace(/js:.+$/, 'js')
  )

  return callingFile
}

const shouldUpdate = () => {
  const argv = process.argv.slice(2)
  return ['--updateSnapshot', '-u'].some((d) => argv.includes(d))
}

const banner = '// Data Snap v1'

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath)

  if (fs.existsSync(dirname)) {
    return true
  }

  fs.mkdirSync(dirname)
}

const dataSnapshot = async (dataKey, thunkPromise, opts = {}) => {
  const callingFile = callingFilePath(new Error().stack)
  const relativeCallingFile = path.relative(process.cwd(), callingFile)

  const basename = `${path.basename(callingFile)}.snap`
  const snapFile = path.resolve(callingFile, '..', '__data_snapshots__', basename)

  const exports = {}

  if (fs.existsSync(snapFile)) {
    // Read a .snap file and assign the exports to our exports var
    eval(fs.readFileSync(snapFile, 'utf8'))
  }

  const settings = {
    expires: Infinity,
    ...opts,
  }

  const { data: snapData, metadata: snapMeta } = exports[dataKey] || {}

  if (snapData && !shouldUpdate()) {
    if (snapMeta && snapMeta.expires && snapMeta.expires < Date.now()) {
      console.log(
        chalk.red(`Data "${dataKey}" in ${relativeCallingFile} is expired - please update!`)
      )
    }

    return snapData
  }

  console.log(
    chalk.yellow('Calling thunk promise:\n') + `-- file: ${relativeCallingFile}\n-- key: ${dataKey}`
  )

  const data = await thunkPromise()

  exports[dataKey] = {
    data,
    metadata: {
      expires: settings.expires,
    },
  }

  const newSnap = Object.keys(exports)
    .sort()
    .reduce(
      (acc, key) => acc + `\nexports['${key}'] = ${JSON.stringify(exports[key], null, 2)}\n`,
      `${banner}\n`
    )

  ensureDirectoryExistence(snapFile)
  fs.writeFileSync(snapFile, newSnap)

  return data
}

export default dataSnapshot
