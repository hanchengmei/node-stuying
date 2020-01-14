/**
 * @description blog数据格式验证封装
 * @type {validate}
 */
const validate = require('./validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string'
        }
    }
}

/**
 * 校验blog数据格式
 * @param data
 * @returns {*|undefined}
 */
function blogValidate(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = blogValidate