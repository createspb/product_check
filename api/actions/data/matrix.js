import _ from 'underscore';
_.mixin(require('underscore.deep'));
const matrixStatus = { no: 0, yes: 1 };

export const matrixData = {
  "0": {
    label: 'Рынок',
    blocks: [
      {
        label: 'Проблемы и адресаты',
        elems: [
          'Проблема',
          'Целевая аудитория',
          'Потребности аудитории',
          'Объем рынка и сегменты',
          'Конкурентные игроки' ,
          'Внешние факторы: политические, экономические, технологические и пр.'
        ],
        after: 'Customer Validation и корректировка гипотез',
        left: {
          label: 'Стартовый уровень',
          icon: 'guru'
        }
      },
      {
        label: 'Задачи и ожидания адресатов',
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
          'Обратная связь рынка и конкурентов',
          'Мониторинг внешней среды: data analysis, мониторинг цен и т.п.',
          'Отслеживание изменений внешних факторов',
          'Деятельность и реакция конкурентов',
          'Мониторинг внешней среды: data analysis, мониторинг цен и т.п.'
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
        label: 'Доставка до аудитории',
        elems: [
          'Маркетинговые каналы',
          'Расчет стоимости привлечения пользователя'
        ]
      },
      {
        label: 'Маркетинговая стратегия',
        elems: [
          'Каналы взаимодействия с клиентом и точки контакта',
          'Маркетинговые каналы, инструменты и площадки',
          'Мессаджи в рекламе',
          'Стратегия работы с клиентом',
          'Расчет KPI маркетинга и медиаплана'
        ]
      },
      {
        label: 'Работа с маркетингом',
        elems: [
          'Производство инструментов и материалов',
          'Настройка отслеживания метрик',
          'Тестирование каналов, инструментов, площадок и мессаджей и корректировка',
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
          'Преимущества и недостатки',
          'Модель монетизации'
        ]
      },
      {
        label: 'Продуктовая стратегия',
        elems: [
          'Каналы взаимодействия с услугой и точки контакта',
          'Сценарии использования продукта',
          'Функционал продукта, фишки, особенности',
          'Воронка и инструменты влияния на показатели',
          'Расчет KPI продукта',
          'Формирование состава и KPI для MVP'
        ]
      },
      {
        label: 'Работа с продуктом',
        elems: [
          'Прототипирование и дизайн интерфейсов',
          'Разработка и обеспечение качества',
          'ИТ-инфраструктура',
          'Системы отслеживания веб-метрик и тестирования вариантов',
          'Работа с бэклогом задач и приоритезация',
          'Техническая и дизайн-поддержка',
          'Тестирование гипотез, сценариев, воронки, фич и корректировка'
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
          'Финансовая модель и анализ устойчивости',
          'Бизнес-план',
          'Риск-план'
        ]
      },
      {
        label: 'Бизнес-процессы',
        elems: [
          'Работа над организацией и оптимизацией бизнес-процессов',
          'Финансовое планирование и учет',
          'Работа с командой'
        ]
      }
    ],
    summary: {
      label: 'Выручка'
    }
  }
};

export function shiftId(array) {
  _.each(array, (value) => {
    value.id = parseInt(value.id, 10) - 1;
  });
  return array;
}

export function objectToArray(object) {
  const array = [];
  _.map(object, (value, index) => {
    array.push({
      id: value.id,
      value: value.value
    });
  });
  return array;
}

function getElem(matrix, tree) {
  const val = matrix[tree[0]].blocks[tree[1]].elems[tree[2]];
  if (!_.isObject(val)) {
    return { text: val, value: undefined };
  }
  return val;
}

function setElem(matrix, tree, value) {
  matrix[tree[0]].blocks[tree[1]].elems[tree[2]] = value;
  return matrix;
}

function applyAffectWrap(matrix, affect, answer) {
  // console.log(affect, answer);
  if (_.isString(affect[2])) {
    const als = _.map(affect[2].split(', '), (v) => parseInt(v, 10));
    for (let al of als) {
      affect[2] = al;
      matrix = applyAffect(matrix, affect, answer);
    }
    return matrix;
  } else {
    return applyAffect(matrix, affect, answer);
  }
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
        if (answer && answer.value) {
          affectedMatrix = applyAffectWrap(affectedMatrix, affect, answer.value);
        }
      }
    }
  }
  return matrix;
}
