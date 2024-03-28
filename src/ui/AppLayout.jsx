import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

const MobileOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 1.6rem;

  @media (max-width: 1200px) {
    display: flex;
  }
  @media (min-width: 800px) {
    font-size: 2rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <MobileOverlay>
        This application cotains charts and a lot of data which won't fit a
        mobile screen so it doesn't support small screens. try screen higher
        than 1200px
      </MobileOverlay>
    </StyledAppLayout>
  );
}

export default AppLayout;
