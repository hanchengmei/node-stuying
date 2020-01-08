/**
 * @description 统一数据返回模式
 */


class BaseModel {
    constructor({errno, data, message}) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

/**
 * 成功数据模型，继承baseModel
 * {
 *     errno: 0,
 *     data:{..}
 * }
 */
class SuccessModel extends BaseModel{
    constructor(data={}) {
        super({
            errno: 0,
            data

        })
    }
}

/**
 * 失败数据模型
 * {
 *     errno: 10001,
 *     message: '错误信息
 * }
 */
class ErrorModel extends BaseModel{
    constructor({errno, message}) {
        super({
            errno,
            message
        })
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}