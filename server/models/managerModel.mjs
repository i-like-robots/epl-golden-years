import { managers } from '../dataset.mjs'
import get from '../lib/object-get.mjs'

export default function managerModel(managerId) {
  return get(managers, managerId)
}
