import React, { useEffect, useState } from "react";

const Child = ({ onClick, num }) => {
  console.log(`자식 컴포넌트가 렌더링`);
  console.log(num);
  return <button onClick={onClick}>{num}</button>;
};

const Test = () => {
  let time;

  function setTime1() {
    time = new Date();
    setTimeout(() => {
      setTime1();
    }, 1000);
  }
  네ㅔ네;

  useEffect(() => {}, [count]);

  console.log("부모 렌더링");
  return (
    <>
      <Child onClick={increase} num={count} />
    </>
  );
};

export default Test;
