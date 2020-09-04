import { isBooblean, isString, isHaveValue, isUserName } from './validate'
import { getValueObject } from './function'
import validing from 'dist/validing'

const defaultConfig: validing.rules.UserNameConfig = {
  required: false,
  name: '此项'
}

const validateUserName = (config: validing.rules.UserNameConfig) => {
  try {
    if (config.required !== undefined && !isBooblean(config.required)) {
      throw Error('validateUserName函数required参数必须为布尔值')
    }
    if (config.name !== undefined && !isString(config.name)) {
      throw Error('validateUserName函数name参数只能是字符串')
    }
  } catch (error) {
    console.error(error.message)
  }
  return (rule: any, value: any, callback: any) => {
    const theConfig: {
      required: boolean;
      name: string;
    } = Object.assign(defaultConfig, getValueObject(config))
    if (!config.required && !isHaveValue(value)) {
      callback()
    } else if (!isHaveValue(value)) {
      callback(new Error(`${ theConfig.name }必填`))
    } else if (!(isUserName(value))) {
      callback(new Error(`${ theConfig.name }格式错误`))
    } else {
      callback()
    }
  }
}

export default validateUserName
