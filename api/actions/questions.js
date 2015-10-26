export default function questions(req) {
  const questions = {
    count: 11,

    "0": {
      id: "0",
      title: `Проблема, которую решает мой бизнес сформулирована и описана`,
      subtitle: `Проблема может быть сформулирована очень просто, главное,
                 чтобы она была настоящей и требующей решения.`,
      information: `Например, обе проблемы «Людям скучно стоять на эскалаторе»
                    и «Когда человек пишет деловое письмо на иностранном языке,
                    то он допускает досадные ошибки» могут быть реальными, но
                    не обе требуют решения.`,
      colorClass: `c1`
    },
    "1": {
      id: "1",
      title: `Реальные люди с этой проблемой определены, жизненные ситуации, в
              которых она возникает, описаны`,
      subtitle: `Ключевое слово: «реальные». Нужно понимание того, кто лично
                 по-настоящему озабочен проблемой.`,
      information: `Например: Индивидуальные предприниматели и менеджеры по
                    продаже, работающие с инорстранными клиентами, пишут много
                    писем иностранным клиентам, в которых допускают ошибки,
                    усложняющие переговоры и понижающие качество коммуникации.`,
      colorClass: `c2`
    },
    "2": {
      id: "2",
      title: `Определено и зафиксировано несколько идей того что мой бизнес
              предлагает людям для решения их проблем`,
      subtitle: `Должны быть сформулированы и записаны общие идеи продукта,
                 исходя из известных на момент деталей о людях и их проблеме.
                 2–3–5 идей решения проблемы необходимо, чтобы не выбрасывать
                 весь проект если первая идея не сработает.`,
      information: `Например: Проблему знакомства людей онлайн можно решать а)
                    созданием сайта знакомств; б) мобильного приложения “Люди
                    вокруг вас” или в) клуба по интересам на базе
                    финтес–центра.`,
      colorClass: `c3`
    },

    "3": {
      id: "3",
      title: `Проблемы людей и идеи решения проверены`,
      subtitle: `Проверить гипотезу о существовании работающей связки “реальная
                 проблема–нужное решение” можно опросами, ручной реализацией
                 услуги или тестовыми продажами в интернете.`,
      colorClass: `c4`
    },
    "4": {
      id: "4",
      title: `Конкуренты моего бизнеса, наши преимущества и недостатки перед
              ними понятны и зафиксированы`,
      subtitle: `Способ конкурентного анализа не важен — это может быть как
                 список “плюсов” и “минусов” предложения (вашего и конкурентов)
                 для пользователей, SWOT или подробный разбор рынка. Важно
                 иметь зафиксированный список конкурентов и понимать положение
                вашего бизнеса среди них.`,
      colorClass: `c5`
    },
    "5": {
      id: "5",
      title: `Уникальный подход моего продукта понятен и записан`,
      subtitle: `В отличие от уникального торгового преимущества над
                 конкурентами (УТП, USP), уникальный подход требует ответа на
                 более широкий вопрос: “Что мы делаем по–другому?” Ваш
                 уникальный подход может заключаться в том, чтобы: а)
                 предлагать другую относительно конкурентов услугу или
                 товар для решения проблемы; б) предлагать продукт другим
                 людям или г) предлагать ваше решение иначе, чем это делают
                 конкуренты.`,
      information: `Например: Uber предлагает услуги перевозки высокого класса
                    другому, более широкому кругу потребителей, а Groupon
                    предлагает те же самые услуги и товары, по–другому —
                    ваучерами на скидки и спецпредложения.`,
      colorClass: `c6`
    },

    "6": {
      id: "6",
      title: `Объем рынка, на котором придется работать, оценен`,
      subtitle: `Есть понимание того, что рынок существует и имеет объем,
                 достаточный для создания спроса на решение. Оценка рынка может
                производиться самыми разными способами — от анализа поисковых
                запросов по теме до оценки количества компаний, подходящих
                по размеру бизнеса.`,
      information: `Например: Объем рынка консалтинговых услуг для
                    сельскохозяйственных фирм среднего размера можно оценить,
                    воспользовавшись отчетами Росстата и Министерства
                    экономического развития РФ.`,
      colorClass: `c7`
    },
    "7": {
      id: "7",
      title: `Сформулировано, за что и сколько будут платить пользователи
              моего продукта`,
      subtitle: `Определены платные услуги, стоимость услуг или товаров. Для
                 сервисов с подписками определены варианты и стоимость подписок.
                 Для сервисов с бесплатным контентом определены границы
                 бесплатного и платного контента.`,
       colorClass: `c8`
    },
    "8": {
      id: "8",
      title: `Посчитана средняя стоимость привлечения клиента`,
      subtitle: `Средняя стоимость привлечения клиента (CAC) — цифра в рублях
                 или любой другой валюте, показывающая, во сколько вам обходится
                 приобретение каждого платящего пользователя.`,
      information: `Например: У проекта, потратившего 100 000 рублей на рекламу
                    и получившего 10 000 посетителей, из которых заплатило за
                    услуги 1 000 человек, CAC составляет 100000/1000 = 1 000
                    рублей.`,
      colorClass: `c9`
    },
    "9": {
      id: "9",
      title: `Подсчитаны операционные и другие затраты бизнеса`,
      subtitle: `В расходной части должны быть учтены зарплаты текущих и
                 предполгаемых сотрудников, стоимость разработки и поддержки
                 IT-решений, стоимость покупки, аренды и обслуживания
                 оборудования, необходимого для работы проекта, стоимость офиса
                 и сопутствующих затрат — канцтоваров, воды, питания, курьерских
                 служб и др.`,
      colorClass: `c10`
    },
    "10": {
      id: "10",
      title: `Описана модель монетизации продукта и финансовая модель бизнеса`,
      subtitle: `Модель монетизации — это документ, в котором описаны все
                 инструменты и способы получения дохода от продукта. Финансовая
                 модель — это финансовый план, включающий рассчет всех доходов
                 продукта согласно модели монетизации и плану по инвестициям, а
                 также всех расходов компании с учетом всех внутренних и внешних
                 факторов.`,
      information: `Например: Модель монетизации онлайн-телеканала “Дождь” –
                    платные подписки, в рамках которых предлагается расширенный
                    контент. Модель монетизации Яндекс.Такси — резделение
                    прибыли (revenue share) с таксопарками, участвующими в
                    проекте.`,
      colorClass: `c11`
    }

  };
  return Promise.resolve(questions);
}
