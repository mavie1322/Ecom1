import React, { createContext, useState } from "react";
import { BasketContextType, BasketItem } from "../models";

export const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider = ({ children }: { children: any }) => {
  const [itemsInBasket, setItemsInBasket] = useState<BasketItem[]>([]);
  const [isCheckout, setCheckout] = useState<boolean>(false);
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  const changeCheckout = () => {
    setCheckout(!isCheckout);
  };

  const changeIsDisplayed = () => {
    setIsDisplayed(!isDisplayed);
  };

  const addToBasket = (product: BasketItem) => {
    let isItemExist = itemsInBasket.findIndex(
      (item) => item.item_basket._id === product.item_basket._id
    );
    if (isItemExist > -1) {
      setItemsInBasket((previousBasket) => {
        const newBasket = previousBasket.map((item) => {
          if (item.item_basket._id === product.item_basket._id)
            item.quantity_ordered++;
          return item;
        });
        return newBasket;
      });
    } else {
      setItemsInBasket((previousBasket) => [...previousBasket, product]);
    }
  };

  const clear = () => {
    setItemsInBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        itemsInBasket,
        addToBasket,
        clear,
        isCheckout,
        changeCheckout,
        isDisplayed,
        changeIsDisplayed,
      }}>
      {children}
    </BasketContext.Provider>
  );
};
