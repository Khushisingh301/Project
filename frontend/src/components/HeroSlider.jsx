import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Brewing Simplicity in Work",
      label: "Featured",
      buttonText: "Discover more",
      buttonLink: "/discover",
      image: "image1.jpg",
      alt: "Heineken empowering teams to work smarter and more efficiently"
    },
    {
      id: 2,
      title: "Global Operations, Local Impact",
      label: "Solutions",
      buttonText: "Learn more",
      buttonLink: "/solutions",
      image: "images1.jpg",
      alt: "Heineken leveraging digital tools to streamline global operations"
    },
    {
      id: 3,
      title: "Together Across Borders",
      label: "Teams",
      buttonText: "Get started",
      buttonLink: "/teams",
      image: "image3.jpg",
      alt: "Heineken teams collaborating across continents"
    },
    {
      id: 4,
      title: "Innovating the Heineken Way",
      label: "Innovation",
      buttonText: "Explore features",
      buttonLink: "/features",
      image: "image4.jpg",
      alt: "Heineken embracing innovation to lead in the beverage industry"
    },
    {
      id: 5,
      title: "One Team. One Vision.",
      label: "Success",
      buttonText: "Join now",
      buttonLink: "/join",
      image: "image2.jpg",
      alt: "Heineken fostering teamwork and shared success globally"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(current => (current + 1) % slides.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides Container */}
      <ul className="relative w-full h-full">
        {slides.map((slide, index) => (
          <li
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0 z-10' : 'translate-x-full z-0'
            } ${index < currentSlide ? '-translate-x-full' : ''}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                alt={slide.alt}
                className="w-full h-full object-cover"
                src={slide.image}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            </div>

            {/* Slide Content */}
            <div className="relative z-20 flex items-center justify-center h-full px-4 md:px-8">
              <div className="text-center max-w-3xl">
                <span className="uppercase text-sm tracking-wider text-emerald-400 font-semibold">
                  {slide.label}
                </span>
                <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <a
                  href={slide.buttonLink}
                  className="mt-8 inline-block px-8 py-3 bg-white text-slate-900 font-semibold text-lg rounded-full shadow-md transition-all duration-300 hover:bg-emerald-500 hover:text-white"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-emerald-500 hover:scale-110 shadow-lg"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 w-12 h-12 bg-black/30 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-emerald-500 hover:scale-110 shadow-lg"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Bottom Pagination */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-30">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`group text-left transition-all duration-300 ${
              index === currentSlide ? 'scale-110' : 'opacity-70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={slide.title}
          >
            <span className="block w-28 h-1 bg-white bg-opacity-20 rounded overflow-hidden">
              <span
                className="block h-full bg-emerald-400 origin-left transition-transform duration-100"
                style={{
                  transform: index === currentSlide ? `scaleX(${progress / 100})` : 'scaleX(0)'
                }}
              ></span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
