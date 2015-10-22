import { Provider } from 'react-redux';
import { PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

Provider.childContextTypes.onInsertCss = PropTypes.func.isRequired
Provider.childContextTypes.onSetTitle = PropTypes.func.isRequired
Provider.childContextTypes.onSetMeta = PropTypes.func.isRequired
Provider.childContextTypes.onPageNotFound = PropTypes.func.isRequired
Provider.prototype.getChildContext = function getChildContext() {
  const context = this.props.context;
  return {
    store: this.store,
    onInsertCss: context.onInsertCss || emptyFunction,
    onSetTitle: context.onSetTitle || emptyFunction,
    onSetMeta: context.onSetMeta || emptyFunction,
    onPageNotFound: context.onPageNotFound || emptyFunction,
  };
};

class ProviderContext extends Provider {}

export default ProviderContext;
