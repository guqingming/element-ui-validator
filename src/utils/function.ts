import { isHaveValue } from './validate'

/**
 * 移除对象的无效值
 */
export function getValueObject(object: any): any {
  if (Object.prototype.toString.call(object) === '[object Object]') {
    const obj: any = {}
    for (const key in object) {
      const value = getValueObject(object[key])
      if (isHaveValue(value)) {
        obj[key] = value
      }
    }
    return obj
  } else if (Array.isArray(object)) {
    return object.map(item => getValueObject(item))
  } else {
    return object
  }
}