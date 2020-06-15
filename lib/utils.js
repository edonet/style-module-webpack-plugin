/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-15 11:47:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const path = require('path');


/**
 *****************************************
 * 招聘接口
 *****************************************
 */
module.exports = {

    /** 开发环境 */
    dev: process.env.NODE_ENV === 'development',

    /** 样式匹配规则 */
    styleTest: /\.(scss|css|less|sass)(\?.*)?$/i,

    /** 模块匹配规则 */
    moduleTest: /(\?|&|^)module(&|=|$)/i,

    /** 占位校验加载器 */
    invalid: path.join(__dirname, 'invalid.js'),

    /** 样式名加载器 */
    cx: {
        loader: path.join(__dirname, 'loader.js'),
    },
};
