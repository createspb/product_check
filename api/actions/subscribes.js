import models from '../models';
const ON_PAGE = 2;


export default function subscribes(req) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {

      switch (req.method) {

        case 'DELETE':

          models.subscribes.destroy({
            where: { id: req.body.id }
          }).then(() => {
            models.subscribes.findAll({
              order: 'id ASC'
            }).then((results) => {
              resolve(results);
            });
          });
          break;

        case 'GET':

          models.subscribes.findAll({
            order: 'id ASC'
          }).then((results) => {
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
