import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
  Allproducts,
  Topratedsales,
} from "./components";
import {
  heroapi,
  popularsales,
  toprateslaes,
  highlight,
  sneaker,
  story,
  footerAPI,
} from "./data/data.js";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseConfig from "./data/firebaseConfig.js";
initializeApp(firebaseConfig);
const db = getFirestore();

const App = () => {
  const [popularItemsData, setPopularItemsData] = useState({ items: [] });
  const [topratedData, settopratedData] = useState({ items: [] });
  const [allproducts, setallproducts] = useState({ items: [] });
  useEffect(() => {
    const fetchPopularItems = async () => {
      const popularItemsCollection = collection(db, "popitems");
      const snapshot = await getDocs(popularItemsCollection);
      const fetchedItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          text: data.text,
          rating: data.rating,
          btn: data.btn,
          img: data.img,
          price: data.price,
          color: data.color || "from-blue-600 to-blue-500",
          shadow: data.shadow || "shadow-lg shadow-blue-500",
        };
      });
      setPopularItemsData({ items: fetchedItems });
    };

    fetchPopularItems();
  }, []);
        useEffect(() => {
    const fetchtopratedItems = async () => {
      const topratedItemsCollection = collection(db, "topitems");
      const snapshot = await getDocs(topratedItemsCollection);
      const fetchedItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          text: data.text,
          rating: data.rating,
          btn: data.btn,
          img: data.img,
          price: data.price,
          color: data.color || "from-blue-600 to-blue-500",
          shadow: data.shadow || "shadow-lg shadow-blue-500",
        };
      });
      settopratedData({ items: fetchedItems });
    };

    fetchtopratedItems();
  },[]);
  useEffect(() => {
    const fetchallproducts = async () => {
      const popularItemsCollection = collection(db, "products");
      const snapshot = await getDocs(popularItemsCollection);
      const fetchedItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          text: data.text,
          rating: data.rating,
          btn: data.btn,
          img: data.img,
          price: data.price,
          color: data.color || "from-blue-600 to-blue-500",
          shadow: data.shadow || "shadow-lg shadow-blue-500",
        };
      });
      setallproducts({ items: fetchedItems });
    };

    fetchallproducts();
  }, []);
  console.log(popularItemsData);
  console.log(topratedData);
  console.log(allproducts);
  return (
    <Router>
      <Navbar />
      <Cart />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex flex-col gap-16 relative">
              <Hero heroapi={heroapi} />
              <Sales endpoint={popularItemsData} ifExists />
              <FlexContent endpoint={highlight} ifExists />
              <Topratedsales endpoint={topratedData} />
              <FlexContent endpoint={sneaker} />
              <Stories story={story} />
            </main>
          }
        />
        <Route path="/allproducts" element={
        <main className="flex flex-col gap-16 relative">
          
           <Allproducts endpoint={allproducts} ifExists />
       </main>} />
       
      </Routes>
      <Footer footerAPI={footerAPI} />
    </Router>
  );
};

export default App;
