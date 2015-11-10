export default function storeAnswer(req) {
  req.session.answers = req.session.answers || {};
  return new Promise((resolve, reject) => {
    try {
      const { id, value } = req.body;
      req.session.answers[id] = {id: id, value};
      resolve(req.session.answers);
    } catch(err) {
      reject('error 1');
    };
  });
}
