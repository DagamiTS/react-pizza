import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, SortPopup, PizzaBlock, PreloaderBlock } from '../components';

import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = [ 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые', ];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' }
];

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.pizzas.items);
  const cartItems = useSelector(state => state.cart.items);
  const isLoaded = useSelector(state => state.pizzas.isLoaded);
  const { category, sortBy } = useSelector(state => state.filters);

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [ sortBy, category ]);

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const addPizza = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickCategory={onSelectCategory} items={categoryNames} activeCategory={category} />
        <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">{!(category === null) ? categoryNames[category] : 'Все'} пиццы</h2>
      <div className="content__items">
        {
          isLoaded
            ? items.map(obj => <PizzaBlock key={obj.id}
                                           onClickAddPizza={addPizza}
                                           itemsInCart={cartItems[obj.id] && cartItems[obj.id].items.length}
                                           {...obj} />)
            : Array(12).fill(0).map((_, index) => <PreloaderBlock key={index} />)
        }
      </div>
    </div>
  );
};

export default Home;