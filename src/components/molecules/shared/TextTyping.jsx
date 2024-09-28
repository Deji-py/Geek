"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

function TextTyping() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded ? (
        <p>Developers</p>
      ) : (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Developers",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Designers",
            1000,
            "Marketers",
            1000,
            "Entrepreneurs",
            1000,
            "Freelancers",
            1000,
          ]}
          wrapper="p"
          speed={50}
          repeat={Infinity}
        />
      )}
    </>
  );
}

export default TextTyping;
