import React, { createContext, useState } from "react";
import { BasketContextType, BasketItem } from "../models";

export const BasketContext = createContext<BasketContextType | null>(null);

export const BasketProvider = ({ children }: { children: any }) => {
  const [itemsInBasket, setItemsInBasket] = useState<BasketItem[]>([]);

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

  return (
    <BasketContext.Provider value={{ itemsInBasket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
