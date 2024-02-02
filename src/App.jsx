import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./shared/Router";
const StContainer = styled.div`
  display: flex;
`;

const StBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.borderColor};
  margin: 20px;
  background-color: ${(props) => props.backgroundColor};
`;

const boxList = ["red", "blue", "green"];

const getBoxName = (color) => {
  switch (color) {
    case "red":
      return "빨간박스";
    case "blue":
      return "블루박스";
    case "green":
      return "초록박스";
    default:
      return "검정박스";
  }
};
function App() {
  /**   return (
    <StContainer>
      {boxList.map((box) => {
        return <StBox borderColor={box}>{getBoxName(box)}</StBox>;
      })}
    </StContainer>
  );
*/

  return (
    <>
      <Router />
    </>
  );
}

export default App;
