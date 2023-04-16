module.exports = function matches(term) {
  const pattern = new RegExp(`\\b${term}`, 'i')
  return (obj, props) => props.some((prop) => pattern.test(obj[prop]))
}
