import models from '../models';

export default function login(req) {

  models.User.findAll().then(function(users) {
    console.log(users);
  });

  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);

}
