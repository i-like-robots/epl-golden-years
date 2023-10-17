import { managers } from '../dataset.js'
import get from '../lib/object-get.js'

export default function managerModel(managerId) {
  return get(managers, managerId)
}
