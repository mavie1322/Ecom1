import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { Article } from "../../models";
import { getItemById } from "../../services/api";
import { basketActions } from "../../store/basket-slices";

import "./singleItem.css";

const SingleItem = () => {
  const { item_id } = useParams<string>();
  const dispatch = useAppDispatch();
  const [singleItemInformation, setSingleItemInformation] = useState<Article>({
    item_id: 0,
    item_name: "",
    price: 0,
    category_name: "",
    description: "",
    img_url: "",
  });
  const { item_name, price, description, img_url } = singleItemInformation;

  const apiItemById = async (id: string) => {
    const itemFromApi: { item: Article } = await getItemById(id);
    setSingleItemInformation(itemFromApi.item);
  };

  const addToBasketHandler = (item: Article) => {
    const itemToAdd = {
      item_basket: item,
      quantity_ordered: 1,
    };
    dispatch(basketActions.addItemToBasket(itemToAdd));
  };

  useEffect(() => {
    apiItemById(item_id!);
  }, [item_id]);

  return (
    <div className='singleItem__container section__margin'>
      <div className='singleItem__container-image'>
        <img src={img_url} alt={item_name} />
      </div>
      <div className='singleItem__container-info'>
        <span>{item_name}</span>
        <span>£ {price}</span>
        <hr />
        <span>{description}</span>
        <hr />
        <span>
          <button onClick={() => addToBasketHandler(singleItemInformation)}>
            Add
          </button>
        </span>
      </div>
    </div>
  );
};

export default SingleItem;
