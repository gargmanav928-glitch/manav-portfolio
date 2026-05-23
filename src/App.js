import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800;900&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

    :root {
      --bg:        #050508;
      --bg2:       #0a0a12;
      --bg3:       #0f0f1a;
      --surface:   #141420;
      --surface2:  #1a1a2e;
      --border:    rgba(255,255,255,0.07);
      --border2:   rgba(255,255,255,0.12);
      --text:      #f0eff8;
      --text2:     rgba(240,239,248,0.65);
      --text3:     rgba(240,239,248,0.38);
      --gold:      #f0b429;
      --gold2:     #ffd166;
      --gold3:     rgba(240,180,41,0.12);
      --blue:      #4f8ef7;
      --blue2:     #7aa8ff;
      --blue3:     rgba(79,142,247,0.12);
      --green:     #06d6a0;
      --green2:    rgba(6,214,160,0.12);
      --pink:      #f72585;
      --purple:    #7b2fff;
      --r:         18px;
      --r2:        12px;
      --r3:        8px;
      --fd:        'Clash Display', sans-serif;
      --fb:        'Cabinet Grotesk', sans-serif;
      --ft:        'Plus Jakarta Sans', sans-serif;
    }

    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--fb);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    ::selection { background: rgba(240,180,41,0.2); color: var(--gold2); }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg2); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

    /* ── Keyframes ── */
    @keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes float1   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(2deg)} }
    @keyframes float2   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(-2deg)} }
    @keyframes float3   { 0%,100%{transform:translateY(0)} 33%{transform:translateY(-8px)} 66%{transform:translateY(5px)} }
    @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.95)} }
    @keyframes ringPulse{ 0%{transform:scale(1);opacity:.7} 100%{transform:scale(2.2);opacity:0} }
    @keyframes spin     { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes spinSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes dash     { to{stroke-dashoffset:0} }
    @keyframes barGrow  { from{height:0;opacity:0} to{opacity:1} }
    @keyframes lineIn   { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }
    @keyframes moveRight{ from{transform:translateX(-100%)} to{transform:translateX(400%)} }
    @keyframes gradMove { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes countUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes particleFloat {
      0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 1; }
      100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
    }
    @keyframes blob {
      0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
      25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}
      50%{border-radius:50% 60% 30% 60%/40% 30% 70% 50%}
      75%{border-radius:60% 40% 60% 30%/30% 60% 40% 60%}
    }
    @keyframes scanLine {
      0%{top:-10%} 100%{top:110%}
    }
    @keyframes glitch1 {
      0%,100%{clip-path:inset(0 0 98% 0)} 25%{clip-path:inset(30% 0 50% 0)} 50%{clip-path:inset(60% 0 10% 0)} 75%{clip-path:inset(10% 0 80% 0)}
    }
    @keyframes typing {
      from{width:0} to{width:100%}
    }

    /* ── Utility ── */
    .gold-text {
      background: linear-gradient(90deg, var(--gold), var(--gold2), var(--gold));
      background-size: 200%;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
    .blue-text {
      background: linear-gradient(90deg, var(--blue), var(--blue2));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .reveal { opacity:0; transform:translateY(36px); transition: opacity .8s ease, transform .8s ease; }
    .reveal.vis { opacity:1; transform:translateY(0); }
    .d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s} .d5{transition-delay:.5s}

    /* ── Layout ── */
    .sec { padding: 110px 0; position: relative; }
    .wrap { max-width: 1220px; margin: 0 auto; padding: 0 28px; }
    .label {
      font-family: var(--ft); font-size: 11px; font-weight: 600;
      letter-spacing: .22em; text-transform: uppercase; color: var(--gold);
      display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
    }
    .label::before { content:''; display:block; width:28px; height:1.5px; background:var(--gold); }

    /* ── Nav ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 22px 0; transition: all .4s ease;
    }
    nav.scrolled {
      background: rgba(5,5,8,0.88); backdrop-filter: blur(24px);
      padding: 14px 0; border-bottom: 1px solid var(--border);
    }
    .nav-wrap { display:flex; align-items:center; justify-content:space-between; }
    .logo {
      font-family: var(--fd); font-size: 24px; font-weight: 700;
      color: var(--text); text-decoration: none; letter-spacing: -.02em;
    }
    .logo em { font-style:normal; color:var(--gold); }
    .nav-links { display:flex; gap:36px; list-style:none; }
    .nav-links a {
      font-family: var(--ft); font-size: 13px; font-weight: 500;
      letter-spacing: .06em; text-transform: uppercase;
      color: var(--text2); text-decoration: none; transition: color .2s;
    }
    .nav-links a:hover { color: var(--text); }
    .nav-right { display:flex; align-items:center; gap:14px; }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; border-radius: 50px;
      font-family: var(--ft); font-size: 13px; font-weight: 600;
      letter-spacing: .06em; text-transform: uppercase;
      cursor: pointer; border: none; text-decoration: none;
      transition: all .3s ease; white-space: nowrap;
    }
    .btn-gold {
      background: linear-gradient(135deg, var(--gold), var(--gold2));
      color: #0a0806;
      box-shadow: 0 0 28px rgba(240,180,41,.28), 0 4px 16px rgba(0,0,0,.3);
    }
    .btn-gold:hover {
      box-shadow: 0 0 48px rgba(240,180,41,.45), 0 8px 24px rgba(0,0,0,.4);
      transform: translateY(-2px);
    }
    .btn-ghost {
      background: rgba(255,255,255,.05); color: var(--text);
      border: 1px solid var(--border2); backdrop-filter: blur(10px);
    }
    .btn-ghost:hover {
      border-color: var(--gold); color: var(--gold);
      background: var(--gold3); transform: translateY(-2px);
    }
    .btn-blue {
      background: linear-gradient(135deg, var(--blue), var(--blue2));
      color: #fff;
      box-shadow: 0 0 28px rgba(79,142,247,.3);
    }
    .btn-blue:hover { box-shadow: 0 0 48px rgba(79,142,247,.5); transform: translateY(-2px); }

    /* ── Cards ── */
    .glass {
      background: rgba(255,255,255,.03);
      border: 1px solid var(--border);
      backdrop-filter: blur(20px);
      border-radius: var(--r);
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r);
      transition: all .35s ease;
    }
    .card:hover { border-color: var(--border2); transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,.4); }

    /* ── Hamburger ── */
    .ham { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; }
    .ham span { display:block; width:24px; height:2px; background:var(--text); border-radius:2px; transition:all .3s; }
    .ham.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
    .ham.open span:nth-child(2){opacity:0}
    .ham.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}
    .mob-menu {
      display:none; position:fixed; inset:0; z-index:999;
      background:rgba(5,5,8,.97); backdrop-filter:blur(24px);
      flex-direction:column; align-items:center; justify-content:center; gap:28px;
    }
    .mob-menu.open{display:flex}
    .mob-menu a { font-family:var(--fd); font-size:36px; font-weight:700; color:var(--text); text-decoration:none; transition:color .2s; }
    .mob-menu a:hover{color:var(--gold)}

    /* ── Particles ── */
    .particle {
      position: absolute; border-radius: 50%;
      animation: particleFloat linear infinite;
      pointer-events: none;
    }

    /* ── Hero ── */
    .hero { min-height: 100vh; display:flex; align-items:center; position:relative; overflow:hidden; padding: 140px 0 80px; }
    .hero-grid-bg {
      position:absolute; inset:0; opacity:.04;
      background-image: linear-gradient(rgba(240,180,41,.6) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(240,180,41,.6) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .hero-blob {
      position: absolute; filter: blur(72px); pointer-events:none;
      animation: blob 12s ease-in-out infinite;
    }
    .hero-layout { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    .hero-badge {
      display:inline-flex; align-items:center; gap:8px; padding:8px 18px; border-radius:50px;
      background:rgba(240,180,41,.08); border:1px solid rgba(240,180,41,.22);
      font-family:var(--ft); font-size:12px; font-weight:600; letter-spacing:.12em;
      text-transform:uppercase; color:var(--gold); margin-bottom:28px;
    }
    .badge-dot { width:6px; height:6px; border-radius:50%; background:var(--gold); position:relative; flex-shrink:0; }
    .badge-dot::after { content:''; position:absolute; inset:-4px; border-radius:50%; border:1.5px solid var(--gold); animation:ringPulse 1.8s ease infinite; }
    .hero-h1 {
      font-family: var(--fd); font-size: clamp(44px, 6vw, 82px);
      font-weight: 700; line-height: 1.0; letter-spacing: -.03em;
      margin-bottom: 22px;
    }
    .hero-sub { font-size:18px; color:var(--text2); line-height:1.75; font-weight:300; max-width:520px; margin-bottom:44px; }
    .hero-ctas { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:64px; }
    .hero-metrics { display:flex; gap:40px; flex-wrap:wrap; }
    .hm-num { font-family:var(--fd); font-size:40px; font-weight:700; letter-spacing:-.03em; line-height:1; }
    .hm-label { font-family:var(--ft); font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--text3); margin-top:4px; }

    /* ── Dashboard Mockup ── */
    .dash-wrap { position:relative; }
    .dash-card {
      background: var(--surface2); border:1px solid var(--border2);
      border-radius:16px; padding:20px; position:relative; overflow:hidden;
    }
    .dash-card::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      animation: moveRight 2.5s ease infinite;
    }
    .dash-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
    .dash-title { font-family:var(--ft); font-size:12px; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--text2); }
    .dash-badge { padding:3px 10px; border-radius:50px; font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
    .dash-badge.up { background:rgba(6,214,160,.12); color:var(--green); border:1px solid rgba(6,214,160,.2); }
    .dash-badge.down { background:rgba(247,37,133,.1); color:var(--pink); border:1px solid rgba(247,37,133,.2); }
    .dash-num { font-family:var(--fd); font-size:32px; font-weight:700; letter-spacing:-.03em; margin-bottom:4px; }
    .dash-sub { font-size:12px; color:var(--text3); }
    .floating-card {
      position:absolute; border-radius:14px; padding:14px 18px;
      background:var(--surface2); border:1px solid var(--border2);
      backdrop-filter:blur(20px); box-shadow:0 20px 60px rgba(0,0,0,.5);
    }
    .fc-label { font-size:10px; color:var(--text3); font-family:var(--ft); letter-spacing:.08em; text-transform:uppercase; margin-bottom:4px; }
    .fc-val { font-family:var(--fd); font-size:22px; font-weight:700; }
    .fc-change { font-size:11px; font-weight:600; margin-top:3px; }
    .fc-change.up { color:var(--green); }
    .fc-change.down { color:var(--pink); }

    /* ── SVG Charts ── */
    .chart-bar { transform-origin: bottom; animation: barGrow .8s ease both; }
    .chart-line { stroke-dasharray: 400; animation: lineIn 1.5s ease both; }

    /* ── Stats Section ── */
    .stats-sec {
      padding: 72px 0;
      background: linear-gradient(135deg, rgba(240,180,41,.04), rgba(79,142,247,.04));
      border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    }
    .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:28px; }
    .stat-card {
      text-align:center; padding:36px 24px; border-radius:var(--r);
      background:var(--surface); border:1px solid var(--border);
      position:relative; overflow:hidden; transition:all .3s;
    }
    .stat-card:hover { border-color:var(--border2); transform:translateY(-4px); }
    .stat-card::after {
      content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      opacity:0; transition:opacity .3s;
    }
    .stat-card:hover::after { opacity:1; }
    .stat-icon { font-size:28px; margin-bottom:14px; display:block; }
    .stat-num { font-family:var(--fd); font-size:46px; font-weight:700; letter-spacing:-.03em; line-height:1; margin-bottom:8px; }
    .stat-desc { font-family:var(--ft); font-size:12px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:var(--text3); }

    /* ── About ── */
    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:start; }
    .about-h2 { font-family:var(--fd); font-size:clamp(34px,4.5vw,54px); font-weight:700; line-height:1.1; letter-spacing:-.02em; margin-bottom:24px; }
    .about-body { font-size:17px; color:var(--text2); line-height:1.8; font-weight:300; margin-bottom:32px; }
    .tag { padding:8px 16px; border-radius:50px; font-size:13px; font-weight:500; background:var(--surface); border:1px solid var(--border); color:var(--text2); transition:all .2s; cursor:default; }
    .tag:hover { border-color:var(--gold); color:var(--gold); background:var(--gold3); }
    .tag-group { margin-bottom:32px; }
    .tag-group-title { font-family:var(--ft); font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
    .tags { display:flex; flex-wrap:wrap; gap:10px; }
    .industry-tag { background:var(--blue3); border:1px solid rgba(79,142,247,.18); color:var(--blue2); }

    /* ── Services ── */
    .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
    .svc-card {
      padding:36px 28px; border-radius:var(--r);
      background:var(--surface); border:1px solid var(--border);
      position:relative; overflow:hidden; transition:all .4s;
    }
    .svc-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(circle at 50% 0%, rgba(240,180,41,.07), transparent 70%);
      opacity:0; transition:opacity .4s;
    }
    .svc-card:hover { transform:translateY(-8px); border-color:rgba(240,180,41,.3); box-shadow:0 32px 80px rgba(0,0,0,.5); }
    .svc-card:hover::before { opacity:1; }
    .svc-icon-wrap {
      width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center;
      background:var(--gold3); border:1px solid rgba(240,180,41,.2); margin-bottom:24px;
      position:relative; font-size:24px;
    }
    .svc-icon-wrap::after {
      content:''; position:absolute; inset:-1px; border-radius:15px;
      background:linear-gradient(135deg,rgba(240,180,41,.4),transparent);
      opacity:0; transition:opacity .3s;
    }
    .svc-card:hover .svc-icon-wrap::after { opacity:1; }
    .svc-title { font-family:var(--fd); font-size:21px; font-weight:700; margin-bottom:12px; line-height:1.2; }
    .svc-desc { font-size:14px; color:var(--text2); line-height:1.7; margin-bottom:22px; font-weight:300; }
    .svc-list { list-style:none; }
    .svc-list li {
      font-size:13px; color:var(--text2); padding:7px 0;
      border-bottom:1px solid var(--border); display:flex; align-items:center; gap:9px; font-weight:300;
    }
    .svc-list li:last-child{border:none}
    .svc-list li::before { content:''; display:block; width:5px; height:5px; border-radius:50%; background:var(--gold); flex-shrink:0; }
    .svc-mini-chart { margin-top:20px; }

    /* ── Case Studies ── */
    .case-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    .case-card { border-radius:var(--r); overflow:hidden; background:var(--surface); border:1px solid var(--border); transition:all .4s; }
    .case-card:hover { transform:translateY(-8px); border-color:var(--border2); box-shadow:0 32px 80px rgba(0,0,0,.5); }
    .case-top { height:220px; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; }
    .case-body { padding:28px; }
    .case-tag-pill {
      display:inline-block; padding:4px 12px; border-radius:50px; margin-bottom:14px;
      font-family:var(--ft); font-size:10px; font-weight:700; letter-spacing:.15em; text-transform:uppercase;
      background:var(--gold3); color:var(--gold); border:1px solid rgba(240,180,41,.2);
    }
    .case-title { font-family:var(--fd); font-size:20px; font-weight:700; margin-bottom:16px; line-height:1.2; }
    .case-metrics { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:18px; }
    .case-metric {
      padding:12px; border-radius:var(--r2); background:var(--surface2); border:1px solid var(--border);
      text-align:center;
    }
    .case-metric-val { font-family:var(--fd); font-size:22px; font-weight:700; line-height:1; }
    .case-metric-val.green { color:var(--green); }
    .case-metric-val.blue { color:var(--blue2); }
    .case-metric-val.gold { color:var(--gold); }
    .case-metric-label { font-size:10px; color:var(--text3); font-family:var(--ft); letter-spacing:.08em; text-transform:uppercase; margin-top:4px; }
    .case-result-row { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--text2); margin-bottom:8px; font-weight:300; }
    .case-result-icon { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; }

    /* ── Why Me ── */
    .why-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; }
    .why-card {
      padding:32px 20px; border-radius:var(--r); text-align:center;
      background:var(--surface); border:1px solid var(--border); transition:all .3s;
    }
    .why-card:hover { border-color:rgba(240,180,41,.3); transform:translateY(-4px); background:linear-gradient(160deg,rgba(240,180,41,.05),var(--surface)); }
    .why-icon { font-size:36px; margin-bottom:14px; display:block; }
    .why-title { font-family:var(--fd); font-size:16px; font-weight:700; margin-bottom:8px; line-height:1.2; }
    .why-desc { font-size:12px; color:var(--text3); line-height:1.6; }

    /* ── Dashboard Section ── */
    .dash-sec-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
    .dash-panel {
      background:var(--surface2); border:1px solid var(--border2); border-radius:20px;
      padding:28px; position:relative; overflow:hidden;
    }
    .dash-panel::before {
      content:''; position:absolute; top:0; left:0; right:0; height:1px;
      background:linear-gradient(90deg,transparent,var(--gold),transparent);
    }
    .dp-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
    .dp-title { font-family:var(--fd); font-size:16px; font-weight:700; }
    .dp-pill { padding:4px 12px; border-radius:50px; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; }
    .dp-pill.live { background:rgba(6,214,160,.12); color:var(--green); border:1px solid rgba(6,214,160,.2); animation:pulse 2s ease infinite; }
    .metric-row { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
    .metric-box {
      padding:16px 14px; border-radius:var(--r2); background:var(--surface); border:1px solid var(--border);
    }
    .metric-box-label { font-size:10px; color:var(--text3); font-family:var(--ft); letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; }
    .metric-box-val { font-family:var(--fd); font-size:24px; font-weight:700; line-height:1; margin-bottom:4px; }
    .metric-box-change { font-size:11px; font-weight:600; }
    .metric-box-change.up { color:var(--green); }
    .metric-box-change.dn { color:var(--pink); }

    /* ── Funnel ── */
    .funnel-sec-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }

    /* ── Pricing ── */
    .pricing-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:22px; align-items:start; }
    .price-card {
      padding:36px 28px; border-radius:var(--r);
      background:var(--surface); border:1px solid var(--border); position:relative; transition:all .3s;
    }
    .price-card.feat {
      background:linear-gradient(160deg,rgba(240,180,41,.1),var(--surface));
      border-color:rgba(240,180,41,.4); transform:scale(1.03);
    }
    .price-card:hover:not(.feat) { border-color:var(--border2); transform:translateY(-4px); }
    .price-badge {
      position:absolute; top:-13px; left:50%; transform:translateX(-50%);
      background:linear-gradient(135deg,var(--gold),var(--gold2)); color:#080603;
      font-family:var(--ft); font-size:10px; font-weight:800; letter-spacing:.15em; text-transform:uppercase;
      padding:5px 16px; border-radius:50px; white-space:nowrap;
    }
    .price-plan { font-family:var(--ft); font-size:11px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); margin-bottom:14px; }
    .price-val { font-family:var(--fd); font-size:38px; font-weight:700; letter-spacing:-.03em; line-height:1; margin-bottom:5px; }
    .price-per { font-size:13px; color:var(--text3); margin-bottom:26px; }
    .price-features { list-style:none; margin-bottom:32px; }
    .price-features li { display:flex; align-items:flex-start; gap:9px; padding:8px 0; font-size:13px; color:var(--text2); border-bottom:1px solid var(--border); font-weight:300; }
    .price-features li:last-child{border:none}
    .pf-check { color:var(--green); flex-shrink:0; font-size:13px; margin-top:2px; }

    /* ── Testimonials ── */
    .test-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
    .test-card {
      padding:36px 28px; border-radius:var(--r);
      background:var(--surface); border:1px solid var(--border); position:relative; transition:all .35s;
    }
    .test-card:hover { transform:translateY(-6px); border-color:var(--border2); box-shadow:0 24px 60px rgba(0,0,0,.4); }
    .test-quote { position:absolute; top:20px; right:24px; font-family:var(--fd); font-size:72px; font-weight:900; color:rgba(240,180,41,.07); line-height:1; }
    .test-stars { color:var(--gold); font-size:14px; letter-spacing:2px; margin-bottom:16px; }
    .test-text { font-size:15px; color:var(--text2); line-height:1.8; font-weight:300; margin-bottom:24px; font-style:italic; }
    .test-author { display:flex; align-items:center; gap:13px; }
    .test-av {
      width:44px; height:44px; border-radius:50%; flex-shrink:0;
      background:linear-gradient(135deg,var(--gold),var(--gold2));
      display:flex; align-items:center; justify-content:center;
      font-family:var(--fd); font-size:17px; font-weight:700; color:#080603;
    }
    .test-name { font-family:var(--ft); font-size:15px; font-weight:700; }
    .test-role { font-size:12px; color:var(--text3); }

    /* ── CTA Band ── */
    .cta-band {
      padding:90px 0; position:relative; overflow:hidden;
      background:linear-gradient(135deg, rgba(240,180,41,.06), rgba(79,142,247,.06));
      border-top:1px solid var(--border); border-bottom:1px solid var(--border);
    }
    .cta-band-inner { text-align:center; position:relative; z-index:1; }
    .cta-h2 { font-family:var(--fd); font-size:clamp(32px,4.5vw,56px); font-weight:700; letter-spacing:-.02em; margin-bottom:20px; }
    .cta-sub { font-size:17px; color:var(--text2); max-width:520px; margin:0 auto 40px; line-height:1.7; font-weight:300; }
    .cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }

    /* ── Contact ── */
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; }
    .contact-h2 { font-family:var(--fd); font-size:clamp(32px,4.5vw,52px); font-weight:700; letter-spacing:-.02em; margin-bottom:20px; }
    .contact-sub { font-size:17px; color:var(--text2); line-height:1.7; font-weight:300; margin-bottom:36px; }
    .contact-items { display:flex; flex-direction:column; gap:16px; }
    .contact-item {
      display:flex; align-items:center; gap:16px; padding:16px 20px; border-radius:var(--r2);
      background:var(--surface); border:1px solid var(--border); text-decoration:none; color:inherit; transition:all .2s;
    }
    .contact-item:hover { border-color:var(--gold); color:var(--gold); }
    .ci-icon { width:42px; height:42px; border-radius:10px; background:var(--gold3); border:1px solid rgba(240,180,41,.2); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
    .ci-label { font-family:var(--ft); font-size:10px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--text3); }
    .ci-val { font-size:14px; font-weight:500; margin-top:2px; }
    .form-wrap { background:var(--surface); border:1px solid var(--border); border-radius:var(--r); padding:36px; }
    .form-row2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .fld { display:flex; flex-direction:column; gap:7px; }
    .fld-label { font-family:var(--ft); font-size:11px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--text3); }
    .fld-input, .fld-textarea, .fld-select {
      padding:13px 16px; border-radius:var(--r2); background:var(--bg2); border:1px solid var(--border);
      color:var(--text); font-family:var(--fb); font-size:14px; outline:none; transition:border-color .2s; resize:none;
    }
    .fld-input:focus,.fld-textarea:focus,.fld-select:focus{border-color:var(--gold)}
    .fld-input::placeholder,.fld-textarea::placeholder{color:var(--text3)}
    .fld-textarea{height:130px}
    .fld-select{appearance:none; background:var(--bg3);}

    /* ── Footer ── */
    footer { padding:64px 0 28px; border-top:1px solid var(--border); }
    .footer-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:52px; flex-wrap:wrap; gap:40px; }
    .footer-logo { font-family:var(--fd); font-size:26px; font-weight:700; color:var(--text); margin-bottom:10px; }
    .footer-logo em { font-style:normal; color:var(--gold); }
    .footer-tag { font-size:14px; color:var(--text3); font-weight:300; }
    .footer-social { display:flex; gap:10px; margin-top:22px; }
    .soc-btn {
      width:40px; height:40px; border-radius:10px; background:var(--surface); border:1px solid var(--border);
      display:flex; align-items:center; justify-content:center; text-decoration:none; font-size:16px;
      color:var(--text2); transition:all .2s;
    }
    .soc-btn:hover { border-color:var(--gold); color:var(--gold); background:var(--gold3); }
    .footer-col-title { font-family:var(--ft); font-size:11px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:18px; }
    .footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; }
    .footer-links a { font-size:14px; color:var(--text3); text-decoration:none; transition:color .2s; }
    .footer-links a:hover { color:var(--text); }
    .footer-bottom { display:flex; align-items:center; justify-content:space-between; padding-top:28px; border-top:1px solid var(--border); flex-wrap:wrap; gap:14px; }
    .footer-copy { font-size:13px; color:var(--text3); }

    /* ── Floating WA ── */
    .wa-btn {
      position:fixed; bottom:32px; right:32px; z-index:900;
      width:58px; height:58px; border-radius:50%; background:#25D366;
      display:flex; align-items:center; justify-content:center; font-size:26px;
      text-decoration:none; box-shadow:0 8px 32px rgba(37,211,102,.35);
      transition:all .3s; animation:float1 4s ease-in-out infinite;
    }
    .wa-btn:hover{transform:scale(1.12);box-shadow:0 12px 48px rgba(37,211,102,.55)}

    /* ── Sticky mobile CTA ── */
    .sticky-cta {
      display:none; position:fixed; bottom:0; left:0; right:0; z-index:800;
      padding:14px 20px; background:rgba(5,5,8,.95); backdrop-filter:blur(20px);
      border-top:1px solid var(--border);
    }

    /* ── Responsive ── */
    @media(max-width:1080px){
      .why-grid{grid-template-columns:repeat(3,1fr)}
      .pricing-grid{grid-template-columns:repeat(2,1fr)}
      .price-card.feat{transform:none}
    }
    @media(max-width:860px){
      .hero-layout{grid-template-columns:1fr; gap:48px}
      .dash-sec-grid,.funnel-sec-grid,.about-grid,.contact-grid{grid-template-columns:1fr; gap:48px}
      .services-grid{grid-template-columns:1fr}
      .case-grid{grid-template-columns:1fr}
      .why-grid{grid-template-columns:repeat(2,1fr)}
      .test-grid{grid-template-columns:1fr}
      .stats-grid{grid-template-columns:repeat(2,1fr)}
      .nav-links{display:none}
      .nav-right .btn{display:none}
      .ham{display:flex}
      .sticky-cta{display:block}
      .wa-btn{bottom:84px;right:18px}
      .form-row2{grid-template-columns:1fr}
    }
    @media(max-width:520px){
      .why-grid{grid-template-columns:1fr}
      .pricing-grid{grid-template-columns:1fr}
      .hero-ctas{flex-direction:column}
      .hero-ctas .btn{justify-content:center}
      .cta-btns{flex-direction:column;align-items:center}
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useCounter(end, duration = 1800, started = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return val;
}

/* ─────────────────────────────────────────────
   MINI SVG CHARTS
───────────────────────────────────────────── */
function SparkLine({ color = "#f0b429", data = [40,55,45,70,60,80,75,90] }) {
  const w = 120, h = 40;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" points={pts} className="chart-line" />
    </svg>
  );
}

function MiniBarChart({ color = "#f0b429", bars = [60,80,50,90,70,100,85] }) {
  const w = 120, h = 48, bw = 12, gap = 6;
  const max = Math.max(...bars);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      {bars.map((v, i) => {
        const bh = (v / max) * h;
        return (
          <rect
            key={i}
            x={i * (bw + gap)} y={h - bh} width={bw} height={bh}
            rx="3" fill={color} opacity={.6 + .4 * (v / max)}
            className="chart-bar"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        );
      })}
    </svg>
  );
}

function DonutChart({ value = 78, color = "#f0b429", size = 80 }) {
  const r = 30, circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg viewBox="0 0 80 80" width={size} height={size}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8" />
      <circle
        cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 40 40)"
        style={{ transition: "stroke-dashoffset 1.5s ease" }}
      />
      <text x="40" y="45" textAnchor="middle" fill={color}
        style={{ fontFamily: "var(--fd)", fontSize: "16px", fontWeight: 700 }}>
        {value}%
      </text>
    </svg>
  );
}

function FunnelDiagram() {
  const stages = [
    { label: "Impressions", val: "2.4M", w: 100, color: "#4f8ef7" },
    { label: "Clicks", val: "48K", w: 78, color: "#7b2fff" },
    { label: "Leads", val: "3.2K", w: 58, color: "#f0b429" },
    { label: "Qualified", val: "890", w: 40, color: "#06d6a0" },
    { label: "Converted", val: "234", w: 24, color: "#f72585" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "24px 0" }}>
      {stages.map((s, i) => (
        <div key={s.label} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            flex: "0 0 90px", textAlign: "right",
            fontFamily: "var(--ft)", fontSize: 11, color: "var(--text3)",
            letterSpacing: ".08em", textTransform: "uppercase"
          }}>{s.label}</div>
          <div style={{
            height: 40, borderRadius: 6, background: `${s.color}22`, border: `1px solid ${s.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "width .8s ease", width: `${s.w}%`,
            animation: `fadeUp .6s ease ${i * .12}s both`
          }}>
            <span style={{ fontFamily: "var(--fd)", fontSize: 16, fontWeight: 700, color: s.color }}>
              {s.val}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 15 + 10,
    opacity: Math.random() * 0.4 + 0.1,
    color: i % 3 === 0 ? "#f0b429" : i % 3 === 1 ? "#4f8ef7" : "#06d6a0",
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          width: p.size, height: p.size,
          left: `${p.left}%`, bottom: "-20px",
          background: p.color,
          opacity: p.opacity,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO DASHBOARD MOCKUP
───────────────────────────────────────────── */
function HeroDashboard() {
  return (
    <div className="dash-wrap" style={{ position: "relative", animation: "float1 7s ease-in-out infinite" }}>
      {/* Main dashboard card */}
      <div className="dash-card" style={{ position: "relative", zIndex: 2 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "8px 0" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 8, fontFamily: "var(--ft)", fontSize: 11, color: "var(--text3)", letterSpacing: ".1em" }}>
            Campaign Dashboard • Live
          </span>
          <div style={{ marginLeft: "auto", padding: "2px 10px", borderRadius: 50, background: "rgba(6,214,160,.12)", border: "1px solid rgba(6,214,160,.2)", fontSize: 10, color: "var(--green)", fontFamily: "var(--ft)", fontWeight: 700, letterSpacing: ".1em", animation: "pulse 2s ease infinite" }}>
            ● LIVE
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Leads", val: "3,842", change: "+24%", up: true, color: "var(--gold)" },
            { label: "ROAS", val: "4.8×", change: "+1.2", up: true, color: "var(--green)" },
            { label: "CPL", val: "₹312", change: "-38%", up: false, color: "var(--blue2)" },
          ].map(m => (
            <div key={m.label} style={{ padding: "12px", borderRadius: 10, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div style={{ fontFamily: "var(--ft)", fontSize: 9, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 5 }}>{m.label}</div>
              <div style={{ fontFamily: "var(--fd)", fontSize: 22, fontWeight: 700, color: m.color, lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: m.up ? "var(--green)" : "var(--pink)", marginTop: 3 }}>{m.change}</div>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div style={{ background: "var(--surface)", borderRadius: 10, padding: "14px", border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--ft)", fontSize: 11, color: "var(--text2)", fontWeight: 600 }}>Lead Generation — Last 30 days</span>
            <SparkLine color="#f0b429" data={[30,45,40,60,55,75,65,80,72,90]} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56 }}>
            {[35,55,40,70,60,80,65,90,75,100,85,95].map((v, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: "4px 4px 0 0",
                background: `linear-gradient(180deg, ${i > 8 ? "#f0b429" : "#4f8ef7"}88, ${i > 8 ? "#f0b429" : "#4f8ef7"}22)`,
                height: `${v}%`, transition: "height .8s ease",
                animationDelay: `${i * 0.05}s`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating metric cards */}
      <div className="floating-card" style={{ top: -28, right: -32, zIndex: 3, animation: "float2 5s ease-in-out infinite", minWidth: 140 }}>
        <div className="fc-label">Meta Ads ROAS</div>
        <div className="fc-val" style={{ color: "var(--gold)" }}>5.2×</div>
        <div className="fc-change up">▲ +1.4 this month</div>
        <div style={{ marginTop: 8 }}>
          <SparkLine color="#f0b429" data={[3.1, 3.8, 3.5, 4.2, 4.0, 4.8, 5.2]} />
        </div>
      </div>

      <div className="floating-card" style={{ bottom: -24, left: -28, zIndex: 3, animation: "float3 6s ease-in-out infinite", minWidth: 148 }}>
        <div className="fc-label">CPL Reduction</div>
        <div className="fc-val" style={{ color: "var(--green)" }}>−42%</div>
        <div className="fc-change up">vs previous quarter</div>
        <div style={{ marginTop: 8 }}>
          <MiniBarChart color="#06d6a0" bars={[100, 88, 78, 70, 62, 58, 54]} />
        </div>
      </div>

      <div className="floating-card" style={{ bottom: 60, right: -40, zIndex: 3, animation: "float1 8s ease-in-out infinite reverse", minWidth: 120, textAlign: "center" }}>
        <div className="fc-label" style={{ textAlign: "center" }}>Conversion</div>
        <DonutChart value={78} color="#4f8ef7" size={70} />
        <div className="fc-change up" style={{ textAlign: "center" }}>+12% MoM</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LIVE DASHBOARD SECTION
───────────────────────────────────────────── */
function DashboardSection() {
  return (
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="dash-sec-grid">
          <div>
            <div className="label reveal">Performance Analytics</div>
            <h2 className="about-h2 reveal d1">
              Real-Time Campaign<br />
              <span className="gold-text">Intelligence</span>
            </h2>
            <p className="about-body reveal d2">
              Every campaign is tracked, measured and optimised in real-time. 
              From ROAS growth to CPL reduction — every metric is accountable 
              to your business goals.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="reveal d3">
              {[
                { icon: "📊", title: "ROAS Tracking", desc: "Real-time return on ad spend monitoring" },
                { icon: "🎯", title: "Lead Quality Score", desc: "AI-scored leads ranked by conversion intent" },
                { icon: "⚡", title: "Daily Optimisation", desc: "Bids, audiences and creatives adjusted daily" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", borderRadius: "var(--r2)", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--gold3)", border: "1px solid rgba(240,180,41,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: "var(--ft)", fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--text3)", fontWeight: 300 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal d2">
            <div className="dash-panel">
              <div className="dp-header">
                <div className="dp-title">Campaign Overview</div>
                <div className="dp-pill live">● Live</div>
              </div>

              <div className="metric-row">
                {[
                  { label: "Impressions", val: "2.4M", change: "+18%", up: true },
                  { label: "Leads", val: "3,842", change: "+24%", up: true },
                  { label: "CPL", val: "₹312", change: "-38%", up: false },
                ].map(m => (
                  <div key={m.label} className="metric-box">
                    <div className="metric-box-label">{m.label}</div>
                    <div className="metric-box-val">{m.val}</div>
                    <div className={`metric-box-change ${m.up ? "up" : "dn"}`}>{m.change} vs last month</div>
                  </div>
                ))}
              </div>

              {/* Meta Ads Panel */}
              <div style={{ background: "var(--surface)", borderRadius: "var(--r2)", padding: 16, marginBottom: 14, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "#1877f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: 800 }}>f</div>
                    <span style={{ fontFamily: "var(--ft)", fontSize: 13, fontWeight: 600 }}>Meta Ads</span>
                  </div>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>₹1.84L spent</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 48 }}>
                  {[60,75,55,85,70,90,80,95,85,100].map((v,i) => (
                    <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", background: `#1877f2${Math.round((40 + v * 0.6)).toString(16)}`, height: `${v}%` }} />
                  ))}
                </div>
              </div>

              {/* Google Ads Panel */}
              <div style={{ background: "var(--surface)", borderRadius: "var(--r2)", padding: 16, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg,#4285f4,#ea4335)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800 }}>G</div>
                    <span style={{ fontFamily: "var(--ft)", fontSize: 13, fontWeight: 600 }}>Google Ads</span>
                  </div>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 700, color: "var(--blue2)" }}>ROAS 4.8×</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <DonutChart value={84} color="#4f8ef7" size={64} />
                  <div style={{ flex: 1 }}>
                    {[
                      { label: "Search", val: "62%", color: "#4f8ef7" },
                      { label: "Display", val: "24%", color: "#7b2fff" },
                      { label: "YouTube", val: "14%", color: "#f72585" },
                    ].map(r => (
                      <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                        <div style={{ fontSize: 12, color: "var(--text2)", flex: 1 }}>{r.label}</div>
                        <div style={{ fontFamily: "var(--fd)", fontSize: 13, fontWeight: 700, color: r.color }}>{r.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FUNNEL SECTION
───────────────────────────────────────────── */
function FunnelSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <div className="funnel-sec-grid">
          <div className="reveal">
            <div className="dash-panel">
              <div className="dp-header">
                <div className="dp-title">Marketing Funnel</div>
                <div className="dp-pill" style={{ background: "var(--gold3)", color: "var(--gold)", border: "1px solid rgba(240,180,41,.2)" }}>Optimized</div>
              </div>
              <FunnelDiagram />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                <div style={{ padding: "14px", borderRadius: "var(--r2)", background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fd)", fontSize: 26, fontWeight: 700, color: "var(--green)" }}>9.7%</div>
                  <div style={{ fontFamily: "var(--ft)", fontSize: 10, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4 }}>Conversion Rate</div>
                </div>
                <div style={{ padding: "14px", borderRadius: "var(--r2)", background: "var(--surface)", border: "1px solid var(--border)", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--fd)", fontSize: 26, fontWeight: 700, color: "var(--gold)" }}>₹312</div>
                  <div style={{ fontFamily: "var(--ft)", fontSize: 10, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4 }}>Avg. CPL</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="label reveal">Funnel Strategy</div>
            <h2 className="about-h2 reveal d1">
              Full-Funnel<br />
              <span className="gold-text">Optimisation</span>
            </h2>
            <p className="about-body reveal d2">
              Every touchpoint in your customer journey is mapped, measured and
              optimised. From cold audience awareness to final conversion — leaks
              are fixed, bottlenecks resolved.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="reveal d3">
              {[
                { icon: "🎯", label: "Top of Funnel", desc: "Awareness & reach campaigns" },
                { icon: "🔥", label: "Mid Funnel", desc: "Engagement & lead capture" },
                { icon: "⚡", label: "Bottom Funnel", desc: "Retargeting & conversion" },
                { icon: "📈", label: "Post Conversion", desc: "Upsell & LTV growth" },
              ].map(f => (
                <div key={f.label} style={{ padding: "16px", borderRadius: "var(--r2)", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
                  <div style={{ fontFamily: "var(--ft)", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", fontWeight: 300 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Services", "Work", "Pricing", "Contact"];
  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="wrap">
          <div className="nav-wrap">
            <a href="#hero" className="logo">Manav<em>.</em></a>
            <ul className="nav-links">
              {links.map(l => <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>)}
            </ul>
            <div className="nav-right">
              <a href="#contact" className="btn btn-gold">Book Consultation</a>
              <div className={`ham ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
                <span/><span/><span/>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`mob-menu ${open ? "open" : ""}`}>
        {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>)}
        <a href="#contact" className="btn btn-gold" onClick={() => setOpen(false)} style={{ marginTop: 12 }}>Book Consultation</a>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-grid-bg" />
      <Particles />
      {/* Blobs */}
      <div className="hero-blob" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(240,180,41,.1), transparent 70%)", top: -100, right: -100 }} />
      <div className="hero-blob" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(79,142,247,.08), transparent 70%)", bottom: 0, left: -80, animationDelay: "-4s" }} />

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-layout">
          <div>
            <div className="hero-badge" style={{ animation: "fadeUp .6s ease .1s both" }}>
              <span className="badge-dot" />
              Available for New Projects
            </div>
            <h1 className="hero-h1" style={{ animation: "fadeUp .7s ease .2s both" }}>
              <span style={{ display: "block" }}>Manav</span>
              <span style={{ display: "block" }} className="gold-text">Garg</span>
              <span style={{ display: "block", fontFamily: "var(--ft)", fontSize: "0.42em", fontWeight: 400, color: "var(--text2)", letterSpacing: "-.01em", lineHeight: 1.4, marginTop: 6 }}>
                Performance Marketing Consultant
              </span>
            </h1>
            <p className="hero-sub" style={{ animation: "fadeUp .7s ease .3s both" }}>
              12+ Years of expertise in Meta Ads, Google Ads & Lead Generation.
              Scaling businesses with data-driven strategies that turn ad spend into measurable revenue.
            </p>
            <div className="hero-ctas" style={{ animation: "fadeUp .7s ease .4s both" }}>
              <a href="#contact" className="btn btn-gold">✦ Book Consultation</a>
              <a href="#services" className="btn btn-ghost">View Services →</a>
            </div>
            <div className="hero-metrics" style={{ animation: "fadeUp .7s ease .5s both" }}>
              {[
                { num: "12+", label: "Years Experience", color: "var(--gold)" },
                { num: "4.8×", label: "Avg. ROAS Delivered", color: "var(--blue2)" },
                { num: "−42%", label: "CPL Reduction", color: "var(--green)" },
              ].map(m => (
                <div key={m.label}>
                  <div className="hm-num" style={{ color: m.color }}>{m.num}</div>
                  <div className="hm-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: "fadeIn .9s ease .4s both" }}>
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED STATS
───────────────────────────────────────────── */
function AnimatedStat({ end, suffix = "", label, icon, color }) {
  const ref = useRef();
  const [started, setStarted] = useState(false);
  const val = useCounter(end, 2000, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="stat-card reveal">
      <span className="stat-icon">{icon}</span>
      <div className="stat-num" style={{ color }}>
        {val}{suffix}
      </div>
      <div className="stat-desc">{label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <div className="stats-sec">
      <div className="wrap">
        <div className="stats-grid">
          <AnimatedStat end={12} suffix="+" label="Years Experience" icon="🏆" color="var(--gold)" />
          <AnimatedStat end={100} suffix="+" label="Campaigns Managed" icon="📊" color="var(--blue2)" />
          <AnimatedStat end={6} suffix="+" label="Industries Served" icon="🌐" color="var(--green)" />
          <AnimatedStat end={4} suffix=".8×" label="Average ROAS" icon="📈" color="var(--gold)" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const specs = ["Meta Ads", "Google Ads", "Lead Generation", "Funnel Optimization", "Retargeting", "Conversion Tracking", "Growth Strategy"];
  const industries = ["Beauty & Wellness", "Education & Academies", "Clinics", "Local Businesses", "Real Estate", "Service Businesses"];
  return (
    <section id="about" className="sec">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <div className="label reveal">About</div>
            <h2 className="about-h2 reveal d1">
              Data-Driven.<br />
              <span className="gold-text">Results-Obsessed.</span>
            </h2>
            <p className="about-body reveal d2">
              Manav Garg is a performance marketer with 12+ years of experience helping
              businesses generate quality leads, improve ROI, and scale revenue through
              data-driven digital marketing strategies.
            </p>
            <p className="about-body reveal d3" style={{ marginBottom: 0 }}>
              Every rupee of ad spend is tracked, attributed and held accountable to
              measurable business outcomes — not vanity metrics.
            </p>
            <div style={{ marginTop: 36 }} className="reveal d4">
              <a href="#contact" className="btn btn-gold">Start a Project →</a>
            </div>
          </div>
          <div>
            <div className="tag-group reveal d1">
              <div className="tag-group-title">Specializations</div>
              <div className="tags">{specs.map(s => <span key={s} className="tag">{s}</span>)}</div>
            </div>
            <div className="tag-group reveal d2">
              <div className="tag-group-title">Industries Served</div>
              <div className="tags">{industries.map(i => <span key={i} className="tag industry-tag">{i}</span>)}</div>
            </div>
            {/* Mini dashboard inside about */}
            <div className="reveal d3" style={{ marginTop: 8 }}>
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: "var(--r)", padding: 20 }}>
                <div style={{ fontFamily: "var(--ft)", fontSize: 11, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>Campaign Results Snapshot</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <DonutChart value={92} color="var(--gold)" size={72} />
                  <DonutChart value={78} color="var(--blue2)" size={72} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "var(--text2)", marginBottom: 6 }}>🟡 <strong>92%</strong> Client Retention</div>
                    <div style={{ fontSize: 12, color: "var(--text2)" }}>🔵 <strong>78%</strong> Avg Lead-to-Sale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
function Services() {
  const svcs = [
    { icon: "📣", title: "Meta Ads Management", desc: "Strategic Facebook & Instagram campaigns designed to generate high-quality leads and maximise your ad spend efficiency.", items: ["Campaign Setup & Structure", "Audience Research", "Creative Direction", "A/B Testing", "Weekly Optimisation", "Performance Reports"], chartColor: "#1877f2", chartData: [40,55,48,70,62,80,75,92] },
    { icon: "🔍", title: "Google Ads Management", desc: "Data-driven Search, Display & YouTube campaigns that capture high-intent traffic and convert prospects into paying customers.", items: ["Search & Display Campaigns", "Keyword Strategy", "Landing Page Alignment", "Bid Management", "Quality Score Optimisation", "Monthly Reports"], chartColor: "#4f8ef7", chartData: [30,45,40,60,55,75,70,88] },
    { icon: "🎯", title: "Lead Generation Strategy", desc: "End-to-end lead generation frameworks delivering a consistent pipeline of qualified business opportunities.", items: ["Lead Magnet Creation", "Form & CTA Optimisation", "Lead Scoring Setup", "CRM Integration", "Follow-up Sequence", "Quality Assurance"], chartColor: "#f0b429", chartData: [50,60,55,75,65,85,80,95] },
    { icon: "⚡", title: "Funnel Optimisation", desc: "Identifying and fixing leakages in your marketing funnel to dramatically improve conversion rates at every stage.", items: ["Funnel Audit & Analysis", "CRO", "Heatmap Analysis", "UX Recommendations", "Retargeting Strategy", "Revenue Attribution"], chartColor: "#06d6a0", chartData: [45,58,52,68,60,78,72,90] },
    { icon: "📊", title: "Performance Consulting", desc: "High-level strategic consulting for businesses building or transforming their performance marketing operations for scale.", items: ["Marketing Audit", "Strategy Roadmap", "Team Training", "Tool & Stack Review", "KPI Framework", "Ongoing Advisory"], chartColor: "#7b2fff", chartData: [35,50,45,65,58,75,68,85] },
  ];
  return (
    <section id="services" className="sec" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="label reveal">Services</div>
        <h2 className="about-h2 reveal d1" style={{ maxWidth: 600, marginBottom: 52 }}>
          Everything You Need<br />
          <span className="gold-text">to Grow With Paid Media</span>
        </h2>
        <div className="services-grid">
          {svcs.map((s, i) => (
            <div key={s.title} className={`svc-card reveal d${(i % 4) + 1}`}>
              <div className="svc-icon-wrap">{s.icon}</div>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-mini-chart">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--ft)", fontSize: 10, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Performance Trend</span>
                  <span style={{ fontFamily: "var(--fd)", fontSize: 13, fontWeight: 700, color: s.chartColor }}>↑ Results</span>
                </div>
                <SparkLine color={s.chartColor} data={s.chartData} />
              </div>
              <ul className="svc-list" style={{ marginTop: 16 }}>
                {s.items.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CASE STUDIES
───────────────────────────────────────────── */
function CaseStudies() {
  const cases = [
    {
      emoji: "💄", tag: "Beauty Academy",
      title: "Beauty Academy Lead Generation",
      gradient: "linear-gradient(135deg, #1a0533 0%, #4a1a7a 50%, #0d3b2e 100%)",
      metrics: [
        { val: "−45%", label: "CPL Reduced", cls: "green" },
        { val: "3×", label: "Admissions", cls: "gold" },
        { val: "4.2×", label: "ROAS", cls: "blue" },
        { val: "92%", label: "Lead Quality", cls: "gold" },
      ],
      results: [
        { icon: "↓", text: "Reduced CPL by 45% in 60 days", color: "var(--green)" },
        { icon: "↑", text: "Improved lead quality & intent scoring", color: "var(--gold)" },
        { icon: "🎓", text: "3× increase in admissions", color: "var(--blue2)" },
      ],
      chartColor: "#06d6a0",
    },
    {
      emoji: "🏫", tag: "Education Institute",
      title: "Education Institute Scaling",
      gradient: "linear-gradient(135deg, #0d1a3a 0%, #1a3a6e 50%, #3a0d1a 100%)",
      metrics: [
        { val: "4.8×", label: "ROAS", cls: "gold" },
        { val: "+180%", label: "Qualified Leads", cls: "green" },
        { val: "−38%", label: "Wasted Spend", cls: "blue" },
        { val: "2.3×", label: "Revenue Growth", cls: "gold" },
      ],
      results: [
        { icon: "📈", text: "3× qualified leads in 90 days", color: "var(--green)" },
        { icon: "💰", text: "ROAS improved from 1.8 to 4.8", color: "var(--gold)" },
        { icon: "⚡", text: "Full funnel optimisation & CRM setup", color: "var(--blue2)" },
      ],
      chartColor: "#4f8ef7",
    },
    {
      emoji: "🏢", tag: "Local Business",
      title: "Local Business Growth Campaign",
      gradient: "linear-gradient(135deg, #0a1a2e 0%, #1a2e0a 50%, #2e1a0a 100%)",
      metrics: [
        { val: "−38%", label: "Acquisition Cost", cls: "green" },
        { val: "5×", label: "Lead Volume", cls: "gold" },
        { val: "100%", label: "Consistency", cls: "blue" },
        { val: "6mo", label: "Payback Period", cls: "gold" },
      ],
      results: [
        { icon: "📊", text: "Consistent monthly lead flow achieved", color: "var(--green)" },
        { icon: "↓", text: "Acquisition cost reduced by 38%", color: "var(--gold)" },
        { icon: "🚀", text: "Scalable campaign structure built", color: "var(--blue2)" },
      ],
      chartColor: "#f0b429",
    },
  ];
  return (
    <section id="work" className="sec">
      <div className="wrap">
        <div className="label reveal">Case Studies</div>
        <h2 className="about-h2 reveal d1" style={{ maxWidth: 600, marginBottom: 52 }}>
          Real Campaigns.<br />
          <span className="gold-text">Measurable Results.</span>
        </h2>
        <div className="case-grid">
          {cases.map((c, i) => (
            <div key={c.title} className={`case-card reveal d${i + 1}`}>
              <div className="case-top" style={{ background: c.gradient }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontSize: 48, filter: "drop-shadow(0 0 20px rgba(255,255,255,.2))" }}>{c.emoji}</span>
                  {/* Mini chart in case top */}
                  <div style={{ opacity: .7 }}>
                    <MiniBarChart color={c.chartColor} bars={[40,55,48,70,62,80,75,92]} />
                  </div>
                </div>
              </div>
              <div className="case-body">
                <div className="case-tag-pill">{c.tag}</div>
                <h3 className="case-title">{c.title}</h3>
                <div className="case-metrics">
                  {c.metrics.map(m => (
                    <div key={m.label} className="case-metric">
                      <div className={`case-metric-val ${m.cls}`}>{m.val}</div>
                      <div className="case-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
                {c.results.map(r => (
                  <div key={r.text} className="case-result-row">
                    <div className="case-result-icon" style={{ background: `${r.color}22`, color: r.color, border: `1px solid ${r.color}44` }}>{r.icon}</div>
                    <span>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY ME
───────────────────────────────────────────── */
function WhyMe() {
  const reasons = [
    { icon: "🏆", title: "12+ Years", desc: "Deep expertise across all major ad platforms and campaign types." },
    { icon: "📈", title: "ROI Focused", desc: "Every decision tied to your bottom line, not vanity metrics." },
    { icon: "🎯", title: "Lead Quality", desc: "Qualified prospects that actually convert — not just clicks." },
    { icon: "🔬", title: "Data-Driven", desc: "Strategy backed by numbers, not gut feelings or guesswork." },
    { icon: "🤝", title: "Business-First", desc: "Marketing aligned with your sales process and growth goals." },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="label reveal">Why Choose Me</div>
        <h2 className="about-h2 reveal d1" style={{ maxWidth: 600, marginBottom: 52 }}>
          The Difference<br />
          <span className="gold-text">Experience Makes</span>
        </h2>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={r.title} className={`why-card reveal d${i + 1}`}>
              <span className="why-icon">{r.icon}</span>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRICING
───────────────────────────────────────────── */
function Pricing() {
  const plans = [
    { plan: "Starter", price: "₹25,000", period: "/month", features: ["Meta Ads Management", "Weekly Optimisation", "Monthly Reporting", "Campaign Setup", "Audience Research", "Basic Retargeting"] },
    { plan: "Growth", price: "₹50,000", period: "/month", feat: true, badge: "Most Popular", features: ["Meta + Google Ads", "Advanced Retargeting", "Funnel Optimisation", "Bi-weekly Report Calls", "A/B Testing", "Conversion Tracking"] },
    { plan: "Scale", price: "₹1,00,000", period: "/month", features: ["Full Performance Marketing", "Daily Optimisation", "CRM Coordination", "Weekly Strategy Calls", "Scaling Support", "Priority Access"] },
    { plan: "Consulting", price: "₹5,000", period: "/hour", features: ["1-on-1 Strategy Call", "Campaign Audit", "Actionable Roadmap", "Q&A Session", "Follow-up Notes", "Flexible Scheduling"] },
  ];
  return (
    <section id="pricing" className="sec">
      <div className="wrap">
        <div className="label reveal">Pricing</div>
        <h2 className="about-h2 reveal d1" style={{ maxWidth: 600, marginBottom: 52 }}>
          Transparent Pricing.<br />
          <span className="gold-text">No Hidden Costs.</span>
        </h2>
        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div key={p.plan} className={`price-card reveal d${i + 1} ${p.feat ? "feat" : ""}`}>
              {p.badge && <div className="price-badge">{p.badge}</div>}
              <div className="price-plan">{p.plan}</div>
              <div className="price-val">{p.price}</div>
              <div className="price-per">{p.period}</div>
              <ul className="price-features">
                {p.features.map(f => (
                  <li key={f}>
                    <span className="pf-check">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.feat ? "btn-gold" : "btn-ghost"}`} style={{ width: "100%", justifyContent: "center" }}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
function Testimonials() {
  const testimonials = [
    { text: "Manav completely transformed our lead generation. Within 3 months our CPL dropped by 45% and the quality of inquiries improved dramatically. Our admissions tripled.", name: "Priya Sharma", role: "Director, Elite Beauty Academy", init: "P" },
    { text: "We were burning budget on Google Ads with minimal returns. Manav restructured everything and within 6 weeks our ROAS doubled from 2.1 to 4.8. Exceptional expertise.", name: "Rahul Mehta", role: "Founder, EduGrowth Institute", init: "R" },
    { text: "Working with Manav feels like having a full marketing team. He understood our business deeply, set realistic expectations, and delivered consistent results every month.", name: "Sonia Kapoor", role: "Owner, Glow Wellness Clinic", init: "S" },
  ];
  return (
    <section className="sec" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <div className="label reveal">Testimonials</div>
        <h2 className="about-h2 reveal d1" style={{ maxWidth: 600, marginBottom: 52 }}>
          What Clients<br />
          <span className="gold-text">Say</span>
        </h2>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`test-card reveal d${i + 1}`}>
              <div className="test-quote">"</div>
              <div className="test-stars">★★★★★</div>
              <p className="test-text">"{t.text}"</p>
              <div className="test-author">
                <div className="test-av">{t.init}</div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA BAND
───────────────────────────────────────────── */
function CTABand() {
  return (
    <div className="cta-band">
      <Particles />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(240,180,41,.06), transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div className="wrap cta-band-inner">
        <div className="label reveal" style={{ justifyContent: "center", marginBottom: 16 }}>Ready to Scale?</div>
        <h2 className="cta-h2 reveal d1">
          Let's Grow Your Business<br />
          <span className="gold-text">With Performance Marketing</span>
        </h2>
        <p className="cta-sub reveal d2">
          Book a free consultation and discover how data-driven paid media can
          transform your lead generation and ROI.
        </p>
        <div className="cta-btns reveal d3">
          <a href="#contact" className="btn btn-gold">✦ Book Free Consultation</a>
          <a href="https://wa.me/919999692435?text=Hi%20Manav%2C%20I'm%20interested%20in%20your%20services." target="_blank" rel="noreferrer" className="btn btn-ghost">
            💬 WhatsApp Chat
          </a>
          <a href="https://calendly.com" target="_blank" rel="noreferrer" className="btn btn-blue">
            📅 Schedule via Calendly
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────── */
/* ── EmailJS config ─────────────────────────────────────────────────────────
   STEP 1: Sign up free at https://www.emailjs.com
   STEP 2: Add Gmail service → copy Service ID below
   STEP 3: Create email template → copy Template ID below
   STEP 4: Go to Account > Public Key → copy below
   Template variables to add in EmailJS template:
     {{from_name}}  {{from_email}}  {{phone}}
     {{business}}   {{service}}     {{message}}
   Send To email: gargmanav928@gmail.com
──────────────────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

function Contact() {
  const [form, setForm]       = useState({ name:"", email:"", phone:"", business:"", service:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const formRef               = useRef();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const ejs = window.emailjs;
      if (!ejs) throw new Error("EmailJS SDK not loaded");
      await ejs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      setForm({ name:"", email:"", phone:"", business:"", service:"", message:"" });
      setTimeout(() => setSent(false), 8000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please email directly: gargmanav928@gmail.com");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="sec">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <div className="label reveal">Contact</div>
            <h2 className="contact-h2 reveal d1">
              Let's Grow<br />
              <span className="gold-text">Your Business</span>
            </h2>
            <p className="contact-sub reveal d2">
              Ready to scale your leads and ROI? Reach out for a free initial
              consultation and let's discuss how performance marketing can transform your business.
            </p>
            <div className="contact-items reveal d3">
              {[
                { icon: "✉️", label: "Email", val: "gargmanav928@gmail.com", href: "mailto:gargmanav928@gmail.com" },
                { icon: "📞", label: "Phone", val: "+91-9999692435", href: "tel:+919999692435" },
                { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/manav-gargg", href: "https://www.linkedin.com/in/manav-gargg/" },
                { icon: "💬", label: "WhatsApp", val: "Chat directly on WhatsApp", href: "https://wa.me/919999692435" },
                { icon: "📍", label: "Location", val: "India (Serving Clients Worldwide)", href: null },
              ].map(c => c.href ? (
                <a key={c.label} className="contact-item" href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <div className="ci-icon">{c.icon}</div>
                  <div><div className="ci-label">{c.label}</div><div className="ci-val">{c.val}</div></div>
                </a>
              ) : (
                <div key={c.label} className="contact-item">
                  <div className="ci-icon">{c.icon}</div>
                  <div><div className="ci-label">{c.label}</div><div className="ci-val">{c.val}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2">
            {sent ? (
              <div className="form-wrap" style={{ textAlign: "center", padding: "60px 40px" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: "var(--fd)", fontSize: 28, marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: "var(--text2)", fontWeight: 300 }}>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="form-wrap" ref={formRef} onSubmit={onSubmit}>
                <h3 style={{ fontFamily: "var(--fd)", fontSize: 22, marginBottom: 24 }}>Send a Message</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div className="form-row2">
                    <div className="fld">
                      <label className="fld-label">Name</label>
                      <input className="fld-input" name="from_name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" required />
                    </div>
                    <div className="fld">
                      <label className="fld-label">Email</label>
                      <input className="fld-input" type="email" name="from_email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="form-row2">
                    <div className="fld">
                      <label className="fld-label">Phone</label>
                      <input className="fld-input" name="phone" value={form.phone} onChange={onChange} placeholder="+91 xxxxxxxxxx" />
                    </div>
                    <div className="fld">
                      <label className="fld-label">Business Type</label>
                      <input className="fld-input" name="business" value={form.business} onChange={onChange} placeholder="e.g. Beauty Academy" />
                    </div>
                  </div>
                  <div className="fld">
                    <label className="fld-label">Service Interested In</label>
                    <select className="fld-select" name="service" value={form.service} onChange={onChange}>
                      <option value="">Select a service…</option>
                      <option>Meta Ads Management</option>
                      <option>Google Ads Management</option>
                      <option>Lead Generation Strategy</option>
                      <option>Funnel Optimisation</option>
                      <option>Performance Consulting</option>
                      <option>Full Package</option>
                    </select>
                  </div>
                  <div className="fld">
                    <label className="fld-label">Message</label>
                    <textarea className="fld-textarea" name="message" value={form.message} onChange={onChange} placeholder="Tell me about your business and goals…" />
                  </div>
                  {error && (
                    <div style={{ padding: "12px 16px", borderRadius: "var(--r2)", background: "rgba(247,37,133,.1)", border: "1px solid rgba(247,37,133,.3)", color: "#f72585", fontSize: 13 }}>
                      ⚠️ {error}
                    </div>
                  )}
                  <button type="submit" className="btn btn-gold" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "15px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "⏳ Sending…" : "✦ Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Manav<em>.</em></div>
            <div className="footer-tag">Performance Marketing Consultant<br />Meta Ads · Google Ads · Lead Generation</div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/manav-gargg/" target="_blank" rel="noreferrer" className="soc-btn">in</a>
              <a href="https://wa.me/919999692435" target="_blank" rel="noreferrer" className="soc-btn">💬</a>
              <a href="mailto:gargmanav928@gmail.com" className="soc-btn">✉</a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {["About","Services","Case Studies","Pricing","Contact"].map(l => (
                <li key={l}><a href={`#${l.toLowerCase().replace(" ","")}`}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {["Meta Ads Management","Google Ads Management","Lead Generation","Funnel Optimisation","Performance Consulting"].map(s => (
                <li key={s}><a href="#services">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:gargmanav928@gmail.com">gargmanav928@gmail.com</a></li>
              <li><a href="tel:+919999692435">+91-9999692435</a></li>
              <li><a href="https://www.linkedin.com/in/manav-gargg/" target="_blank" rel="noreferrer">LinkedIn Profile</a></li>
              <li><span style={{ color: "var(--text3)" }}>India — Worldwide</span></li>
            </ul>
            <div style={{ marginTop: 24 }}>
              <a href="#contact" className="btn btn-gold" style={{ fontSize: "12px", padding: "11px 22px" }}>Book Consultation</a>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg,transparent,var(--border2),transparent)", marginBottom: 28 }} />
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} Manav Garg. All rights reserved.</div>
          <div className="footer-copy">Performance Marketing · Lead Generation · ROI Growth</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  useReveal();
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <About />
        <DashboardSection />
        <Services />
        <FunnelSection />
        <CaseStudies />
        <WhyMe />
        <Pricing />
        <Testimonials />
        <CTABand />
        <Contact />
      </main>
      <Footer />

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919999692435?text=Hi%20Manav%2C%20I'm%20interested%20in%20your%20performance%20marketing%20services." target="_blank" rel="noreferrer" className="wa-btn" title="Chat on WhatsApp">💬</a>

      {/* Mobile sticky CTA */}
      <div className="sticky-cta">
        <a href="#contact" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>Book Free Consultation</a>
      </div>
    </>
  );
}
