<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<title>Direction 1 — The Convocation Line</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root[data-theme="light"]{
    --bg:#F6F5F2; --surface:#FFFFFF; --surface-2:#EFEDE7;
    --ink:#1C1B29; --ink-soft:#5B5868;
    --indigo:#2E2560; --indigo-soft:#EDEAF7;
    --maroon:#7A1F2B; --maroon-soft:#F7E9EA;
    --gold:#B8862E; --gold-soft:#F7EFDD;
    --green:#2F6B4F;
    --line:#DEDAD0;
    --shadow: 0 1px 2px rgba(28,27,41,0.06), 0 8px 24px rgba(28,27,41,0.05);
  }
  :root[data-theme="dark"]{
    --bg:#14131C; --surface:#1E1C2A; --surface-2:#242235;
    --ink:#EDEAE3; --ink-soft:#A9A5BA;
    --indigo:#8676DE; --indigo-soft:#2A2648;
    --maroon:#C0616D; --maroon-soft:#3A2024;
    --gold:#D9A845; --gold-soft:#3A3121;
    --green:#5FA987;
    --line:#312E42;
    --shadow: 0 1px 2px rgba(0,0,0,0.3), 0 8px 30px rgba(0,0,0,0.35);
  }
  *{box-sizing:border-box; margin:0; padding:0;}
  body{
    font-family:'IBM Plex Sans', sans-serif;
    background:var(--bg); color:var(--ink);
    transition:background .25s ease, color .25s ease;
  }
  .display{font-family:'Fraunces', serif;}
  .mono{font-family:'IBM Plex Mono', monospace; letter-spacing:.02em;}

  .app{display:grid; grid-template-columns:248px 1fr; min-height:100vh;}
  .sidebar{
    border-right:1px solid var(--line); padding:28px 22px; background:var(--surface);
  }
  .brand{display:flex; align-items:center; gap:10px; margin-bottom:36px;}
  .brand-mark{width:34px; height:34px; border-radius:50%; border:1.5px solid var(--gold);
    display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-weight:600; color:var(--gold); font-size:14px;}
  .brand-name{font-family:'Fraunces', serif; font-weight:600; font-size:18px; letter-spacing:.01em;}
  .brand-name span{color:var(--gold);}

  nav a{
    display:flex; align-items:center; gap:12px; padding:11px 12px; border-radius:3px;
    color:var(--ink-soft); text-decoration:none; font-size:14px; margin-bottom:2px;
  }
  nav a.active{ background:var(--indigo-soft); color:var(--indigo); font-weight:600; }
  nav a .dot{width:5px; height:5px; border-radius:50%; background:currentColor; opacity:.5;}

  .seal-card{margin-top:40px; padding:16px; border:1px solid var(--line); border-radius:4px; background:var(--surface-2);}
  .seal-card .label{font-size:10px; text-transform:uppercase; letter-spacing:.12em; color:var(--ink-soft); margin-bottom:8px;}
  .id-badge{display:flex; align-items:center; gap:10px;}
  .id-ring{width:38px; height:38px; border-radius:50%; border:2px solid var(--indigo); display:flex; align-items:center; justify-content:center; font-family:'Fraunces',serif; font-weight:600; color:var(--indigo); font-size:13px; flex-shrink:0;}
  .id-text .mono{font-size:11.5px; color:var(--ink);}
  .id-text .role{font-size:10.5px; color:var(--ink-soft); margin-top:2px;}

  main{padding:36px 48px 80px;}
  header.top{display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px; border-bottom:1px solid var(--line); padding-bottom:20px;}
  header.top h1{font-family:'Fraunces', serif; font-weight:500; font-size:30px;}
  header.top p{color:var(--ink-soft); font-size:14px; margin-top:6px;}
  .toggle{border:1px solid var(--line); background:var(--surface); color:var(--ink); padding:8px 14px; border-radius:3px; font-size:12.5px; cursor:pointer; font-family:'IBM Plex Sans';}

  .filters{display:flex; gap:8px; margin-bottom:28px;}
  .chip{padding:8px 16px; border-radius:3px; border:1px solid var(--line); font-size:13px; color:var(--ink-soft); cursor:pointer; background:var(--surface);}
  .chip.active{background:var(--indigo); border-color:var(--indigo); color:#fff;}

  .grid{display:grid; grid-template-columns:1fr 1fr; gap:20px;}
  .card{
    background:var(--surface); border:1px solid var(--line); border-radius:4px;
    padding:22px; box-shadow:var(--shadow); position:relative;
  }
  .card .kicker{font-size:10.5px; text-transform:uppercase; letter-spacing:.12em; color:var(--ink-soft); margin-bottom:10px; display:flex; align-items:center; gap:8px;}
  .kicker .rule{width:16px; height:1px; background:var(--gold);}
  .card h3{font-family:'Fraunces', serif; font-weight:500; font-size:19px; margin-bottom:8px; line-height:1.3;}
  .card p.desc{font-size:13.5px; color:var(--ink-soft); line-height:1.55; margin-bottom:16px;}
  .meta-row{display:flex; gap:14px; flex-wrap:wrap; margin-bottom:16px;}
  .meta{font-size:11.5px; color:var(--ink-soft); display:flex; gap:5px; align-items:center;}
  .meta b{color:var(--ink); font-weight:600;}
  .card-foot{display:flex; justify-content:space-between; align-items:center; padding-top:14px; border-top:1px solid var(--line);}
  .poster{display:flex; align-items:center; gap:8px;}
  .poster .id-ring{width:28px; height:28px; font-size:10px;}
  .poster-name{font-size:12.5px; font-weight:600;}
  .poster-role{font-size:10.5px; color:var(--ink-soft);}
  .btn{background:var(--indigo); color:#fff; border:none; padding:9px 16px; border-radius:3px; font-size:12.5px; font-weight:600; cursor:pointer;}
  .badge-role{position:absolute; top:22px; right:22px; font-size:9.5px; text-transform:uppercase; letter-spacing:.1em; padding:4px 8px; border-radius:2px;}
  .badge-role.gold{background:var(--gold-soft); color:var(--gold); border:1px solid var(--gold);}
  .badge-role.maroon{background:var(--maroon-soft); color:var(--maroon); border:1px solid var(--maroon);}
  .badge-role.green{background:var(--gold-soft); color:var(--green); border:1px solid var(--green);}

  .post-card{grid-column:1 / -1; display:flex; gap:16px; align-items:center; background:var(--indigo-soft); border:1px solid var(--indigo); border-radius:4px; padding:18px 22px;}
  .post-card .id-ring{width:44px; height:44px; font-size:15px; background:var(--surface);}
  .post-card .txt b{font-family:'Fraunces',serif;}
  .post-card .txt p{font-size:13px; color:var(--ink-soft); margin-top:3px;}
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">FV</div>
      <div class="brand-name">FUTA<span>Verse</span></div>
    </div>
    <nav>
      <a href="#" class="active"><span class="dot"></span>Feed</a>
      <a href="#"><span class="dot"></span>Mentorship</a>
      <a href="#"><span class="dot"></span>Internships</a>
      <a href="#"><span class="dot"></span>Events</a>
      <a href="#"><span class="dot"></span>Posts</a>
      <a href="#"><span class="dot"></span>Messages</a>
    </nav>
    <div class="seal-card">
      <div class="label">Verified Record</div>
      <div class="id-badge">
        <div class="id-ring">CE</div>
        <div class="id-text">
          <div class="mono">FUTA/22/CPE/0142</div>
          <div class="role">Computer Engineering · 400L</div>
        </div>
      </div>
    </div>
  </aside>
  <main>
    <header class="top">
      <div>
        <h1>Good afternoon, Chidinma</h1>
        <p>New from the alumni network since your last visit</p>
      </div>
      <button class="toggle" onclick="const r=document.documentElement; r.setAttribute('data-theme', r.getAttribute('data-theme')==='light'?'dark':'light')">Toggle light / dark</button>
    </header>

    <div class="filters">
      <div class="chip active">All</div>
      <div class="chip">Opportunities</div>
      <div class="chip">Mentorship</div>
      <div class="chip">Events</div>
      <div class="chip">Posts</div>
    </div>

    <div class="grid">
      <div class="card">
        <span class="badge-role gold">Mentorship</span>
        <div class="kicker"><span class="rule"></span>Product &amp; Design</div>
        <h3>Product Management Mentorship — Cohort 3</h3>
        <p class="desc">A structured 8-week program for students exploring product roles, with weekly sessions and a capstone case study.</p>
        <div class="meta-row">
          <div class="meta">Mode <b>Remote</b></div>
          <div class="meta">Duration <b>8 weeks</b></div>
          <div class="meta">Slots <b>6 of 10 open</b></div>
        </div>
        <div class="card-foot">
          <div class="poster">
            <div class="id-ring">TA</div>
            <div>
              <div class="poster-name">Tomiwa Adebayo</div>
              <div class="poster-role mono">FUTA/16 · PM, Paystack</div>
            </div>
          </div>
          <button class="btn">Apply</button>
        </div>
      </div>

      <div class="card">
        <span class="badge-role maroon">Internship</span>
        <div class="kicker"><span class="rule"></span>Engineering</div>
        <h3>Backend Engineering Intern</h3>
        <p class="desc">Join a 6-person platform team building payment infrastructure for SMEs across West Africa.</p>
        <div class="meta-row">
          <div class="meta">Location <b>Lagos (Hybrid)</b></div>
          <div class="meta">Stipend <b>₦150,000/mo</b></div>
          <div class="meta">Level <b>300L+</b></div>
        </div>
        <div class="card-foot">
          <div class="poster">
            <div class="id-ring">OK</div>
            <div>
              <div class="poster-name">Ope Kolawole</div>
              <div class="poster-role mono">FUTA/14 · CTO, Squad</div>
            </div>
          </div>
          <button class="btn">Apply</button>
        </div>
      </div>

      <div class="card">
        <span class="badge-role green">Event</span>
        <div class="kicker"><span class="rule"></span>Career Fair</div>
        <h3>FUTA Career Fair 2026</h3>
        <p class="desc">Meet recruiters from twelve alumni-founded companies. Physical event at the FUTA Convocation Arena.</p>
        <div class="meta-row">
          <div class="meta">Date <b>14 Sept</b></div>
          <div class="meta">Format <b>Physical</b></div>
          <div class="meta">Ticket <b>₦2,000</b></div>
        </div>
        <div class="card-foot">
          <div class="poster">
            <div class="id-ring">AU</div>
            <div>
              <div class="poster-name">FUTA Alumni Assoc.</div>
              <div class="poster-role mono">Verified Organiser</div>
            </div>
          </div>
          <button class="btn">Get ticket</button>
        </div>
      </div>

      <div class="card">
        <span class="badge-role gold">Mentorship</span>
        <div class="kicker"><span class="rule"></span>Data &amp; Analytics</div>
        <h3>Applied Data Science Circle</h3>
        <p class="desc">Small-group mentorship pairing three students with a working data scientist over one semester.</p>
        <div class="meta-row">
          <div class="meta">Mode <b>Virtual</b></div>
          <div class="meta">Duration <b>1 semester</b></div>
          <div class="meta">Slots <b>2 of 3 open</b></div>
        </div>
        <div class="card-foot">
          <div class="poster">
            <div class="id-ring">NF</div>
            <div>
              <div class="poster-name">Ngozi Falade</div>
              <div class="poster-role mono">FUTA/18 · DS, Flutterwave</div>
            </div>
          </div>
          <button class="btn">Apply</button>
        </div>
      </div>

      <div class="post-card">
        <div class="id-ring">BD</div>
        <div class="txt">
          <b>Bolu Damilare</b> completed the <b>UI/UX Foundations</b> mentorship — 12 weeks, closed out today.
          <p>Recorded to the FUTAVerse engagement ledger · shared with 214 alumni</p>
        </div>
      </div>
    </div>
  </main>
</div>
</body>
</html>