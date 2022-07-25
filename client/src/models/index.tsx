export interface Article {
  _id: string;
  item_name: string;
  price: number;
  category_name: string;
  description: string;
  img_url: string;
}

export interface UsernameProfile {
  username: string;
  avatar_url: string;
  kudos: number;
  items_in_basket: number;
  items_ordered: number;
}

export interface ArticleState {
  itemsList: Article[];
  searchItem: string;
}

export type Category = {
  _id: string;
  category_name: string;
};

export interface CategoriesState {
  categories: Category[];
  selected_category: string;
}

export type BasketItem = {
  item_basket: Article;
  quantity_ordered: number;
  // total_price: number;
};
export type SecondBasketItem = {
  item: string;
  qty: number;
};

export type Item = {
  item: Article;
  qty: number;
  _id: string;
};

export interface BasketState {
  items: BasketItem[];
  total_quantity: number;
}

export type Address = {
  street_address: string;
  flat_number: string;
  city: string;
  postcode: string;
  country: string;
};

export type AddressDelivery = {
  first_name: string;
  last_name: string;
  street_address: string;
  flat_number: string;
  city: string;
  postcode: string;
  country: string;
};

export type UserDetails = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  basket: BasketItem[];
};

export interface User {
  result: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: Address;
    delivery_address: AddressDelivery;
    basket: BasketItem[];
    orders: string[];
    _id: string;
    __v: number;
  };
  token: string;
}

export interface Orders {
  _id: string;
  products: SecondBasketItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  userId: string;
  delivery_status: string;
  payment_status: string;
  shipping: AddressDelivery;
  stripeCustomerId: string;
  __v: number;
}

export type Errors = {
  user_creation: string;
  not_login: boolean;
};

export type BasketContextType = {
  itemsInBasket: BasketItem[];
  isCheckout: boolean;
  isDisplayed: boolean;
  addToBasket: (item: BasketItem) => void;
  changeCheckout: () => void;
  clear: () => void;
  changeIsDisplayed: () => void;
};
