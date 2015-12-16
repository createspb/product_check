import models from '../models';

export default function storeSubscribe(req) {
  return new Promise((resolve, reject) => {
    try {
      req.session.email = req.body.email;
      models.subscribes.create({
        email: req.session.email,
      });
      resolve(req.session.email);
    } catch(err) {
      reject('error 2');
    };
  });
}
