import React,{useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Carousel } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesAsync, selectAllProductsByCategories } from '../features/Menu-list/MenuSlice';
function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const images = [
      'https://images.ctfassets.net/wtodlh47qxpt/3HnA50BU8VSeH5y1WkVmoM/538c9ee841e8937571ba9423c04acbb6/Internation_Burger_Fest_banner_1440x396px.jpg?w=1528&fit=fill&fm=webp',
      'https://images.ctfassets.net/wtodlh47qxpt/3rG3DVKuArGcVVWvMJL0vL/6028fc17975a8c862c86fd67c0e54de5/web_1440x396px.jpg?w=1528&fit=fill&fm=webp',
      'https://source.unsplash.com/1600x900/?dog',
      'https://source.unsplash.com/1600x900/?lego',
      'https://source.unsplash.com/1600x900/?textures&patterns'
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
  
  const categories=useSelector(selectAllProductsByCategories);
  const dispatch=useDispatch();
  console.log(categories);
  useEffect(()=>{
    dispatch(fetchAllCategoriesAsync());
  },[])
  return (
    <div>
      <Navbar></Navbar>
        <div className='flex  object-cover overflow-hidden w-full'>
            {/* imageslider */}
            <article className="relative w-full flex flex-shrink-0 overflow-hidden shadow-2xl">
            <div className="rounded-full bg-gray-600 text-black absolute top-5 right-5 text-sm px-2 text-center z-10">
                <span>{currentIndex}</span>/
                <span>{images.length}</span>
            </div>

            {images.map((image, index) => (
                <figure
                    key={index}
                    className={`h-96 ${currentIndex === index + 1 ? 'block' : 'hidden'}`}
                    style={{ transition: 'opacity 0.3s' }}
                >
                    <img
                        src={image}
                        alt="Image"
                        className="absolute inset-0 z-10 h-full w-full object-cover "
                    />
                    {/* <figcaption className="absolute inset-x-0 bottom-1 z-20 w-96 mx-auto p-4 font-light text-sm text-center tracking-widest leading-snug bg-gray-300 bg-opacity-25">
                        Any kind of content here!
                        Primum in nostrane potestate est, quid meminerimus? Nulla erit controversia. Vestri haec verecundius, illi fortasse constantius.
                    </figcaption> */}
                </figure>
            ))}

            <button
                onClick={back}
                className="absolute left-14 top-1/2 -translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-black hover:bg-gray-200"
            >
                <svg
                    className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:-translate-x-0.5"
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
                className="absolute right-14 top-1/2 translate-y-1/2 w-11 h-11 flex justify-center items-center rounded-full shadow-md z-10 bg-black hover:bg-gray-200"
            >
                <svg
                    className="w-8 h-8 font-bold transition duration-500 ease-in-out transform motion-reduce:transform-none text-gray-500 hover:text-gray-600 hover:translate-x-0.5"
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

        {/* image slider end */}
        <div className="max-w-screen-xl my-14 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-9">BROWSE CATEGORIES</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} 
          className=" bg-neutral-200 shadow-xl rounded-lg overflow-hidden"
          style={{ width: '320px', height: '280px' }}
          >
            <img src={category.imageUrl} alt={category.name} className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>

      
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
