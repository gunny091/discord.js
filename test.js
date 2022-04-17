const p = new Promise((resolve, reject, a) => {
  resolve(a);
});

p(1).then(a => {
  console.log(a);
});
