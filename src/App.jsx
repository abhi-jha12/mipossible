import React, { useState, useEffect } from "react";
import {
  Cart,
  FlexContent,
  Footer,
  Hero,
  Navbar,
  Sales,
  Stories,
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
  console.log(popularItemsData);

  return (
    <>
      <Navbar />
      <Cart />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularItemsData} ifExists />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerAPI={footerAPI} />
    </>
  );
};

export default App;
