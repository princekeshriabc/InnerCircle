import React from 'react'

const Profile = () => {
    return (
      <>
        <div className="min-h-scree py-12 bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a207d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <p>Here you can view and edit your profile information.</p>
            <p>More features will be added soon!</p>
          </div>
        </div>
      </>
    );
}

export default Profile
// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// const Profile = () => {
//   const [activeSection, setActiveSection] = useState("home");
//   const scrollContainerRef = useRef(null);
//   const [user, setUser] = useState(null);

//     useEffect((e) => {
//       e.preventDefault();
//     // Fetch user from localStorage
//     const userData = JSON.parse(localStorage.getItem("user"));
//     setUser(userData);
//   }, [user]);

//   const menuItems = [
//     { id: "home", label: "Home", icon: "🏠" },
//     { id: "personal", label: "Personal Information", icon: "👤" },
//     { id: "progress", label: "Progress", icon: "📈" },
//     { id: "guides", label: "Your Guides", icon: "📚" },
//     { id: "community", label: "Community Status", icon: "🌟" },
//   ];

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = direction === "left" ? -200 : 200;
//       scrollContainerRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };
// const scrollToSection = (sectionId) => {
//   setActiveSection(sectionId);
//   const element = document.getElementById(sectionId);
//   if (element) {
//     const offset = 80; // Adjust this value based on your header height
//     const elementPosition = element.getBoundingClientRect().top;
//     const offsetPosition = elementPosition + window.pageYOffset - offset;

//     window.scrollTo({
//       top: offsetPosition,
//       behavior: "smooth",
//     });
//   }
// };
//   // Function to get initials from name
//   const getInitials = (name) => {
//     return (
//       name
//         ?.split(" ")
//         .map((word) => word[0])
//         .join("")
//         .toUpperCase() || "?"
//     );
//   };
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll("[id]");
//       const scrollPosition = window.scrollY + 200; // Increased offset for better detection

//       sections.forEach((section) => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.offsetHeight;

//         if (
//           scrollPosition >= sectionTop &&
//           scrollPosition < sectionTop + sectionHeight
//         ) {
//           setActiveSection(section.getAttribute("id"));
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [user]);
//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Left Panel */}
//       <div className="w-64 bg-white shadow-lg p-4 fixed h-full">
//         <div className="space-y-2">
//           {menuItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => scrollToSection(item.id)}
//               className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
//                 activeSection === item.id
//                   ? "bg-blue-100 text-blue-600"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <span>{item.icon}</span>
//               <span>{item.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className="flex-1 ml-64 p-8 overflow-y-auto mt-10"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         <div className="max-w-4xl mx-auto">
//           {/* Profile Header */}
//                   <div className="flex flex-col items-center mb-12"
//                   id="home">
//             <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
//               {getInitials(user.name)}
//             </div>
//             <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
//             <p className="text-gray-600">{user.email}</p>
//           </div>

//           {/* All Sections */}
//           <div className="space-y-24" id="sections">
            

//             {/* Personal Information Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-6 rounded-lg shadow"
//               id="personal"
//             >
//               <h2 className="text-xl font-semibold mb-4">
//                 Personal Information
//               </h2>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-gray-600">Email</label>
//                   <p className="font-medium">{user.email}</p>
//                 </div>
//                 <div>
//                   <label className="text-gray-600">Username</label>
//                   <p className="font-medium">{user.name}</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Progress Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-6 rounded-lg shadow"
//               id="progress"
//             >
//               <h2 className="text-xl font-semibold mb-4">Progress</h2>
//               <p className="text-gray-600">Your progress will be shown here</p>
//             </motion.div>

//             {/* Guides Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="relative bg-white p-6 rounded-lg shadow"
//               id="guides"
//             >
//               <h2 className="text-xl font-semibold mb-4">Your Guides</h2>
//               <div className="relative">
//                 <button
//                   onClick={() => scroll("left")}
//                   className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
//                 >
//                   <ChevronLeftIcon className="w-6 h-6" />
//                 </button>

//                 <div
//                   ref={scrollContainerRef}
//                   className="overflow-x-auto hide-scrollbar px-8"
//                 >
//                   <div className="flex space-x-4">
//                     {user.guides?.map((guide) => (
//                       <motion.div
//                         key={guide.id}
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         className="flex-shrink-0 w-72 bg-gray-50 p-4 rounded-lg shadow"
//                       >
//                         <h3 className="font-semibold">{guide.title}</h3>
//                         <p className="text-gray-600">{guide.status}</p>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => scroll("right")}
//                   className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
//                 >
//                   <ChevronRightIcon className="w-6 h-6" />
//                 </button>
//               </div>
//             </motion.div>

//             {/* Community Status Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white p-6 rounded-lg shadow"
//               id="community"
//             >
//               <h2 className="text-xl font-semibold mb-4">Community Status</h2>
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="text-center p-4 bg-blue-50 rounded-lg">
//                   <p className="text-2xl font-bold text-blue-600">
//                     {user.communityStatus?.guidesPublished || 0}
//                   </p>
//                   <p className="text-gray-600">Guides Published</p>
//                 </div>
//                 <div className="text-center p-4 bg-green-50 rounded-lg">
//                   <p className="text-2xl font-bold text-green-600">
//                     {user.communityStatus?.totalViews || 0}
//                   </p>
//                   <p className="text-gray-600">Total Views</p>
//                 </div>
//                 <div className="text-center p-4 bg-purple-50 rounded-lg">
//                   <p className="text-2xl font-bold text-purple-600">
//                     {user.communityStatus?.totalLikes || 0}
//                   </p>
//                   <p className="text-gray-600">Total Likes</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;