export default {
  feedback: {
    label: 'ОСТАВИТЬ ОТЗЫВ',
    email: 'Почта',
    text: 'Текст сообщения',
    button: 'ОТПРАВИТЬ',
    successLabel: 'ОТЛИЧНО!',
    successText: 'Мы скоро свяжемся с вами',
  },
  subresults: {
    label: 'Результаты',
    button: 'Продолжить',
    other: 'Ещё',
    fr: 'из',
    q: ['вопрос', 'вопроса', 'вопросов']
  },
  warning: {
    label: 'Важно! У&nbsp;вас нет задачи ответить &laquo;правильно&raquo; или &laquo;побороть&raquo; этот тест',
    p: `Тест не&nbsp;проверяет ваши ответы на&nbsp;правдивость&nbsp;&mdash; если вы&nbsp;хотите получить рекомендации исходя из&nbsp;вашей ситуации, внимательно читайте вопросы, примеры к&nbsp;ним (ниже) и&nbsp;отвечайте так, как у&nbsp;вас обстоят дела на&nbsp;самом деле.`,
    p1: `Под &laquo;записанными&raquo; и&nbsp;&laquo;рассчитанными&raquo; подразумеваются данные, существующие в&nbsp;цифровом или бумажном виде. Мысли и&nbsp;расчеты, произведенные в&nbsp;голове, таковыми не&nbsp;являются.`,
    info: `Примеры&nbsp;&mdash; важная часть каждого вопроса. Мы&nbsp;приводим примеры из&nbsp;реальной практики. Они помогут правильно понять вопрос.`,
    button: 'Начать'
  },
  dateFormats: {
    std: 'DD.MM.YY HH:mm'
  },
  admin: {
    title: 'Панель администрирования',
    logout: 'Выход',
    summary: 'Сводка',
    close: 'Закрыть'
  },
  adminTable: {
    n: '#',
    title: 'Название продукта',
    date: 'Дата'
  },
  welcome: {
    h1: 'АУДИТ ИДЕИ ПРОДУКТА',
    from: 'от ',
    companyName: 'Create',
    and: ' и ',
    companyPartner: 'Digital Change',
    companyPartnerLong: 'Digital Change',
    text: `Проверьте, готовы&nbsp;ли вы&nbsp;к&nbsp;созданию продукта и&nbsp;инвестициям. Десять вопросов, ответы на&nbsp;которые определят успех или провал идеи.`,
    button: 'Поехали'
  },
  questionCaptions: {
    yes: 'Да',
    no: 'Нет'
  },
  name: {
    label: 'Укажите название продукта',
    button: 'Готово',
    placeholder: 'Введите название продукта',
  },
  results: {
    and: ' и ',
    h1: 'Поздравляем! Вас ждет провал',
    p: 'Слишком много вопросов. Вам нужно хорошенько поработать над своей идеей.',
    nextH1: 'Что дальше',
    nextCenter: 'Хотите пройти тест еще&nbsp;раз?',
    nextLeft: 'Рекомендуем прочитать статью',
    nextRight: 'Уберегите друзей от&nbsp;провала&nbsp;&mdash; поделитесь инструментом',
    articleTitle: 'Матрица цифрового продукта',
    articleDescription: 'Блог Create Digital',
    from: 'от ',
    companyName: 'Create',
    companyPartner: 'D/C',
    repeat: 'Повторить попытку',
    feedback: 'Помогите сделать сервис лучше',
    feedbackButton: 'Обратная связь',
  },
  login: {
    placeholderName: 'Логин',
    placeholderPass: 'Пароль',
    button: 'Войти',
    error: 'Ошибка'
  },
  matrix: {
    progressCaption: 'Готовность',
    results: [{
      minValue: 0,
      maxValue: 50,
      text: 'Похоже, вас ждет провал.',
      description: 'Слишком много вопросов, нужно хорошенько поработать над идеей.'
    }, {
      minValue: 50,
      maxValue: 99,
      text: 'Семь раз отмерь, один раз отрежь',
      description: 'Все не так плохо, но есть что доработать, прежде чем приступать к проектированию.'
    }, {
      minValue: 100,
      maxValue: 100,
      text: 'Поздравляем! Вы готовы приступить к проектированию.',
      description: 'Хорошее начало долгого и сложного пути. Искренне желаем удачи.'
    }]
  },
  lvlsCaptions: {
    0: [{
      minValue: 81,
      maxValue: 100,
      text: 'Отлично! Ваш продукт готов к проектированию.'
    }, {
      minValue: 51,
      maxValue: 80,
      text: 'Ваш продукт пока не готов к проектированию.'
    }, {
      minValue: 0,
      maxValue: 50,
      text: 'Все не очень хорошо. Ваш продукт не готов к проектированию.'
    }],
    1: [{
      minValue: 0,
      maxValue: 100,
      // text: 'Здесь показана зависимость факторов уровня проектирования от факторов стартового уровня. Готовность к уровню реализации пока нельзя оценить.'
      text: 'Нельзя спрогнозировать, пока не&nbsp;пройден уровень бизнес-аналитики.'
    }],
    2: [{
      minValue: 0,
      maxValue: 100,
      text: 'Нельзя спрогнозировать, пока не&nbsp;пройден уровень проектирования.'
    }],
    3: [{
      minValue: 0,
      maxValue: 100,
      text: 'Нельзя спрогнозировать, пока не&nbsp;пройден уровень реализации.'
    }]
  }
};

export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  const i = (number % 100 > 4 && number % 100 < 20) ?
            2 :
            cases[(number % 10 < 5) ? number % 10 : 5];
  return titles[i];
}
