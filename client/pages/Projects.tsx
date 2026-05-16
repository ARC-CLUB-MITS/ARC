
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  status: 'active' | 'completed' | 'planning';
  tech: string[];
  features: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'ARC Club Website',
    tagline: 'Our digital home, built from scratch.',
    description:
      'Premium web experience for the ARC community - featuring smooth GSAP animations, responsive design, and a clean content architecture.',
    status: 'active',
    tech: ['React', 'TypeScript', 'Tailwind', 'GSAP', 'Vite'],
    features: [
      'Animated page transitions',
      'Mobile-first responsive',
      'Events & projects gallery',
      'Session-aware animations',
    ],
    github: 'https://github.com/ARC-CLUB-MITS',
    live: 'https://arc-club-mits.vercel.app',
  },
  {
    id: 2,
    title: 'NoDue',
    tagline: 'Digitizing campus clearance, end-to-end.',
    description:
      'A modern no-due management platform designed to simplify and automate academic clearance workflows for students, faculty, libraries, hostels, and administration through a centralized digital system.',
    status: 'active',
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'JWT',
    ],
    features: [
      'Role-based authentication',
      'Department-wise approval workflow',
      'Real-time no-due status tracking',
      'Admin, faculty, and student dashboards',
      'Paperless clearance management',
      'Responsive and modern UI',
    ],
    github: 'https://github.com/Usman0226/NoDues',
    live: 'https://no-dues-psi.vercel.app/',
  },
];

const statusConfig = {
  active: {
    label: 'Active',
    color: 'text-emerald-600',
    dot: 'bg-emerald-400',
    glow: 'shadow-emerald-400/20',
  },
  completed: {
    label: 'Shipped',
    color: 'text-blue-600',
    dot: 'bg-blue-400',
    glow: 'shadow-blue-400/20',
  },
  planning: {
    label: 'Planning',
    color: 'text-amber-600',
    dot: 'bg-amber-400',
    glow: 'shadow-amber-400/20',
  },
};

const activeProjectCount = projects.filter((project) => project.status === 'active').length;

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 70, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, delay: 0.25 }
      )
        .fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          subtitleRef.current,
          { y: 24, opacity: 0, filter: 'blur(6px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85 },
          '-=0.5'
        )
        .fromTo(
          '.project-card',
          { y: 36, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.85, stagger: 0.15, ease: 'power3.out' },
          '-=0.5'
        );

      // Floating elements
      gsap.fromTo(
        '.projects-float',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, delay: 0.8, ease: 'power4.out' }
      );

      gsap.to('.projects-float', {
        y: '+=8',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {/* Floating decorative chips */}
      <div className="absolute top-28 left-[8%] rotate-[-4deg] hidden lg:block">
        <div className="projects-float bg-white rounded-xl shadow-lg p-3 border border-gray-200/50" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2">
            <div className="bg-blue-50 p-2 rounded-lg">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono font-bold text-gray-700">projects/</p>
              <p className="text-[8px] text-gray-500">{activeProjectCount} active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-36 right-[8%] rotate-[3deg] hidden lg:block">
        <div className="projects-float bg-white rounded-xl shadow-lg p-3 border border-gray-200/50" style={{ opacity: 0 }}>
          <div className="flex items-center gap-2">
            <div className="bg-amber-50 p-2 rounded-lg">
              <svg className="w-4 h-4 text-[#d4a84a]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-mono font-bold text-gray-700">stack</p>
              <p className="text-[8px] text-gray-500">React + TS</p>
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Header */}
          <h1
            ref={titleRef}
            style={{ opacity: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4"
          >
            Our <span className="text-[#d4a84a]">Projects</span>
          </h1>
          <div
            ref={dividerRef}
            style={{ opacity: 0 }}
            className="w-16 h-[2px] bg-[#d4a84a] mx-auto mb-8 origin-center"
          />
          <p
            ref={subtitleRef}
            style={{ opacity: 0 }}
            className="text-sm md:text-base tracking-wide text-[var(--nav-text-color)] max-w-xl mx-auto mb-16 leading-relaxed"
          >
            A showcase of what we've built, shipped, and learned along the way.
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => {
              const status = statusConfig[project.status];
              const visibleTech = project.tech.slice(0, 5);
              const extraTechCount = project.tech.length - visibleTech.length;
              const visibleFeatures = project.features.slice(0, 4);
              const extraFeatureCount = project.features.length - visibleFeatures.length;

              return (
                <div
                  key={project.id}
                  className="project-card group relative h-full text-left rounded-2xl border border-[var(--text-color)]/8 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-[#d4a84a]/25 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  style={{ opacity: 0 }}
                >
                  <div className="flex h-full flex-col p-5">
                    {/* Header: Status + Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === 'active' ? 'animate-pulse' : ''}`} />
                        <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-[var(--nav-text-color)]/40">
                        #{String(project.id).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h2 className="text-lg font-serif font-bold tracking-tight mb-1 group-hover:text-[#d4a84a] transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-[11px] italic text-[var(--nav-text-color)]/60 mb-4 font-serif">
                      {project.tagline}
                    </p>

                    {/* Tech Stack - inline minimal */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {visibleTech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md text-[8px] uppercase tracking-[0.1em] font-semibold bg-[var(--text-color)]/[0.04] text-[var(--nav-text-color)]/70 border border-[var(--text-color)]/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                      {extraTechCount > 0 && (
                        <span className="px-2 py-0.5 rounded-md text-[8px] uppercase tracking-[0.1em] font-semibold bg-[#d4a84a]/10 text-[#b98b28] border border-[#d4a84a]/20">
                          +{extraTechCount} more
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[12px] text-[var(--nav-text-color)] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Features - compact list */}
                    <div className="space-y-1.5 mb-5">
                      {visibleFeatures.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-[11px] text-[var(--nav-text-color)]">
                          <svg className="w-3 h-3 text-[#d4a84a] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {f}
                        </div>
                      ))}
                      {extraFeatureCount > 0 && (
                        <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#d4a84a]">
                          +{extraFeatureCount} more features
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="mt-auto h-[1px] bg-[var(--text-color)]/[0.06] mb-4" />

                    {/* Actions - clean icon buttons */}
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e3a5f] text-white text-[9px] uppercase tracking-[0.15em] font-bold hover:bg-[#152d47] transition-all duration-300 hover:scale-[1.02]"
                        >
                          <svg className="w-3 h-3" viewBox="0 0 128 128" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z" />
                          </svg>
                          Source
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--text-color)]/12 text-[var(--nav-text-color)] text-[9px] uppercase tracking-[0.15em] font-bold hover:border-[#d4a84a]/30 hover:text-[#d4a84a] transition-all duration-300 hover:scale-[1.02]"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
