import { version } from './package.json'
import colors from 'vuetify/es5/util/colors'
import path from 'path'
// require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const IN_PRODUCTION = process.env.NODE_ENV === 'production'
const { CALENDAR_TEST, SCHEDULE_ALWAYS } = process.env
export default {
  // ssr: false,
  // target: 'server',  // default
  // target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: { lang: 'ja' },
    // titleTemplate: '%s - overroad',
    title: 'オーバーロード',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/global.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // '~/plugins/vuetify.js',
    '~/plugins/calendar-common',
    { src: '~/plugins/localStorage.js', mode: 'client' },
    { src: '~/plugins/VueLoading', mode: 'client' },
    // { src: '~/plugins/vue-masonry', mode: 'client' },
    { src: '~/plugins/vue-masonry-css', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // purgecss
    'nuxt-purgecss',
    // Google Font Loader
    // 特定のwebフォントをビルド時に入れ込む場合は以下を使う
    // assets配下にcss,fontsが作成される
    [
      '@nuxtjs/google-fonts',
      {
        // families: { 'Noto+Sans+JP': true, Inter: true },
        // families: { 'Sawarabi+Gothic': true, 'M+PLUS+1p': true, Inter: true },
        // families: { 'Sawarabi+Gothic': true, Inter: true },
        // display: 'block',
        // download: true,
        // inject: true,
      },
    ],
    // [
    //   '@nuxtjs/google-fonts',
    //   {
    //     // オプションを記述する
    //     families: {
    //       Roboto: [100, 300],
    //     },
    //     display: 'swap',
    //   },
    // ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // client init
    'nuxt-client-init-module',
    // CORS対策
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //
    '@nuxtjs/dotenv',
    // env切り替えの場合
    // { filename: process.env.NODE_ENV !== 'production' ? "./config/.env.dev" : "./config/.env.prod" }
    //
    '@nuxtjs/dayjs',
    // sitemap作成(環境変数MIRRORによって@nuxtjs/sitemapを使うか使わないか切替たかったができていない)
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  // env.baseUrlと以下とどっちを使ってもよい
  // 現在はbaseURLを直接書かずに、環境変数でAPI_URLを指定することで
  // 結果としてbaseURLを上書きしている
  // axios: {
  //   baseURL:
  //     process.env.NODE_ENV === 'production'
  //       ? process.env.BASE_URL || 'http://localhost:3000'
  //       : 'http://localhost:3000',
  // },
  axios: {
    ...((process.env.HTTPS === 'true' && { https: true }) || {}),
    // proxy: trueの機能
    // 1) APIサーバを外部に求める場合に、サーバ側でCORS対応が出来る場合は
    //    そちらで対応するのが良く、この機能は必要ない
    //    外部サーバを使う場合には内部のサーバ機能(serverMiddleware:)の箇所は
    //    コメント化しておく。

    // ローカルな環境からあえてテストで外部apiを呼びたいので
    // このproxyを使うと逆に外部apiをlocalhost側へ変換するので
    // 止めた
    // => serverless azure functionsでの利用時にcorsエラーとなるため
    // 必要になった
    // => サーバ側に対策を施したため必要なくなった
    // 1) serverlessプロジェクト
    //    local.settings.json
    //      ......
    //      "Host": {
    //        "CORS": "*"
    //      }
    // 2) ソース中に必要なheader
    //    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    //
    // proxy: true,
    // ...((process.env.API_URL &&
    //   process.env.API_URL.indexOf(':7071') >= 0 && { proxy: true }) ||
    //   {}),
    // 以下indexOfとか要らないかも(無条件で付けてもいいかも)
    // ...((process.env.API_URL &&
    //   process.env.API_URL.indexOf('http') >= 0 && { proxy: true }) ||
    //   {}),
  },

  proxy: {
    // 現在proxy停止中
    // ALI_URLとして http://localhostの文字列が含まれず、
    // が、指定されている場合にproxyを有効にする
    // ...((process.env.API_URL && process.env.API_URL.indexOf('http://localhost') < 0 && { '/api/': process.env.API_URL }) || {}),
    // '/api/': 'https://do-it-muscle.tk',
    // '/api/': 'http://localhost:7071',
    // '/api': { target: 'http://localhost:7071' },
    // ...((process.env.API_URL &&
    //   process.env.API_URL.indexOf('http') >= 0 && {
    //     '/api/': { target: process.env.API_URL },
    //   }) ||
    //   {}),
    // '/api': { target: 'http://do-it-muscle.tk' },
    // ...((process.env.API_URL &&
    //   process.env.API_URL.indexOf('http') >= 0 && {
    //     '/api': { target: process.env.API_URL },
    //   }) ||
    //   {}),
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg',
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true, // フォント問題で追加(だがコンパイル時間が長くなる)
    // 以下追加 (反映されない)
    breakpoint: {
      thresholds: {
        // xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#007bff',
          accent: colors.shades.black,
          secondary: '#6c757d',
          info: '#17a2b8',
          warning: '#ffc107', // bootstrap warning
          error: '#dc3545', // bootstarp danger
          success: '#28a745',
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true, // 2021.3.3追加
    analyze: true,
    terser: {
      terserOptions: {
        compress: { drop_console: true },
      },
    },
    filenames: {
      app: () => '[name][id].js',
      chunk: () => '[name][id].js',
      css: () => '[name][id].css',
      img: () => '[path][name].[ext]',
      font: () => '[path][name].[ext]',
      video: () => '[path][name].[ext]',
    },
  },
  // playloadディレクトリ名を固定する
  generate: {
    staticAssets: {
      version,
    },
  },
  // For API => Now Stop
  // serverMiddlewareを制御したいが、独自の環境変数しかない感じ
  // serverMiddleware: [{ path: '/api', handler: '~/server/index.ts' }],
  ...((process.env.USE_EXPRESS && {
    serverMiddleware: [{ path: '/api', handler: '~/server/index.ts' }],
  }) ||
    {}),

  // dayjs
  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
  },

  // server
  // package.jsonのscriptsにcross-env NUXT_HOST=0.0.0.0
  // よりこちらが優先される(以下のようにしてcross-envの環境変数を優先にした)
  server: {
    ...((!process.env.NUXT_PORT && { port: 3000 }) || {}),
    ...((!process.env.NUXT_HOST && { host: '0.0.0.0' }) || {}),
  },

  // env (axiosのAPI_URLを使えば、以下baseUrlは使わなくてよいかも)
  // env: {
  //   baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  // },
  //
  env: {
    //CALENDAR_TEST,
    //SCHEDULE_ALWAYS,
  },
  // PurgeCSS
  // https://github.com/Developmint/nuxt-purgecss/blob/master/lib/utils.js
  purgeCSS: {
    // enabled: false,
    enabled: !dev,
    paths: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      // './node_modules/vuetify/src/**/*.ts', // この行を追加しないとvuetifyのすべてのスタイルが吹っ飛ぶ
      './node_modules/vuetify/dist/vuetify.js', // この行を追加しないとvuetifyのすべてのスタイルが吹っ飛ぶ
      // './node_modules/vuetify/dist/json/*.json', // 必要か不明 col-md-* が効かないため入れたが変わらない
      // './node_modules/vue-slick-carousel/dist/vue-slick-carousel.css', // vue-slick-carousel
      // './node_modules/vue-slick-carousel/dist/vue-slick-carousel-theme.css', // vue-slick-carousel
    ],
    css: [],
    styleExtensions: ['.css'],
    // whitelist: ['body', 'html', 'nuxt-progress', /^vuetify/, /\.css$/],
    whitelist: [
      'body',
      'html',
      'nuxt-progress',
      '__nuxt',
      '__layout',
      // 'v-application',
      // 'v-application--wrap',
      // 'layout',
      // 'row',
      // 'col',
    ],
    extractors: [
      {
        // 以下参考サイトの例 1)
        extractor: (content) => content.match(/[A-z0-9-:\\/]+/g) || [],
        // 以下公式サイト     2)
        // extractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        // 以下公式サイト     3)
        // https://github.com/Developmint/nuxt-purgecss/blob/master/lib/utils.js
        // extractor: (content) => {
        //   const contentWithoutStyleBlocks = content.replace(
        //     /<style[^]+?<\/style>/gi,
        //     ''
        //   ) // Remove inline vue styles
        //   return contentWithoutStyleBlocks.match(/[\w-.:/]+(?<!:)/g) || []
        // },
        extensions: ['html', 'vue', 'js'],
      },
    ],
    // safelist: から whitelistPatterns:へ変更
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      /data-v-.*/,
      //vuetifyのユーティリティクラスなどもsafelistにいれる
      /^v-((?!application).)*$/,
      /^theme--*/,
      /.*-transition/,
      /^justify-*/,
      // 以下は効かない
      /^align-content-center/,
      // ソースを見て対策
      /^v-layout\/align-content-center/,
      /^p*-[0-9]/,
      /^m*-[0-9]/,
      /^text--*/,
      /--text$/,
      /^row-*/,
      /^d-*/,
      /^col-*/,
      /^@media*/,
    ],
  },
  // サイト情報だが、エラー
  // app/router.scrollBehavior.jsを作成
  // router: {
  //   scrollBehavior(to) {
  //     if (to.hash) {
  //       return window.scrollTo({
  //         top: document.querySelector(to.hash).offsetTop + window.innerHeight,
  //         behavior: 'smooth',
  //       })
  //     }
  //     return window.scrollTo({ top: 0, behavior: 'smooth' })
  //   },
  // },
  // Netlifyで環境変数MIRRORが設定されていない場合のみ
  // サイトマップを作成する(きちんと動作するか検証=>OK)
  ...((process.env.MIRROR && {
    // sitemap: {
    //   path: '/sitemap.xml',
    //   hostname: 'https://mirror-over-road.netlify.app',
    //   cacheTime: 1000 * 60 * 15,
    //   gzip: true,
    //   generate: false,
    //   exclude: ['/schedule', '/calendar', '/inspire'],
    // },
    // 以下のsitemap: falseにてミラーサイト用ではsitemap作成を抑制する
    sitemap: false,
  }) || {
    sitemap: {
      path: '/sitemap.xml',
      hostname: 'https://over-road.com',
      cacheTime: 1000 * 60 * 15,
      gzip: true,
      exclude: ['/schedule', '/calendar', '/inspire'],
    },
  }),
  // sitemap: {
  //   path: '/sitemap.xml',
  //   hostname: 'https://over-road.com',
  //   cacheTime: 1000 * 60 * 15,
  //   gzip: true,
  //   generate: true,
  //   exclude: ['/schedule', '/calendar', '/inspire'],
  // },
}
