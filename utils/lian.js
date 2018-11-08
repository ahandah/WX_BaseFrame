
// export default class lian {

//   constructor() {

//   }


// }

var promise;

function createP() {
  promise = new Promise((resolve, reject) => {resolve();});
  return this;
}

function lian(fn) {

  promise.then(() => {
    
    promise = new Promise((resolve, reject) => { resolve(fn()); });
    
  })

  return this;
 
}


module.exports = {
  createP: createP,
  lian: lian
}

