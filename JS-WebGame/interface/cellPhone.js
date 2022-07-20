const 핸드폰 = {
  phoneCall: function (name) {
    this.saved.forEach((saved) => {
      if (name != saved.name) {
        console.log(saved.name);
      }
    });
  },
};

let 도트 = {
  name: "도트",
  phone: 핸드폰,
  call: function (name) {
    this.phone.phoneCall(name);
  },
};

let 변한친구 = {
  name: "변한친구",
  phone: 핸드폰,
  call: function (name) {
    this.phone.phoneCall(name);
  },
};

핸드폰.saved = [도트, 변한친구];

변한친구.call(변한친구.name);
도트.call(도트.name);

// class MyPhone extends Phone {
//   constructor() {
//     super();
//     this.PhoneNumbers = {};
//   }

//   call(name) {
//     this.PhoneNumber[name]
//       ? console.log(`${name} 에게 전화를 겁니다.`)
//       : this.PhoneNumber[name];
//   }

//   savet(name, number) {
//     this.PhoneNumber[name] = number;
//   }

//   delete(name) {
//     this.PhoneNumbers.delete(name);
//   }
// }

// const iphone = new MyPhone();

// iphone.savet("형만", 8);
// iphone.call("형만");
