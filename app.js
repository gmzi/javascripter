function cagar() {
  console.log('fuerza');
  return function sorete() {
    return 'soretes';
  };
}

const baño = cagar();
baño; // fuerza
console.log(baño()); // fuerza // soretes
