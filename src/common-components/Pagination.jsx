import { toast } from "react-toastify";
import paginationStyle from "../styles/pagination.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage = 1,
  setCurrentPage,
  setIsListUpdate,
  pageCount = 1,
}) => {
  const checkPageValidation = (event) => {
    if (event.target.value > pageCount) {
      toast.error(`Entered page cannot be greater than ${10}`);
      return false;
    } else if (["0", 0].includes(event.target.value)) {
      toast.error(`Entered page should not be zero`);
      return false;
    } else {
      setCurrentPage(event.target.value);
      setIsListUpdate(prev => !prev);
    }
  };

  return (
    <div className={paginationStyle?.paginationMain}>
      <div className={paginationStyle?.paginationWrapper}>
        <button
          onClick={() => {
            setCurrentPage(Number(currentPage) - 1);
            setIsListUpdate(prev => !prev);
          }}
          disabled={currentPage <= 1 ? true : false}
          className={paginationStyle?.btn_pagination}
        >
          <IoIosArrowBack />
          {/* Prev */}
        </button>
        <div className={paginationStyle?.paginationInputWrapper}>
          <p>Page</p>
          <input
            type="number"
            value={Number(currentPage)}
            onChange={(event) => checkPageValidation(event)}
            className={paginationStyle?.form_control}
            placeholder="Page No."
          />
          {/* <button
          className={paginationStyle?.find_btn}
          type="submit"
          onClick={() => setIsPageUpdated(!isPageUpdated)}
        >
          Find
        </button> */}
          <p>of</p>
          <h6>{pageCount}</h6>
        </div>
        <button
          onClick={() => {
            setCurrentPage(Number(currentPage) + 1);
            setIsListUpdate(prev => !prev);
          }}
          disabled={currentPage >= pageCount ? true : false}
          className={paginationStyle?.btn_pagination}
        >
          <IoIosArrowForward />
          {/* Next */}
        </button>
        {/* <h6>{pageCount}</h6> */}
      </div>
    </div>
  );
};

export default Pagination;
