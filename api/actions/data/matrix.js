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
          {
            text: 'Какую проблему решает наш бизнес?',
            tooltip: 'Поиск, формулирование и корректировка',
          },
          {
            text: 'Кто действительно озадачен проблемой?',
            tooltip: 'Поиск клиентов, сегментация аудитории, описание персонажей',
          },
          {
            text: 'Как сейчас решается проблема?',
            tooltip: 'Определение конкурентов. Определение потребностей клиентов, преимуществ и недостатков текущих решений',
          },
          {
            text: 'Каков рынок решения этой проблемы?',
            tooltip: 'Оценка объема рынка. Оценка ключевых игроков, определение сильных и слабых сторон. Сегментация рынка и поиск точек роста',
          }
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
          {
            text: 'Customer Journey Map',
            tooltip: 'Определение каналов и точек взаимодействия с маркетингом и продуктом',
          },
          {
            text: 'Маркетинг конкурентов',
            tooltip: 'Изучение и определение возможностей использования альтернативных (более дешевых) методов',
          },
          {
            text: 'Конкурентные продукты',
            tooltip: 'Изучение функциональных возможностей конкуретных продуктов, оценка плюсов и минусов на соответствие потребностям наших клиентов в решении проблемы',
          },
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
          {
            text: 'Установка систем сбора обратной связи',
            tooltip: '',
          },
          {
            text: 'Устнановка и&nbsp;настройка веб-метрик',
            tooltip: '',
          },
          {
            text: 'Установка и&nbsp;настройка систем слпит-тестирования',
            tooltip: '',
          },
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
          {
            text: 'Сбор и&nbsp;анализ данных веб-метрик',
            tooltip: '',
          },
          {
            text: 'Анализ реакции конкурентов',
            tooltip: 'Изменения, копирование, обратная связь и т.п.',
          },
          {
            text: '1) Работа над вовлечением',
            tooltip: 'Нужно сделать все, чтобы пользователи хотели решать свои задачи с помощью продукта',
          },
          {
            text: '2) Работа над удержанием',
            tooltip: 'Нужно сделать все, чтобы пользователи постоянно возвращались в ваш продукт, рекомендовали его друзьям и знакомым',
          },
          {
            text: '3) Работа над привлечением новой аудитории',
            tooltip: '',
          },
        ],
        after: 'Customer Development: вовлечение, удержание, привлечение',
        left: {
          label: 'Управление продуктом',
          icon: 'settings'
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
          {
            text: 'Где находятся те, у&nbsp;кого&nbsp;есть проблема?',
            tooltip: 'Какие каналы коммуникации можем с ними использовать? Сколько будет стоить заявка/ заказ/ клиент/ контракт? ',
          },
        ]
      },
      {
        label: 'Маркетинговая стратегия',
        elems: [
          {
            text: 'Каналы взаимодействия с&nbsp;клиентом и&nbsp;точки контакта',
            tooltip: 'Определение жизненного цикла клиента и мест, где ему удобнее всего столкнуться с маркетингом',
          },
          {
            text: 'Маркетинговые каналы, инструменты и&nbsp;площадки',
            tooltip: 'Описание работы маркетинговых каналов, инструментов и площадок',
          },
          {
            text: 'Мессаджи в&nbsp;рекламе',
            tooltip: 'Формулирование мессаджей, акцент на преимуществах и УТП',
          },
          {
            text: 'Стратегия работы с&nbsp;клиентом',
            tooltip: 'Формулирование стратегии работы с клиентом: самообслуживание/ индивидуальный подход и пр. Акцентирование на всем жизненном цикле взаимодействия с компанией',
          },
          {
            text: 'Расчет KPI маркетинга и&nbsp;медиаплана',
            tooltip: 'Формирование KPI и формулы оптимальной маркетинговой кампании. Составление плана работ',
          },
        ]
      },
      {
        label: 'Управление маркетингом',
        elems: [
          {
            text: 'Разработка и&nbsp;настройка инструментов и рекламных материалов',
            tooltip: '',
          },
          {
            text: 'Проведение тестовой рекламной кампании. Корректировка мессаджей, каналов, инструментов, площадок',
            tooltip: '',
          },
          {
            text: 'Установка и&nbsp;настройка CRM системы',
            tooltip: '',
          },
        ]
      },
      {
        label: 'Работа над достижением KPI маркетинга',
        elems: [
          {
            text: 'Сбор и&nbsp;работа с&nbsp;данными о пользователях',
            tooltip: `Сбор и струкутрирование данных о пользователях в CRM (email'ы, контакты и т.п.)<br>Проверка гипотез по возвратам пользователей (email рассылки, бонусы, рекомендации и т.п.) `,
          },
          {
            text: '1) Тестирование маркетинговых гипотез',
            tooltip: 'Тестирование мессаджей, каналов, инструментов, площадок и работа с KPI',
          },
          {
            text: '2) Корректировка маркетинга',
            tooltip: 'Корректировка мессаджей, каналов, инструментов, площадок и KPI по результатам тестирования MVP',
          },
          {
            text: '3) Увеличение маркетинговых бюджетов. Работа над&nbsp;оптимизацией стоимости привлечения платящего клиента',
            tooltip: '',
          },
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
          {
            text: 'Какие пути решения проблемы могут быть?',
            tooltip: 'Идеи и способы решения проблемы',
          },
          {
            text: 'Какой мессадж хотим донести до&nbsp;аудитории?',
            tooltip: 'Формулирование мессаджа продукта, понятного аудитории и отвечающего на ключевую проблему',
          },
          {
            text: 'Какое уникальное предложение можем сделать?',
            tooltip: 'Формулирование УТП и USP',
          },
          {
            text: 'Какие фишки, отличия и&nbsp;преимущества можем обеспечить в&nbsp;своем продукте?',
            tooltip: 'Формулирование отличительных особенностей продукта',
          },
        ]
      },
      {
        label: 'Продуктовая стратегия',
        elems: [
          {
            text: 'Каналы взаимодействия с&nbsp;услугой и&nbsp;точки контакта',
            tooltip: 'Определение точек входа в продукт, определение жизненного цикла клиента в продукте, определение триггеров и ожиданий',
          },
          {
            text: 'Сценарии использования продукта',
            tooltip: 'Шаблонизация поведения аудитории. Описание пользовательских историй и пользовательских сценариев взаимодействия с продуктом, на основании потребностей, ожиданий, точек входа и жизненного цикла',
          },
          {
            text: 'Функционал продукта, фишки, особенности',
            tooltip: 'Формулирование особенностей и возможностей функционала продукта в соответствии со сценариям использования продукта, определение функциональной архитектуры продукта',
          },
          {
            text: 'Воронка&nbsp;и инструменты влияния на&nbsp;показатели',
            tooltip: 'Формирование воронки продаж. Соотнесение потребностей аудитории с воронкой продаж. Ранжирование функциональных возможностей и особенностей для определения MVP и оптимизации воронки',
          },
          {
            text: 'Расчет KPI продукта',
            tooltip: '',
          },
        ]
      },
      {
        label: 'Управление продуктом',
        elems: [
          {
            text: 'Прототипирование&nbsp;и дизайн интерфейсов',
            tooltip: '',
          },
          {
            text: 'Спецификация, тест-план, проектирование&nbsp;и разработка',
            tooltip: '',
          },
          {
            text: 'Тестирование&nbsp;и обеспечение качества',
            tooltip: '',
          },
          {
            text: 'Подготовка ИТ-инфраструктуры',
            tooltip: '',
          },
        ]
      },
      {
        label: 'Работа над&nbsp;достижением KPI&nbsp;продукта',
        elems: [
          {
            text: 'Работа с бэклогом',
            tooltip: 'Ранжирование фич, управление приоритетами, оценка результатов по KPI',
          },
          {
            text: 'Оценка входящего трафика от&nbsp;маркетинга и&nbsp;его&nbsp;поведения в&nbsp;продукте',
            tooltip: '',
          },
          {
            text: '1) Тестирование гипотез проблем и&nbsp;решений пользователей',
            tooltip: 'Тестирование и оценка мессаджей продукта, сценариев, воронки, обратной связи. Затем корректировка',
          },
          {
            text: '2) Корректировка гипотез',
            tooltip: 'Корректировка мессаджей, функционала, фич, воронки, по результатам тестирования MVP. Тестирование возможностей и нахождение оптимальной модели масштабирования продукта',
          },
          {
            text: '3) Поиск оптимальной модели масштабирования',
            tooltip: 'Акцент в функционале на поддержке текущего продукта. Поиск возможностей масштабирования продукта и продуктовых возможностей (базы клиентов/ накопленных данных и т.п.)',
          },
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
          {
            text: 'Определение модели монетизации',
            tooltip: 'Расчет платных возможностей продукта, поиск возможностей монетизации',
          },
          {
            text: 'Расчет экономики продукта',
            tooltip: 'Расчет операционных затрат, составление финансового плана и инвестиционных документов',
          },
          {
            text: 'Составление бизнес-модели',
            tooltip: 'По Остервальду или другими способами',
          },
          {
            text: 'План работы',
            tooltip: 'Составление бизнес-плана с таймлайном',
          },
        ]
      },
      {
        label: 'Бизнес-планирование',
        elems: [
          {
            text: 'Финансовая модель и&nbsp;анализ устойчивости',
            tooltip: 'Анализ устойчивости финансовой модели',
          },
          {
            text: 'Организация',
            tooltip: 'Определение структуры команды, подбор команды и подрядчиков. Организация юридических документов',
          },
          {
            text: 'План запуска и&nbsp;тестирования MVP',
            tooltip: 'График-план, риск-план, реагирование на риски',
          },
        ]
      },
      {
        label: 'Бизнес-процессы',
        elems: [
          {
            text: 'Организация бизнес-процессов',
            tooltip: '',
          },
          {
            text: 'Управление рисками, коммуникациями, сроками, стоимостями',
            tooltip: '',
          },
          {
            text: 'Работа с&nbsp;командой',
            tooltip: '',
          },
        ]
      },
      {
        label: 'Организация бизнес-процессов',
        elems: [
          {
            text: 'Управление рисками, коммуникациями, сроками, стоимостями',
            tooltip: '',
          },
          {
            text: 'Работа с командой',
            tooltip: '',
          },
          {
            text: '1) Управление денежными потоками',
            tooltip: '',
          },
          {
            text: '2) Поиск и&nbsp;привлечение финансирования',
            tooltip: '',
          },
          {
            text: '3) Усложенение и&nbsp;последующая оптимизация бизнес-процессов',
            tooltip: '',
          },
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
  // if (!_.isObject(val)) {
  //   return { text: val, value: undefined, tool };
  // }
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
      tooltip: elem.tooltip,
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
