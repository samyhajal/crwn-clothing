import { createContext, useEffect, useState } from "react";

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

const removeProductFromCart = (cartItems, productId) => {
  return cartItems.filter((cartItem) => cartItem.id !== productId);
};

const decreaseQuantityFromCart = (cartItems, productId) => {
  const sameProductItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );
  if (sameProductItem.quantity === 1) {
    return removeProductFromCart(cartItems, productId);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productId
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  toggle: false,
  cartCount: 0,
  cartTotal: 0,
  setToggle: () => {},
  removeProduct: () => {},
  decreaseQuantity: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCarTotal] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce(
        (accumulator, currentItem) => accumulator + currentItem.quantity,
        0
      )
    );
  }, [cartItems]);

  useEffect(() => {
    setCarTotal(
      cartItems.reduce(
        (accumulator, currentItem) =>
          accumulator + currentItem.quantity * currentItem.price,
        0
      )
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeProduct = (productId) => {
    setCartItems(removeProductFromCart(cartItems, productId));
  };
  const decreaseQuantity = (productId) => {
    setCartItems(decreaseQuantityFromCart(cartItems, productId));
  };
  const value = {
    cartItems,
    addItemToCart,
    toggle,
    setToggle,
    removeProduct,
    decreaseQuantity,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
