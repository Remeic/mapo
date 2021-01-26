import colors from 'vuetify/es5/util/colors'

export default {
  store: true,
  components: true,
  router: {
    base: process.env.PANEL_URL || '/',
  },
  head: {
    titleTemplate: '%s - mapo',
    title: '🥭 mapo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  vuetify: {
    customVariables: ['~mapomodule/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#309A00',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  axios: {
    baseURL: 'http://localhost:8000',
    browserBaseURL: 'http://localhost:8000',
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,
    },
    locales: [
      {
        code: 'en',
        file: 'en-EN.js',
        name: 'English'
      },
      {
        code: 'it',
        file: 'it-IT.js',
        name: 'Italiano'
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },

  extendPlugins(plugins) {
    const index = plugins.findIndex(
      ({ src }) => src.endsWith('mapomodule/plugins.mapo.js')
    )
    const mapoPlugin = plugins[index]
    if (mapoPlugin) {
      plugins.splice(index, 1)
      plugins.push(mapoPlugin)
    }
    return plugins
  }
}
