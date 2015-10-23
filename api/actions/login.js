import models from '../models';
import md5 from 'md5';

export default function login(req) {

  // console.log(req.body);
  // models.User.findOne({
  // where: {
  //   username: req.body.username,
  //   password: md5(req.body.password)
  // }
  // }).then(function(user) {
  //   console.log(user);
  // });
  //
  // const user = {
  //   name: req.body.name
  // };
  // // req.session.user = user;
  // return Promise.resolve(user);


  return new Promise((resolve, reject) => {
    models.User.findOne({
      where: {
        username: req.body.username,
        password: md5(req.body.password)
      }
    }).then(function(user) {
      if (user) {
        req.session.user = user;
        resolve(user);
      } else {
        reject(true);
      }
    });
    // // write to database
    // setTimeout(() => {
    //   if (Math.random() < 0.2) {
    //     reject('Oh no! Widget save fails 20% of the time. Try again.');
    //   } else {
    //     const widgets = load(req);
    //     const widget = req.body;
    //     if (widget.color === 'Green') {
    //       reject({
    //         color: 'We do not accept green widgets' // example server-side validation error
    //       });
    //     }
    //     if (widget.id) {
    //       widgets[widget.id - 1] = widget;  // id is 1-based. please don't code like this in production! :-)
    //     }
    //     resolve(widget);
    //   }
    // }, 2000); // simulate async db write
  });

}
