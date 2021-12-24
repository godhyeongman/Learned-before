const data = {
  debug: "on",
  window: {
    title: "Sample Konfabulator Widget",
    name: "main_window",
    width: 500,
    height: 500,
  },
  image: {
    src: "Images/Sun.png",
    name: "sun1",
    hOffset: 250,
    vOffset: 250,
    alignment: "center",
  },
  text: {
    data: "Click Here",
    size: 36,
    style: "bold",
    name: "text1",
    hOffset: 250,
    vOffset: 100,
    alignment: "center",
    onMouseUp: "sun1.opacity = (sun1.opacity / 100) * 90;",
  },
};
function filteringNum() {
  const numData = [];
  const dataValues = Object.values(data);
  dataValues.forEach((item) => {
    const itemValues = Object.values(item); // 이지점 부터 숫자 관련 밸류 key 접근가능
    const itemKeys = Object.keys(item);
    itemValues.forEach((el, idx) => {
      if (typeof el === "number") {
        numData.push(itemKeys[idx]);
      }
    });
  });
  const filterdNumData = [...new Set(numData)]; // 중복된값 제거(new Set 이용): https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
  console.log(numData);
  console.log(`중복 제거: ${filterdNumData}`);
}

filteringNum();
