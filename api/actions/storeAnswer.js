export default function storeAnswer(req) {
  // if (!req.session.answers) {
  //   req.session[answers] = {};
  // }
  // req.session[answers] ||= {};
  return new Promise((resolve, reject) => {
    try {
      console.log(req.body);
      resolve(true);
    } catch(err) {
      reject(true);
    };
    // models.user.findOne({
    //   where: {
    //     username: req.body.username,
    //     password: md5(req.body.password)
    //   }
    // }).then(function(user) {
    //   if (user) {
    //     req.session.user = user;
    //     resolve(user);
    //   } else {
    //     reject(true);
    //   }
    // });
  });
}
