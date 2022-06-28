import { useEffect } from "react";
import Items from "../../containers/Items";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Article } from "../../models";
import { fetchItems } from "../../actions/items-actions";
import "./home.css";

const Home = () => {
  const itemsList = useAppSelector((state) => state.items.itemsList);
  const searchingItem = useAppSelector((state) => state.items.searchItem);
  const pickedCat = useAppSelector(
    (state) => state.categories.selected_category
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (pickedCat) {
    let pickedCategory: Article[] = itemsList.filter(
      (item) => item.category_name === pickedCat
    );
    return <Items itemsList={pickedCategory} />;
  }

  if (searchingItem) {
    let searchingResult: Article[] = itemsList.filter((item) => {
      return (
        item.item_name.toLowerCase().includes(searchingItem.toLowerCase()) ||
        item.description.toLowerCase().includes(searchingItem.toLowerCase())
      );
    });
    return (
      <>
        <p className='home__header'>SHOWING RESULTS FOR "{searchingItem}"</p>
        <Items itemsList={searchingResult} />
      </>
    );
  }

  return <Items itemsList={itemsList} />;
};

export default Home;
