import React from "react";

export const Gugudan = () => {
  const [firstNum, setFirst] = React.useState(Math.ceil(Math.random() * 9));
  const [secondNum, setSecond] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const inputRef = React.useRef();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (+this.state.value === this.state.firstNum * this.state.secondNum) {
      setResult("정답" + value);
      setFirst(Math.random() * 9);
      setSecond(Math.random() * 9);
      setValue("");

      inputRef.current.focus();
    } else {
      setResult("땡");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        {firstNum} 곱하기 {secondNum}는?
      </div>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="number" value={value} onChange={onChange} />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};
