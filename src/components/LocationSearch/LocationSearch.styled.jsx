import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
`;

export const ResultsContainer = styled.div`
  z-index: 5;
  flex-direction: column;
  width: 100.5%;
  max-height: 250px;
  overflow-y: auto;
  position: absolute;
  top: 21px;
  background-color: rgb(29,34,39);
  padding-top: 5px;
  width: 280px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;

  &::-webkit-scrollbar {
    height: 12px;
    width: 12px;
    background: #3e3e3e;
    border-radius: 1ex;
  }
  &::-webkit-scrollbar-thumb {
    background: #666;
    -webkit-border-radius: 1ex;
    width: 5px;
  }
`;

export const Result = styled.div`
padding: 1px 15px;
cursor: pointer;
background-color: rgb(25,29,35);

&:hover {
  background-color: rgb(40,40,45);
}`

export const ResultText = styled.p`
  width: 100%;
  color: white;
  font-size: 0.9rem;
  margin: 9px 0px;
  user-select: none;
`;

export const ResultsHeader = styled.span`
display: block;
position: sticky;
top: -5px;
padding-top: 5px;
height: 30px;
text-align: center;
font-size: 20px;
background-color: rgb(20,24,30);
`