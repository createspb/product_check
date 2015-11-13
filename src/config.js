require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  app: {
    title: 'Product check',
    description: 'check your product idea checker',
    meta: {
      charSet: 'utf-8',
      // property: {
      //   'og:site_name': 'Product check',
      //   'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
      //   'og:locale': 'en_US',
      //   'og:title': 'React Redux Example',
      //   'og:description': 'All the modern best practices in one example.',
      //   'twitter:card': 'summary',
      //   'twitter:site': '@erikras',
      //   'twitter:creator': '@erikras',
      //   'twitter:title': 'React Redux Example',
      //   'twitter:description': 'All the modern best practices in one example.',
      //   'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
      //   'twitter:image:width': '200',
      //   'twitter:image:height': '200'
      // }
    }
  }
}, environment);
