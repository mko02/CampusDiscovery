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

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  @media (max-width: 768px) {
    width: 90%;
  }
  max-width: 800px;
  svg:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
`;

export const Title = styled.h1`
  color: ${( {theme} ) => theme.accent} ;
  display: "block";
`;