import { useRef, useEffect, useState, useMemo, useId } from 'react';
import './CurvedLoop.css';

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  const duration = spacing ? spacing / (speed * 60) : 10;

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} xmlSpace="preserve">
              <animate 
                attributeName="startOffset" 
                from={direction === 'right' ? `-${spacing}px` : '0px'} 
                to={direction === 'right' ? '0px' : `-${spacing}px`} 
                dur={`${duration}s`} 
                repeatCount="indefinite" 
              />
              {totalText.split('✦').map((part, i, arr) => (
                <tspan key={i}>
                  {part}
                  {i < arr.length - 1 && <tspan style={{ fill: 'var(--color-accent)' }}>✦</tspan>}
                </tspan>
              ))}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
