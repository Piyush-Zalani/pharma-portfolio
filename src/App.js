import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a1628;
    --navy-mid: #0f2040;
    --teal: #00c9b1;
    --teal-dim: #009e8c;
    --gold: #c9a84c;
    --gold-light: #e8c97a;
    --white: #f0f4f8;
    --white-dim: #b8c8d8;
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.08);
    --mono: 'DM Mono', monospace;
    --serif: 'Cormorant Garamond', serif;
    --sans: 'Outfit', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--white);
    font-family: var(--sans);
    font-size: 18px;
    overflow-x: hidden;
  }

  ::selection { background: var(--teal); color: var(--navy); }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 2px; }

  .portfolio { position: relative; }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 3rem;
    background: rgba(10,22,40,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    transition: all 0.3s;
  }

  .nav-logo {
    font-family: var(--mono);
    font-size: 1rem;
    color: var(--teal);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .nav-links { display: flex; gap: 2.5rem; list-style: none; }

  .nav-links a {
    font-family: var(--mono);
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    color: var(--white-dim);
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: var(--teal);
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  .nav-links a:hover { color: var(--teal); }
  .nav-links a:hover::after { transform: scaleX(1); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 3rem;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,201,177,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 80% at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 60%),
      linear-gradient(180deg, var(--navy) 0%, #071020 100%);
  }

  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,201,177,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,201,177,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 60% 50%, black 30%, transparent 70%);
  }

  .hero-molecules {
    position: absolute; right: 0; top: 50%;
    transform: translateY(-50%);
    width: 45%; height: 80%; opacity: 0.15;
  }

  .hero-content { position: relative; z-index: 2; max-width: 760px; }

  .hero-tag {
    font-family: var(--mono);
    font-size: 0.95rem;
    color: var(--teal);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .hero-tag::before {
    content: '';
    display: block;
    width: 30px; height: 1px;
    background: var(--teal);
  }

  .hero-name {
    font-family: var(--serif);
    font-size: clamp(5rem, 10vw, 9rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--white);
    margin-bottom: 0.5rem;
  }

  .hero-name em { font-style: italic; color: var(--gold-light); }

  .hero-title {
    font-family: var(--mono);
    font-size: 0.9rem;
    color: var(--teal);
    letter-spacing: 0.15em;
    margin-bottom: 2rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .hero-title span {
    padding: 0.35rem 0.9rem;
    border: 1px solid rgba(0,201,177,0.3);
    border-radius: 2px;
    background: rgba(0,201,177,0.05);
  }

  .hero-desc {
    font-size: 1.15rem;
    line-height: 1.85;
    color: var(--white-dim);
    max-width: 580px;
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn-primary {
    padding: 1rem 2.2rem;
    background: var(--teal);
    color: var(--navy);
    border: none;
    font-family: var(--mono);
    font-size: 0.9rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
  }

  .btn-primary:hover { background: var(--gold); transform: translateY(-2px); }

  .btn-secondary {
    padding: 1rem 2.2rem;
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(255,255,255,0.2);
    font-family: var(--mono);
    font-size: 0.9rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
  }

  .btn-secondary:hover { border-color: var(--teal); color: var(--teal); transform: translateY(-2px); }

  .hero-stats {
    position: absolute;
    right: 3rem; bottom: 3rem;
    display: flex; gap: 2.5rem;
  }

  .stat { text-align: center; }

  .stat-num {
    font-family: var(--serif);
    font-size: 2.6rem;
    font-weight: 300;
    color: var(--teal);
    display: block;
    line-height: 1.1;
  }

  .stat-label {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--white-dim);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* SECTION BASE */
  .section { padding: 6rem 3rem; position: relative; }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    margin-bottom: 3.5rem;
  }

  .section-num {
    font-family: var(--mono);
    font-size: 0.9rem;
    color: var(--teal);
    letter-spacing: 0.2em;
  }

  .section-title {
    font-family: var(--serif);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 300;
    color: var(--white);
  }

  .section-line {
    flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--glass-border) 0%, transparent 100%);
    margin-left: 1rem;
  }

  /* ABOUT */
  .about { background: linear-gradient(180deg, #071020 0%, var(--navy) 100%); }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-text p {
    font-size: 1.1rem;
    line-height: 1.95;
    color: var(--white-dim);
    font-weight: 300;
    margin-bottom: 1.3rem;
  }

  .about-text p:first-child {
    font-family: var(--serif);
    font-size: 1.55rem;
    font-style: italic;
    color: var(--white);
    line-height: 1.7;
  }

  .about-details { display: flex; flex-direction: column; gap: 1rem; }

  .detail-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-left: 2px solid var(--teal);
    padding: 1.2rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all 0.3s;
  }

  .detail-card:hover { background: rgba(0,201,177,0.05); transform: translateX(4px); }
  .detail-icon { font-size: 1.5rem; flex-shrink: 0; }

  .detail-info h4 {
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--teal);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .detail-info p { font-size: 1rem; color: var(--white); }

  /* EXPERIENCE */
  .experience { background: var(--navy); }

  .exp-timeline { position: relative; display: flex; flex-direction: column; gap: 0; }

  .exp-timeline::before {
    content: '';
    position: absolute;
    left: 130px; top: 0; bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, var(--teal) 0%, rgba(0,201,177,0.1) 100%);
  }

  .exp-item {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 0 3rem;
    position: relative;
    padding-bottom: 3rem;
  }

  .exp-item:last-child { padding-bottom: 0; }

  .exp-date {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--white-dim);
    letter-spacing: 0.08em;
    text-align: right;
    padding-top: 1.1rem;
    line-height: 1.6;
  }

  .exp-dot {
    position: absolute;
    left: 126px; top: 1.15rem;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--teal);
    box-shadow: 0 0 15px rgba(0,201,177,0.5);
  }

  .exp-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 2rem 2.2rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .exp-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--teal), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .exp-card:hover::before { opacity: 1; }
  .exp-card:hover { background: rgba(0,201,177,0.04); }

  .exp-company {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--teal);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }

  .exp-role {
    font-family: var(--serif);
    font-size: 1.75rem;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 1.1rem;
  }

  .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }

  .exp-bullets li {
    font-size: 1.05rem;
    color: var(--white-dim);
    padding-left: 1.3rem;
    position: relative;
    line-height: 1.65;
    font-weight: 300;
  }

  .exp-bullets li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--teal);
    font-size: 0.75rem;
    top: 0.2rem;
  }

  /* SKILLS */
  .skills { background: linear-gradient(180deg, var(--navy) 0%, #071020 100%); }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 1.5rem;
  }

  .skill-category {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    height: 100%;
  }

  .skill-category::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--teal), var(--gold), transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s;
  }

  .skill-category:hover::after { transform: scaleX(1); }
  .skill-category:hover { border-color: rgba(0,201,177,0.25); }
  .skill-cat-icon { font-size: 2.2rem; margin-bottom: 1rem; display: block; }

  .skill-cat-title {
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--teal);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
  }

  .skill-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }

  .skill-pill {
    font-family: var(--mono);
    font-size: 0.82rem;
    padding: 0.35rem 0.8rem;
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--white-dim);
    transition: all 0.2s;
    letter-spacing: 0.04em;
  }

  .skill-pill:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,201,177,0.05); }

  /* PROJECTS */
  .projects { background: #071020; }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 2.2rem;
    position: relative;
    overflow: hidden;
    transition: all 0.35s;
    height: 100%;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(circle at center, rgba(0,201,177,0.05) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s;
  }

  .project-card:hover::before { opacity: 1; }
  .project-card:hover {
    border-color: rgba(0,201,177,0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }

  .project-num {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: rgba(0,201,177,0.4);
    letter-spacing: 0.2em;
    margin-bottom: 1rem;
  }

  .project-icon { font-size: 2.8rem; margin-bottom: 1rem; display: block; }

  .project-title {
    font-family: var(--serif);
    font-size: 1.65rem;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 0.9rem;
    line-height: 1.3;
  }

  .project-desc { font-size: 1rem; line-height: 1.75; color: var(--white-dim); font-weight: 300; }

  .project-tags { margin-top: 1.3rem; display: flex; flex-wrap: wrap; gap: 0.4rem; }

  .project-tag {
    font-family: var(--mono);
    font-size: 0.75rem;
    padding: 0.25rem 0.7rem;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.2);
    color: var(--gold-light);
    letter-spacing: 0.04em;
  }

  /* EDUCATION */
  .education { background: var(--navy); }
  .edu-cards { display: flex; flex-direction: column; gap: 1.5rem; }

  .edu-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 2rem 2.5rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2rem;
    align-items: center;
    transition: all 0.3s;
  }

  .edu-card:hover { border-color: rgba(201,168,76,0.3); background: rgba(201,168,76,0.02); }
  .edu-icon { font-size: 2.6rem; opacity: 0.85; }

  .edu-info h3 {
    font-family: var(--serif);
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 0.3rem;
  }

  .edu-info p { font-size: 1rem; color: var(--white-dim); font-weight: 300; }
  .edu-score { text-align: right; }

  .edu-score-num {
    font-family: var(--serif);
    font-size: 2.5rem;
    font-weight: 300;
    color: var(--gold-light);
    display: block;
  }

  .edu-score-label {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--white-dim);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* CERTIFICATIONS */
  .certifications { background: linear-gradient(180deg, var(--navy) 0%, #071020 100%); }

  .cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.2rem;
  }

  .cert-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 1.6rem;
    display: flex;
    align-items: center;
    gap: 1.3rem;
    transition: all 0.3s;
  }

  .cert-card:hover { border-color: rgba(0,201,177,0.25); background: rgba(0,201,177,0.03); transform: translateX(4px); }

  .cert-badge {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, rgba(0,201,177,0.15), rgba(201,168,76,0.1));
    border: 1px solid rgba(0,201,177,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .cert-info h4 { font-size: 1.05rem; color: var(--white); font-weight: 400; margin-bottom: 0.25rem; }
  .cert-info p { font-family: var(--mono); font-size: 0.77rem; color: var(--teal); letter-spacing: 0.08em; }

  /* ACHIEVEMENT */
  .achievement-banner {
    background: linear-gradient(135deg, rgba(0,201,177,0.08), rgba(201,168,76,0.08));
    border: 1px solid rgba(201,168,76,0.2);
    padding: 2.5rem 3rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 0 3rem;
    border-left: 3px solid var(--gold);
  }

  .achievement-trophy { font-size: 4rem; flex-shrink: 0; }

  .achievement-text h3 {
    font-family: var(--serif);
    font-size: 1.85rem;
    font-weight: 300;
    color: var(--gold-light);
    margin-bottom: 0.5rem;
  }

  .achievement-text p { font-size: 1.05rem; color: var(--white-dim); font-weight: 300; line-height: 1.7; }
  .achievement-badge { margin-left: auto; text-align: center; flex-shrink: 0; }

  .achievement-badge-num {
    font-family: var(--serif);
    font-size: 3.5rem;
    font-weight: 300;
    color: var(--gold-light);
    display: block;
    line-height: 1;
  }

  .achievement-badge-text {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--gold);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* LANGUAGES */
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .lang-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    padding: 1.6rem;
    text-align: center;
    transition: all 0.3s;
  }

  .lang-card:hover { border-color: rgba(0,201,177,0.3); transform: translateY(-3px); }

  .lang-name {
    font-family: var(--serif);
    font-size: 1.7rem;
    font-weight: 300;
    color: var(--white);
    margin-bottom: 0.4rem;
  }

  .lang-level {
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--teal);
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  /* CONTACT */
  .contact { background: #071020; padding-bottom: 4rem; }
  .contact-inner { max-width: 700px; margin: 0 auto; text-align: center; }

  .contact-sub {
    font-family: var(--serif);
    font-size: 1.35rem;
    font-style: italic;
    color: var(--white-dim);
    margin-bottom: 2.5rem;
    line-height: 1.75;
  }

  .contact-links { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 1rem 1.8rem;
    border: 1px solid var(--glass-border);
    color: var(--white-dim);
    text-decoration: none;
    font-family: var(--mono);
    font-size: 0.88rem;
    letter-spacing: 0.1em;
    transition: all 0.3s;
  }

  .contact-link:hover { border-color: var(--teal); color: var(--teal); background: rgba(0,201,177,0.05); transform: translateY(-3px); }

  /* FOOTER */
  .footer {
    background: var(--navy);
    border-top: 1px solid var(--glass-border);
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-text {
    font-family: var(--mono);
    font-size: 0.78rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.1em;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-in { animation: fadeUp 0.7s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }

  /* MOBILE */
  @media (max-width: 768px) {
    body { font-size: 16px; }
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 6rem 1.5rem 3rem; }
    .hero-stats { display: none; }
    .section { padding: 4rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; }
    .exp-timeline::before { left: 0; }
    .exp-item { grid-template-columns: 1fr; padding-left: 1.5rem; }
    .exp-date { text-align: left; }
    .exp-dot { left: -4px; }
    .edu-card { grid-template-columns: 1fr; }
    .languages-grid { grid-template-columns: repeat(2, 1fr); }
    .achievement-banner { flex-direction: column; margin: 0 1.5rem; }
    .achievement-badge { margin-left: 0; }
    .footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const MoleculeSVG = () => (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-molecules">
      <circle cx="250" cy="250" r="30" stroke="#00c9b1" strokeWidth="1.5" opacity="0.6"/>
      <circle cx="150" cy="150" r="20" stroke="#00c9b1" strokeWidth="1" opacity="0.4"/>
      <circle cx="350" cy="150" r="25" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
      <circle cx="150" cy="350" r="22" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
      <circle cx="380" cy="330" r="18" stroke="#00c9b1" strokeWidth="1" opacity="0.35"/>
      <circle cx="80" cy="260" r="15" stroke="#00c9b1" strokeWidth="1" opacity="0.3"/>
      <circle cx="420" cy="200" r="12" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
      <line x1="250" y1="250" x2="150" y2="150" stroke="#00c9b1" strokeWidth="1" opacity="0.25"/>
      <line x1="250" y1="250" x2="350" y2="150" stroke="#c9a84c" strokeWidth="1" opacity="0.25"/>
      <line x1="250" y1="250" x2="150" y2="350" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
      <line x1="250" y1="250" x2="380" y2="330" stroke="#00c9b1" strokeWidth="1" opacity="0.2"/>
      <line x1="150" y1="150" x2="80" y2="260" stroke="#00c9b1" strokeWidth="1" opacity="0.2"/>
      <line x1="350" y1="150" x2="420" y2="200" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
      <circle cx="250" cy="80" r="14" stroke="#00c9b1" strokeWidth="1" opacity="0.2"/>
      <circle cx="430" cy="420" r="16" stroke="#00c9b1" strokeWidth="1" opacity="0.2"/>
      <circle cx="60" cy="400" r="12" stroke="#c9a84c" strokeWidth="1" opacity="0.2"/>
      <line x1="250" y1="250" x2="250" y2="80" stroke="#00c9b1" strokeWidth="0.8" opacity="0.15" strokeDasharray="4 4"/>
      <line x1="380" y1="330" x2="430" y2="420" stroke="#00c9b1" strokeWidth="0.8" opacity="0.15" strokeDasharray="4 4"/>
      <line x1="150" y1="350" x2="60" y2="400" stroke="#c9a84c" strokeWidth="0.8" opacity="0.15" strokeDasharray="4 4"/>
    </svg>
);

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setInView(true); },
        { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
      <div
          ref={ref}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
          }}
          className={className}
      >
        {children}
      </div>
  );
};

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    {
      icon: "📋",
      category: "Project Coordination & Management",
      pills: ["Timeline Planning", "Project Documentation", "Cross-functional Coordination", "Stakeholder Management", "Execution Tracking"]
    },
    {
      icon: "📈",
      category: "Business Development",
      pills: ["Market Research", "Competitive Analysis", "Lead Generation", "Business Reports", "Product Positioning"]
    },
    {
      icon: "🏭",
      category: "Pharmaceutical Operations",
      pills: ["New Product Development", "QMS Implementation", "Supply Chain QC", "SOP Compliance", "GxP Standards"]
    },
    {
      icon: "🤝",
      category: "Stakeholder & Communication",
      pills: ["Stakeholder Communication", "Internal Reporting", "Presentations", "Cross-team Collaboration", "Industry Interactions"]
    },
    {
      icon: "📊",
      category: "Data & Analytics",
      pills: ["MS Excel", "Data Analysis", "Data Visualization", "Research & Insights", "Documentation Review"]
    },
    {
      icon: "🔬",
      category: "Research & Formulation",
      pills: ["Herbal Formulation", "Stability Testing", "Product Feasibility", "Regulatory Documentation", "Academic Research"]
    }
  ];

  const projects = [
    {
      num: "01", icon: "🌿",
      title: "Anti-Lice Herbal Hair Mask",
      desc: "Researched and formulated a natural hair mask targeting pediculosis capitis. Focused on plant-derived actives with proven pediculicidal properties, conducting comprehensive stability testing and safety evaluations.",
      tags: ["Formulation Design", "Stability Testing", "Herbal Medicine", "Safety Evaluation"]
    },
    {
      num: "02", icon: "🐾",
      title: "Polyherbal Anti-Mite Veterinary Spray",
      desc: "Developed an innovative herbal veterinary spray for parasitic mite control. Awarded Top 100 Innovator out of 800+ participants in the CIIA-4 Innovation Challenge for this project.",
      tags: ["Veterinary Pharma", "Herbal Formulation", "Product Design", "Innovation Award"]
    },
    {
      num: "03", icon: "💊",
      title: "Gastroprotective Floating Tablets",
      desc: "Designed sustained-release herbal tablets using DGL, HPMC, and Carbopol polymers. Engineered to enhance gastric residence time, optimizing bioavailability and patient compliance.",
      tags: ["Drug Delivery", "Sustained Release", "HPMC/Carbopol", "Biopharmaceutics"]
    }
  ];

  return (
      <>
        <style>{style}</style>
        <div className="portfolio">

          {/* NAV */}
          <nav className="nav" style={{ boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none" }}>
            <div className="nav-logo">GS // Portfolio</div>
            <ul className="nav-links">
              {["about","experience","skills","projects","education","contact"].map(s => (
                  <li key={s}>
                    <a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>{s}</a>
                  </li>
              ))}
            </ul>
          </nav>

          {/* HERO */}
          <section className="hero" id="home">
            <div className="hero-bg" />
            <div className="hero-grid" />
            <MoleculeSVG />
            <div className="hero-content">
              <div className="hero-tag animate-in">Project Coordinator · Pharma & Healthcare</div>
              <h1 className="hero-name animate-in delay-1">Gargi<br /><em>Shimpi</em></h1>
              <div className="hero-title animate-in delay-2">
                <span>Project Management</span>
                <span>Business Development</span>
                <span>Stakeholder Management</span>
                <span>Pharma Operations</span>
              </div>
              <p className="hero-desc animate-in delay-3">
                B. Pharm graduate with experience in pharmaceutical operations, project documentation, and cross-functional coordination. Driving project execution and operational efficiency within the pharmaceutical and healthcare sector.
              </p>
              <div className="hero-ctas animate-in delay-4">
                <a href="#contact" className="btn-primary" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>Get In Touch</a>
                <a href="#experience" className="btn-secondary" onClick={e => { e.preventDefault(); scrollTo('experience'); }}>View Experience</a>
              </div>
            </div>
            <div className="hero-stats animate-in delay-5">
              <div className="stat"><span className="stat-num">7.91</span><span className="stat-label">GPA</span></div>
              <div className="stat"><span className="stat-num">3+</span><span className="stat-label">Projects</span></div>
              <div className="stat"><span className="stat-num">Top<br/>100</span><span className="stat-label">Innovator</span></div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="section about" id="about">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">01</span>
                <h2 className="section-title">About Me</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="about-grid">
              <FadeIn delay={0.1}>
                <div className="about-text">
                  <p>A B.Pharm graduate who bridges pharmaceutical science with sharp project coordination and business acumen.</p>
                  <p>With hands-on experience at Abbott India and Aligns International, I have developed a strong foundation in coordinating cross-functional teams, managing product timelines, and ensuring compliance within pharmaceutical operations.</p>
                  <p>I thrive at the intersection of science, strategy, and execution — translating complex regulatory and operational requirements into structured, deliverable project plans that move teams forward.</p>
                  <p>Currently based in Pune, actively seeking a Project Coordinator or Project Management Associate role to contribute to impactful healthcare initiatives.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="about-details">
                  {[
                    { icon: "📍", label: "Location", value: "Pune, India" },
                    { icon: "🎓", label: "Degree", value: "B. Pharm – D.Y. Patil University (2025)" },
                    { icon: "🎯", label: "Target Role", value: "Project Coordinator / PM Associate" },
                    { icon: "🌐", label: "Languages", value: "English, Hindi, Marathi, Gujarati" },
                    { icon: "🏆", label: "Achievement", value: "Top 100 Innovator, CIIA-4 (800+ participants)" },
                    { icon: "⚕️", label: "Domain", value: "Pharmaceutical · Healthcare · Biotech" },
                  ].map((d, i) => (
                      <div className="detail-card" key={i}>
                        <span className="detail-icon">{d.icon}</span>
                        <div className="detail-info"><h4>{d.label}</h4><p>{d.value}</p></div>
                      </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section className="section experience" id="experience">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">02</span>
                <h2 className="section-title">Experience</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="exp-timeline">
              <FadeIn delay={0.1}>
                <div className="exp-item">
                  <div className="exp-date">Sept 2025<br/>— Present</div>
                  <div className="exp-dot" />
                  <div className="exp-card">
                    <div className="exp-company">Aligns International, Mumbai</div>
                    <div className="exp-role">Product Development & Business Coordination</div>
                    <ul className="exp-bullets">
                      <li>Coordinated cross-functional activities between product development, marketing, and regulatory teams for new product initiatives.</li>
                      <li>Conducted market research and competitive analysis to support product strategy and positioning.</li>
                      <li>Assisted in planning timelines and execution of new product launches in the domestic market.</li>
                      <li>Maintained project documentation, product specifications, and internal communication across teams.</li>
                      <li>Supported preparation of business reports, presentations, and product development updates.</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="exp-item">
                  <div className="exp-date">Jun 2024<br/>— Jul 2024</div>
                  <div className="exp-dot" style={{ background: "#c9a84c", boxShadow: "0 0 15px rgba(201,168,76,0.5)" }} />
                  <div className="exp-card">
                    <div className="exp-company">Abbott India Pvt Ltd, Mumbai</div>
                    <div className="exp-role">Quality Assurance & Compliance Intern</div>
                    <ul className="exp-bullets">
                      <li>Assisted in implementing Quality Management System (QMS) processes for compliance with pharmaceutical industry regulations.</li>
                      <li>Gained hands-on exposure to supply chain quality checks, temperature mapping, and documentation review.</li>
                      <li>Worked on projects related to drug reconciliation, deviation tracking, and SOP compliance.</li>
                      <li>Enhanced understanding of regulatory standards, GxP guidelines, and pharmaceutical documentation best practices.</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="exp-item">
                  <div className="exp-date">2022 – 2025</div>
                  <div className="exp-dot" style={{ background: "rgba(255,255,255,0.3)", boxShadow: "none" }} />
                  <div className="exp-card">
                    <div className="exp-company">D.Y. Patil University, Mumbai</div>
                    <div className="exp-role">Member – Training & Placement Committee</div>
                    <ul className="exp-bullets">
                      <li>Organised recruitment activities and coordinated industry interactions for student placements.</li>
                      <li>Supported training programs to enhance student employability and career readiness.</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="exp-item">
                  <div className="exp-date">Sep 2022<br/>— Oct 2022</div>
                  <div className="exp-dot" style={{ background: "rgba(255,255,255,0.2)", boxShadow: "none" }} />
                  <div className="exp-card">
                    <div className="exp-company">FIFA U-17 Women's World Cup</div>
                    <div className="exp-role">Media Operations Volunteer</div>
                    <ul className="exp-bullets">
                      <li>Supported media operations and logistics during a premier international sports event in India.</li>
                      <li>Collaborated with diverse global teams, demonstrating adaptability and cross-cultural communication.</li>
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* SKILLS */}
          <section className="section skills" id="skills">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">03</span>
                <h2 className="section-title">Skills & Expertise</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="skills-grid">
              {skills.map((s, i) => (
                  <FadeIn key={i} delay={i * 0.07}>
                    <div className="skill-category">
                      <span className="skill-cat-icon">{s.icon}</span>
                      <div className="skill-cat-title">{s.category}</div>
                      <div className="skill-pills">
                        {s.pills.map((p, j) => <span className="skill-pill" key={j}>{p}</span>)}
                      </div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="section projects" id="projects">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">04</span>
                <h2 className="section-title">Research Projects</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="projects-grid">
              {projects.map((p, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="project-card">
                      <div className="project-num">{p.num}</div>
                      <span className="project-icon">{p.icon}</span>
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-desc">{p.desc}</p>
                      <div className="project-tags">
                        {p.tags.map((t, j) => <span className="project-tag" key={j}>{t}</span>)}
                      </div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </section>

          {/* ACHIEVEMENT */}
          <FadeIn>
            <div className="achievement-banner">
              <span className="achievement-trophy">🏆</span>
              <div className="achievement-text">
                <h3>CIIA-4 Innovation Challenge</h3>
                <p>Selected as one of the Top 100 Innovators out of 800+ participants for the Polyherbal Anti-Mite Veterinary Spray — recognised for innovative formulation design, animal safety focus, and product feasibility.</p>
              </div>
              <div className="achievement-badge">
                <span className="achievement-badge-num">Top<br/>100</span>
                <span className="achievement-badge-text">/ 800+ Participants</span>
              </div>
            </div>
          </FadeIn>

          {/* EDUCATION */}
          <section className="section education" id="education">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">05</span>
                <h2 className="section-title">Education</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="edu-cards">
              {[
                { icon: "🎓", name: "D.Y. Patil University School of Pharmacy", detail: "Bachelor of Pharmacy (B. Pharm) · Mumbai · 2021 – 2025", score: "7.91", scoreLabel: "GPA (Sem VIII)" },
                { icon: "📚", name: "Thakur Vidya Mandir Junior College", detail: "Higher Secondary Certificate · Mumbai · 2019 – 2021", score: "84.5%", scoreLabel: "HSC Score" },
                { icon: "🏫", name: "Ryan International School", detail: "Senior Secondary Certificate · Mumbai · 2018 – 2019", score: "82%", scoreLabel: "SSC Score" }
              ].map((e, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="edu-card">
                      <span className="edu-icon">{e.icon}</span>
                      <div className="edu-info"><h3>{e.name}</h3><p>{e.detail}</p></div>
                      <div className="edu-score">
                        <span className="edu-score-num">{e.score}</span>
                        <span className="edu-score-label">{e.scoreLabel}</span>
                      </div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section className="section certifications">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">06</span>
                <h2 className="section-title">Certifications</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="cert-grid">
              {[
                { icon: "🤖", title: "AI in Healthcare", org: "Learnuptograde" },
                { icon: "📊", title: "Data Analytics & Visualization in Healthcare", org: "Continuing Education" },
              ].map((c, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="cert-card">
                      <div className="cert-badge">{c.icon}</div>
                      <div className="cert-info"><h4>{c.title}</h4><p>{c.org}</p></div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </section>

          {/* LANGUAGES */}
          <section className="section" style={{ background: "#071020", paddingTop: "0" }}>
            <FadeIn>
              <div className="section-header">
                <span className="section-num">07</span>
                <h2 className="section-title">Languages</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="languages-grid">
              {[
                { lang: "English", level: "Fluent" },
                { lang: "Hindi", level: "Fluent" },
                { lang: "Marathi", level: "Native" },
                { lang: "Gujarati", level: "Conversational" },
              ].map((l, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="lang-card">
                      <div className="lang-name">{l.lang}</div>
                      <div className="lang-level">{l.level}</div>
                    </div>
                  </FadeIn>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="section contact" id="contact">
            <FadeIn>
              <div className="section-header">
                <span className="section-num">08</span>
                <h2 className="section-title">Contact</h2>
                <div className="section-line" />
              </div>
            </FadeIn>
            <div className="contact-inner">
              <FadeIn delay={0.1}>
                <p className="contact-sub">
                  Open to Project Coordinator and Project Management Associate opportunities in the pharmaceutical and healthcare sector. Let's connect and build something impactful together.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="contact-links">
                  <a href="mailto:shimpigargi2003@gmail.com" className="contact-link">✉️ Send Email</a>
                  <a href="https://www.linkedin.com/in/gargi-shimpi/" target="_blank" rel="noopener noreferrer" className="contact-link">💼 LinkedIn Profile</a>
                  <a href="#projects" className="contact-link" onClick={e => { e.preventDefault(); scrollTo('projects'); }}>📄 View Projects</a>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <span className="footer-text">© 2026 GARGI SHIMPI // PROJECT COORDINATOR · PHARMA & HEALTHCARE</span>
            <span className="footer-text">PUNE, INDIA</span>
          </footer>

        </div>
      </>
  );
}