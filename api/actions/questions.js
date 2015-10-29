import questionsData from './data/questions';

export default function questions(req) {
  return Promise.resolve(questionsData);
}
