module.exports = function search(term) {
  const pattern = new RegExp(`\\b${term}`, 'i')
  return (obj, props) => props.some((prop) => pattern.test(obj[prop]))
}
