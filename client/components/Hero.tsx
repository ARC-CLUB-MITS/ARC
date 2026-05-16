import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Lightbulb } from 'lucide-react';

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.501c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
  
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnContainerRef = useRef<HTMLDivElement>(null);
  const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>, buttonId: string) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    // Calculate distance from button center
    const deltaX = e.clientX - buttonCenterX;
    const deltaY = e.clientY - buttonCenterY;
    
    // Limit movement to 20px max
    const maxMove = 15;
    const limitedX = Math.max(-maxMove, Math.min(maxMove, deltaX * 0.3));
    const limitedY = Math.max(-maxMove, Math.min(maxMove, deltaY * 0.3));
    
    setActiveButton(buttonId);
    setButtonTransform({ x: limitedX, y: limitedY });
  };

  const handleButtonMouseLeave = () => {
    setActiveButton(null);
    setButtonTransform({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(titleRef.current, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5 }
      )
      .fromTo(kickerRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=1"
      )
      .fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.7"
      )
      .fromTo(btnContainerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo('.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

      gsap.fromTo('.float-element', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5,
          stagger: 0.1,
          delay: 1.2,
          ease: 'power4.out'
        }
      );

      gsap.to('.float-element', {
        y: '+=8',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.4,
          from: 'random'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center md:justify-center text-center px-4 overflow-hidden pt-28 bg-[var(--bg-color)] transition-colors duration-0">
            
      {/* Top Left - Code Snippet Card */}
       <div className="absolute top-20 left-[-10px] lg:top-32 lg:left-[8%] xl:left-[12%] rotate-[-3deg] scale-[0.6] lg:scale-100 z-0">
        <div className="float-element bg-white rounded-xl shadow-lg p-4 max-w-[180px] border border-gray-200/50" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <span className="text-[8px] text-gray-400 font-mono">research.ts</span>
          </div>
          <pre className="text-[8px] font-mono text-gray-700 leading-relaxed">
            <code className="text-blue-600">const</code> research = {'{'}
            {'\n  '}method: <code className="text-green-600">'data'</code>,
            {'\n  '}output: <code className="text-purple-600">paper</code>
            {'\n}'};
          </pre>
        </div>
      </div>

      {/* Top Right - Terminal */}
      {/* <div className="absolute top-36 right-[8%] xl:right-[12%] rotate-[2deg] hidden lg:block"> 9
        <div className="float-element bg-gray-900 rounded-xl shadow-xl p-3 max-w-[200px] border border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-[8px] leading-relaxed">
            <p><span className="text-green-400">$</span> <span className="text-gray-300">npm run analyze</span></p>
            <p className="text-blue-300">Analysis complete</p>
            <p className="text-purple-300">Paper generated</p>
          </div>
        </div>
      </div> */}

      {/* Top Right - stats */}
      <div className="hidden lg:block absolute top-24 right-[-10px] lg:top-36 lg:right-[8%] xl:right-[12%] rotate-[2deg] scale-[0.65] lg:scale-100 z-0">
        <div className="float-element bg-white rounded-xl shadow-xl p-3 max-w-[200px] border border-gray-100" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-[#1e3a5f]">24</p>
              <p className="text-[8px] text-gray-500 uppercase tracking-wider font-medium">Projects</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#d4a84a]">156</p>
              <p className="text-[8px] text-gray-500 uppercase tracking-wider font-medium">Papers</p>
            </div>
          </div>
        </div>
      </div>


      {/* Left Middle - Project Stats Card */}
      {/* <div className="absolute left-[6%] top-1/2 -translate-y-1/2 rotate-[-2deg] hidden xl:block">
        <div className="float-element bg-white rounded-xl shadow-lg p-4 border border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-gray-700">research/</p>
              <p className="text-[9px] text-gray-500">12 files</p>
            </div>  
          </div>
        </div>
      </div> */}

      {/* Right Middle - NPM Package */}
      {/* <div className="absolute right-[6%] top-1/2 -translate-y-1/2 rotate-[2deg] hidden xl:block">
        <div className="float-element bg-white rounded-xl shadow-lg p-4 border border-gray-200/50">
          <div className="flex items-center gap-3">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#CB3837">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
            </svg>
            <div className="text-left">
              <p className="text-[10px] font-mono font-bold text-gray-700">@arc/core</p>
              <p className="text-[8px] text-gray-500">v2.4.1</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Left - Activity Stats */}
      {/* <div className="absolute bottom-[18%] left-[10%] xl:left-[15%] rotate-[1deg] hidden lg:block">
        <div className="float-element bg-white rounded-xl shadow-lg p-4 border border-gray-200/50">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xl font-bold text-[#1e3a5f]">24</p>
              <p className="text-[8px] text-gray-500 uppercase tracking-wider font-medium">Projects</p>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#d4a84a]">156</p>
              <p className="text-[8px] text-gray-500 uppercase tracking-wider font-medium">Papers</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom Right - Git Commits */}
        <div className="absolute bottom-32 right-[-10px] lg:bottom-[18%] lg:right-[10%] xl:right-[15%] rotate-[-2deg] scale-[0.7] lg:scale-100 z-0">
        <div className="float-element bg-[var(--bg-color)] rounded-xl shadow-lg p-3 border border-[var(--text-color)]/10 dark-glow transition-all duration-500" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2">
            <div className="bg-orange-50 p-2 rounded-lg">
              <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.007 8.222A3.738 3.738 0 0 0 15.045 5.2a3.737 3.737 0 0 0 1.156 6.583 2.988 2.988 0 0 1-2.668 1.67h-2.99a4.456 4.456 0 0 0-2.989 1.165V7.4a3.737 3.737 0 1 0-1.494 0v9.117a3.776 3.776 0 1 0 1.816.099 2.99 2.99 0 0 1 2.668-1.667h2.99a4.484 4.484 0 0 0 4.223-3.039 3.736 3.736 0 0 0 3.25-3.687zM4.565 3.738a2.242 2.242 0 1 1 4.484 0 2.242 2.242 0 0 1-4.484 0zm4.484 16.441a2.242 2.242 0 1 1-4.484 0 2.242 2.242 0 0 1 4.484 0zm8.221-9.715a2.242 2.242 0 1 1 0-4.485 2.242 2.242 0 0 1 0 4.485z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-mono text-gray-500">main</p>
              <p className="text-[10px] font-mono text-gray-700 font-semibold">3 commits</p>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Right - Git Commits */}
      {/* <div className="float-element hidden lg:block absolute bottom-[18%] right-[10%] xl:right-[15%] bg-gray-900 rounded-xl shadow-lg p-3 rotate-[-2deg] border border-gray-200/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-[8px] leading-relaxed">
          <p><span className="text-green-400">$</span> <span className="text-gray-300">npm run analyze</span></p>
          <p className="text-blue-300">Analysis complete</p>
          <p className="text-purple-300">Paper generated</p>
        </div>
      </div> */}


      <div className="max-w-4xl mx-auto relative z-10">
        
        <h1 ref={titleRef} style={{ opacity: 0 }} className="text-[clamp(5rem,12vw,12rem)] font-serif font-bold tracking-tighter leading-[0.85]  text-[var(--text-color)] mb-10">
          ARC <br /> CLUB
        </h1>
        <p ref={kickerRef} style={{ opacity: 0 }} className="text-[12px] uppercase tracking-[0.5em] mb-10 text-[#d4a84a] font-medium">Applied Research & Creation</p>


        <p ref={subtitleRef} style={{ opacity: 0 }} className="italic font-serif text-xl md:text-2xl text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
          The structured student community for building and completing projects
        </p>

        <div ref={btnContainerRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={()=> window.open('https://forms.gle/wy4bHuJntt915GnP7')}
            onMouseMove={(e) => handleButtonMouseMove(e, 'join')}
            onMouseLeave={handleButtonMouseLeave}
            style={{
              transform: activeButton === 'join' ? `translate(${buttonTransform.x}px, ${buttonTransform.y}px)` : 'translate(0px, 0px)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="flex items-center justify-center gap-2 rounded-full bg-[#1e3a5f] text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[#152d47] transition-colors w-full sm:w-auto font-bold"
          >
            <Lightbulb size={16}/> Submit
          </button>
          <button 
            onClick={()=> window.open('https://chat.whatsapp.com/GxKLMyN99POCxahNy0QLxy')}
            onMouseMove={(e) => handleButtonMouseMove(e, 'thesis')}
            onMouseLeave={handleButtonMouseLeave}
            style={{
              transform: activeButton === 'thesis' ? `translate(${buttonTransform.x}px, ${buttonTransform.y}px)` : 'translate(0px, 0px)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="flex gap-2 items-center justify-center rounded-full border-2 border-[#d4a84a] text-[#0a0a0b] px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-[#d4a84a] hover:text-white transition-colors w-full sm:w-auto font-bold"
          >
             <WhatsAppIcon size={16} />Join
          </button>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-12 left-12 flex items-center space-x-4" style={{ opacity: 0 }}>
        <div className="w-8 h-[1px] bg-[#d4a84a]"></div>
        <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-gray-500">Scroll to Explore</span>
      </div>
    </section>
  );
};

export default Hero;
