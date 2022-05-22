import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const sameProductItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (sameProductItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  toggle: false,
  setToggle: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = { cartItems, addItemToCart, toggle, setToggle };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
