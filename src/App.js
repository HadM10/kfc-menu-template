import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; // Make sure to import your Tailwind CSS file
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import MenuItem from "./components/MenuItem";

const App = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const storeDetails = {
    name: "KFC",
    address: "123 Chicken Street, Abidjan",
    hours: "10 AM - 11 PM",
    tagline: "Finger Lickin' Good!",
    image: "images/kfc.webp", // Replace with the actual image URL
  };

  const restaurantPhone = "+225 01 73 72 22 22"; // Replace with actual phone number

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("/menuItems.json");
        setMenu(response.data.categories);
      } catch (error) {
        console.error("Error fetching the menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <CartProvider>
      <div className="App bg-gray-100">
        {/* Hero Section */}
        <header className="relative">
          <img
            src={storeDetails.image}
            alt={storeDetails.name}
            className="w-full h-64 md:h-80 lg:h-112 object-cover" // Responsive height
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold">
              {storeDetails.name}
            </h1>
            <p className="text-white">{storeDetails.address}</p>
            <p className="text-white">{storeDetails.hours}</p>
            <p className="text-lg sm:text-xl text-yellow-400 italic">
              {storeDetails.tagline}
            </p>
          </div>
        </header>

        <main className="py-6 px-4 md:px-8">
          {menu.map((category) => (
            <section key={category.name} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
              <div className="flex flex-wrap justify-center">
                {category.items.map((item) => (
                  <MenuItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </main>
        <footer className="bg-gray-200 py-4">
          <div className="text-center">
            <p className="mb-2">Contact: </p>
            <p className="mb-1">
              <a
                href="tel:+1234567890"
                className="flex items-center justify-center text-blue-600 hover:underline mb-2"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                +123 456 7890
              </a>
            </p>
            <p className="mb-1">
              <a
                href="https://wa.me/1234567890"
                className="flex items-center justify-center text-green-600 hover:underline mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                WhatsApp
              </a>
            </p>
            <p className="mb-1">
              <a
                href="https://instagram.com/yourprofile"
                className="flex items-center justify-center text-pink-600 hover:underline mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram mr-2"></i>
                Instagram
              </a>
            </p>
            <p className="mb-1">
              <a
                href="https://glovoapp.com/ci/en/abidjan-north/kfc-abnn/"
                className="flex items-center justify-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/glovo.webp" // Update the path if necessary
                  alt="Glovo"
                  className="w-6 h-6 mr-2" // Set the width and height for the icon
                />
                Order on Glovo
              </a>
            </p>
            {/* Additional Footer Info */}
            <p className="mt-3">© 2024 KFC. All rights reserved.</p>
          </div>
        </footer>
        <Cart restaurantPhone={restaurantPhone} />
      </div>
    </CartProvider>
  );
};

export default App;
