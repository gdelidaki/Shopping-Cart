import { useState, useEffect } from 'react';
import Basket from './components/Basket';
import Main from './components/Main';

import jsonProducts from './shopItems.json';

let js2xmlparser = require('js2xmlparser');

//if localStorage exists parse it & save it to variable; if not initialize variable with []
let cartLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

function App() {
  //useState is initialized with items from local storage & survives browser refreshes
  const [basketItems, setBasketItems] = useState(cartLocalStorage);
  const [sum, setSum] = useState({});

  //Total price
  const itemsPrice = basketItems.reduce((total, current) => {
    return total + current.price * current.quant;
  }, 0);

  //Discount price applied if order > 100 euro
  const discPrice = itemsPrice > 100 ? itemsPrice * 0.1 : 0;

  //Total price with discount
  const totalPrice = itemsPrice - discPrice;

  //sum is used in XML output & in basket under <hr/>
  useEffect(() => {
    setSum(() => {
      return {
        ItemsPrice: itemsPrice,
        DiscountPrice: discPrice,
        TotalPrice: totalPrice,
      };
    });
  }, [itemsPrice, discPrice, totalPrice]);

  //every time basket items change; set local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(basketItems));
  }, [basketItems]);

  //add items to basket either from main or basket components
  const handleAdd = (product) => {
    const isInCart = basketItems.find((baskItem) => baskItem.id === product.id);
    //isInCart holds an object that's returned from .find when baskItem.id and product.id are same
    if (isInCart) {
      //if isInCart is defined, create new basketItems array where every baskItem is same EXCEPT FOR
      //when the baskItem has the same id as product. When this happens, increment quantity
      setBasketItems(
        basketItems.map((baskItem) =>
          baskItem.id === product.id
            ? { ...isInCart, quant: isInCart.quant + 1 }
            : baskItem
        )
      );
    } else {
      //else if you can't find product.id in the basketItems array,
      //spread the basketItems array and add the product with quantity 1
      setBasketItems([...basketItems, { ...product, quant: 1 }]);
    }
  };

  //remove items from basket
  const handleRemove = (product) => {
    const isInCart = basketItems.find((baskItem) => baskItem.id === product.id);
    if (isInCart.quant === 1) {
      //if isInCart object's quantity is 1, filter basketItems array and keep only the baskItems
      //that have different id's than the product.id
      //essentially removing the product from the basketItems array
      setBasketItems(
        basketItems.filter((baskItem) => baskItem.id !== product.id)
      );
    } else {
      //else if the quantity is not 1 and therefore more than 1,
      //decrement the quantity for the matching item
      //and keep all the other baskItems as they are when traversing the array with map
      setBasketItems(
        basketItems.map((baskItem) =>
          baskItem.id === product.id
            ? { ...isInCart, quant: isInCart.quant - 1 }
            : baskItem
        )
      );
    }
  };

  //Clears Basket
  const clearCart = () => {
    setBasketItems([]);
  };

  //Converts basket to XML
  const buyToXML = () => {
    var obj = {
      basketItems,
      sum
    };

    var options = {
      declaration: {
        include: true,
        encoding: 'UTF-16',
        standalone: 'yes',
        version: '1.1',
      },
      format: {
        doubleQuotes: true,
        indent: '\t',
        newline: '\r\n',
        pretty: true,
      },
    };

    console.log(js2xmlparser.parse('basket', obj, options));
  };

  return (
    <div>
      <Basket
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        basketItems={basketItems}
        clearCart={clearCart}
        buyToXML={buyToXML}
        sum={sum}
      ></Basket>
      <Main handleAdd={handleAdd} products={jsonProducts}></Main>
    </div>
  );
}

export default App;
