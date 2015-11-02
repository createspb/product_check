import models from '../models';

export default function results(req) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {
      models.result.findAll({
        order: 'id DESC'
      }).then((results) => {
        for (let result of results) {
          result.answers = JSON.parse(result.answers);
        }
        resolve(results);
      });
    } else {
      reject('auth error');
    }
  });
}
