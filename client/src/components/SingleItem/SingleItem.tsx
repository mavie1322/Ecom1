import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BasketContext } from "../../context/basket";
import { useAppSelector } from "../../hooks/hooks";
import { Article, BasketContextType } from "../../models";
import { getItemById } from "../../services/api";

import "./singleItem.css";

const SingleItem = () => {
  const { addToBasket } = useContext(BasketContext) as BasketContextType;
  const user = useAppSelector((state) => state.user.result);
  const { item_id } = useParams<string>();

  const [singleItemDetails, setSingleItemDetails] = useState<Article>({
    _id: "",
    item_name: "",
    price: 0,
    category_name: "",
    description: "",
    img_url: "",
  });

  const apiItemById = async (id: string) => {
    const itemFromApi: Article = await getItemById(id);
    setSingleItemDetails(itemFromApi);
  };

  const addToBasketHandler = (item: Article) => {
    if (user.email === "") {
      const itemToAdd = {
        item_basket: item,
        quantity_ordered: 1,
      };
      addToBasket(itemToAdd);
    }
  };

  useEffect(() => {
    apiItemById(item_id!);
  }, [item_id]);

  return (
    <div className='singleItem__container section__margin'>
      <div className='singleItem__container-image'>
        <img
          src={singleItemDetails.img_url}
          alt={singleItemDetails.item_name}
        />
      </div>
      <div className='singleItem__container-info'>
        <span>{singleItemDetails.item_name}</span>
        <span>£ {singleItemDetails.price}</span>
        <hr />
        <span>{singleItemDetails.description}</span>
        <hr />
        <span>
          <button onClick={() => addToBasketHandler(singleItemDetails)}>
            Add
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleItem;
