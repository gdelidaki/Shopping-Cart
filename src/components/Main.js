import Product from './Product';

const Main = ({ products, handleAdd }) => {

  return (
    <div className="container">
      <h3>Products</h3>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product.id} handleAdd={handleAdd} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Main;
