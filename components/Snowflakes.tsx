
import React from 'react';

const Snowflakes: React.FC = () => {
  const snowflakes = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 5}s`,
    opacity: 0.4 + Math.random() * 0.6,
    size: `${0.8 + Math.random() * 1.5}rem`
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {snowflakes.map(sf => (
        <div
          key={sf.id}
          className="snowflake"
          style={{
            left: sf.left,
            animationDelay: sf.delay,
            animationDuration: sf.duration,
            opacity: sf.opacity,
            fontSize: sf.size
          }}
        >
          ❅
        </div>
      ))}
    </div>
  );
};

export default Snowflakes;
