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

export type UserDetails = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface User {
  result: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: Address;
    delivery_address: Address[];
    basket: BasketItem[];
    orders: string[];
    _id: string;
    __v: number;
  };
  token: string;
}

export interface Orders {
  _id: string;
  items: BasketItem[];
  total_cost: number;
  createdAt: Date;
  buyer: string;
  delivery_cost: boolean;
}

export type Errors = {
  user_creation: string;
  not_login: boolean;
};
