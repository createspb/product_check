import _ from 'underscore';
_.mixin(require('underscore.deep'));
const matrixStatus = { no: 0, yes: 1 };

export const matrixData = {
  "0": {
    label: 'Рынок',
    blocks: [
      {
        label: 'Проблемы и&nbsp;адресаты',
        elems: [
          'Проблема',
          'Целевая аудитория',
          'Потребности аудитории',
          'Объем рынка и сегменты',
          'Конкурентные игроки'
        ],
        after: 'Customer Validation и корректировка гипотез',
        left: {
          label: 'Стартовый уровень',
          icon: 'guru'
        }
      },
      {
        label: 'Задачи и&nbsp;ожидания адресатов',
        elems: [
          'Customer Journey Map',
          'Маркетинг конкурентов',
          'Конкурентные продукты'
        ],
        after: 'Стратегия работы с KPI продукта и маркетинга',
        left: {
          label: 'Уровень проектирования',
          icon: 'len'
        }
      },
      {
        label: 'Реакция рынка',
        elems: [
          'Обратная связь пользователей',
          'Клики, покупки, заявки',
          'Обратная связь рынка и&nbsp;конкурентов',
          'Мониторинг внешней среды: data analysis, мониторинг цен и&nbsp;т.п.',
          'Отслеживание изменений внешних факторов',
          'Деятельность и&nbsp;реакция конкурентов'
        ],
        after: 'Customer Development: вовлечение, удержание, привлечение',
        left: {
          label: 'Уровень реализации',
          icon: 'dev'
        }
      }
    ],
    summary: {
      label: 'Доля рынка'
    }
  },
  "1": {
    label: 'Маркетинг',
    blocks: [
      {
        label: 'Доставка до&nbsp;аудитории',
        elems: [
          'Маркетинговые каналы',
          'Расчет стоимости привлечения пользователя'
        ]
      },
      {
        label: 'Маркетинговая стратегия',
        elems: [
          'Каналы взаимодействия с&nbsp;клиентом и&nbsp;точки контакта',
          'Маркетинговые каналы, инструменты и&nbsp;площадки',
          'Мессаджи в&nbsp;рекламе',
          'Стратегия работы с&nbsp;клиентом',
          'Расчет KPI маркетинга и&nbsp;медиаплана'
        ]
      },
      {
        label: 'Работа с&nbsp;маркетингом',
        elems: [
          'Производство инструментов и&nbsp;материалов',
          'Настройка отслеживания метрик',
          'Тестирование каналов, инструментов, площадок и&nbsp;мессаджей и&nbsp;корректировка',
          'Работа с CRM'
        ]
      }
    ],
    summary: {
      label: 'KPI маркетинга:',
      elems: [
        'Конверсии',
        'ROI',
        'Качество трафика',
        'Ядро',
        'CLV',
        'Охват'
      ]
    }
  },
  "2": {
    label: 'Продукт',
    blocks: [
      {
        label: 'Концепция продукта',
        elems: [
          'Идеи решения проблемы ',
          'Уникальное торговое предложение',
          'Преимущества и&nbsp;недостатки',
          'Модель монетизации'
        ]
      },
      {
        label: 'Продуктовая стратегия',
        elems: [
          'Каналы взаимодействия с&nbsp;услугой и&nbsp;точки контакта',
          'Сценарии использования продукта',
          'Функционал продукта, фишки, особенности',
          'Воронка и&nbsp;инструменты влияния на&nbsp;показатели',
          'Расчет KPI продукта',
          'Формирование состава и&nbsp;KPI для MVP'
        ]
      },
      {
        label: 'Работа с продуктом',
        elems: [
          'Прототипирование и&nbsp;дизайн интерфейсов',
          'Разработка и&nbsp;обеспечение качества',
          'ИТ-инфраструктура',
          'Системы отслеживания веб-метрик и&nbsp;тестирования вариантов',
          'Работа с&nbsp;бэклогом задач и&nbsp;приоритезация',
          'Техническая и&nbsp;дизайн-поддержка',
          'Тестирование гипотез, сценариев, воронки, фич и&nbsp;корректировка'
        ]
      }
    ],
    summary: {
      label: 'KPI продукта:',
      elems: [
        'Конверсии',
        'ROI',
        'CLV',
        'Средний чек',
        'Повторные покупки',
        'Retention (возвраты)',
        'Churn Rate',
        'Отказы',
        'Ядро'
      ]
    }
  },
  "3": {
    label: 'Бизнес',
    blocks: [
      {
        label: 'Бизнес-модель',
        elems: [
          'Операционные затраты',
          'Бизнес-модель'
        ]
      },
      {
        label: 'Бизнес-планирование',
        elems: [
          'Финансовая модель и&nbsp;анализ устойчивости',
          'Бизнес-план',
          'Риск-план'
        ]
      },
      {
        label: 'Бизнес-процессы',
        elems: [
          'Работа над организацией и&nbsp;оптимизацией бизнес-процессов',
          'Финансовое планирование и&nbsp;учет',
          'Работа с&nbsp;командой'
        ]
      }
    ],
    summary: {
      label: 'Выручка'
    }
  }
};

// export function shiftId(array) {
//   _.each(array, (value) => {
//     value.id = parseInt(value.id, 10) - 1;
//   });
//   return array;
// }

// export function objectToArray(object) {
//   const array = [];
//   _.map(object, (value, index) => {
//     array.push({
//       id: value.id,
//       value: value.value
//     });
//   });
//   return array;
// }

function getElem(matrix, tree) {
  const val = matrix[tree[0]].blocks[tree[1]].elems[tree[2]];
  if (!_.isObject(val)) {
    return { text: val, value: undefined };
  }
  return val;
}

function getSummaryElem(matrix, tree) {
  const val = matrix[tree[0]].summary.elems[tree[1]];
  if (!_.isObject(val)) {
    return { text: val, value: undefined };
  }
  return val;
}

function getAfterElem(matrix, tree) {
  const val = matrix[tree[0]].blocks[tree[1]].after;
  if (!_.isObject(val)) {
    return { text: val, value: undefined };
  }
  return val;
}

function setElem(matrix, tree, value) {
  matrix[tree[0]].blocks[tree[1]].elems[tree[2]] = value;
  return matrix;
}

function setSummaryElem(matrix, tree, value) {
  matrix[tree[0]].summary.elems[tree[1]] = value;
  return matrix;
}

function setAfterElem(matrix, tree, value) {
  matrix[tree[0]].blocks[tree[1]].after = value;
  return matrix;
}

function applyWrap(matrix, affect, answer, func) {
  if (!answer || !answer.value) {
    return matrix;
  } else {
    answer = answer.value
  }
  if (_.isString(affect[affect.length - 1])) {
    const als = _.map(affect[affect.length - 1].split(', '), (v) => parseInt(v, 10));
    for (let al of als) {
      affect[affect.length - 1] = al;
      matrix = func(matrix, affect, answer);
    }
    return matrix;
  } else {
    return func(matrix, affect, answer);
  }
}

// function applyWrapSummary(matrix, affect, answer, func) {
//   if (!answer || !answer.value) {
//     return matrix;
//   } else {
//     answer = answer.value
//   }
//   if (_.isString(affect[affect.length - 1])) {
//     const als = _.map(affect[affect.length - 1].split(', '), (v) => parseInt(v, 10));
//     for (let al of als) {
//       affect[affect.length - 1] = al;
//       matrix = func(matrix, affect, answer);
//     }
//     return matrix;
//   } else {
//     return func(matrix, affect, answer);
//   }
// }

function applyAffectAfter(matrix, affect, answer) {
  const elem = getAfterElem(matrix, affect);
  if (elem.value == undefined || elem.value == matrixStatus.yes) {
    matrix = setAfterElem(matrix, affect, {
      text: elem.text,
      value: matrixStatus[answer]
    });
  }
  return matrix;
}

function applyAffectSummary(matrix, affect, answer) {
  const elem = getSummaryElem(matrix, affect);
  if (elem.value == undefined || elem.value == matrixStatus.yes) {
    matrix = setSummaryElem(matrix, affect, {
      text: elem.text,
      value: matrixStatus[answer]
    });
  }
  return matrix;
}

function applyAffect(matrix, affect, answer) {
  const elem = getElem(matrix, affect);
  if (elem.value == undefined || elem.value == matrixStatus.yes) {
    matrix = setElem(matrix, affect, {
      text: elem.text,
      value: matrixStatus[answer]
    });
  }
  return matrix;
}

export function applyAnswersToMatrix(matrix, answers, algorithm) {
  let affectedMatrix = matrix;
  for (let questionRules of algorithm.questions) {
    const answer = _.find(answers, {id: questionRules.id});
    if (questionRules.affect) {
      for (let affect of questionRules.affect) {
        affectedMatrix = applyWrap(affectedMatrix, affect,
                                   answer, applyAffect);
      }
    }
    if (questionRules.affectSummary) {
      for (let affect of questionRules.affectSummary) {
        affectedMatrix = applyWrap(affectedMatrix, affect,
                                   answer, applyAffectSummary);
      }
    }
    if (questionRules.affectAfter) {
      for (let affect of questionRules.affectAfter) {
        affectedMatrix = applyWrap(affectedMatrix, affect,
                                   answer, applyAffectAfter);
      }
    }
  }
  return affectedMatrix;
}
