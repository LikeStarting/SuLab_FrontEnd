// <reference types="vite/client" />

interface ImportMetaEnv {
    // env
    readonly NODE_ENV: string;
    // api 前缀
    readonly VITE_API_BASEPATH: string;
    // 打包路径
    readonly VITE_BASE_PATH: string;

    readonly VITE_DROP_DEBUGGER: boolean;

    readonly VITE_DROP_CONSOLE: boolean;

    readonly VITE_SOURCEMAP: boolean;

    readonly VITE_OUT_DIR: string;

    readonly VITE_APP_TITLE: string;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv
    }
}
