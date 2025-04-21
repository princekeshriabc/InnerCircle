// components/Testimonial.jsx
import React, { useRef } from "react";
import { motion } from "framer-motion";

const TopGuides = () => {
  const scrollContainerRef = useRef(null);
    
  const testimonials = [
    {
      id: 1,
      name: "Prince Keshri",
      username: "@RyanCarniato",
      avatar: "/path-to-ryan-avatar.jpg",
      content:
        "I'm loving what Vite enables. We've found building SolidStart that it is less a metaframework but a system of symbiotic Vite plugins. While built with SolidJS in mind, they should scale from our simplest template to opinionated starter. We're building an ecosystem on Vite.",
    },
    {
      id: 2,
      name: "Mark Dalgleish",
      username: "@markdalgleish",
      avatar: "/path-to-mark-avatar.jpg",
      content:
        "It's also a great platform to build a framework on since it provides a pluggable dev environment. Community is amazing too.",
    },
    {
      id: 3,
      name: "Dion Almaer",
      username: "@dalmaer",
      avatar: "/path-to-dion-avatar.jpg",
      content:
        "I am so excited to see so many great frameworks teaming up on top of vite. So many will benefit. ❤️ to the vite team.",
    },
    {
      id: 4,
      name: "Jason Miller",
      username: "@_developit",
      avatar: "/path-to-jason-avatar.jpg",
      content:
        "Every time I suspect I've hit the bounds of what Vite can do, I end up being wrong.",
    },
    {
      id: 5,
      name: "Christoph Nakazawa",
      username: "@cpojer",
      avatar: "/path-to-christoph-avatar.jpg",
      content: "Vite is gonna eat the (JavaScript) world.",
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 400; // Adjust this value to control scroll distance

    if (container) {
      const targetScroll =
        container.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-[#1a1a1a] min-w-screen py-24 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h2 className="text-5xl font-bold text-[#FF9361] mb-4">
                  Here's what people from 
                  <br />
                  IIIT Raichur are Learning
        </h2>
        <p className="text-xl text-gray-400">
          Don't take our word for it - listen to what
        </p>
        <p className="text-xl text-gray-400">
          InnerCircle community members have to say.
        </p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 bg-[#242424] p-2 rounded-full shadow-lg hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute  top-1/2 -translate-y-1/2 -right-4 z-10 bg-[#242424] p-2 rounded-full shadow-lg hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex space-x-6 px-4"
            style={{ minWidth: "max-content" }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[#242424] rounded-lg p-6 hover:bg-[#2a2a2a] transition-colors duration-300"
                style={{ width: "400px" }} // Fixed width for each card
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-white font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {testimonial.username}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {testimonial.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TopGuides;
