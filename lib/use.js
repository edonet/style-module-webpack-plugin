/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2020-06-15 12:59:38
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { dev, cx, cd, moduleTest } = require('./utils');


/**
 *****************************************
 * 创建加载器列表
 *****************************************
 */
function use({ css, modules, style, postcss }) {
    let rest = [];

    // 【postcss】加载器
    postcss && rest.push(postcss);

    // 返回加载组
    return [
        {
            resourceQuery: moduleTest,
            use: [cx, style, modules].concat(rest),
        },
        {
            use: [style, css].concat(rest),
        }
    ];
}


/**
 *****************************************
 * 组合加载器
 *****************************************
 */
function compose(prelist, list) {
    let rules = [];

    // 合并列表
    prelist.forEach(i => {
        list.forEach(v => rules.push({ ...i, ...v, use: [...v.use, ...i.use] }));
    });

    // 返回结果
    return rules.concat(list);
}


/**
 *****************************************
 * 创建加载器
 *****************************************
 */
module.exports = ({ css, extract, sass, less, postcss = !dev, sourceMap = dev }) => {
    let prelist = [];

    // 添加【SASS】
    sass && prelist.push({
        test: /\.(scss|sass)$/i,
        use: [
            {
                loader: cd('sass-loader'),
                options: { sourceMap, ...sass }
            }
        ],
    });

    // 添加【LESS】
    less && prelist.push({
        test: /\.less$/i,
        use: [
            {
                loader: cd('less-loader'),
                options: { sourceMap, ...less }
            }
        ],
    });

    // 组合加载器
    return compose(prelist, use({
        css: {
            loader: cd('css-loader'),
            options: { sourceMap, ...css, modules: false },
        },
        modules: {
            loader: cd('css-loader'),
            options: {
                localsConvention: 'camelCase',
                modules: {
                    localIdentName: '[local]-[hash:base64:5]'
                },
                sourceMap,
                ...css,
            },
        },
        style: extract || { loader: cd('style-loader') },
        postcss: postcss && {
            loader: cd('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: { flexbox: 'no-2009' },
                        stage: 3,
                    }),
                    require('postcss-normalize')(),
                ],
                sourceMap,
                ...postcss,
            },
        }
    }));
};
