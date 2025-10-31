export const useCart = ({ cartItems = [], setCartItems }) => {
  const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

  return { cartItems, setCartItems, totalPrice };
};
