import models from '../models';
const ON_PAGE = 2;


export default function results(req) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {

      switch (req.method) {

        case 'DELETE':

          models.result.destroy({
            where: { id: req.body.id }
          }).then(() => {
            models.result.findAll({
              order: 'id DESC'
            }).then((results) => {
              for (let result of results) {
                result.answers = JSON.parse(result.answers);
              }
              resolve(results);
            });
          });
          break;

        case 'GET':

          models.result.findAll({
            order: 'id DESC'
          }).then((results) => {
            for (let result of results) {
              result.answers = JSON.parse(result.answers);
            }
            resolve(results);
          });
          break;

        default:

          reject('unknown method');
          break;

      }

    } else {
      reject('auth error');
    }
  });
}
