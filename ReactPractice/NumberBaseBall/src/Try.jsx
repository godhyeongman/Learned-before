import React from "react";

const Try = ({ triedData }) => {
  return (
    <li>
      <div>{triedData.try}</div>
      <div>{triedData.result}</div>
    </li>
  );
};

export default Try;
