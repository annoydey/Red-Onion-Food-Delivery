"use client";

import { useState } from 'react';
import Cart from '../icons/Cart';
import SectionHeaders from './SectionHeaders';

export default function HomeMenu() {
    // Dummy data for breakfast, lunch, and dinner
    const menuData = {
        breakfast: [
            { id: 1, image: "/images/breakfast/breakfast1.png", title: "Omelette with Bacon", price: "$8.99" },
            { id: 2, image: "/images/breakfast/breakfast2.png", title: "Bread with Fruits", price: "$9.99" },
            { id: 3, image: "/images/breakfast/breakfast3.png", title: "Bread with Beef", price: "$7.99" },
            { id: 4, image: "/images/breakfast/breakfast4.png", title: "Bread with Egg", price: "$6.99" },
            { id: 5, image: "/images/breakfast/breakfast5.png", title: "Sandwitch", price: "$8.99" },
            { id: 6, image: "/images/breakfast/breakfast6.png", title: "Omelette with bread", price: "$10.00" },
        ],
        lunch: [
            { id: 7, image: "/images/lunch/lunch1.png", title: "Chicken Breast with Tomato", price: "$10.99" },
            { id: 8, image: "/images/lunch/lunch2.png", title: "Chicken Breast", price: "$8.99" },
            { id: 9, image: "/images/lunch/lunch3.png", title: "Pork with Green Beans", price: "$9.99" },
            { id: 10, image: "/images/lunch/lunch4.png", title: "Rice with Chicken Curry", price: "$12.99" },
            { id: 11, image: "/images/lunch/lunch5.png", title: "Chicken Leg Piece with Fries", price: "$10.00" },
            { id: 12, image: "/images/lunch/lunch6.png", title: "Chicken Breast with Potatoes", price: "$11.00" },
        ],
        dinner: [
            { id: 13, image: "/images/dinner/dinner1.png", title: "Beef Onion", price: "$10.99" },
            { id: 14, image: "/images/dinner/dinner2.png", title: "Fish with Vegetable", price: "$9.99" },
            { id: 15, image: "/images/dinner/dinner3.png", title: "Pork with Vegetable", price: "$8.99" },
            { id: 16, image: "/images/dinner/dinner4.png", title: "Mexican Chicken", price: "$11.99" },
            { id: 17, image: "/images/dinner/dinner5.png", title: "Chicken with Vegetable", price: "$9.99" },
            { id: 18, image: "/images/dinner/dinner6.png", title: "Salmon with Vegetable", price: "$11.00" },
        ],
    };

    const [selectedCategory, setSelectedCategory] = useState('breakfast');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleFoodClick = (title, price) => {
        console.log(`Clicked: ${title} - Price: ${price}`);
    };
    

    return (
        <section className="mt-12">
            <div className="text-center">
                <SectionHeaders subHeader={'Menu'}></SectionHeaders>
                <div className="menu-category-filter mt-4">
                    <button
                        className={`mx-2 px-4 py-2 rounded-full ${selectedCategory === 'breakfast' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleCategoryClick('breakfast')}
                    >
                        Breakfast
                    </button>
                    <button
                        className={`mx-2 px-4 py-2 rounded-full ${selectedCategory === 'lunch' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleCategoryClick('lunch')}
                    >
                        Lunch
                    </button>
                    <button
                        className={`mx-2 px-4 py-2 rounded-full ${selectedCategory === 'dinner' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleCategoryClick('dinner')}
                    >
                        Dinner
                    </button>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {menuData[selectedCategory].map((item) => (
                    <div key={item.id} className="mb-8 p-8 menu-item flex flex-col items-center rounded-2xl transition-transform transform hover:scale-105 cursor-pointer hover:shadow-lg">
                        <img src={item.image} alt={item.title} className="w-55 h-60 mb-2" />
                        <div className='text-center'>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-gray-500">{item.price}</p>
                            <button
                                className={`flex gap-2 items-center mb-4 mt-4 mx-2 px-4 py-2 rounded-full bg-green-500 text-white`}
                                onClick={() => handleFoodClick(item.title, item.price)}
                            >
                                Add to Cart
                                <Cart></Cart>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
