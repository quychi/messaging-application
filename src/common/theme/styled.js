import styled from "styled-components";

export const Container = styled.div`
  font-family: "Raleway";
  color: black;
  width: 100%;
  height: 100%;
  position: relative;
  @media (max-width: 26.5625em) {
    color: black;
  }
`;

export const GradientText = styled.span`
  font-size: ${({ size }) => (size ? size : "14px")};
  background: ${({ colors }) =>
    colors
      ? `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
      : `linear-gradient(45deg, #127A09, #9BDD48)`};
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;
