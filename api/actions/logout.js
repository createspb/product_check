export default function logout(req) {
  return new Promise((resolve) => {
    req.session = null;
    return resolve(null);
    // Simplified to fix logout work
    // req.session.destroy(() => {
    //   req.session = null;
    //   return resolve(null);
    // });
  });
}
