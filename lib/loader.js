/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-14 13:05:40
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义脚本代码
 *****************************************
 */
const suffix = `
if (module.exports) {
    let locals = module.exports;

    // 抛出接口
    module.exports = {
        __esModule: true,
        default: locals,
        cx: require(${JSON.stringify(require.resolve('classnames/bind'))}).bind(locals),
    };
}
`;


/**
 *****************************************
 * 加载器
 *****************************************
 */
module.exports = function loader(code) {

    // 添加绑定接口
    if (code.indexOf('module.exports =') > -1) {
        return code + suffix;
    }

    // 返回源码
    return code;
};
