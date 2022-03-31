class Car {
  constructor(type) {
    this.info;
  }

  getInfo() {
    return this.type;
  }
}

class BMW extends Car {}
class BENZ extends Car {}

class CarManager {
  constructor(car = null) {
    this.car = car;
    this.carInfo;
  }

  initCarInfo() {
    this.carInfo = car.getInfo();
  }

  setCar(car) {
    this.car = car;
    this.initCarInfo();
  }
}

const bmw = new BMW();
const benz = new BENZ();

const carController = new CarManager();

carController.setCar(bmw);
carController.setCar(benz);
console.log(carController);
