"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaPen, FaComments, FaBullseye, FaRocket } from "react-icons/fa";
import Posts from "../components/Posts";
import axios from "../utils/axios";
import requests from "../utils/requests";

const features = [
  {
    title: "Engaging Articles",
    description: "Read high-quality, well-researched articles across various topics.",
    icon: <FaPen className="text-purple-500 text-4xl" />,
  },
  {
    title: "Community Discussions",
    description: "Join discussions, share your thoughts, and connect with like-minded people.",
    icon: <FaComments className="text-purple-500 text-4xl" />,
  },
  {
    title: "Personalized Content",
    description: "Get recommendations tailored to your reading preferences.",
    icon: <FaBullseye className="text-purple-500 text-4xl" />,
  },
  {
    title: "Seamless Experience",
    description: "Enjoy a smooth and distraction-free reading experience.",
    icon: <FaRocket className="text-purple-500 text-4xl" />,
  },
];

export default function Home({ posts }) {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="font-poppins">
      <header className="relative text-center py-16 bg-purple-50">
        <div className="flex flex-col-reverse md:flex-row items-center mx-4 md:mx-40 mt-10">
          <div className="md:w-1/2">
            <motion.h1
              className="mb-4 text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Discover Inspiring <span className="text-purple-600">Stories</span>
            </motion.h1>
            <motion.p
              className="mb-8 max-w-xl mx-auto text-gray-500 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              Explore insightful articles, engage in discussions, and personalize your reading experience.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8 }}
            >
              <button
                onClick={() => setShowModal(true)}
                className="px-8 py-3 font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300"
              >
                Get Started
              </button>
              <a href="#features">
                <button className="px-8 py-3 font-medium text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-100 transition duration-300">
                  Learn More
                </button>
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <Image src="/lady.png" alt="Blog Hero" width={500} height={500} />
          </div>
        </div>
      </header>
      
      <section id="features" className="py-16 px-4 mx-4 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Why Choose <span className="text-green-600">Our Blog</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-lg transition-transform duration-500 transform hover:scale-105 flex flex-col items-center"
              >
                <span className="flex items-center justify-center mb-4 p-4 rounded-full  text-white">
                  {feature.icon}
                </span>
                <h4 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h4>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Posts posts={posts} />
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full relative">
            <button className="absolute top-3 right-3 text-gray-600" onClick={() => setShowModal(false)}>
              ✖
            </button>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h1>
            <p className="text-gray-500 text-center mb-8">Sign in to access exclusive content</p>
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center w-full py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              <FcGoogle className="text-2xl mr-3" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
          </div>
        </div>
      )}
      
     
    </div>
  );
}

export const getServerSideProps = async () => {
  let posts = [];
  try {
    const res = await axios.get(`${requests.fetchPosts}`);
    posts = res.data;
  } catch (e) {}
  return {
    props: {
      posts,
    },
  };
};
