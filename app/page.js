"use client"

import {
  FaPhoneAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,FaMapMarkerAlt ,FaEnvelope ,
  FaTwitter,FaUsers, FaUser
} from "react-icons/fa";
import Image from "next/image";
import React, { useState,useEffect,useRef  } from "react";
import { motion } from 'framer-motion';
import '../app/globals.css'

export default function Home() {

  const [selectedPlans, setSelectedPlans] = useState([]);
  const [providerType, setProviderType] = useState(null);
  const [providersCount, setProvidersCount] = useState({});
  const estimateRef = useRef(null); // Create a ref for the Estimated Cost section
  const [showCost, setShowCost] = useState(false); // New state for showing cost
    // const [planCost, setPlanCost] = useState(0);

    const handlePlanSelect = (plan, cost) => {
      setSelectedPlans(prevSelectedPlans => {
        if (prevSelectedPlans.some(p => p.plan === plan)) {
          const updatedPlans = prevSelectedPlans.filter(p => p.plan !== plan);
          const { [plan]: _, ...rest } = providersCount; // Remove providers count for deselected plan
          setProvidersCount(rest);
          return updatedPlans;
        } else {
          setProvidersCount(prevCounts => ({
            ...prevCounts,
            [plan]: 0, // Initialize count for the selected plan
          }));
          return [...prevSelectedPlans, { plan, cost }];
        }
      });
    };
  
    const handleProviderTypeSelect = (type) => {
      setProviderType(type);
    };
  
    const increaseProviders = (plan) => {
      setProvidersCount(prevCounts => ({
        ...prevCounts,
        [plan]: (prevCounts[plan] || 0) + 1,
      }));
    };
  
    const decreaseProviders = (plan) => {
      setProvidersCount(prevCounts => {
        const currentCount = prevCounts[plan] || 0;
        if (currentCount > 0) {
          return {
            ...prevCounts,
            [plan]: currentCount - 1,
          };
        }
        return prevCounts;
      });
    };
  
    const calculateTotalCost = () => {
      return selectedPlans.reduce((total, { plan, cost }) => {
        return total + cost * (providersCount[plan] || 0);
      }, 0);
    };
    const totalCost = calculateTotalCost();

    const handleClose = () => {
      setShowCost(false);
    };

    const handleShowCost = () => {
      setShowCost(true);
      setTimeout(() => {
        estimateRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to ensure the section is rendered before scrolling
    };
  

    const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col font-extrabold">
      {/* Top Navbar with Contact Info and Social Icons */}
      <div
        style={{
          backgroundColor: "#003878",
          height: "10vh", // 10% of the viewport height
          width: "100%", // Make sure it spans the full width
          color: "white",
          display: "flex",
          alignItems: "center", // Center content vertically
          justifyContent: "space-between", // Space between left and right content
          padding: "0 20px", // Add padding for spacing
        }}
        
      >
        <div className="flex items-center hidden md:flex">
          <h4 className="text-2xl flex items-center mr-6">
            <FaPhoneAlt className="mr-2" /> {/* Phone icon */}
            +1800-001-658
          </h4>
          <h4 className="text-xl flex items-center">
            <FaClock className="mr-2" /> {/* Clock icon */}
            Monday - Friday 10:00am to 6:00pm
          </h4>
        </div>
        <div className="flex items-center text-5xl  hidden md:flex">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      { /*Header with "Health Care Provider" and "Appointment"*/ }
      <header
        style={{
          backgroundColor: "#f5f5f5", // Light background color
          height: "15vh", // Adjust height as needed
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Space between left and right content
          padding: "0 20px",
        }}
      >
        <div className="text-3xl md:text-1xl" >Health Care Provider</div>
        <div
          className="text-3xl bg-primary p-6  "
          style={{ borderRadius: "50px" }}
        >
          Appointment
        </div>
      </header>

      <div
        style={{
          position: "relative",
          height: "60vh", // Adjust height as needed
          width: "100%",
          // backgroundImage: `url('https://example.com/your-image.jpg')`,
          backgroundColor: "#003878",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#003878",
            opacity: 0.7, // Adjust the opacity as needed
          }}
        ></div>

        {/* Welcome Content */}
        <div
          style={{
            position: "relative",
            height: "60vh", // Adjust height as needed
            width: "100%",
            backgroundImage: `url('/images/bg.jpg')`, // Reference to the image in the public directory
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              backgroundColor: "#003878", // Primary color for overlay
              opacity: 0.7, // Adjust opacity as needed
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "white",
              display: "flex",
              flexDirection: "column", // Stack elements vertically
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              textAlign: "center",
              padding: "0 20px", // Add padding for spacing
            }}
          >
            <motion.div
        animate={{ y: scrollY > 50 ? 0 : -10 }}
        transition={{ duration: 1 }}
      > <div className="text-6xl mb-4  sm:text-6xl">
              Welcome to the Best Medical Services for Everyone
            </div></motion.div>
            <motion.div
        animate={{ y: scrollY > 100 ? 0 : 100, opacity: scrollY > 10 ? 1 : 0 }}
        transition={{ duration: 1 }}
      ><div className="text-xl w-full max-w-4xl mt-5">
              Affordable Healthcare for All. There are many variations of health
              plans available, but our commitment remains constant: delivering
              reliable and accessible options for all. We ensure you have the
              information and choices you need to avoid any surprises or
              inconveniences in your healthcare journey.
            </div> </motion.div>
          </div>
        </div>
      </div>

      {/* Plans Section */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px 20px",
        }}
      >
        <h2 className="text-4xl mb-8">Our Plans</h2>
        <div className="flex flex-wrap justify-center gap-8">
          
          {/* Aetna Plan */}
          <div
            className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105
             ${
              selectedPlans.some(p => p.plan === "Aetna") ? "border-4 border-green-500" : ""
            }`}
            style={{ width: "300px", height: "350px" }}
            onClick={() => handlePlanSelect("Aetna", 50)}
          >
            <Image
              src="/images/aetna.png"
              alt="Aetna Logo"
              width={200}
              height={200}
            />
            <div className="flex flex-col justify-between h-full mt-1">
              <p className="mt-2">
                Comprehensive plan offering broad coverage and additional services.
              </p>
              <p className="text-4xl font-semibold mt-2 text-blue-500">$50</p>
              <button
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginTop: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }} 
              >
                 {
              selectedPlans.some(p => p.plan === "Aetna") ? "Plan selected" : "select plan"
            }
              </button>
            </div>
          </div>

          {/* Cigna Plan */}
          <div
            className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105 ${
              selectedPlans.some(p => p.plan === "Cigna") ? "border-4 border-green-500" : ""
            }`}
            style={{ width: "300px", height: "350px" }}
            onClick={() => handlePlanSelect("Cigna", 100)}
          >
            <Image
              src="/images/cigna.jpg"
              alt="Cigna Logo"
              width={200}
              height={300}
              className="mt-3"
            />
            <div className="flex flex-col justify-between h-full mt-5">
              <p className="mt-2">
                Flexible plan with customizable options to suit your needs.
              </p>
              <p className="text-4xl font-semibold mt-2 text-blue-500">$100</p>
              <button
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginTop: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
             {
    selectedPlans.some(p => p.plan === "Cigna") ? "Plan selected" : "Select plan"
}
              </button>
            </div>
          </div>

          {/* Medicaid Plan */}
          <div
            className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105 ${
              selectedPlans.some(p => p.plan === "Medicaid") ? "border-4 border-green-500" : ""
            }`}
            style={{ width: "300px", height: "350px" }}
            onClick={() => handlePlanSelect("Medicaid", 500)}
          >
            <Image
              src="/images/medicaid.png"
              alt="Medicaid Logo"
              width={200}
              height={300}
              className="mt-4"
            />
            <div className="flex flex-col justify-between h-full mt-5">
              <p className="mt-2">
                Government-supported plan offering affordable healthcare.
              </p>
              <p className="text-4xl font-semibold mt-2 text-blue-500">$500</p>
              <button
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginTop: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
              {
    selectedPlans.some(p => p.plan === "Medicaid") ? "Plan selected" : "Select plan"
}
              </button>
            </div>
          </div>

          {/* Medicare Plan */}
          <div
            className={`flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105 ${
              selectedPlans.some(p => p.plan === "Medicare") ? "border-4 border-green-500" : ""
            }`}
            style={{ width: "300px", height: "350px" }}
            onClick={() => handlePlanSelect("Medicare", 500)}
          >
            <Image
              src="/images/medicare.png"
              alt="Medicare Logo"
              width={200}
              height={200}
            />
            <div className="flex flex-col justify-between h-full mt-1">
              <p className="mt-2">
                Comprehensive coverage with various plan options for seniors.
              </p>
              <p className="text-4xl font-bold mt-2 text-blue-500">$500</p>
              <button
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginTop: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
             {
    selectedPlans.some(p => p.plan === "Medicare") ? "Plan selected" : "Select plan"
}

              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Type Section */}
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl mb-6">Provider Type</h2>
        <div className="flex gap-8">
          <label
            className={`flex flex-col items-center cursor-pointer bg-white p-16 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105 ${
              providerType === "group" ? "border-4 border-green-500" : ""
            }`}
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(145deg, #E178C5, #EED3D9)',
            }}
            onClick={() => handleProviderTypeSelect("group")}
          >
            <FaUsers className="text-primary text-9xl mb-2" />
            <span className="text-3xl">Group</span>
          </label>

          <label
            className={`flex flex-col items-center cursor-pointer bg-slate-400 p-16 rounded-lg shadow-lg transition-all transform hover:shadow-2xl hover:scale-105 ${
              providerType === "solo" ? "border-4 border-green-500" : ""
            }`}
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)',
              background: 'linear-gradient(145deg, #F5E8DD, #FF71CD)',
            }}
            onClick={() => handleProviderTypeSelect("solo")}
          >
            <FaUser className="text-primary text-9xl mb-2" />
            <span className="text-3xl">Solo</span>
          </label>
        </div>
      </div>

      {/* Number of Providers Section */}
      <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "50px 150px",
        backgroundColor: "#EEF5FF",
      }}
    >
      <div style={{ flex: 1, marginRight: "50px" }}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/6bq8Qt8uYxI?si=BR7lBU_TZIrOelBp"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div style={{ flex: 1 }}>
        <h2
          className="text-5xl"
          style={{ marginBottom: "20px", textAlign: "end" }}
        >
          Number of Providers
        </h2>
        {selectedPlans.map((val, key) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              color:"blue"
            }}
          >
         <p
    style={{
      flex: 1,
      fontSize: "xx-large", // Makes the text larger
      textAlign: "center",  // Centers the text within the p element
    }}
  >
    {val.plan}
  </p>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
              <button
                onClick={() => decreaseProviders(val.plan)}
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  border: "none",
                  padding: "20px 30px",
                  borderRadius: "4px",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                -
              </button>
              <input
                type="number"
                value={providersCount[val.plan] || 0}
                readOnly
                style={{
                  width: "112px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "20px",
                  fontSize: "20px",
                  marginRight: "10px",
                }}
              />
              <button
                onClick={() => increaseProviders(val.plan)}
                style={{
                  backgroundColor: "#1D4ED8",
                  color: "white",
                  border: "none",
                  padding: "20px 30px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

      {/* Estimated Cost Section */}
          {/* Show Cost Button */}
          <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: "50px 20px",
        }}
      >
        <button
          onClick={handleShowCost}
          style={{
            backgroundColor: "#1D4ED8",
            color: "white",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Show Estimated Cost
        </button>
      </div>

      {/* Estimated Cost Section */}
      {showCost && (
        <motion.div
          ref={estimateRef} // Reference the div to enable scrolling to it
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px 20px",
            height: "40vh", // Adjust height as needed
            width: "100%",
            backgroundImage: `url('/images/checkout.jpg')`, // Reference to the image in the public directory
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "80%",
            maxWidth: "600px",
            position: "relative",
            top: "20%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <h2 className="text-4xl mb-8 font-semibold" style={{ color: "white" }}>
            Estimated Cost
          </h2>
          <div
            className="text-5xl font-bold mb-4"
            style={{ color: "white" }}
          >
            ${totalCost}
          </div>
          {/* Checkout Button */}
          {totalCost > 0 && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }} 
              onClick={handleClose}
              style={{
                backgroundColor: "#1D4ED8",
                color: "white",
                padding: "12px 24px",
                borderRadius: "4px",
                marginTop: "20px",
                cursor: "pointer",
                fontWeight: "bold",
                border: "none",
                fontSize: "1.125rem",
              }}
            >
              Checkout
            </motion.button>
          )}
        </motion.div>
      
)}

<footer className=" text-white py-12" style={{backgroundColor:"#003878"}}>
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold mb-4">Contact Us</h4>
          <p className="mb-2 flex items-center justify-center md:justify-start">
            <FaPhoneAlt className="mr-2" /> +1800-001-658
          </p>
          <p className="mb-2 flex items-center justify-center md:justify-start">
            <FaEnvelope className="mr-2" /> info@healthcare.com
          </p>
          <p className="mb-2 flex items-center justify-center md:justify-start">
            <FaMapMarkerAlt className="mr-2" /> 123 Health Street, City, Country
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left mt-8 md:mt-0">
          <h4 className="text-2xl font-bold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-left mt-8 md:mt-0">
          <h4 className="text-2xl font-bold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center">
        <p>&copy; 2024 Health Care Provider. All Rights Reserved.</p>
      </div>
    </footer>

    </main>
  );
}
