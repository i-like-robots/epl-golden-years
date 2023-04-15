module.exports = function replaceParams(template, params) {
  return template.replace(/:[A-Za-z0-9]+/g, (matches) => {
    const key = matches.slice(1)

    if (params[key]) {
      return encodeURIComponent(params[key]);
    } else {
      return ''
    }
  })
}
