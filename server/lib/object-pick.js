module.exports = function pick(obj, ...select) {
  const result = {}

  select.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })

  return result
}
