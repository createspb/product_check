import { matrixData, applyAnswersToMatrix } from './data/matrix';
import algorithm from './data/algorithm';
import _ from 'underscore';
_.mixin(require('underscore.deep'));
import models from '../models';


export default function matrix(req) {
  return new Promise((resolve, reject) => {
    if (req.session.answers && req.session.productName) {
      resolve(applyAnswersToMatrix(
        _.deepClone(matrixData),
        _.deepClone(req.session.answers),
        _.deepClone(algorithm)
      ));
    } else {
      reject(true);
    }
  });
}
