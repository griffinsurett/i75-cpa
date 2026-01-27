import React, { useState, useEffect } from "react";

export default function RecentPassersDisplay({
  passers = [],
  intervalTime = 3000,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (passers.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % passers.length);
        setIsVisible(true);
      }, 300);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [passers.length, intervalTime]);

  if (passers.length === 0) {
    return <span className={className}>No Recent Passers Available</span>;
  }

  const currentPasser = passers[currentIndex];

  return (
    <span
      className={`transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {currentPasser.name}, {currentPasser.part}
    </span>
  );
}
