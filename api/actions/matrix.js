import { matrixData, applyAnswersToMatrix } from './data/matrix';
import algorithm from './data/algorithm';
// import answers from './data/testAnswersYesNo';
import _ from 'underscore';
_.mixin(require('underscore.deep'));

export default function matrix(req) {
  return new Promise((resolve, reject) => {
    if (req.session.answers) {
      const answers = _.deepClone(req.session.answers);
      const deepMatrixData = _.deepClone(matrixData);
      const deepAlgorithm = _.deepClone(algorithm);
      const matrix = applyAnswersToMatrix(deepMatrixData,
                                          answers,
                                          deepAlgorithm);
      resolve(matrix);
    } else {
      reject(true);
    }
  });
}
