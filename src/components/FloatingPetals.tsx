import React from 'react';

export const FloatingPetals: React.FC = () => {
  // Generate subtle decorative floral petals or spark particles
  const petals = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((_, i) => {
        const randomLeft = Math.random() * 100;
        const randomDuration = 10 + Math.random() * 15;
        const randomDelay = Math.random() * 5;
        const randomSize = 8 + Math.random() * 12;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]/20 blur-[1px]"
            style={{
              left: `${randomLeft}%`,
              top: `-5%`,
              width: `${randomSize}px`,
              height: `${randomSize}px`,
              animation: `fallPetal ${randomDuration}s linear infinite`,
              animationDelay: `${randomDelay}s`
            }}
          />
        );
      })}

      <style>{`
        @keyframes fallPetal {
          0% {
            transform: translateY(0vh) translateX(0vw) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) translateX(5vw) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
