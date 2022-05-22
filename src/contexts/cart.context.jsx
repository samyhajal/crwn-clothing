import { createContext, useState } from "react";

export const CartContext = createContext({
  products: [],
  setProducts: () => {},
  toggle: false,
  setToggle: () => {},
});

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const value = { products, setProducts, toggle, setToggle };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
