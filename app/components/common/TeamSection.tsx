'use client';
import React, { useState, useEffect } from 'react';
import { Users, ArrowUpRight, ShieldCheck, Building2, Code2, Palette, Terminal, Smartphone } from 'lucide-react';
import { Card3DTilt } from '../ui/Card3DTilt';

export interface TeamMember {
  name: string;
  role: string;
  experience?: string;
  bio: string;
  photoUrl?: string;
  initials: string;
  avatarGradient: string;
  linkedinUrl: string;
  secondaryLink?: {
    type: 'github' | 'portfolio';
    url: string;
    label: string;
  };
  specialtyIcon: 'leadership' | 'lead-backend' | 'lead-frontend' | 'mobile' | 'backend' | 'frontend' | 'design';
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Md. Riaz Mahmud',
    role: 'Founder & CEO',
    // No years figure for Founder & CEO
    bio: "Md. Riaz Mahmud is the Founder and CEO of Appstick. He leads the vision, product strategy and roadmap of ExpenseX AI, and oversees the company's business direction and partnerships, working directly with the engineering and design team to take the product from idea to release.",
    photoUrl: '/assets/team/riaz.png',
    initials: 'RM',
    avatarGradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/riaz-mahmud-appstick/',
    specialtyIcon: 'leadership',
  },
  {
    name: 'Md. Sabbir Ahmmed',
    role: 'Senior Software Engineer (Lead Backend)',
    experience: '6 Years Production Experience',
    bio: "Md. Sabbir Ahmmed is a Senior Software Engineer at Appstick with 6 years of production-level experience in backend development. At ExpenseX AI, he leads the backend engineering — designing and building the server-side systems and APIs that power the app's data and AI-assisted features.",
    photoUrl: '/assets/team/sabbir.png',
    initials: 'SA',
    avatarGradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/md-sabbir-ahmmed/',
    secondaryLink: {
      type: 'github',
      url: 'https://github.com/sabbir',
      label: 'GitHub',
    },
    specialtyIcon: 'lead-backend',
  },
  {
    name: 'Motiur Rahman',
    role: 'Software Engineer (Lead Frontend)',
    experience: '5 Years Production Experience',
    bio: 'Motiur Rahman is a Software Engineer at Appstick with 5 years of production-level experience in frontend development. At ExpenseX AI, he leads the frontend development, building polished, responsive user interfaces for the product.',
    photoUrl: '/assets/team/motiur.png',
    initials: 'MR',
    avatarGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/motiur-rahman/',
    secondaryLink: {
      type: 'github',
      url: 'https://github.com/motiur',
      label: 'GitHub',
    },
    specialtyIcon: 'lead-frontend',
  },
  {
    name: 'Tonmay Sen',
    role: 'Software Engineer (Mobile Application: Android & iOS)',
    experience: '4 Years Production Experience',
    bio: 'Tonmay Sen is a Software Engineer at Appstick with 4 years of production-level experience in mobile application development. At ExpenseX AI, he builds and maintains the Android and iOS applications, turning product requirements into stable, user-ready mobile experiences.',
    photoUrl: '/assets/team/tonmay.png',
    initials: 'TS',
    avatarGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/tonmay-sen/',
    secondaryLink: {
      type: 'github',
      url: 'https://github.com/surjo976',
      label: 'GitHub',
    },
    specialtyIcon: 'mobile',
  },
  {
    name: 'Dani Gain',
    role: 'Software Engineer (Backend)',
    experience: '3 Years Production Experience',
    bio: "Dani Gain is a Backend Software Engineer at Appstick with 3 years of production-level experience in server-side development. At ExpenseX AI, he builds and maintains the backend services and APIs that power the app's data and AI-assisted features.",
    photoUrl: '/assets/team/dani.png',
    initials: 'DG',
    avatarGradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/dani-gain/',
    secondaryLink: {
      type: 'github',
      url: 'https://github.com/DANIGAIN',
      label: 'GitHub',
    },
    specialtyIcon: 'backend',
  },
  {
    name: 'Sk Shiam Ali',
    role: 'Software Engineer (Website Frontend)',
    experience: '3 Years Production Experience',
    bio: 'Sk Shiam Ali is a Frontend Software Engineer at Appstick with 3 years of production-level experience in web development. At ExpenseX AI, he builds and maintains the product website, focusing on responsive, fast and accessible interfaces.',
    photoUrl: '/assets/image/shawon.png',
    initials: 'SA',
    avatarGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/sk-shiam-ali/',
    secondaryLink: {
      type: 'github',
      url: 'https://github.com/shiam',
      label: 'GitHub',
    },
    specialtyIcon: 'frontend',
  },
  {
    name: 'Asif Uddin',
    role: 'UI/UX Designer',
    experience: '2.5 Years Production Experience',
    bio: 'Asif Uddin is a UI/UX Designer at Appstick with 2.5 years of production-level experience in interface and experience design. At ExpenseX AI, he designs the app and website interfaces, keeping financial workflows simple, clear and easy to use.',
    photoUrl: '/assets/team/asif.png',
    initials: 'AU',
    avatarGradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    linkedinUrl: 'https://www.linkedin.com/in/asif-uddin/',
    secondaryLink: {
      type: 'portfolio',
      url: 'https://www.behance.net/asifuddin',
      label: 'Portfolio',
    },
    specialtyIcon: 'design',
  },
];

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.25a1.62 1.62 0 0 0-1.63 1.62 1.63 1.63 0 0 0 1.63 1.63 1.62 1.62 0 0 0 1.62-1.63c0-.9-.73-1.62-1.62-1.62Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
  </svg>
);

const BehanceIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.971 3-3.469 0-5.755-2.502-5.755-6s2.286-6 5.755-6c3.271 0 5.245 2.298 5.245 6.002 0 .4-.029.743-.058 1.059h-8.083c.125 1.884 1.349 2.871 2.893 2.871 1.499 0 2.327-.88 2.637-1.464l2.337.532zm-7.85-4.062h5.279c-.116-1.572-1.139-2.613-2.585-2.613-1.462 0-2.529 1.041-2.694 2.613zm-8.876 7.062h-7v-14h7.051c2.195 0 4.949.773 4.949 3.827 0 1.658-.895 2.844-2.146 3.447 1.815.545 2.645 2.052 2.645 3.738 0 3.328-2.88 2.988-5.499 2.988zm-4.103-8.23h3.584c1.198 0 2.083-.455 2.083-1.637 0-1.127-.885-1.569-2.083-1.569h-3.584v3.206zm0 5.666h3.766c1.378 0 2.457-.506 2.457-1.785 0-1.32-.979-1.818-2.457-1.818h-3.766v3.603z" />
  </svg>
);

const SpecialtyBadge: React.FC<{ type: TeamMember['specialtyIcon'] }> = ({ type }) => {
  switch (type) {
    case 'leadership':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(124, 58, 237, 0.15)', color: '#A78BFA', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <ShieldCheck size={12} /> LEADERSHIP
        </span>
      );
    case 'lead-backend':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(37, 99, 235, 0.18)', color: '#60A5FA', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Terminal size={12} /> LEAD BACKEND
        </span>
      );
    case 'lead-frontend':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(5, 150, 105, 0.18)', color: '#34D399', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Code2 size={12} /> LEAD FRONTEND
        </span>
      );
    case 'mobile':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Smartphone size={12} /> MOBILE
        </span>
      );
    case 'backend':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(14, 165, 233, 0.15)', color: '#38BDF8', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Terminal size={12} /> BACKEND
        </span>
      );
    case 'frontend':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Code2 size={12} /> FRONTEND
        </span>
      );
    case 'design':
      return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(236, 72, 153, 0.15)', color: '#F472B6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Palette size={12} /> UI / UX
        </span>
      );
    default:
      return null;
  }
};

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [imgError, setImgError] = useState(false);
  const showImg = member.photoUrl && !imgError;

  return (
    <Card3DTilt
      className="glass-card"
      maxTilt={6}
      style={{
        borderRadius: '22px',
        padding: '30px',
        background: 'linear-gradient(135deg, rgba(14, 20, 38, 0.85) 0%, rgba(20, 26, 52, 0.75) 100%)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div>
        {/* Top Header: Avatar & Header Badges */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          {/* Avatar with consistent style and fallback */}
          <div
            style={{
              position: 'relative',
              width: '74px',
              height: '74px',
              borderRadius: '20px',
              overflow: 'hidden',
              flexShrink: 0,
              background: member.avatarGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              border: '2px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            {showImg ? (
              <img
                src={member.photoUrl}
                alt={member.name}
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  userSelect: 'none',
                }}
              >
                {member.initials}
              </span>
            )}
          </div>

          {/* Specialty tag & Experience badge */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            <SpecialtyBadge type={member.specialtyIcon} />
            {member.experience ? (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {member.experience}
              </span>
            ) : (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--purple-light)',
                  background: 'rgba(109, 61, 245, 0.1)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                }}
              >
                Executive Vision
              </span>
            )}
          </div>
        </div>

        {/* Name & Role */}
        <div style={{ marginBottom: '14px' }}>
          <h3
            style={{
              fontSize: '20px',
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              lineHeight: 1.25,
              letterSpacing: '-0.015em',
            }}
          >
            {member.name}
          </h3>
          <div
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--purple-light)',
              lineHeight: 1.4,
            }}
          >
            {member.role}
          </div>
        </div>

        {/* Bio: Exact confirmed facts only */}
        <p
          style={{
            fontSize: '14px',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: '0 0 20px 0',
          }}
        >
          {member.bio}
        </p>
      </div>

      {/* Footer: Social Actions & Org metadata */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            flexWrap: 'wrap',
          }}
        >
          {/* Action Link: LinkedIn */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn Profile`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '999px',
                background: 'rgba(10, 102, 194, 0.14)',
                border: '1px solid rgba(10, 102, 194, 0.35)',
                color: '#38BDF8',
                fontSize: '12.5px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(10, 102, 194, 0.25)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 102, 194, 0.14)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>

            {/* Optional secondary link (GitHub / Portfolio) */}
            {member.secondaryLink && (
              <a
                href={member.secondaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} ${member.secondaryLink.label}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '7px 12px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-secondary)',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {member.secondaryLink.type === 'github' ? <GitHubIcon /> : <BehanceIcon />}
                <span>{member.secondaryLink.label}</span>
              </a>
            )}
          </div>

          {/* Org tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              color: 'var(--text-dim)',
            }}
          >
            <Building2 size={12} />
            <span>Appstick &bull; Khulna</span>
          </div>
        </div>
      </div>
    </Card3DTilt>
  );
};

export const TeamSection: React.FC<{
  titleBadge?: string;
  className?: string;
}> = ({ titleBadge = 'OUR CORE PRODUCT TEAM', className = '' }) => {
  useEffect(() => {
    // Strip any hash from browser URL to ensure clean route URLs
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div id="team" className={className}>
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px auto' }}>
        <div className="section-eyebrow" style={{ display: 'inline-flex', marginBottom: '16px' }}>
          <Users size={14} style={{ marginRight: '6px' }} />
          <span>{titleBadge}</span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 4.2vw, 44px)',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-0.025em',
            lineHeight: 1.18,
            marginBottom: '16px',
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            fontSize: '15.5px',
            color: 'var(--text-secondary)',
            lineHeight: 1.68,
            margin: 0,
          }}
        >
          ExpenseX AI is built by a seven-member product team at Appstick in Khulna, Bangladesh — covering company leadership, backend, frontend, mobile, web and product design. Our engineering and design team brings 2.5 to 6 years of production-level experience building and shipping real software.
        </p>
      </div>

      {/* Grid of All 7 Core Members: Exactly Riaz → Sabbir → Motiur → Tonmay → Dani → Shiam → Asif */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {TEAM_MEMBERS.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
