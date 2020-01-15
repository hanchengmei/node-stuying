const { format } = require('date-fns')

/**
 * 格式化时间 格式为09-10 10：10
 * @param {string} str 时间
 */
function timeFormat(str) {
    return format(new Date(str), 'yyyy-MM-dd HH:mm')
}

module.exports = {
    timeFormat
}