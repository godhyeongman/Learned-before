모든 자료 출처: https://poiemaweb.com/js-object-oriented-programming

# JS는 프로토타입 기반 언어

자바 스크립트는 멀티-패러타임 언어로 명령형, 함수형, 프로토타입 기반 객체지향 언어다.

다른 객체지향 언어들과 다르게 자바스크립트는 객체지향 프로그래밍 능력들을 프로토타입 기반으로 지니고 있다.

### 자바스크립트의 별도 객체 생성 방법.

- 객체 리터럴

- Object() 생성자 함수

- 생성자 함수

- Class [class도 함수이다.]

---

## 생성자 함수와 인스턴스의 생성

자바스크립트는 생성자 함수와 new연산자를 통해 인스턴스를 생성할 수 있다.
이때 생성자 함수는 클래스이자 생성자의 역할을 한다.

```javascript
// 생성자 함수(Constructor)
function Person(name) {
  // 프로퍼티
  this.name = name;

  // 메소드
  this.setName = function (name) {
    this.name = name;
  };

  // 메소드
  this.getName = function () {
    return this.name;
  };
}

// 인스턴스의 생성
var me = new Person("Lee");
console.log(me.getName()); // Lee

// 메소드 호출
me.setName("Kim");
console.log(me.getName()); // Kim
```

위 예제는 문제가 많다.
이유는 인스턴스 생성시 각각의 인스턴스에 메서드 setName, getName이 중복되어
생성되기 때문이다. 각 인스턴스가 내용이 동일한 메서드를 소유하기 떄문에
인스턴스가 많아지거나 메서드의 크기가 크다면 무시할 수 없는 문제가 된다.

이같은 문제의 해결점은 *프로토타입*이다.

## 프로토타입 체인과 메서드 정리

모든 객체는 *프로토타입*이라는 다른 객체를 가리키는 내부 링크를 가지고 있다.
즉, 프로토타입을 통해 직접 객체를 연결할 수 있는데 이를 프로토타입 체인이라 한다.

프로토타입을 이용하여 생성자 함수 내부의 메서드를 생성자 함수의 prototype 프로퍼티가
가르키는 프로토타입 객체로 이동 시키면 생성자 함수에 의해 생성된 모든 인스턴스는
프로토타입 객체의 메서드를 참조할 수 있다.

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 객체에 메소드 정의
Person.prototype.setName = function (name) {
  this.name = name;
};

// 프로토타입 객체에 메소드 정의
Person.prototype.getName = function () {
  return this.name;
};

var me = new Person("Lee");
var you = new Person("Kim");
var him = new Person("choi");

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me); // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }
```

![이미지](https://poiemaweb.com/img/prototype.png)

Person 생성자 함수의 prototype 프로퍼티가 가리키는 프로토타입 객체로 이동시킨 setName. getName 메소드는 프로토타입 체인에 의해 모든 인스턴스가 참조할 수 있다. 프로토타입 객체는 상속할 것들이 저장되는 장소이다.

아래는 더글라스 크락포드가 제안한 프로토타입 객체에 메소드를 추가하는 방식이다.

/\*\*

- 모든 생성자 함수의 프로토타입은 Function.prototype이다. 따라서 모든 생성자 함수는 Function.prototype.method()에 접근할 수 있다.
- @method Function.prototype.method
- @param ({string}) (name) - (메소드 이름)
- @param ({function}) (func) - (추가할 메소드 본체)
  \*/
  Function.prototype.method = function (name, func) {
  // 생성자함수의 프로토타입에 동일한 이름의 메소드가 없으면 생성자함수의 프로토타입에 메소드를 추가
  // this: 생성자함수
  if (!this.prototype[name]) {
  this.prototype[name] = func;
  }
  };

```js
/**
 * 생성자 함수
 */
function Person(name) {
  this.name = name;
}

/**
 * 생성자함수 Person의 프로토타입에 메소드 setName을 추가
 */
Person.method("setName", function (name) {
  this.name = name;
});

/**
 * 생성자함수 Person의 프로토타입에 메소드 getName을 추가
 */
Person.method("getName", function () {
  return this.name;
});

var me = new Person("Lee");
var you = new Person("Kim");
var him = new Person("choi");

console.log(Person.prototype);
// Person { setName: [Function], getName: [Function] }

console.log(me); // Person { name: 'Lee' }
console.log(you); // Person { name: 'Kim' }
console.log(him); // Person { name: 'choi' }
```
