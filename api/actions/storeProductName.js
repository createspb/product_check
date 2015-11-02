import models from '../models';

export default function storeProductName(req) {
  return new Promise((resolve, reject) => {
    try {
      req.session.productName = req.body.productName;
      models.result.create({
        productName: req.session.productName,
        answers: JSON.stringify(req.session.answers)
      });
      resolve(req.session.productName);
    } catch(err) {
      reject('error 2');
    };
  });
}
