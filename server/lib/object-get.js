export default function objectGet(obj, prop) {
  const exists = Object.prototype.hasOwnProperty.call(obj, prop)
  return exists ? obj[prop] : null
}
