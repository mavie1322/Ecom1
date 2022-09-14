import React, { useEffect, useRef } from "react";
import { Article } from "../models";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type Props = {
  itemsList: Article[];
};

const Items: React.FC<Props> = ({ itemsList }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [disablePreviousPage, setDisablePreviousPage] =
    React.useState<boolean>(false);
  const [disableNextPage, setDisableNextPage] = React.useState<boolean>(false);
  const [onSort, setOnSort] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>("");
  const itemPerPage = 10;
  /*
  - make a copy of itemsList
  - sort it if required
  - list items by page
  */
  const itemsListCopy = [...itemsList];
  if (sortBy === "ASC") {
    itemsListCopy.sort((a, b) => a.price - b.price);
  } else if (sortBy === "DESC") {
    itemsListCopy.sort((a, b) => b.price - a.price);
  }
  let list = itemsListCopy.slice(
    itemPerPage * pageNumber - itemPerPage,
    itemPerPage * pageNumber
  );

  /*
  -change color of the text in the dropdown
  */
  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (event.target.value === "ASC" || event.target.value === "DESC")
      setOnSort(true);
    else setOnSort(false);
    setSortBy(event.target.value);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < Math.ceil(itemsList.length / itemPerPage)) {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    //disabled or not buttons according to the page number
    if (pageNumber === 1) setDisablePreviousPage(true);
    else setDisablePreviousPage(false);

    if (pageNumber === Math.ceil(itemsList.length / itemPerPage))
      setDisableNextPage(true);
    else setDisableNextPage(false);
  }, [pageNumber, itemsList.length]);

  useEffect(() => {
    //in case you want to see items by categories and list is empty at that page number
    if (list.length === 0) setPageNumber(1);
  }, [list.length]);

  return (
    <>
      <div className='sortBy section__padding'>
        <select
          onChange={(event) => handleSortBy(event)}
          style={onSort ? { color: "red" } : {}}>
          <option value=''>SORT BY</option>
          <option value='ASC'>Lowest price</option>
          <option value='DESC'>Highest price</option>
        </select>
      </div>
      <div className='home section__margin'>
        {list.map((item: Article) => {
          const { _id, img_url, item_name, price } = item;
          return (
            <Link key={_id} to={`/products/${_id}`} className='link'>
              <div className='singleItem'>
                <img src={img_url} alt={item_name} />
                <p>{item_name}</p>
                <p>£ {(price / 100).toFixed(2)}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className='page section__padding'>
        <button
          type='button'
          onClick={() => goToPreviousPage()}
          disabled={disablePreviousPage}>
          <AiOutlineLeft />
        </button>
        <p>{pageNumber}</p>
        <button
          type='button'
          onClick={() => goToNextPage()}
          disabled={disableNextPage}>
          <AiOutlineRight />
        </button>
      </div>
    </>
  );
};

export default Items;
