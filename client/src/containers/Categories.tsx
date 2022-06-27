import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { Category } from "../models";
import { categoriesActions } from "../store/categories-slices";

type Props = {
  categoriesList: Category[];
};

const Categories: React.FC<Props> = ({ categoriesList }) => {
  const dispatch = useAppDispatch();

  const selectCategoryHandler = (category_name: string) => {
    dispatch(categoriesActions.pickedCategory(category_name));
  };

  return (
    <>
      {categoriesList.map((category) => {
        const { _id, category_name } = category;
        return (
          <Link
            to={"/"}
            className='link'
            key={_id}
            onClick={() => selectCategoryHandler(category_name)}>
            <p>{category_name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default Categories;
