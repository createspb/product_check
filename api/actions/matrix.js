import { matrixData, applyAnswersToMatrix,
         objectToArray, shiftId } from './data/matrix';
import algorithm from './data/algorithm';
import answers from './data/testAnswersYesNo';
import _ from 'underscore';
// import deepClone from 'underscore.deepclone';
// _.mixin(deepClone);

export default function matrix(req) {
  return new Promise((resolve, reject) => {
    if (req.session.answers) {
      const { matrixCopy, answersTestCopy, answersCopy, algorithmCopy } = {
        algorithmCopy: JSON.parse(JSON.stringify(algorithm)),
        matrixCopy: JSON.parse(JSON.stringify(matrixData)),
        answersTestCopy: JSON.parse(JSON.stringify(answers)),
        answersCopy: JSON.parse(JSON.stringify(req.session.answers))
      };
      // console.log(matrixCopy[0].blocks[0].elems);
      // const answersArray1 = objectToArray(answersTestCopy);
      // console.log(answersArray1);
      // const answersArray = objectToArray(answersCopy);
      // console.log(answersArray);
      const matrix = applyAnswersToMatrix(matrixCopy,
                                          answersCopy,
                                          algorithmCopy);
      resolve(matrix);
    } else {
      reject(true);
    }
  });
}
