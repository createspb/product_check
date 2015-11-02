export default function storeProductName(req) {
  return new Promise((resolve, reject) => {
    try {
      req.session.productName = req.body.productName;
      resolve(req.session.productName);
    } catch(err) {
      reject('error 2');
    };
  });
}
