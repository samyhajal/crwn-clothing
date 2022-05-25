import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
  const { id, imageUrl, name, quantity, price } = cartItem;
  const { removeProduct, addItemToCart, decreaseQuantity } =
    useContext(CartContext);

  const handleRemove = (event) => removeProduct(id);
  const handleMore = (event) => {
    const { quantity, ...product } = cartItem;
    addItemToCart(product);
  };
  const handleLess = (event) => decreaseQuantity(id);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow less" onClick={handleLess}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow more" onClick={handleMore}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={handleRemove}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
