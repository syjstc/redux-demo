export const DEFAULT_OPTIONS = {
  statusType: 'category',
  statusValue: 'all',
}

export function getEntityStatusPath(entityName, options) {
  let path = [entityName]
  const finalOptions = Object.assign(DEFAULT_OPTIONS, options || {})
  const { statusType, statusValue, resourceId } = finalOptions

  if (statusType && statusValue) {
    path = path.concat([statusType, statusValue])
  } else if (resourceId) {
    path = path.concat([resourceId])
  }

  return path
}
