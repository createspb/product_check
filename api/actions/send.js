import aws from 'aws-sdk';

export default function send(req) {
  return new Promise((resolve, reject) => {
    aws.config.update({
      accessKeyId: process.env.SES_KEY_ID,
      secretAccessKey: process.env.SES_ACCESS_KEY,
    });
    aws.config.update({region: 'eu-west-1'});
    const ses = new aws.SES({apiVersion: '2010-12-01'});
    const to = ['please@createdigital.me'];
    const from = 'robot@createdigital.me';
    ses.sendEmail({
      Source: from,
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Data: 'Сообщение из АудитаПродукта',
        },
        Body: {
          Text: {
            Data: `E-mail: ${req.body.email},
            Text: ${req.body.text}`
          }
        }
      }
    }, (err, data) => {
      if (err) {
        console.log(err);
        reject(true);
      } else {
        resolve(data);
      }
    });
  });
}
