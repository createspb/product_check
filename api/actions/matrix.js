import { matrixData, applyAnswersToMatrix, objectToArray } from './data/matrix';
import algorithm from './data/algorithm';
import answers from './data/testAnswersYesNo';
import _ from 'underscore';

export default function matrix(req) {
  const answersArray = objectToArray(answers);
  const matrix = applyAnswersToMatrix(matrixData, answersArray, algorithm);
  return Promise.resolve(matrix);
}
