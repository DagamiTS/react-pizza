import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
      </div>
    </div>
  );
}

export default App;

// const mapStateToProps = (state) => ({
//   items: state.pizzas.items
// });

// const mapDispatchToProps = (dispatch) => ({
//   setPizzas: (items) => dispatch(setPizzas(items)),
// });

// const mapDispatchToProps = {
//   setPizzas,
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);