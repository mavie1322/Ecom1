import { Article } from "@mui/icons-material";

export interface Article {
  item_id: number;
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
  totalItems: number;
  searchItem: string;
}

export interface ArticleFromApi {
  items: Article[];
  total_items: number;
}

export type Category = {
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
