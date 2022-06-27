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
        const { _id, img_url, item_name, price } = item;
        return (
          <Link key={_id} to={`/products/${_id}`} className='link'>
            <div className='singleItem'>
              <img src={img_url} alt={item_name} />
              <p>{item_name}</p>
              <p>£ {price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Items;
