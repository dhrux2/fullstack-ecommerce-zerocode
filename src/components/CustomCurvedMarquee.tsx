import React, { useRef, useEffect, useState, useId } from 'react';

export default function CustomCurvedMarquee() {
  const marqueeText = "MORE COMING SOON ✦ ";
  
  const measureRef = useRef<SVGTextElement>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  
  // A perfect shallow smile curve. 
  // ViewBox is 1440 wide. Center is 720. 
  // Starts far left (-1000), ends far right (2440).
  const pathD = "M -1000, 50 Q 720, 250 2440, 50";

  // Repeat text enough times to cover the visible path + 1 extra for seamless looping.
  const totalText = spacing > 0 ? Array(25).fill(marqueeText).join('') : marqueeText;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [marqueeText]);

  // Speed calculation. Lower number = faster.
  const duration = spacing ? spacing / 80 : 10; 

  return (
    <div className="relative w-full h-[120px] md:h-[200px] overflow-hidden flex justify-center items-center z-20">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 1440 250" 
        preserveAspectRatio="xMidYMid slice"
      >
        <text 
          ref={measureRef} 
          className="font-outfit uppercase tracking-[0.2em] font-bold text-xl md:text-3xl" 
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {marqueeText}
        </text>
        
        <defs>
          <path id={pathId} d={pathD} fill="none" />
        </defs>
        
        {ready && (
          <text className="font-outfit uppercase tracking-[0.2em] font-bold text-xl md:text-3xl fill-[var(--color-primary-dark)]">
            <textPath href={`#${pathId}`} startOffset="0">
              <animate 
                attributeName="startOffset" 
                from="0" 
                to={`-${spacing}px`} 
                dur={`${duration}s`} 
                repeatCount="indefinite" 
              />
              {totalText.split('✦').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <tspan style={{ fill: 'var(--color-accent)' }}>✦</tspan>}
                </React.Fragment>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
