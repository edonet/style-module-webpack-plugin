/**
 *****************************************
 * 加载器
 *****************************************
 */
// interface Loader {
//     loader: string;
//     options?: Record<string, unknown>;
// }


/**
 *****************************************
 * 配置
 *****************************************
 */
// interface LoaderOptions {
//     use: Loader[] | ((cssLoader: Loader) => Loader[]);
//     sass: Record<string, unknown>;
//     less: Record<string, unknown>;
//     css: boolean | Partial<{
//         url: boolean | ((url: string, resourcePath: string) => boolean);
//         import: boolean | ((parsedImport: { url: string, media: string}, resourcePath: string) => boolean);
//         sourceMap: boolean;
//         importLoaders: number;
//         localsConvention: 'asIs' | 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly';
//         onlyLocals: boolean;
//         esModule: boolean;
//         modules: Partial<{
//             mode: string;
//             exportGlobals: boolean;
//             localIdentName: string;
//             context: string;
//             hashPrefix: string;
//             auto: boolean | RegExp;
//         }>;
//     }>;
// }


/**
 *****************************************
 * 样式模块插件
 *****************************************
 */
declare class StyleModuleWebpackPlugin {
    constructor();
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export = StyleModuleWebpackPlugin;
