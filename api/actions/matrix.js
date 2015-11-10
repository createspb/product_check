import { matrixData, applyAnswersToMatrix } from './data/matrix';
import algorithm from './data/algorithm';
import _ from 'underscore';
_.mixin(require('underscore.deep'));
import models from '../models';


export default function matrix(req) {
  if (req.method === 'POST') {
    return new Promise((resolve, reject) => {
      try {
        resolve(applyAnswersToMatrix(
          _.deepClone(matrixData),
          _.deepClone(req.body.answers),
          _.deepClone(algorithm)
        ));
      } catch (error) {
        reject(true);
      }
    });
  }
  return new Promise((resolve, reject) => {
    if (req.session.answers) {
      console.log(req.session.answers);
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
