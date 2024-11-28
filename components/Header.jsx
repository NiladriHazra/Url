"use client";

import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="https://www.niladrihazra.site/">
            <h1 className="text-4xl font-semibold">
              Niladri <span className="text-accent">.</span>
            </h1>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
