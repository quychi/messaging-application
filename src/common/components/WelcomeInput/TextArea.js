import React from "react";
import { InputAreaContainer } from "./styled";

const InputComponent = (props) => {
  const { style } = props;
  return (
    <InputAreaContainer
      style={{ backgroundColor: "#fafafa", ...style }}
      {...props}
    />
  );
};

export default InputComponent;
