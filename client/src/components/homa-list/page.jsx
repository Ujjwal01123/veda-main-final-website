"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NityaAtiRudrabhishek = () => {
  const router = useRouter();
  const [nityas, setNityas] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const imageUrl = apiUrl.replace("/api", "");

  // ✅ Fetch data
  useEffect(() => {
    const fetchNityas = async () => {
      try {
        const res = await axios.get(`${apiUrl}/pujas/all`);
        const nityaData = res.data.filter(
          (item) => item.category?.name === "Homa | Havan"
        );
        console.log("Fetched nitya data:", nityaData);
        setNityas(nityaData);
      } catch (error) {
        console.error("Error fetching Nitya Ati Rudrabhishek data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNityas();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="py-20 text-center text-lg text-gray-600">
        Loading Homa Havans...
      </div>
    );
  }

  return (
    <section className="bg-base-50 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-4xl font-bold text-neutral-900">
          Types of Homa Havans You Can Book
        </h2>
      </div>

      <div className="container mx-auto px-4 py-8">
        {nityas.length === 0 ? (
          <p className="text-center text-gray-500">
            No Nitya Ati Rudrabhishek pujas available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {nityas.map((item) => (
              <div
                key={item._id}
                className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link href={`/yagya-puja/${item._id}`}>
                  <div className="relative h-56 w-full sm:h-64 md:h-72">
                    <Image
                      src={`${imageUrl}${item.image}`}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover object-center transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">
                      {item.category?.name}
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
                      {item.title}
                    </h3>
                  </div>
                </Link>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => router.push(`/yagya-puja/${item._id}`)}
                    className="mt-3 w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NityaAtiRudrabhishek;
