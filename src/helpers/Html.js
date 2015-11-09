import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  trackingCode() {
    return ({__html:
      `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
      `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
      `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
      `e.src='https://www.google-analytics.com/analytics.js';` +
      `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
      `ga('create','UA-69854681-1','auto');ga('send','pageview');`,
    });
  }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html lang="en-us">
        <head>
          {DocumentMeta.renderAsReact()}

          <meta property="og:title" content="Аудит продуктовой идеи" />
          <meta name="twitter:title" content="Аудит продуктовой идеи" />
          <meta property="og:description" content="Проверь, готов ли ты к созданию продукта и инвестициям.  Одиннадцать вопросов, ответы на которые определяют успех или провал вашей идеи." />
          <meta name="twitter:description" content="Проверь, готов ли ты к созданию продукта и инвестициям.  Одиннадцать вопросов, ответы на которые определяют успех или провал вашей идеи." />
          <meta name="twitter:image" content="https://obsvtr.herokuapp.com/sharing.png" />
          <meta property="og:image" content="https://obsvtr.herokuapp.com/sharing.png" />

          <link rel="shortcut icon" href="/favicon.png" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css"/>
          )}
        </head>
        <body>
          <section id="content" style={{height: '100%'}} dangerouslySetInnerHTML={{__html: content}} />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} />
          <script dangerouslySetInnerHTML={this.trackingCode()} />
          <script src={assets.javascript.main}/>
        </body>
      </html>
    );
  }
}
