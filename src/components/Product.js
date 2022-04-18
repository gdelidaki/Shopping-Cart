export default function Product(props) {
  const { product, handleAdd } = props;

  return (
    <div className="product-container">
      <h4>Item: {product.name}</h4>
      <p>Price: €{product.price}</p>
      <button onClick={() => handleAdd(product)}>Add to basket</button>
    </div>
  );
}
