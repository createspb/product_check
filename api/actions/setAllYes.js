import answers from './data/testAnswersAllYes';

export default function storeAnswer(req) {
  req.session.answers = req.session.answers || {};
  return new Promise((resolve, reject) => {
    try {
      req.session.answers = answers;
      resolve(req.session.answers);
    } catch(err) {
      reject(true);
    };
  });
}
