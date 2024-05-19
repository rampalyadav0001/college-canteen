import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesAsync, selectAllProductsByCategories } from '../features/Menu-list/MenuSlice';
import banner1 from '../assests/banner1.png';
import banner2 from '../assests/banner2.png';

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [
    banner1,
    banner2,
  ];

  const back = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex < images.length) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex <= images.length) {
      setCurrentIndex(images.length - currentIndex + 1);
    }
  };

  const categories = useSelector(selectAllProductsByCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="relative w-full overflow-hidden">
          {/* Image slider */}
          <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
            <div className="rounded-full bg-gray-600 text-black absolute top-5 right-5 text-sm px-2 text-center z-10">
              <span>{currentIndex}</span>/
              <span>{images.length}</span>
            </div>

            {images.map((image, index) => (
              <figure
                key={index}
                className={`h-60 md:h-96 ${currentIndex === index + 1 ? 'block' : 'hidden'}`}
                style={{ transition: 'opacity 0.3s' }}
              >
                <img
                  src={image}
                  alt="Image"
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                />
              </figure>
            ))}

            <button
              onClick={back}
              className="absolute left-4 md:left-14 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-black hover:bg-gray-200"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <button
              onClick={next}
              className="absolute right-4 md:right-14 top-1/2 -translate-y-1/2 w-8 h-8 md:w-11 md:h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-black hover:bg-gray-200"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </article>
        </div>

        {/* Category Grid */}
        <div className="max-w-screen-xl my-14 mx-auto p-4">
          <h2 className="text-2xl font-bold mb-9">BROWSE CATEGORIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-neutral-200 shadow-xl rounded-lg overflow-hidden"
                style={{ width: '100%', maxWidth: '320px', margin: 'auto' }}
              >
                <img src={category.imageUrl} alt={category.name} className="w-full h-56 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
