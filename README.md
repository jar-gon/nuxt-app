# nuxt-app

一个单包 Nuxt 4 示例应用，源码位于 `src/`，包含文件路由、全局布局、Vant 组件、移动端 viewport 适配，以及基于 `nuxt-mongoose` 的菜单 CRUD 服务端接口。

## 技术栈

- Nuxt 4、Vue 3、Vue Router
- Vant 4 与 `@vant/nuxt`
- Nitro Server API
- MongoDB / Mongoose（`nuxt-mongoose`）
- Stylus、Autoprefixer、`postcss-px-to-viewport-8-plugin`

## 快速开始

项目要求 Node.js `^22.22.2`、`^24.15.0` 或 `>=26.0.0`，并使用 Yarn `1.22.22`。依赖锁文件通过 HTTPS 镜像生成，请使用 `yarn`，不要使用 `npm install`。

```bash
yarn install
yarn dev
```

`yarn install` 会通过 `postinstall` 自动执行 `nuxt prepare` 并安装 Husky hooks。开发服务器读取 `.env.development`，地址为 `https://b.zmlearn.com:3000`，应用基础路径为 `/nuxtApp/`。

本地开发需要：

- hosts 中将 `b.zmlearn.com` 指向本机
- 本地 HTTPS 证书文件 `ssl/server.key`、`ssl/server.pem`
- 如需使用菜单 CRUD，配置可用的 `NUXT_MONGOOSE_URI`

## 可用脚本

```bash
yarn dev             # nuxt dev --dotenv .env.development
yarn build           # nuxt build --dotenv .env.production
yarn preview         # 预览生产构建
yarn generate        # 静态生成
yarn format          # 格式化代码，修复 Vue 模板规则及样式属性顺序
yarn format:check    # 检查 Prettier 格式、ESLint 和样式规则
yarn lint            # ESLint 与 Stylelint 检查
yarn lint:fix        # 自动修复 ESLint 与 Stylelint 问题
yarn lint:eslint     # 单独运行 ESLint
yarn lint:style      # 单独检查 CSS、Stylus 和 Vue 样式块
yarn lint:style:fix  # 修复样式问题和 CSS 属性顺序
yarn test:tooling     # 用错误样例验证 lint 规则、暂存修复顺序及重复运行稳定性
yarn typecheck       # Nuxt 多上下文 TypeScript 检查
```

## 环境变量

配置来自 `.env`、`.env.development`、`.env.production`。

先复制 `.env.example` 并按环境填写本地配置。真实环境文件、HTTPS 私钥和证书不会提交到 Git。

| 变量                   | 说明                                                                     |
| ---------------------- | ------------------------------------------------------------------------ |
| `NUXT_API_SECRET`      | 仅服务端可用的私有配置                                                   |
| `NUXT_PUBLIC_API_BASE` | `runtimeConfig.public.apiBase`，也是开发环境 Nitro `/api/zmbiz` 代理目标 |
| `NUXT_MONGOOSE_URI`    | MongoDB 连接地址，菜单 CRUD 依赖它                                       |

## 项目结构

```text
src/
  app.vue                 # 应用壳：NuxtLayout、NuxtLoadingIndicator、NuxtPage
  app.config.ts           # 全局标题与描述
  pages/                  # 页面路由；/contact 会重定向到 /contact/home
  layouts/                # default、custom 两个布局
  components/             # AppHeader、AppFooter 等组件
  apis/                   # 外部业务接口与菜单写操作
  composables/            # 业务请求客户端、菜单读取、API 重导出、共享状态
  middleware/             # 全局路由中间件和 auth 示例
  server/                 # Nitro API、Mongoose model、server middleware/plugin
  utils/                  # 客户端通用错误处理
  assets/style/           # base.css、index.styl
  public/                 # 静态资源
shared/types/             # 客户端与服务端共享类型
```

## 开发约定

- Nuxt 配置使用 `srcDir: 'src/'` 和 `serverDir: 'src/server'`，不要在仓库根目录新增 Nuxt 默认目录。
- 外部业务请求通过 `src/composables/useBusinessApi.ts` 创建 `$fetch` 客户端，携带 credentials，并使用 `NUXT_PUBLIC_API_BASE` 作为 `baseURL`。
- `src/apis/` 通过 `src/composables/apis.ts` 重导出，便于 Nuxt 自动导入。
- 菜单初始读取使用共享的 `useMenus()`，提交、编辑和删除等交互操作使用 `$fetch` API helper。
- 菜单接口位于 `src/server/api/menus/`，模型 `src/server/models/Menus.ts` 要求 `name` 和 `path` 字段。
- `app.baseURL` 为 `/nuxtApp/`，链接和资源路径需要考虑此前缀。

## 菜单接口

| 方法   | 地址             | 说明         |
| ------ | ---------------- | ------------ |
| GET    | `/api/menus`     | 获取菜单列表 |
| POST   | `/api/menus`     | 创建菜单     |
| GET    | `/api/menus/:id` | 获取单个菜单 |
| PUT    | `/api/menus/:id` | 更新菜单     |
| DELETE | `/api/menus/:id` | 删除菜单     |

这些接口用于演示 Nuxt Server API 与 Mongoose 集成，没有认证和授权，不能直接作为生产接口使用。

## 样式适配

`nuxt.config.ts` 使用按文件来源选择设计宽度的 px 转 viewport 规则：

- 应用源码 `src/` 使用 750px 设计稿宽度
- Vant 样式 `node_modules/vant` 使用 375px 设计稿宽度
- Nuxt 内置样式及其他第三方样式保持原单位

浏览器目标为 iOS 15+ 与最新两个 Chrome Android 版本。

全局样式入口为 `src/assets/style/base.css` 和 `src/assets/style/index.styl`。

Stylelint 会检查 CSS、独立 Stylus 文件和 Vue 单文件组件中的样式块，并按 Recess 顺序检查与自动排列 CSS 属性。ESLint 会检查 Vue 模板属性顺序，并要求组件标签、自定义属性及事件监听名使用 kebab-case。VS Code 保存文件时会调用 Prettier、ESLint 和 Stylelint 的自动修复。

独立 Stylus 文件通过 Stylelint 修复缩进、分号和属性顺序，不调用不支持 Stylus 的 Prettier。Vue 的 `:deep()`、`:global()`、`:slotted()` 和 `v-bind()` 样式语法已兼容。

## 提交前检查

依赖安装完成后，Husky 会把 Git hooks 配置到 `.husky/`。每次提交会先通过 lint-staged 格式化并修复暂存的脚本、Vue、样式和文档文件，再执行完整的 `yarn typecheck`；任一步失败都会阻止提交。

Vue 和 CSS 文件先执行 Prettier，再执行相应的 ESLint / Stylelint 修复，最后统一格式。这样单行多属性 CSS 也能自动修复，不会在格式化前被 Stylelint 拦截。`yarn format` 同样包含 Vue 模板排序和 kebab-case 修复；仅执行 Prettier 不会排列模板属性或 CSS 属性。

升级工具依赖后，建议运行 `yarn test:tooling`、`yarn lint`、`yarn format:check` 和 `yarn typecheck`。规则回归测试使用内存样例，不会修改源码或 Git 暂存区。

## 注意事项

- Nuxt 与 `nuxt-mongoose` 使用 Nuxt Kit 4，`@vant/nuxt` 保留独立的 Nuxt Kit 3；不要添加全局 Nuxt Kit resolution。
- `nuxt.config.ts` 设置了 `EventEmitter.defaultMaxListeners = 0`，不要在未确认原因前删除。
