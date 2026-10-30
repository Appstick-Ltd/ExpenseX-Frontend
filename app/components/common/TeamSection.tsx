import React, { useState, useEffect } from 'react';
import { Users, Building2 } from 'lucide-react';
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
    bio: "Md. Riaz Mahmud is the Founder and CEO of Appstick. He leads the vision, product strategy and roadmap of ExpenseX AI, and oversees the company's business direction and partnerships, working directly with the engineering and design team to take the product from idea to release.",
    photoUrl: '/assets/team/riaz.png?v=3',
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
    photoUrl: '/assets/team/sabbir.png?v=3',
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
    photoUrl: '/assets/team/motiur.png?v=3',
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
    role: 'Software Engineer (Lead Mobile Application: Android & iOS)',
    experience: '4 Years Production Experience',
    bio: 'Tonmay Sen is a Software Engineer at Appstick with 4 years of production-level experience in mobile application development. At ExpenseX AI, he builds and maintains the Android and iOS applications, turning product requirements into stable, user-ready mobile experiences.',
    photoUrl: '/assets/team/tonmay.png?v=3',
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
    photoUrl: '/assets/team/dani.png?v=3',
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
    role: 'Software Engineer (Frontend)',
    experience: '3 Years Production Experience',
    bio: 'Sk Shiam Ali is a Frontend Software Engineer at Appstick with 3 years of production-level experience in web development. At ExpenseX AI, he builds and maintains the product website, focusing on responsive, fast and accessible interfaces.',
    photoUrl: '/assets/team/shiam.png?v=3',
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
    photoUrl: '/assets/team/asif.png?v=3',
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


const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [imgError, setImgError] = useState(false);
  const showImg = member.photoUrl && !imgError;

  return (
    <Card3DTilt
      className="glass-card"
      maxTilt={6}
      style={{
        borderRadius: '22px',
        padding: '28px',
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
        {/* Top Header: Avatar on Left, Name & Designation on Right with consistent baseline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', minHeight: '68px' }}>
          {/* Avatar with consistent style and fallback */}
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '16px',
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
                alt=""
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            ) : (
              <span
                style={{
                  fontSize: '22px',
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

          {/* Right Column: Name on top, Designation underneath */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3
              style={{
                fontSize: '19px',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: '0 0 5px 0',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
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
        </div>

        {/* Bio: Professional justified alignment & typography */}
        <p
          style={{
            fontSize: '13.5px',
            color: 'rgba(226, 232, 240, 0.88)',
            lineHeight: 1.7,
            textAlign: 'justify',
            textJustify: 'inter-word',
            hyphens: 'auto',
            WebkitHyphens: 'auto',
            margin: '0 0 20px 0',
            letterSpacing: '0.01em',
          }}
        >
          {member.bio}
        </p>
      </div>

      {/* Footer: Organization metadata only (No LinkedIn, No GitHub) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-dim)',
            fontWeight: 500,
          }}
        >
          <Building2 size={13} color="var(--purple-light)" />
          <span>Appstick &bull; Khulna</span>
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
