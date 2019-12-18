/**
 * @description 同步到数据库
 * @type {Sequelize}
 */
const seq = require('./seq')
// require('./model')

// 测试是否连接
seq.authenticate().then(() => {
  console.log('ok')
}).catch(() => {
  console.log('err')
})

seq.sync({ force: true }).then(() => {
  // 手动退出连接
  process.exit()
})
