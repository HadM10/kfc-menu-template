import React from "react";
import { useCart } from "../context/CartContext";

const Cart = ({ restaurantPhone }) => {
  const { state, dispatch } = useCart();

  const formatWhatsAppMessage = () => {
    const items = state.items
      .map((item) => `${item.quantity}x ${item.name} (${item.price})`)
      .join("\n");

    const total = state.items.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );

    return encodeURIComponent(
      `*New Order*\n\n${items}\n\n*Total: $${total.toFixed(
        2
      )}*\n\nPlease confirm my order.`
    );
  };

  const handleWhatsAppClick = () => {
    if (state.items.length === 0) {
      alert("Please add items to your cart first!");
      return;
    }

    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${restaurantPhone}?text=${message}`);
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {state.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {state.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: {
                        id: item.id,
                        quantity: Math.max(0, item.quantity - 1),
                      },
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { id: item.id, quantity: item.quantity + 1 },
                    })
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleWhatsAppClick}
            className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <i className="fab fa-whatsapp text-xl"></i>
            Order via WhatsApp
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
