import React from "react";
import { Article } from "../models";
import { Link } from "react-router-dom";

type Props = {
  itemsList: Article[];
};

const Items: React.FC<Props> = ({ itemsList }) => {
  return (
    <div className='home section__margin'>
      {itemsList.map((item: Article) => {
        return (
          <Link
            key={item.item_id}
            to={`/items/${item.item_id}`}
            className='link'>
            <div className='singleItem'>
              <img src={item.img_url} alt={item.item_name} />
              <p>{item.item_name}</p>
              <p>£ {item.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Items;
