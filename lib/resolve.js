/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-14 19:43:13
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { invalid, styleTest } = require('./utils');


/**
 *****************************************
 * 匹配文件
 *****************************************
 */
function match(rule, ext) {
    return rule.test ? rule.test(ext) : rule(ext);
}


/**
 *****************************************
 * 合并规则
 *****************************************
 */
function merge(rules, callback) {

    // 执行回调
    rules.forEach(rule => rule.use = callback(rule.use));

    // 返回结果
    return rules;
}


/**
 *****************************************
 * 解析规则
 *****************************************
 */
function resolveRules({ type, target, rules, callback }) {
    rules.forEach((rule, idx) => {

        // 处理加载器路径
        if (typeof rule === 'string') {
            rule = { loader: rule };
        }

        // 是否匹配
        if (rule.loader === invalid) {
            let test = rule.test || target.test || styleTest,
                options = { ...rule.options };

            // 是否启用【sass】
            if (options.sass === undefined) {
                options.sass = match(test, '.scss');
            }

            // 是否启用【less】
            if (options.less === undefined) {
                options.less = match(test, '.less');
            }

            // 替换规则
            if (type === 'use') {
                target.use = undefined;
                target.oneOf = merge(
                    callback(options),
                    data => [...rules.slice(0, idx), ...data, ...rules.slice(idx + 1)],
                );
            } else {
                rule.loader = rule.options = undefined;
                rule.oneOf = callback(options);
            }
        }

        // 解析加载器列表
        if (rule.use) {
            resolveRules({ type: 'use', target: rule, rules: rule.use, callback });
        }

        // 解析oneOf规则
        if (rule.oneOf) {
            resolveRules({ type: 'oneOf', target: rule, rules: rule.oneOf, callback });
        }

        // 解析子规则
        if (rule.rules) {
            resolveRules({ type: 'rules', target: rule, rules: rule.rules, callback });
        }
    });
}


/**
 *****************************************
 * 解析加载器
 *****************************************
 */
function resolve(rules, callback) {
    let resolved;

    // 解析规则
    resolveRules({
        type: 'rules',
        rules,
        callback: options => ((resolved = 1), callback(options)),
    });

    // 追加配置
    resolved || rules.push({
        test: styleTest,
        oneOf: callback({ sass: true, less: true }),
    });
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = resolve;
