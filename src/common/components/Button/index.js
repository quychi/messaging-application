import React from 'react';
import { ButtonContainer } from './styled';
// import {  } from "../../common/theme/styled";
// import { colors } from "../../common/constants";

const ButtonComponent = ({ children, ...props }) => {
    return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

export default ButtonComponent;
