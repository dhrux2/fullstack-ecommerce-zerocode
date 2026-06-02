'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollExpandMediaProps {
  mediaSrc: string;
  bgImageSrc: string;
  title?: string;
  textBlend?: boolean;
}

const ScrollExpandMedia = ({
  mediaSrc,
  bgImageSrc,
  title,
  textBlend,
}: ScrollExpandMediaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLHeadingElement>(null);
  const rightTextRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Fallback: forcefully remove preloader after 3 seconds even if video is still buffering
    const timeout = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1500', // Scroll distance for the animation
          scrub: 1,      // Smooth scrubbing
          pin: true,     // Pin the hero section during animation
          anticipatePin: 1,
        }
      });

      // Background fades out
      tl.to(bgRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 0);
      
      // Video overlay fades out so video gets brighter
      tl.to(overlayRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' }, 0);

      // Texts just fade out gradually as they ride the edges out of frame
      tl.to(leftTextRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 0.2);
      tl.to(rightTextRef.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 0.2);
      
      // Media container scales up to fill screen
      tl.to(mediaRef.current, { 
        width: '100vw', 
        height: '100vh',
        duration: 1,
        ease: 'power2.inOut'
      }, 0);

      // Inner video container border radius animates to 0
      tl.to(videoContainerRef.current, {
        borderRadius: '0px',
        duration: 1,
        ease: 'power2.inOut'
      }, 0);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div className="relative w-full">
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
        {/* Background Image Layer */}
        <div ref={bgRef} className="absolute inset-0 w-full h-full z-0">
          <Image
            src={bgImageSrc}
            alt="Hero Background"
            fill
            className="object-cover select-none"
            priority
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {/* The expanding media container (no overflow-hidden, so text can spill out) */}
          <div 
            ref={mediaRef} 
            className="relative z-10 w-[200px] h-[266px] md:w-[300px] md:h-[400px] lg:w-[350px] lg:h-[466px]"
            style={{ willChange: 'width, height' }}
          >
            {/* Inner Video Container (handles border radius and hiding video overflow) */}
            <div 
              ref={videoContainerRef} 
              className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl"
            >
              <video
                src={mediaSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoLoaded(true)}
                className="w-full h-full object-cover relative z-10"
              />
              <div ref={overlayRef} className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
            </div>

            {/* Texts perfectly anchored to the edges of the expanding container */}
            {/* Zero - Top Left Wrapper */}
            <div className={`absolute top-0 left-0 -translate-x-[20%] sm:-translate-x-[60%] md:-translate-x-[90%] -translate-y-[10%] sm:-translate-y-[20%] md:-translate-y-[30%] z-20 pointer-events-none ${
              textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
            }`}>
              <h2
                ref={leftTextRef}
                className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-thunder-italic text-[#F5F4F0] leading-[0.8]"
                style={{ willChange: 'opacity' }}
              >
                {firstWord}
              </h2>
            </div>
            
            {/* Code - Bottom Right Wrapper */}
            <div className={`absolute bottom-0 right-0 translate-x-[20%] sm:translate-x-[60%] md:translate-x-[90%] translate-y-0 sm:translate-y-[5%] md:translate-y-[10%] z-20 pointer-events-none ${
              textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
            }`}>
              <h2
                ref={rightTextRef}
                className="text-5xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-thunder-italic text-[#F5F4F0] leading-[0.8]"
                style={{ willChange: 'opacity' }}
              >
                {restOfTitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollExpandMedia;
