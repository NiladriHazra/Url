"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Image from "next/image";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false); // State for the "Copied" message
  const [iconSrc, setIconSrc] = useState("/icons/before-copy.png"); // Icon source for before copying

  useEffect(() => {
    // Ensure the icon only changes after the component has mounted on the client side
    if (typeof window !== "undefined") {
      setIconSrc("/icons/before-copy.png"); // Default icon when component is mounted
    }
  }, []);

  const handleShorten = async () => {
    setError("");
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    try {
      const response = await fetch("https://api.short.cm/links/public", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: process.env.NEXT_PUBLIC_SHORTCM_API_KEY,
        },
        body: JSON.stringify({
          originalURL: url,
          domain: "go.niladrihazra.site",
          allowDuplicates: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to shorten URL");
      }

      const data = await response.json();
      setShortUrl(data.shortURL);
    } catch (err) {
      console.error(err);
      setError("Error: " + (err.message || "Something went wrong"));
    }
  };

  const handleCopy = () => {
    if (shortUrl && typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          setCopied(true);
          setIconSrc("/icons/copy.png"); // Change icon after copying
          setTimeout(() => {
            setCopied(false);
            setIconSrc("/icons/before-copy.png"); // Reset icon after 1 second
          }, 1000);
        })
        .catch((err) => {
          console.error("Error copying to clipboard: ", err);
        });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-primary">
      <div>
        <Header />
      </div>
      <div className="flex-grow flex items-center justify-center">
      <div className="bg-[#27272c] p-6 rounded-3xl shadow-md w-[calc(100%-10px)] sm:w-98 md:w-1/2 lg:w-1/3 xl:w-1/4">

          <h1 className="text-2xl font-bold mb-4 text-pink-100 text-center">URL Shortener</h1>

          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL here"
            className="w-full p-2 border border-gray-300 text-pink-100 rounded-2xl mb-4"
          />

          <div className="flex items-center justify-center">
            <Button
              onClick={handleShorten}
              className="flex items-center justify-center"
            >
              Shorten URL
            </Button>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {shortUrl && (
            <div className="mt-4 text-center">
              <p className="text-pink-100">Shortened URL:</p>
              <div className="flex items-center justify-center space-x-2">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  {shortUrl}
                </a>
                <button onClick={handleCopy} className="flex items-center justify-center">
                  <Image
                    src={iconSrc}
                    alt="Copy"
                    width={24}
                    height={24}
                    className="w-6 h-6 gap-4 cursor-pointer"
                  />
                </button>
                {copied && (
                  <span className="ml-2 text-pink-100">Copied</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-4 text-accent mt-auto">
        <p>Created with ❤️ by Niladri</p>
      </footer>
    </div>
  );
}

export default App;
