const fs = require('fs/promises')
const path = require('path')
const assert = require('assert')

async function compareExisting(data, target) {
  const existing = await fs.readFile(target, 'utf-8')
  assert.deepStrictEqual(data, JSON.parse(existing))
}

async function createNew(data, target) {
  await fs.writeFile(target, JSON.stringify(data, null, 2) + '\n')
}

function escapeFilename(name) {
  const escapeRegExp = /[^a-z0-9$_-]+/gi
  return name.replace(escapeRegExp, '-')
}

async function createFolder(target) {
  const folder = path.dirname(target)

  try {
    await fs.access(folder, fs.constants.W_OK)
  } catch {
    await fs.mkdir(folder, { recursive: true })
  }
}

async function fileExists(target) {
  try {
    await fs.access(target, fs.constants.R_OK)
    return true
  } catch {
    return false
  }
}

module.exports = async function snapshot(data, name) {
  const filename = escapeFilename(name)
  const target = path.join(__dirname, '../snapshots', `${filename}.json`)
  const exists = await fileExists(target)

  if (exists) {
    return compareExisting(data, target)
  } else {
    await createFolder(target)
    return createNew(data, target)
  }
}
