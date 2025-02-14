import React from "react";
import { useCart } from "../context/CartContext";

const MenuItem = ({ item }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md m-2 p-4 w-full sm:w-60 md:w-72 lg:w-80 flex flex-col relative group">
      <div className="w-full aspect-w-1 aspect-h-1 mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover rounded-md mb-2"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
      <p className="text-gray-600 mb-2 flex-grow">{item.description}</p>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">{item.price}</p>
        <button
          onClick={() => dispatch({ type: "ADD_ITEM", payload: item })}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
