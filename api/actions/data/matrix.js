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
          'Какую проблему решает наш бизнес?',
          'Кто действительно озадачен проблемой?',
          'Как сейчас решается проблема?',
          'Каков рынок решения этой проблемы?',
        ],
        after: 'Customer Validation и корректировка гипотез',
        left: {
          label: 'Бизнес-аналитика',
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
          label: 'Проектирование',
          icon: 'len'
        }
      },
      {
        label: 'Обратная связь рынка',
        elems: [
          'Установка систем сбора обратной связи',
          'Устнановка и&nbsp;настройка веб-метрик',
          'Установка и&nbsp;настройка систем слпит-тестирования',
        ],
        after: 'Запуск MVP',
        left: {
          label: 'Реализация',
          icon: 'dev'
        }
      },
      {
        label: 'Сбор и анализ обратной связи от ранних последователей',
        elems: [
          'Сбор и&nbsp;анализ данных веб-метрик',
          'Анализ реакции конкурентов',
          '1) Работа над вовлечением',
          '2) Работа над удержанием',
          '3) Работа над привлечением новой аудитории',
        ],
        after: 'Customer Development: вовлечение, удержание, привлечение',
        left: {
          label: 'Управление продуктом',
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
          'Где находятся те, у&nbsp;кого&nbsp;есть проблема?',
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
        label: 'Управление маркетингом',
        elems: [
          'Разработка и&nbsp;настройка инструментов и рекламных материалов',
          'Проведение тестовой рекламной кампании. Корректировка мессаджей, каналов, инструментов, площадок',
          'Установка и&nbsp;настройка CRM системы'
        ]
      },
      {
        label: 'Работа над достижением KPI маркетинга',
        elems: [
          'Сбор и&nbsp;работа с&nbsp;данными о пользователях',
          '1) Тестирование маркетинговых гипотез',
          '2) Корректировка маркетинга',
          '3) Увеличение маркетинговых бюджетов. Работа над&nbsp;оптимизацией стоимости привлечения платящего клиента'
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
          'Какие пути решения проблемы могут быть?',
          'Какой мессадж хотим донести до&nbsp;аудитории?',
          'Какое уникальное предложение можем сделать?',
          'Какие фишки, отличия и&nbsp;преимущества можем обеспечить в&nbsp;своем продукте?'
        ]
      },
      {
        label: 'Продуктовая стратегия',
        elems: [
          'Каналы взаимодействия с&nbsp;услугой и&nbsp;точки контакта',
          'Сценарии использования продукта',
          'Функционал продукта, фишки, особенности',
          'Воронка&nbsp;и инструменты влияния на&nbsp;показатели',
          'Расчет KPI продукта'
        ]
      },
      {
        label: 'Управление продуктом',
        elems: [
          'Прототипирование&nbsp;и дизайн интерфейсов',
          'Спецификация, тест-план, проектирование&nbsp;и разработка',
          'Тестирование&nbsp;и обеспечение качества',
          'Подготовка ИТ-инфраструктуры'
        ]
      },
      {
        label: 'Работа над&nbsp;достижением KPI&nbsp;продукта',
        elems: [
          'Работа с бэклогом',
          'Оценка входящего трафика от&nbsp;маркетинга и&nbsp;его&nbsp;поведения в&nbsp;продукте',
          '1) Тестирование гипотез проблем и&nbsp;решений пользователей',
          '2) Корректировка гипотез',
          '3) Поиск оптимальной модели масштабирования'
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
          'Определение модели монетизации',
          'Расчет экономики продукта',
          'Составление бизнес-модели',
          'План работы'
        ]
      },
      {
        label: 'Бизнес-планирование',
        elems: [
          'Финансовая модель и&nbsp;анализ устойчивости',
          'Организация',
          'План запуска и&nbsp;тестирования MVP'
        ]
      },
      {
        label: 'Бизнес-процессы',
        elems: [
          'Организация бизнес-процессов',
          'Управление рисками, коммуникациями, сроками, стоимостями',
          'Работа с&nbsp;командой'
        ]
      },
      {
        label: 'Организация бизнес-процессов',
        elems: [
          'Управление рисками, коммуникациями, сроками, стоимостями',
          'Работа с командой',
          '1) Управление денежными потоками',
          '2) Поиск и&nbsp;привлечение финансирования',
          '3) Усложенение и&nbsp;последующая оптимизация бизнес-процессов'
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
