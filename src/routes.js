import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    Admin,
    App,
    Home,
    Login,
    Question,
    NotFound,
    Welcome,
    Results,
    ProductName
  } from 'components';

export default (store) => {

  const requireUnlogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (user) {
        replaceState(null, '/');
      }
      cb();
    }
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  return (
    <Route component={App}>
      <Route component={Home}>
        <Route path="/" component={Welcome} />
        <Route path="questions/:questionId/:back" component={Question} />
        <Route path="questions/:questionId" component={Question} />
        <Route path="name" component={ProductName} />
        <Route path="results" component={Results} />
      </Route>
      <Route onEnter={requireLogin} path="admin">
        <IndexRoute component={Admin} />
      </Route>
      <Route onEnter={requireUnlogin} path="login" component={Login} />
      <Route path="*" component={NotFound} />
    </Route>
  );

};

// import React from 'react';
// import {IndexRoute, Route} from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
// import {
//     App,
//     Chat,
//     Home,
//     Widgets,
//     About,
//     Login,
//     LoginSuccess,
//     Survey,
//     NotFound,
//   } from 'containers';
//
// export default (store) => {
//   const requireLogin = (nextState, replaceState, cb) => {
//     function checkAuth() {
//       const { auth: { user }} = store.getState();
//       if (!user) {
//         // oops, not logged in, so can't be here!
//         replaceState(null, '/');
//       }
//       cb();
//     }
//
//     if (!isAuthLoaded(store.getState())) {
//       store.dispatch(loadAuth()).then(checkAuth);
//     } else {
//       checkAuth();
//     }
//   };
//
//   /**
//    * Please keep routes in alphabetical order
//    */
//   return (
//     <Route path="/" component={App}>
//       { /* Home (main) route */ }
//       <IndexRoute component={Home}/>
//
//       { /* Routes requiring login
//       <Route onEnter={requireLogin}>
//         <Route path="chat" component={Chat}/>
//         <Route path="loginSuccess" component={LoginSuccess}/>
//       </Route> */ }
//
//       { /* Routes
//       <Route path="about" component={About}/>
//       <Route path="login" component={Login}/>
//       <Route path="survey" component={Survey}/>
//       <Route path="widgets" component={Widgets}/> */ }
//
//       { /* Catch all route */ }
//       <Route path="*" component={NotFound} status={404} />
//     </Route>
//   );
// };
