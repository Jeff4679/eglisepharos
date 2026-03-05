import { useState, useEffect } from "react";

const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "sermons", label: "Sermons" },
  { id: "evenements", label: "Événements" },
  { id: "ministeres", label: "Ministères" },
  { id: "don", label: "Don" },
  { id: "contact", label: "Contact" },
];

const CULTES = [
  { jour: "Dimanche", heure: "10h00", titre: "Culte Principal", icon: "☀️" },
  { jour: "Mercredi", heure: "19h30", titre: "Étude Biblique", icon: "📖" },
  { jour: "Vendredi", heure: "20h00", titre: "Soirée de Prière", icon: "🔥" },
  { jour: "Samedi", heure: "15h00", titre: "Jeunesse", icon: "⚡" },
];

const GCAL_API_KEY = "AIzaSyALqVf1rJrDF2jwxvB25M21NiaJAaUcXQ8";
const GCAL_ID = "c_1948419c48cd1e073ec4a75abdf1aba76b04a866ecedb721ee4f5ea67c69e3fc@group.calendar.google.com";



const MINISTERES = [
  { nom: "Louange & Adoration", desc: "Diriger l'assemblée dans l'adoration authentique du Seigneur.", icon: "🎵", membres: 28 },
  { nom: "Jeunesse", desc: "Enflammer la foi des jeunes adultes pour Christ.", icon: "⚡", membres: 54 },
  { nom: "Intercession", desc: "Priants engagés pour l'église, les nations et les perdus.", icon: "🙏", membres: 19 },
  { nom: "Évangélisation", desc: "Porter la Bonne Nouvelle dans les rues et au-delà.", icon: "📢", membres: 33 },
  { nom: "Accueil & Hospitalité", desc: "Créer un espace chaleureux pour chaque visiteur.", icon: "🤝", membres: 22 },
  { nom: "École du Dimanche", desc: "Former les enfants dans la connaissance de la Parole.", icon: "✏️", membres: 15 },
];

const TEMOIGNAGES = [
  { nom: "Marie T.", date: "Mai 2025", texte: "J'étais complètement brisée. C'est lors d'une soirée de prière ici que Dieu m'a touchée et restaurée. Ma vie n'est plus la même !", emoji: "💫" },
  { nom: "David K.", date: "Avril 2025", texte: "Après des mois de prière avec cette communauté, Dieu a accompli le miracle dans ma famille. Il est vivant !", emoji: "🙌" },
  { nom: "Sandra M.", date: "Mars 2025", texte: "J'ai été libérée d'une dépendance lors de la campagne de délivrance. Toute la gloire à Christ !", emoji: "🔥" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;600;700;800;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --blue: #003DA5; --blue-mid: #0050CC; --blue-lt: #1A6EFF;
    --navy: #001D5C; --yellow: #FFD000; --offwhite: #F8F9FC;
    --gray: #64748B; --border: #E2E8F0; --blue-pale: #EEF3FF;
    --shadow: 0 4px 24px rgba(0,29,92,0.10); --shadow-lg: 0 12px 48px rgba(0,29,92,0.18);
  }
  body { font-family: 'Montserrat', sans-serif; color: #1E293B; background: #fff; }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center;
    justify-content: space-between; padding: 0 2.5rem; height: 68px; transition: all 0.3s;
    background: rgba(255,255,255,0.96); }
  .nav-scrolled { box-shadow: 0 2px 20px rgba(0,29,92,0.10); }
  .nav-logo { display: flex; align-items: center; cursor: pointer; }
  .nav-links { display: flex; gap: 0.2rem; }
  .nav-link { background: none; border: none; cursor: pointer; padding: 8px 14px; border-radius: 8px;
    font-family: 'Montserrat', sans-serif; font-size: 0.82rem; font-weight: 700;
    color: #475569; transition: all 0.2s; letter-spacing: 0.03em; }
  .nav-link:hover, .nav-link.active { color: var(--blue); background: var(--blue-pale); }
  .nav-btn { background: var(--blue); color: white; border: none; padding: 9px 20px;
    border-radius: 10px; font-family: 'Montserrat', sans-serif; font-size: 0.82rem;
    font-weight: 800; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; }
  .nav-btn:hover { background: var(--blue-mid); }
  .hero { min-height: 100vh; background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 60%, var(--blue-mid) 100%);
    display: flex; align-items: center; padding-top: 68px; position: relative; overflow: hidden; }
  .hero-pattern { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,208,0,0.08) 1px, transparent 1px); background-size: 36px 36px; }
  .hero-glow { position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(255,208,0,0.15), transparent 70%); top: -100px; right: -100px; border-radius: 50%; }
  .hero-inner { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; display: grid; grid-template-columns: 1fr 420px; gap: 4rem; align-items: center; position: relative; z-index: 1; width: 100%; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,208,0,0.15); border: 1px solid rgba(255,208,0,0.3); border-radius: 100px; padding: 6px 16px; color: var(--yellow); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; margin-bottom: 1.5rem; }
  .hero-badge-dot { width: 7px; height: 7px; background: var(--yellow); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
  .hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 6vw, 5rem); color: white; line-height: 1.05; letter-spacing: 0.04em; margin-bottom: 1.5rem; }
  .hero-title span { color: var(--yellow); }
  .hero-verse { color: rgba(255,255,255,0.75); font-family: 'Lora', serif; font-size: 0.95rem; line-height: 1.8; max-width: 520px; margin-bottom: 2rem; font-style: italic; }
  .hero-verse strong { color: var(--yellow); font-style: normal; display: block; margin-top: 0.5rem; font-size: 0.82rem; }
  .hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .btn-yellow { background: var(--yellow); color: #111; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 20px rgba(255,208,0,0.4); }
  .btn-yellow:hover { transform: translateY(-2px); }
  .btn-outline-white { background: rgba(255,255,255,0.1); color: white; border: 1.5px solid rgba(255,255,255,0.3); padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
  .hero-stats-row { display: flex; gap: 2rem; flex-wrap: wrap; }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--yellow); }
  .hero-stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.6); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .hero-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 2rem; backdrop-filter: blur(16px); }
  .hero-card-title { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: var(--yellow); margin-bottom: 1.5rem; }
  .hero-culte-row { display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .hero-culte-row:last-child { border-bottom: none; }
  .hero-culte-icon { width: 42px; height: 42px; background: rgba(255,208,0,0.12); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
  .hero-culte-jour { font-size: 0.72rem; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; }
  .hero-culte-name { color: white; font-weight: 700; font-size: 0.9rem; margin-top: 2px; }
  .hero-culte-heure { margin-left: auto; background: var(--yellow); color: #111; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; white-space: nowrap; }
  section { padding: 5rem 0; }
  .sec-tag { display: flex; align-items: center; gap: 10px; margin-bottom: 0.8rem; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue); }
  .sec-tag-line { width: 28px; height: 3px; background: var(--yellow); border-radius: 2px; flex-shrink: 0; }
  .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.2rem, 4vw, 3.2rem); color: var(--navy); letter-spacing: 0.04em; line-height: 1.1; }
  .sec-title em { color: var(--blue-mid); font-style: normal; }
  .sec-desc { color: var(--gray); font-size: 0.95rem; line-height: 1.7; max-width: 540px; margin-top: 0.8rem; }
  .sec-header { text-align: center; margin-bottom: 3rem; }
  .sec-header .sec-tag { justify-content: center; }
  .sec-header .sec-desc { margin: 0.8rem auto 0; }
  .sec-header-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
  .sermons-sec { background: var(--offwhite); }
  .sermon-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .sf-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid var(--border); background: white; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 700; color: var(--gray); cursor: pointer; transition: all 0.2s; }
  .sf-btn:hover { border-color: var(--blue); color: var(--blue); }
  .sf-btn.active { background: var(--blue); color: white; border-color: var(--blue); }
  .sermons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  .sermon-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: var(--shadow); border: 1.5px solid var(--border); transition: all 0.3s; cursor: pointer; }
  .sermon-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--yellow); }
  .sermon-thumb { height: 180px; background: linear-gradient(135deg, var(--navy), var(--blue)); position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .sermon-play { width: 52px; height: 52px; background: var(--yellow); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #111; box-shadow: 0 4px 20px rgba(255,208,0,0.5); position: relative; z-index: 2; }
  .sermon-dur { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; z-index: 2; }
  .sermon-body { padding: 1.2rem; }
  .sermon-titre { font-size: 0.95rem; font-weight: 800; color: var(--navy); margin-bottom: 0.5rem; line-height: 1.4; }
  .sermon-meta { display: flex; justify-content: space-between; align-items: center; }
  .sermon-pastor { font-size: 0.78rem; color: var(--gray); font-weight: 600; }
  .sermon-ref { font-size: 0.76rem; color: var(--blue-mid); font-weight: 600; }
  .events-sec { background: white; }
  .events-list { display: flex; flex-direction: column; gap: 1rem; }
  .event-row { display: flex; align-items: center; gap: 1.5rem; padding: 1.2rem 1.5rem; background: var(--offwhite); border-radius: 14px; border: 1.5px solid var(--border); cursor: pointer; transition: all 0.2s; }
  .event-row:hover { border-color: var(--blue); background: var(--blue-pale); }
  .event-date { text-align: center; min-width: 52px; }
  .event-day { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--blue); line-height: 1; }
  .event-month { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray); }
  .event-info { flex: 1; }
  .event-titre { font-weight: 800; color: var(--navy); font-size: 0.95rem; margin-bottom: 0.3rem; }
  .event-metas { display: flex; gap: 1rem; flex-wrap: wrap; }
  .event-meta { font-size: 0.78rem; color: var(--gray); font-weight: 600; }
  .event-type { background: var(--blue-pale); color: var(--blue); padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; white-space: nowrap; }
  .testi-sec { background: linear-gradient(135deg, var(--navy), var(--blue)); padding: 5rem 0; }
  .testi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  .testi-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 2rem; }
  .testi-emoji { font-size: 2rem; margin-bottom: 1rem; }
  .testi-texte { color: rgba(255,255,255,0.85); font-family: 'Lora', serif; font-style: italic; line-height: 1.8; font-size: 0.92rem; margin-bottom: 1.2rem; }
  .testi-nom { color: var(--yellow); font-weight: 800; font-size: 0.85rem; }
  .testi-date { color: rgba(255,255,255,0.4); font-size: 0.75rem; font-weight: 600; }
  .don-sec { background: white; }
  .don-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .don-amounts { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.8rem; margin-bottom: 1.5rem; }
  .don-amt-btn { padding: 14px; border-radius: 12px; border: 2px solid var(--border); background: white; font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; color: var(--navy); cursor: pointer; transition: all 0.2s; }
  .don-amt-btn.active { border-color: var(--blue); background: var(--blue-pale); color: var(--blue); }
  .don-freq { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
  .don-freq-btn { flex: 1; padding: 10px; border-radius: 10px; border: 1.5px solid var(--border); background: white; font-family: 'Montserrat',sans-serif; font-size: 0.8rem; font-weight: 700; color: var(--gray); cursor: pointer; transition: all 0.2s; }
  .don-freq-btn.active { border-color: var(--blue); background: var(--blue); color: white; }
  .btn-blue { background: var(--blue); color: white; border: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; width: 100%; font-family: 'Montserrat',sans-serif; }
  .btn-blue:hover { background: var(--blue-mid); }
  .min-sec { background: var(--offwhite); }
  .min-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
  .min-card { background: white; border-radius: 16px; padding: 1.8rem; border: 1.5px solid var(--border); box-shadow: var(--shadow); transition: all 0.3s; }
  .min-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: var(--yellow); }
  .min-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .min-icon { width: 52px; height: 52px; background: var(--blue-pale); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  .min-num-val { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; color: var(--blue); line-height: 1; text-align: right; }
  .min-num-label { font-size: 0.65rem; color: var(--gray); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; text-align: right; }
  .min-nom { font-weight: 800; color: var(--navy); font-size: 1rem; margin-bottom: 0.5rem; }
  .min-desc { font-size: 0.83rem; color: var(--gray); line-height: 1.6; margin-bottom: 1.2rem; }
  .min-btn { background: none; border: 1.5px solid var(--blue); color: var(--blue); padding: 8px 18px; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-size: 0.78rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
  .min-btn:hover { background: var(--blue); color: white; }
  .contact-sec { background: white; }
  .contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
  .contact-items { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
  .contact-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; background: var(--offwhite); border-radius: 12px; }
  .contact-item-icon { width: 40px; height: 40px; background: var(--blue-pale); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .contact-item-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); }
  .contact-item-val { font-weight: 700; color: var(--navy); font-size: 0.9rem; margin-top: 2px; }
  .map-box { background: var(--blue); border-radius: 16px; padding: 2rem; text-align: center; color: white; }
  .map-box-title { font-family: 'Bebas Neue',sans-serif; font-size: 1.4rem; letter-spacing: 0.1em; margin: 0.5rem 0; }
  .map-box-addr { font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 1rem; }
  .map-box-btn { background: var(--yellow); color: #111; border: none; padding: 10px 24px; border-radius: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; font-family: 'Montserrat',sans-serif; }
  .contact-form-card { background: var(--offwhite); border-radius: 20px; padding: 2rem; }
  .contact-form-card h3 { font-family: 'Bebas Neue',sans-serif; font-size: 1.6rem; color: var(--navy); letter-spacing: 0.05em; margin-bottom: 1.5rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { margin-bottom: 1rem; }
  .form-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gray); display: block; margin-bottom: 0.4rem; }
  .form-input, .form-textarea { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 10px; font-family: 'Montserrat',sans-serif; font-size: 0.88rem; color: var(--navy); background: white; transition: border 0.2s; }
  .form-input:focus, .form-textarea:focus { outline: none; border-color: var(--blue); }
  .form-textarea { resize: vertical; }
  footer { background: var(--navy); padding: 3.5rem 2.5rem 2rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem; }
  .footer-brand p { color: rgba(255,255,255,0.5); font-size: 0.85rem; line-height: 1.8; margin-top: 0.8rem; max-width: 260px; }
  .footer-socials { display: flex; gap: 0.6rem; margin-top: 1.2rem; }
  .social-icon { width: 38px; height: 38px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.07); cursor: pointer; font-size: 1rem; transition: all 0.2s; }
  .footer-col h4 { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: var(--yellow); margin-bottom: 1rem; }
  .footer-links { display: flex; flex-direction: column; gap: 0.55rem; }
  .footer-lnk { font-size: 0.83rem; color: rgba(255,255,255,0.5); cursor: pointer; border: none; background: none; text-align: left; padding: 0; transition: color 0.2s; font-family: 'Montserrat',sans-serif; }
  .footer-lnk:hover { color: var(--yellow); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.8rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-copy { font-size: 0.78rem; color: rgba(255,255,255,0.35); }
  .footer-copy span { color: var(--yellow); font-weight: 700; }
  .footer-verse-ft { font-family: 'Lora',serif; font-style: italic; font-size: 0.82rem; color: rgba(255,255,255,0.3); }
  .toast { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: var(--navy); color: white; padding: 12px 24px; border-radius: 100px; font-weight: 700; font-size: 0.88rem; box-shadow: 0 8px 32px rgba(0,0,0,0.3); z-index: 999; border: 1px solid rgba(255,208,0,0.3); animation: toastIn 0.3s ease; white-space: nowrap; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; animation: fadeIn 0.2s ease; }
  .modal-box { background: white; border-radius: 24px; padding: 2.5rem; max-width: 520px; width: 100%; box-shadow: 0 24px 80px rgba(0,0,0,0.3); position: relative; animation: slideUp 0.25s ease; }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .modal-close { position: absolute; top: 1.2rem; right: 1.2rem; background: var(--offwhite); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; color: var(--gray); transition: all 0.2s; }
  .modal-close:hover { background: var(--border); }
  .modal-date-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--blue-pale); color: var(--blue); padding: 6px 16px; border-radius: 100px; font-size: 0.78rem; font-weight: 800; margin-bottom: 1.2rem; letter-spacing: 0.05em; }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: var(--navy); letter-spacing: 0.04em; line-height: 1.1; margin-bottom: 1.5rem; }
  .modal-detail { display: flex; align-items: flex-start; gap: 0.8rem; padding: 0.8rem 0; border-bottom: 1px solid var(--border); font-size: 0.88rem; color: var(--gray); }
  .modal-detail:last-of-type { border-bottom: none; }
  .modal-detail-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 1px; }
  .modal-detail-text { font-weight: 600; color: var(--navy); line-height: 1.5; }
  @keyframes toastIn { from{opacity:0;transform:translateX(-50%) translateY(10px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-card { display: none; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .don-layout, .contact-layout { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
`;

export default function EglisePharos() {
  const [activeNav, setActiveNav] = useState("accueil");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState(null);
  const [calView, setCalView] = useState("agenda");
  const [gcalEvents, setGcalEvents] = useState([]);
  const [gcalLoading, setGcalLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState(null);

  useEffect(() => {
    const now = new Date().toISOString();
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL_ID)}/events?key=${GCAL_API_KEY}&timeMin=${now}&maxResults=6&singleEvents=true&orderBy=startTime`)
      .then(r => r.json())
      .then(d => { setGcalEvents(d.items || []); setGcalLoading(false); })
      .catch(() => setGcalLoading(false));
  }, []);
  const [sermonCat, setSermonCat] = useState("dernier");
  const [donAmount, setDonAmount] = useState("20");
  const [donFreq, setDonFreq] = useState("Ponctuel");
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  return (
    <>
      <style>{css}</style>

      <nav className={"nav" + (scrolled ? " nav-scrolled" : "")}>
        <div className="nav-logo" onClick={() => scrollTo("accueil")}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.12em", color: "var(--blue)" }}>PHAROS</span>
        </div>
        <div className="nav-links">
          {NAV.map(n => (
            <button key={n.id} className={"nav-link" + (activeNav === n.id ? " active" : "")} onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
        </div>
        <button className="nav-btn" onClick={() => scrollTo("contact")}>Nous visiter</button>
      </nav>

      <section id="accueil" className="hero">
        <div className="hero-pattern" />
        <div className="hero-glow" />
        <div className="hero-inner">
          <div>
            <div className="hero-badge"><div className="hero-badge-dot" /> Culte ce dimanche à 10h00</div>
            <h1 className="hero-title">Bienvenue à<br /><span>l'Église Pharos</span></h1>
            <p className="hero-verse">
              « Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »
              <strong>— Matthieu 5 : 14-15</strong>
            </p>
            <div className="hero-ctas">
              <button className="btn-yellow" onClick={() => scrollTo("sermons")}>🎧 Écouter un sermon</button>
              <button className="btn-outline-white" onClick={() => scrollTo("evenements")}>📅 Nos événements</button>
            </div>

          </div>
          <div className="hero-card">
            <div className="hero-card-title">📅 Nos rassemblements</div>
            {CULTES.map((c, i) => (
              <div key={i} className="hero-culte-row">
                <div className="hero-culte-icon">{c.icon}</div>
                <div>
                  <div className="hero-culte-jour">{c.jour}</div>
                  <div className="hero-culte-name">{c.titre}</div>
                </div>
                <div className="hero-culte-heure">{c.heure}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sermons" className="sermons-sec">
        <div className="container">
          <div className="sec-header-row">
            <div>
              <div className="sec-tag"><div className="sec-tag-line" />Médiathèque</div>
              <h2 className="sec-title">Prédications <em>&amp; Sermons</em></h2>
              <p className="sec-desc">Retrouvez tous nos sermons en ligne. Cliquez sur une vidéo pour la regarder.</p>
            </div>
            <a href="https://www.eglisepharos.com/video" target="_blank" rel="noopener noreferrer"
              style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #CBD5E1", background: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textDecoration: "none" }}>
              Tous les sermons →
            </a>
          </div>

          {/* Filtres */}
          <div className="sermon-filters" style={{ marginBottom: "1.8rem" }}>
            <button className={"sf-btn" + (sermonCat === "dernier" ? " active" : "")} onClick={() => setSermonCat("dernier")}>🎯 Dernier Culte</button>
            <button className={"sf-btn" + (sermonCat === "mars2026" ? " active" : "")} onClick={() => setSermonCat("mars2026")}>📅 Mars 2026</button>
            <button className={"sf-btn" + (sermonCat === "fev2026" ? " active" : "")} onClick={() => setSermonCat("fev2026")}>📅 Février 2026</button>
            <button className={"sf-btn" + (sermonCat === "jan2026" ? " active" : "")} onClick={() => setSermonCat("jan2026")}>📅 Janvier 2026</button>
          </div>

          {/* Showcase iframe */}
          {sermonCat === "mars2026" && (
            <div style={{ padding: "56.25% 0 0 0", position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <iframe src="https://vimeo.com/showcase/12136502/embed2"
                allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-write; encrypted-media; web-share"
                frameBorder="0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="Mars 2026 — Église Pharos" />
            </div>
          )}
          {sermonCat === "fev2026" && (
            <div style={{ padding: "56.25% 0 0 0", position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <iframe src="https://vimeo.com/showcase/12105713/embed2"
                allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-write; encrypted-media; web-share"
                frameBorder="0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="Février 2026 — Église Pharos" />
            </div>
          )}
          {sermonCat === "dernier" && (
            <div style={{ padding: "56.25% 0 0 0", position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <iframe src="https://vimeo.com/showcase/12105709/embed"
                allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-write; encrypted-media; web-share"
                frameBorder="0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="Dernier Culte — Église Pharos" />
            </div>
          )}
          {sermonCat === "jan2026" && (
            <div style={{ padding: "56.25% 0 0 0", position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <iframe src="https://vimeo.com/showcase/12068302/embed"
                allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; clipboard-write; encrypted-media; web-share"
                frameBorder="0"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                title="Janvier 2026 — Église Pharos" />
            </div>
          )}
          <div style={{ marginTop: "1rem", padding: "1rem 1.5rem", background: "white", borderRadius: 12, border: "1.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: "0.9rem" }}>Église Pharos — Culte en ligne</div>
              <div style={{ fontSize: "0.8rem", color: "var(--gray)", marginTop: 2 }}>Pasteur Franck Quashie · Ransart, Belgique</div>
            </div>
            <a href="https://www.eglisepharos.com/video" target="_blank" rel="noopener noreferrer"
              style={{ background: "var(--blue)", color: "white", padding: "9px 20px", borderRadius: 10, fontWeight: 700, fontSize: "0.82rem", textDecoration: "none" }}>
              📺 Tous les sermons →
            </a>
          </div>
        </div>
      </section>
      <section id="evenements" className="events-sec">
        <div className="container">
          <div className="sec-header-row">
            <div>
              <div className="sec-tag"><div className="sec-tag-line" />Calendrier</div>
              <h2 className="sec-title">Événements <em>à Venir</em></h2>
              <p className="sec-desc">Ne manquez aucun moment fort de la vie de l'Église Pharos.</p>
            </div>
            <a href="https://calendar.google.com/calendar/embed?src=c_1948419c48cd1e073ec4a75abdf1aba76b04a866ecedb721ee4f5ea67c69e3fc%40group.calendar.google.com&ctz=Europe%2FBrussels"
              target="_blank" rel="noopener noreferrer"
              style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #CBD5E1", background: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textDecoration: "none", display: "inline-block" }}>
              Voir tout →
            </a>
          </div>
          <div className="events-list" style={{ marginBottom: "3rem" }}>
            {gcalLoading && <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)", fontWeight: 600 }}>⏳ Chargement des événements...</div>}
            {!gcalLoading && gcalEvents.length === 0 && <div style={{ textAlign: "center", padding: "2rem", color: "var(--gray)", fontWeight: 600 }}>Aucun événement à venir.</div>}
            {!gcalLoading && gcalEvents.map((e, i) => {
              const start = new Date(e.start?.dateTime || e.start?.date);
              const jour = start.getDate().toString();
              const mois = start.toLocaleDateString("fr-BE", { month: "short" }).toUpperCase().replace(".","");
              const heure = e.start?.dateTime ? start.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" }) : "Toute la journée";
              return (
                <div key={i} className="event-row" onClick={() => setActiveEvent(e)}>
                  <div className="event-date">
                    <div className="event-day">{jour}</div>
                    <div className="event-month">{mois}</div>
                  </div>
                  <div className="event-info">
                    <div className="event-titre">{e.summary}</div>
                    <div className="event-metas">
                      {e.location && <div className="event-meta">📍 {e.location}</div>}
                      <div className="event-meta">🕐 {heure}</div>
                    </div>
                  </div>
                  <div className="event-type">Pharos</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", justifyContent: "center" }}>
            <button onClick={() => setCalView("agenda")} className={"sf-btn" + (calView === "agenda" ? " active" : "")}>📋 Agenda</button>
            <button onClick={() => setCalView("iframe")} className={"sf-btn" + (calView === "iframe" ? " active" : "")}>📅 Calendrier Google</button>
          </div>
          {calView === "iframe" && (
            <iframe style={{ width: "100%", height: 480, border: "none", borderRadius: 16 }}
              src="https://calendar.google.com/calendar/embed?src=c_1948419c48cd1e073ec4a75abdf1aba76b04a866ecedb721ee4f5ea67c69e3fc%40group.calendar.google.com&ctz=Europe%2FBrussels&showTitle=0&showNav=1&showDate=1&showPrint=0&mode=MONTH"
              title="Agenda Église Pharos" />
          )}
        </div>
      </section>

      <section className="testi-sec">
        <div className="container">
          <div className="sec-header">
            <div className="sec-tag" style={{ justifyContent: "center" }}><div className="sec-tag-line" />Témoignages</div>
            <h2 className="sec-title" style={{ color: "white" }}>Ce que <em style={{ color: "var(--yellow)" }}>Dieu accomplit</em></h2>
          </div>
          <div className="testi-grid">
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-emoji">{t.emoji}</div>
                <p className="testi-texte">"{t.texte}"</p>
                <div className="testi-nom">{t.nom}</div>
                <div className="testi-date">{t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="don" className="don-sec">
        <div className="container">
          <div className="sec-header">
            <div className="sec-tag" style={{ justifyContent: "center" }}><div className="sec-tag-line" />Soutien</div>
            <h2 className="sec-title">Soutenir <em>l'Église Pharos</em></h2>
          </div>
          <div className="don-layout">
            <div>
              <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "1rem" }}>Choisir un montant (€)</p>
              <div className="don-amounts">
                {["10", "20", "50", "100", "200", "Autre"].map(a => (
                  <button key={a} className={"don-amt-btn" + (donAmount === a ? " active" : "")} onClick={() => setDonAmount(a)}>{a === "Autre" ? "Autre" : a + "€"}</button>
                ))}
              </div>
              <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.8rem" }}>Fréquence</p>
              <div className="don-freq">
                {["Ponctuel", "Mensuel", "Annuel"].map(f => (
                  <button key={f} className={"don-freq-btn" + (donFreq === f ? " active" : "")} onClick={() => setDonFreq(f)}>{f}</button>
                ))}
              </div>
              <button className="btn-blue" onClick={() => showToast("🙏 Merci ! Redirection vers le paiement sécurisé.")}>
                💛 Faire un don {donAmount !== "Autre" ? "de " + donAmount + "€" : ""} {donFreq === "Mensuel" ? "/ mois" : ""}
              </button>
            </div>
            <div style={{ background: "var(--blue)", borderRadius: 20, padding: "2.5rem", color: "white" }}>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "0.05em", marginBottom: "1.5rem" }}>Pourquoi donner ?</h3>
              <p style={{ background: "rgba(255,255,255,0.1)", borderLeft: "3px solid var(--yellow)", padding: "1rem 1.2rem", borderRadius: "0 10px 10px 0", marginBottom: "1.5rem", fontFamily: "'Lora',serif", fontStyle: "italic", color: "rgba(255,255,255,0.9)", lineHeight: 1.7, fontSize: "0.9rem" }}>
                "Que chacun donne comme il l'a résolu dans son cœur, car Dieu aime celui qui donne avec joie." — 2 Cor 9:7
              </p>
              {["💛 Soutenir les familles", "🎵 Développer les ministères", "📢 Financer l'évangélisation", "🏛️ Entretenir le lieu de culte", "🌍 Missions locales et internationales"].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.7rem 0", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>✓ {d.slice(2)}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ministeres" className="min-sec">
        <div className="container">
          <div className="sec-header">
            <div className="sec-tag" style={{ justifyContent: "center" }}><div className="sec-tag-line" />Communauté</div>
            <h2 className="sec-title">Nos <em>Ministères</em></h2>
            <p className="sec-desc">Chaque membre est appelé à servir. Trouvez votre place dans la famille de Pharos.</p>
          </div>
          <div className="min-grid">
            {MINISTERES.map((m, i) => (
              <div key={i} className="min-card">
                <div className="min-top">
                  <div className="min-icon">{m.icon}</div>
                  <div>
                    <div className="min-num-val">{m.membres}</div>
                    <div className="min-num-label">membres</div>
                  </div>
                </div>
                <div className="min-nom">{m.nom}</div>
                <div className="min-desc">{m.desc}</div>
                <button className="min-btn" onClick={() => showToast("📩 Demande envoyée : " + m.nom)}>Rejoindre +</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-sec">
        <div className="container">
          <div className="sec-header">
            <div className="sec-tag" style={{ justifyContent: "center" }}><div className="sec-tag-line" />Contact</div>
            <h2 className="sec-title">Venez <em>Nous Voir</em></h2>
            <p className="sec-desc">Nous serions ravis de vous accueillir à Ransart.</p>
          </div>
          <div className="contact-layout">
            <div>
              <div className="contact-items">
                {[
                  { icon: "📍", label: "Adresse", val: "Rue Paul Pasteur 139, 6043 Ransart" },
                  { icon: "👨‍💼", label: "Pasteur", val: "Franck Quashie" },
                  { icon: "📞", label: "Téléphone", val: "+32 (0)71 ..." },
                  { icon: "✉️", label: "Email", val: "contact@eglisepharos.be" },
                  { icon: "📅", label: "Culte principal", val: "Dimanche — 10h00" },
                ].map((item, i) => (
                  <div key={i} className="contact-item">
                    <div className="contact-item-icon">{item.icon}</div>
                    <div>
                      <div className="contact-item-label">{item.label}</div>
                      <div className="contact-item-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="map-box">
                <div style={{ fontSize: "2rem" }}>📍</div>
                <div className="map-box-title">ÉGLISE PHAROS</div>
                <div className="map-box-addr">Rue Paul Pasteur 139<br />6043 Ransart, Belgique</div>
                <button className="map-box-btn" onClick={() => window.open("https://maps.google.com/?q=Rue+Paul+Pasteur+139+Ransart", "_blank")}>Ouvrir dans Maps →</button>
              </div>
            </div>
            <div className="contact-form-card">
              <h3>Nous écrire</h3>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Prénom</label><input className="form-input" placeholder="Jean" /></div>
                <div className="form-group"><label className="form-label">Nom</label><input className="form-input" placeholder="Dupont" /></div>
              </div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" placeholder="jean@email.com" type="email" /></div>
              <div className="form-group"><label className="form-label">Téléphone</label><input className="form-input" placeholder="+32 ..." /></div>
              <div className="form-group">
                <label className="form-label">Objet</label>
                <select className="form-input">
                  <option>Je souhaite visiter l'église</option>
                  <option>Rejoindre un ministère</option>
                  <option>Demande de counseling pastoral</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" rows={4} placeholder="Votre message..." /></div>
              <button className="btn-blue" onClick={() => showToast("✅ Message envoyé ! Nous vous répondrons sous 48h.")}>Envoyer le message →</button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.12em", color: "white" }}>PHAROS</span>
              <p>Communauté vivante à Ransart, fondée sur la Parole et animée par l'Esprit-Saint. Ouverte à tous.</p>
              <div className="footer-socials">
                {["📘", "📸", "▶️", "🐦"].map((ic, i) => (
                  <button key={i} className="social-icon">{ic}</button>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>Ministères</h4>
              <div className="footer-links">
                {["Louange", "Jeunesse", "Intercession", "Évangélisation", "École du Dimanche"].map(l => (
                  <button key={l} className="footer-lnk" onClick={() => scrollTo("ministeres")}>{l}</button>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>Ressources</h4>
              <div className="footer-links">
                {["Sermons en ligne", "Bible en ligne", "Plan de lecture", "Podcasts", "Livrets"].map(l => (
                  <button key={l} className="footer-lnk" onClick={() => scrollTo("sermons")}>{l}</button>
                ))}
              </div>
            </div>
            <div className="footer-col">
              <h4>L'Église</h4>
              <div className="footer-links">
                {["Notre vision", "Notre foi", "Leadership", "Partenaires", "Contact"].map(l => (
                  <button key={l} className="footer-lnk">{l}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 <span>Église Pharos</span> · Rue Paul Pasteur 139, 6043 Ransart</div>
            <div className="footer-verse-ft">"Je suis la lumière du monde" — Jean 8:12</div>
          </div>
        </div>
      </footer>

      {/* MODAL ÉVÉNEMENT */}
      {activeEvent && (() => {
        const start = new Date(activeEvent.start?.dateTime || activeEvent.start?.date);
        const end = activeEvent.end?.dateTime ? new Date(activeEvent.end.dateTime) : null;
        const jour = start.toLocaleDateString("fr-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        const heure = activeEvent.start?.dateTime ? start.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" }) : "Toute la journée";
        const heureFin = end && activeEvent.end?.dateTime ? end.toLocaleTimeString("fr-BE", { hour: "2-digit", minute: "2-digit" }) : null;
        return (
          <div className="modal-overlay" onClick={() => setActiveEvent(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveEvent(null)}>✕</button>
              <div className="modal-date-badge">📅 {jour}</div>
              <div className="modal-title">{activeEvent.summary}</div>
              <div className="modal-detail">
                <span className="modal-detail-icon">🕐</span>
                <span className="modal-detail-text">{heure}{heureFin ? " — " + heureFin : ""}</span>
              </div>
              {activeEvent.location && (
                <div className="modal-detail">
                  <span className="modal-detail-icon">📍</span>
                  <span className="modal-detail-text">{activeEvent.location}</span>
                </div>
              )}
              {activeEvent.description && (
                <div className="modal-detail">
                  <span className="modal-detail-icon">📝</span>
                  <span className="modal-detail-text">{activeEvent.description}</span>
                </div>
              )}
              <button className="btn-blue" style={{ marginTop: "1.5rem" }} onClick={() => setActiveEvent(null)}>Fermer</button>
            </div>
          </div>
        );
      })()}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
