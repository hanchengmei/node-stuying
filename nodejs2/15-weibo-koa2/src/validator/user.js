/**
 *@description user数据格式校验封装
 */
const validate = require('./validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '',
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        nickName: {
            type: 'string',
            maxLength: 255
        },
        picture: {
            type: 'string',
            maxLength: 255
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            maximum: 3,
            minimum: 1
        }
    }
}

/**
 * 校验用户数据格式
 * @param {Object} data
 * @returns {*|void}
 */
function userValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = userValidate