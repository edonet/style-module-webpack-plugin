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
    constructor(options = {}) {

        // 定义描述
        this.descriptor = { name: 'style-module-webpack-plugin' };

        // 配置
        this.options = options;
    }

    /* 激活插件 */
    apply(compiler) {
        let { mode, module, plugins } = compiler.options;

        // 解析加载器规则
        resolve(module.rules, use);

        // 优化代码
        if (mode === 'production') {
            let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

            // 添加插件
            plugins.push(
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: require('postcss-safe-parser'),
                    },
                    cssProcessorPluginOptions: {
                        preset: ['default', { minifyFontValues: { removeQuotes: false } }],
                    },
                    ...this.options.optimize,
                })
            );
        }

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
                                    source = statement.source;

                                // 添加查询参数
                                if (!query || !moduleTest.test(query)) {
                                    source.value = [source.value, 'module=1'].join(query ? '&' : '?');
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
