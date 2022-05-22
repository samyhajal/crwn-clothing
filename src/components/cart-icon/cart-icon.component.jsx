import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CartIcon = () => {
  const { toggle, setToggle, cartItems } = useContext(CartContext);
  const handleClick = () => {
    setToggle(!toggle);
  };
  const cartCount = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.quantity,
    0
  );
  return (
    <div className="cart-icon-container" onClick={handleClick}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
