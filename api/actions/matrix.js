import matrixData from './data/matrix';
import algorithm from './data/algorithm';
import answers from './data/testAnswersAllNo';
import _ from 'underscore';

// const { NO, YES } = { NO: 'no', YES: 'yes' };
const matrixStatus = { no: 0, yes: 1 };

function objectToArray(object) {
  const array = [];
  _.map(object, (value, index) => {
    array.push(value);
  });
  return array;
}

function getElem(matrix, tree) {
  return matrix[tree[0]].blocks[tree[1]].elems[tree[2]];
}

function setElem(matrix, tree, value) {
  matrix[tree[0]].blocks[tree[1]].elems[tree[2]] = value;
  return matrix;
}

function applyAffect(matrix, affect, answer) {
  const value = getElem(matrix, affect);
  if (!_.isObject(value)) {
    matrix = setElem(matrix, affect, {
      text: value,
      value: matrixStatus[answer]
    });
  }
  return matrix;
}

function answersToFirstLevelMatrix(matrix, answers, algorithm) {
  let affectedMatrix = matrix;
  for (let questionRules of algorithm.questions) {
    const answer = _.find(answers, {id: questionRules.id});
    if (questionRules.affect) {
      for (let affect of questionRules.affect) {
        affectedMatrix = applyAffect(affectedMatrix, affect, answer.value);
      }
    }
    // console.log(questionRules, answer);
  }
  console.log(matrix[0].blocks[0].elems);
  return matrix;
}

export default function matrix(req) {
  const answersArray = objectToArray(answers);
  const matrix = answersToFirstLevelMatrix(matrixData, answersArray, algorithm);
  return Promise.resolve(matrix);
}
