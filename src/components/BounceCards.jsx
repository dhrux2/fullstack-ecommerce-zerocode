import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import './BounceCards.css';

/**
 * @param {{ images?: string[], className?: string, containerWidth?: number, containerHeight?: number, animationDelay?: number, animationStagger?: number, easeType?: string, transformStyles?: string[], enableHover?: boolean, hoverEffect?: string }} props
 */
export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)'
  ],
  enableHover = true,
  hoverEffect = 'push'
}) {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  const getNoRotationTransform = transformStr => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px(?:,\s*([-0-9.]+)px)?\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const currentY = match[2] ? parseFloat(match[2]) : 0;
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px, ${currentY}px)`);
    } else {
      return baseTransform === 'none' ? `translate(${offsetX}px, 0px)` : `${baseTransform} translate(${offsetX}px, 0px)`;
    }
  };

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        if (hoverEffect === 'minimal') {
          gsap.to(target, {
            scale: 1.05,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: 'auto'
          });
          if (target[0]) target[0].style.zIndex = 50;
        } else {
          const noRotationTransform = getNoRotationTransform(baseTransform);
          gsap.to(target, {
            transform: noRotationTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            overwrite: 'auto'
          });
        }
      } else {
        if (hoverEffect === 'minimal') {
          gsap.to(target, {
            scale: 0.95,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: 'auto'
          });
          if (target[0]) target[0].style.zIndex = 1;
        } else {
          const offsetX = i < hoveredIdx ? -160 : 160;
          const pushedTransform = getPushedTransform(baseTransform, offsetX);

          const distance = Math.abs(hoveredIdx - i);
          const delay = distance * 0.05;

          gsap.to(target, {
            transform: pushedTransform,
            duration: 0.4,
            ease: 'back.out(1.4)',
            delay,
            overwrite: 'auto'
          });
        }
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      
      if (hoverEffect === 'minimal') {
        gsap.to(target, {
          scale: 1,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto'
        });
        if (target[0]) target[0].style.zIndex = '';
      } else {
        const baseTransform = transformStyles[i] || 'none';
        gsap.to(target, {
          transform: baseTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto'
        });
      }
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx}`}
          style={{
            transform: transformStyles[idx] ?? 'none'
          }}
          onMouseEnter={() => enableHover && pushSiblings(idx)}
          onMouseLeave={() => enableHover && resetSiblings()}
        >
          <Image 
            src={src} 
            alt={`card-${idx}`} 
            fill
            sizes="(max-width: 1024px) 280px, 400px"
            className="image select-none object-cover" 
            onContextMenu={(e) => e.preventDefault()} 
            draggable={false} 
          />
        </div>
      ))}
    </div>
  );
}
