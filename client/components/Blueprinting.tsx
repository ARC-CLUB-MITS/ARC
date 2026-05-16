import React from 'react';

const Blueprinting: React.FC = () => {
  return (
    <section className="bg-[#0a0a0b] py-32 px-6 md:px-24 md:py-48">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 md:gap-24 lg:flex-row">
        <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden border border-gray-800 bg-gray-900 lg:w-1/2">
          <img
            src="https://picsum.photos/800/600?grayscale"
            alt="Process blueprint"
            className="h-full w-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="mb-2 text-[10px] uppercase tracking-[0.4em] text-gray-500">
              Minimal
            </div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-gray-700">
              Exploded View // Brochure
            </div>
            <div className="absolute bottom-0 left-0 -translate-x-4 translate-y-1/2 bg-[#d4a84a] px-8 py-4 font-serif text-xl font-bold italic text-[#0a0a0b]">
              Precision over speed.
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="mb-8 font-serif text-4xl text-white md:text-6xl">
            Blueprinting <br />
            <span className="italic text-[#d4a84a]">Excellence</span>
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base">
            The planning phase is not just about scheduling. It gives every project a clear
            structure before the team moves into execution.
          </p>
          <button className="group flex items-center space-x-4" type="button">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4a84a] transition-colors group-hover:text-[#c89b3c]">
              Explore Methodology
            </span>
            <span className="text-xl text-[#d4a84a] transition-transform group-hover:translate-x-2">
              -&gt;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blueprinting;
