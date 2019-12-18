/**
 * @description 测试接口
 * @type {function(): obj}
 */
const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)