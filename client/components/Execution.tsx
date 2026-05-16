
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Execution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the pipeline flow
      gsap.fromTo('.execution-step',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.execution-pipeline',
            start: 'top 75%',
          }
        }
      );

      // Animate the container
      gsap.fromTo('.execution-container',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.execution-container',
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="antigravity-trigger bg-[var(--bg-color)] py-32 md:py-24 px-6 md:px-24 transition-colors duration-0">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#d4a84a] text-[10px] uppercase tracking-[0.3em] font-semibold mb-6">
            Section 03
          </p>
          <h2 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] text-[var(--text-color)] mb-8">
            Execution <br />
            <span className="italic text-[#1e3a5f]">happens daily</span>
          </h2>
          <p className="text-gray-600 italic font-serif text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Each feature is built in a separate branch and merged after review.
          </p>
        </div>

        {/* Terminal Box - Dark Theme */}
        <div className="execution-container bg-[#0f1116] rounded-xl overflow-hidden border border-[#1e2937] shadow-2xl max-w-3xl mx-auto">
          {/* Terminal Header */}
          <div className="bg-[#0a0d12] px-4 py-3 flex items-center justify-between border-b border-[#1e2937]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
            </div>
            <div className="text-gray-500 text-xs font-mono flex items-center space-x-2">
              <span>◆</span>
              <span>arc-deployment --stable</span>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div className="execution-pipeline px-6 py-16 md:px-10 md:py-20 bg-gradient-to-b from-[#111827] to-[#0f1116] " >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              <div className="execution-step">
                <span className="text-gray-500 text-xl md:text-2xl font-mono">feature</span>
              </div>
              <div className="execution-step">
                <span className="text-gray-600 text-2xl md:text-3xl">→</span>
              </div>
              <div className="execution-step">
                <span className="text-gray-400 text-xl md:text-2xl font-mono">review</span>
              </div>
              <div className="execution-step">
                <span className="text-gray-600 text-2xl md:text-3xl">→</span>
              </div>
              <div className="execution-step">
                <span className="text-gray-300 text-xl md:text-2xl font-mono">merge</span>
              </div>
              <div className="execution-step">
                <span className="text-gray-600 text-2xl md:text-3xl">→</span>
              </div>
              <div className="execution-step relative">
                <span className="text-[#4a9eff] text-xl md:text-2xl font-mono font-bold relative" style={{ textShadow: '0 0 20px rgba(74, 158, 255, 0.6), 0 0 40px rgba(74, 158, 255, 0.4)' }}>
                  stable
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#1e2937] px-6 py-4 bg-[#0a0d12] flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-[#28c840]"></div>
              <span className="text-gray-500 font-mono uppercase tracking-wider">
                Branch deployed
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#0f1116]"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-[#0f1116]"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-[#0f1116]"></div>
              </div>
              <span className="text-gray-500 font-mono uppercase tracking-wider">
                Approved by Core
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Execution;
