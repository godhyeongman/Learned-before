class Duck {
  quack() {
    console.log("꽥");
  }
}

class Person {
  speak() {
    console.log("꽤애액");
  }
}

function makeNoise(duck) {
  duck.quack();
}

makeNoise(new Duck());
makeNoise(new Person());
