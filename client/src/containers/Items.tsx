import React from "react";
import { Article } from "../models";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type Props = {
  itemsList: Article[];
};

const Items: React.FC<Props> = ({ itemsList }) => {
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [onSort, setOnSort] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<string>("");
  console.log(itemsList.length);

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    if (event.target.value === "ASC" || event.target.value === "DESC")
      setOnSort(true);
    else setOnSort(false);
    setSortBy(event.target.value);
  };
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
        {itemsList.map((item: Article) => {
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
        <button>
          <AiOutlineLeft />
        </button>
        <p>{pageNumber}</p>
        <button>
          <AiOutlineRight />
        </button>
      </div>
    </>
  );
};

export default Items;
