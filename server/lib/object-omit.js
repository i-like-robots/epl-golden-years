module.exports = function omit(obj, ...remove) {
  const result = {}

  Object.keys(obj).forEach((key) => {
    if (!remove.includes(key)) {
      result[key] = obj[key]
    }
  })

  return result
}
