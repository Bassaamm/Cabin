import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { SIZE_FIT_PER_PAGE } from "../utils/constants";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ resualtNum }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  if (resualtNum <= 10) return null;

  const howManyPages = Math.ceil(resualtNum / SIZE_FIT_PER_PAGE);
  function nextPage() {
    const goNext = currentPage === howManyPages ? currentPage : currentPage + 1;
    searchParams.set("page", goNext);
    setSearchParams(searchParams);
  }
  function prePage() {
    const goBack = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", goBack);
    setSearchParams(searchParams);
  }
  return (
    <StyledPagination>
      <P>
        <span>{(currentPage - 1) * SIZE_FIT_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === howManyPages
            ? resualtNum
            : currentPage * SIZE_FIT_PER_PAGE}
        </span>{" "}
        of <span>{resualtNum}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prePage} disabled={currentPage === 1}>
          Prevoius
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === howManyPages}
        >
          Next
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
