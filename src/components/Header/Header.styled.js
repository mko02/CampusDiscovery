import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-color: ${({ theme }) => theme.border};
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  margin-bottom: 15px;
  text-align: center;
`;

export const Title = styled.h1`
  color: ${( {theme} ) => theme.accent} ;
  display: "block";
`;