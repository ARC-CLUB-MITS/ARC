
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, TrendingUp, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IdeaPool: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const header = gsap.utils.toArray<HTMLElement>('.idea-header-item');
      const points = gsap.utils.toArray<HTMLElement>('.timeline-point');

      gsap.fromTo(
        header,
        { opacity: 0, y: 24, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 72%',
          },
        }
      );

      gsap.fromTo(
        [lineRef.current, mobileLineRef.current],
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 72%',
          },
        }
      );

      gsap.fromTo(
        points,
        { opacity: 0, y: 36, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 68%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const phases = [
    {
      step: '01',
      title: 'Ideation',
      desc: 'Students submit project ideas with a clear problem statement, expected outcome, and required skills.',
      icon: Lightbulb,
    },
    {
      step: '02',
      title: 'Validation',
      desc: 'Faculty coordinators review the ideas, sharpen the scope, and identify what is ready to move forward.',
      icon: TrendingUp,
    },
    {
      step: '03',
      title: 'Team Formation',
      desc: 'A four-member team is formed around the selected idea, with responsibilities mapped before execution.',
      icon: CheckCircle,
    }
  ];

  return (
    <section ref={containerRef} className="idea-pool-trigger bg-[var(--bg-color)] text-[var(--text-color)] py-28 md:py-24 px-6 transition-colors duration-0">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <p className="idea-header-item text-[#d4a84a] text-[10px] uppercase tracking-[0.2em] font-semibold mb-6">Section 01</p>
          <h2 className="idea-header-item text-5xl md:text-8xl font-serif font-medium leading-[0.92] text-[var(--text-color)]">
            The <br /> 
            <span className="italic text-[#1e3a5f]">Idea Pool</span>
          </h2>
          <p className="idea-header-item mt-10 md:mt-12 text-gray-600 italic font-serif text-lg md:text-xl max-w-lg leading-relaxed">
            A focused flow for collecting, refining, and turning strong student ideas into executable projects.
          </p>
        </div>

        <div className="timeline-container relative">
          {/* Vertical Line - Desktop centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-gray-200 hidden md:block"></div>
          <div 
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-full bg-[#4A90E2] origin-top hidden md:block"
          ></div>

          {/* Vertical Line - Mobile left-aligned */}
          <div className="absolute left-7 top-0 w-[2px] h-full bg-gray-200 md:hidden"></div>
          <div 
            ref={mobileLineRef}
            className="absolute left-7 top-0 w-[2px] h-full bg-[#4A90E2] origin-top md:hidden"
          ></div>

          <div className="space-y-16 md:space-y-28">
            {phases.map((item, idx) => {
              const Icon = item.icon;
              const isLeft = idx % 2 === 0;
              
              return (
                <div 
                  key={idx} 
                  className={`timeline-point relative flex items-start ${
                    isLeft ? 'md:flex-row md:justify-end md:pr-[calc(50%+3rem)]' : 'md:flex-row-reverse md:justify-end md:pl-[calc(50%+3rem)]'
                  }`}
                >
                  {/* Icon Badge - Desktop centered, Mobile left-aligned */}
                  <div className="absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-[#4A90E2] flex items-center justify-center z-10 shadow-lg shadow-blue-500/10">
                    <Icon className="w-6 h-6 text-[#4A90E2]" />
                  </div>
                  
                  <div className={`${isLeft ? 'md:text-right' : 'md:text-left'} max-w-md pl-20 md:pl-0`}>
                    <span className="inline-block text-[10px] uppercase tracking-[0.28em] font-bold text-[#d4a84a] mb-3">
                      {item.step}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[var(--text-color)]">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* <div className="mt-32 flex justify-center">
          <button className="rounded-full bg-[#1e3a5f] text-white px-12 py-5 text-[10px] uppercase tracking-[0.2em] hover:bg-[#152d47] transition-all font-bold">

          </button>
        </div> */}
      </div>
    </section>
  );
};

export default IdeaPool;
