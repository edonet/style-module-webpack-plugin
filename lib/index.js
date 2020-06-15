/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-14 13:00:27
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { invalid, styleTest, moduleTest } = require('./utils');
const use = require('./use');
const resolve = require('./resolve');


/**
 *****************************************
 * 样式模块加载器
 *****************************************
 */
class StyleModuleWebpackPlugin {

    /* 加载器 */
    static loader = invalid;

    /* 初始化对象 */
    constructor() {

        // 定义描述
        this.descriptor = { name: 'style-module-webpack-plugin' };
    }

    /* 激活插件 */
    apply(compiler) {
        let { rules } = compiler.options.module;

        debugger;

        // 解析加载器规则
        resolve(rules, use);

        // 添加解析回调
        compiler.hooks.normalModuleFactory.tap(this.descriptor, factory => {
            factory.hooks.parser.for('javascript/auto').tap(this.descriptor, parser => {
                parser.hooks.program.tap(this.descriptor, ast => {
                    for (let statement of ast.body) {
                        if (statement.type === 'ImportDeclaration') {
                            let matched = statement.source.value.match(styleTest);

                            // 匹配成功
                            if (matched && statement.specifiers.length) {
                                let query = matched[2],
                                    source = statement.source,
                                    resource = source.value;

                                // 添加查询参数
                                if (!query || !moduleTest.test(query)) {
                                    source.value = [resource, 'module=1'].join(query ? '&' : '?');
                                }
                            }
                        }
                    }
                });
            });
        });
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = StyleModuleWebpackPlugin;
