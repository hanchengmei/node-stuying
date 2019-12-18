/**
 * @description 接口测试用例
 * @type {obj|*}
 */
const server = require('./server')

test('测试routes/index.js中/json', async () => {
    // get 请求
    // post 请求 .post('..').send({xx:xx})
    const res = await server.get('/json')
    // 断言
    // toEqual对比对象  toBe()
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
})

