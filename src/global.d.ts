// src/global.d.ts
import 'vue-router'

/*
用来定义router里meta的字段
d.ts文件会被当做类型拓展, 参与全局类型合并
 */
declare module 'vue-router' {
    interface RouteMeta {
        hiddenInMenu?: boolean
        title?: string
        parentName?: string  //父路由名称, 用于生成路由路径
    }
}