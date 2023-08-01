import ReactPaginate from "react-paginate";
import "./style/Pagenation.css";

interface SelectedPage {
  selected: number;
}

interface Props {
  pageCount: number;
  handlePageChange: (selectedPage: SelectedPage) => void;
}

function Pagenation({ pageCount, handlePageChange }: Props) {
  return (
    <div>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Pagenation;
