import styled from "styled-components";


export function KardexTemplate() {
    return (
        <Container>
            <h1>Hola no se que es kardex ayuda</h1>
        </Container>
    );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;