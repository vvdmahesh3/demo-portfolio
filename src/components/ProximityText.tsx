import React, { useRef, useEffect, useState } from "react";

interface ProximityTextProps {
  text: string;
  className?: string; // 👈 allow custom className
}

const ProximityText: React.FC<ProximityTextProps> = ({ text, className }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  return (
    <div className="flex flex-wrap justify-center items-center select-none">
      {[...text].map((char, i) => {
        const spanRef = useRef<HTMLSpanElement>(null);

        useEffect(() => {
          const el = spanRef.current;
          if (!el) return;

          const updateStyle = () => {
  const rect = el.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dist = calculateDistance(centerX, centerY, mousePos.x, mousePos.y);

  const maxDist = 500; // expanded proximity radius
  const proximity = Math.max(0, 1 - dist / maxDist);

  const scale = 1 + proximity * 0.35; // stronger scaling
  const weight = 400 + proximity * 500;

  el.style.transform = `scale(${scale})`;
  el.style.fontWeight = `${weight}`;
};


          updateStyle();
        });

        return (
          <span
            key={i}
            ref={spanRef}
            className={`
              transition-all duration-150 ease-out 
              text-4xl md:text-5xl lg:text-6xl font-[400] 
              dark:text-white text-black
              px-[0.05rem] 
              dark:[text-shadow:_0_0_4px_rgb(0,255,0)] 
              [text-shadow:_0_0_2px_rgb(0,0,0)]
              ${className || ""}  // 👈 apply extra className if passed
            `}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

export default ProximityText;
