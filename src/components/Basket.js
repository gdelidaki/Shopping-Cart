const Basket = (props) => {
  const { sum, basketItems, handleAdd, handleRemove, clearCart, buyToXML } = props;

  return (
    <div className="container">
      <h3>Basket</h3>
      {/* if cart empty display below line */}
      <div>{basketItems.length === 0 && <p>Cart is EMPTY!</p>}</div>
      {/*  if cart not empty display all below */}
      <div className="products-container">
        {basketItems.map((baskItem) => {
          return (
            <div className="product-container" key={baskItem.id}>
              <div>{baskItem.name}</div>
              <div>
                {baskItem.quant} x €{baskItem.price}
              </div>
              <div>
                <button className="addRemove" onClick={() => handleAdd(baskItem)}>+</button>
                <button className="addRemove" onClick={() => handleRemove(baskItem)}>-</button>
              </div>
            </div>
          );
        })}
      </div>
      {basketItems.length > 0 && (
        <>
          <hr />
          <div>Items Price: €{sum['ItemsPrice']}</div>
          <div>
            Discount Price: €{sum['DiscountPrice']}
            {sum['DiscountPrice'] > 0 && (
              <div className="discStyle">
                <strong> 10% discount has been applied!</strong>
              </div>
            )}
          </div>
          <div>Total Price: €{sum['TotalPrice']}</div>
          <div className="button-grid">
            <button className="clearAndBuy" onClick={clearCart}>
              Clear basket
            </button>
            <button className="clearAndBuy" onClick={buyToXML}>
              Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
