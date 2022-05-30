import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import { CartIconContainer, ItemCount, ShoppingIcon } from "./cart-icon.styles";

const CartIcon = () => {
  const { toggle, setToggle, cartItems, cartCount } = useContext(CartContext);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <CartIconContainer onClick={handleClick}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
