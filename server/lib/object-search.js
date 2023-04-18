const VALID_TERM = /^[a-z\s0-9]+$/i

module.exports = function search(term) {
  if (term && VALID_TERM.test(term)) {
    const pattern = new RegExp(`\\b${term}`, 'i')
    return (obj, props) => props.some((prop) => pattern.test(obj[prop]))
  }
}
