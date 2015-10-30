export default function getAnswers(req) {
  return Promise.resolve(req.session.answers || {});
}
