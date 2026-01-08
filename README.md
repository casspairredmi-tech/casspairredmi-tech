## Hi there 👋
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Gestion Projets — Tâches • Paiements • Factures</title>
  <style>
    :root{
      --bg:#0b1020;
      --card:#111a33;
      --text:#eaf0ff;
      --muted:rgba(234,240,255,.74);
      --line:rgba(255,255,255,.12);
      --shadow: 0 10px 30px rgba(0,0,0,.35);
      --radius: 18px;
      --pad: 16px;
      --focus: rgba(96,165,250,.65);
      --good:#6ee7b7;
      --warn:#fbbf24;
      --bad:#fb7185;
      --info:#60a5fa;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      color:var(--text);
      background:
        radial-gradient(1200px 600px at 20% 0%, rgba(96,165,250,.25), transparent 60%),
        radial-gradient(900px 500px at 90% 30%, rgba(110,231,183,.18), transparent 55%),
        var(--bg);
    }
    a{color:inherit}
    .container{max-width:1320px;margin:0 auto;padding:18px}

    /* Topbar */
    .topbar{
      position:sticky;top:0;z-index:80;
      backdrop-filter: blur(10px);
      background: rgba(11,16,32,.74);
      border-bottom:1px solid var(--line);
    }
    .topbar-inner{
      max-width:1320px;margin:0 auto;padding:12px 18px;
      display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;
    }
    .brand{display:flex;align-items:center;gap:10px;min-width:260px}
    .logo{
      width:40px;height:40px;border-radius:14px;
      background: linear-gradient(135deg, rgba(96,165,250,.95), rgba(110,231,183,.88));
      box-shadow:0 10px 20px rgba(0,0,0,.35);
      flex: 0 0 auto;
    }
    .brand h1{font-size:15px;margin:0}
    .brand p{margin:0;font-size:12px;color:rgba(234,240,255,.72)}
    .top-actions{display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:flex-end}

    .nav{
      display:flex;gap:8px;align-items:center;flex-wrap:wrap;
      border:1px solid var(--line);
      background: rgba(255,255,255,.05);
      border-radius: 14px;
      padding: 6px;
    }
    .tab{
      border:1px solid transparent;
      background: transparent;
      color: rgba(234,240,255,.86);
      padding: 9px 10px;
      border-radius: 12px;
      cursor:pointer;
      font-weight: 850;
      white-space:nowrap;
    }
    .tab:hover{background:rgba(255,255,255,.06)}
    .tab.active{
      background: rgba(96,165,250,.18);
      border-color: rgba(96,165,250,.30);
      color: rgba(234,240,255,.95);
    }

    .inline{
      display:flex;gap:10px;align-items:center;flex-wrap:wrap;
      border:1px solid var(--line);border-radius:14px;padding:8px 10px;
      background: rgba(255,255,255,.05);
    }
    .inline label{margin:0;font-size:12px;color:rgba(234,240,255,.75)}
    .inline select{
      padding:8px 10px;border-radius:12px;border:1px solid var(--line);
      background: rgba(5,10,25,.35);color:var(--text);outline:none;
    }
    .inline select:focus{border-color:var(--focus);box-shadow:0 0 0 4px rgba(96,165,250,.15)}

    /* Buttons + dropdown */
    .btn{
      border:1px solid var(--line);
      background: rgba(255,255,255,.07);
      color: var(--text);
      padding: 10px 12px;
      border-radius: 12px;
      cursor:pointer;
      font-weight: 900;
      display:inline-flex;align-items:center;gap:8px;
      white-space:nowrap;
    }
    .btn.primary{background: rgba(96,165,250,.20)}
    .btn.good{background: rgba(110,231,183,.16)}
    .btn.warn{background: rgba(251,191,36,.16)}
    .btn.danger{background: rgba(251,113,133,.18)}
    .btn:hover{filter:brightness(1.08)}
    .btn:disabled{opacity:.55;cursor:not-allowed;filter:none}

    .dropdown{position:relative}
    .menu{
      position:absolute;right:0;top:calc(100% + 8px);
      min-width:300px;
      background: rgba(17,26,51,.96);
      border:1px solid var(--line);
      border-radius:14px;
      box-shadow: var(--shadow);
      padding:8px;
      display:none;
    }
    .menu.open{display:block}
    .menu button{
      width:100%;
      text-align:left;
      padding:10px 10px;
      border-radius:12px;
      border:1px solid transparent;
      background:transparent;
      color:rgba(234,240,255,.9);
      cursor:pointer;
      font-weight:800;
    }
    .menu button:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.10)}
    .menu small{display:block;color:rgba(234,240,255,.62);font-weight:550;margin-top:2px}
    .hr{height:1px;background:var(--line);margin:10px 0}

    /* Sections */
    .section{display:none}
    .section.active{display:block}

    .card{
      background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.03));
      border:1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: var(--pad);
      overflow:hidden;
    }
    .card h2{margin:0 0 12px;font-size:16px}
    .muted{color:rgba(234,240,255,.72);font-size:12px;line-height:1.55;margin:8px 0 0}
    .note{color:rgba(234,240,255,.7);font-size:12px;line-height:1.5;margin-top:10px}

    .grid{display:grid;gap:14px;grid-template-columns: 1.15fr .85fr}
    @media (max-width: 980px){ .grid{grid-template-columns:1fr} }
    .grid2{display:grid;gap:14px;grid-template-columns: 1fr 1fr}
    @media (max-width: 980px){ .grid2{grid-template-columns:1fr} }

    /* Form */
    label{display:block;font-size:12px;color:rgba(234,240,255,.75);margin-bottom:6px}
    input, select, textarea{
      width:100%;
      padding:10px 12px;
      border-radius:12px;
      border:1px solid var(--line);
      background: rgba(5,10,25,.35);
      color:var(--text);
      outline:none;
    }
    textarea{min-height: 40px; resize: vertical;}
    input:focus, select:focus, textarea:focus{
      border-color:var(--focus);
      box-shadow: 0 0 0 4px rgba(96,165,250,.15);
    }
    .row{
      display:grid;gap:10px;
      grid-template-columns: 1fr 1.4fr 1fr 1fr 1fr 1fr;
      align-items:end;
    }
    .row3{
      display:grid;gap:10px;
      grid-template-columns: 1fr 1fr 1fr;
      align-items:end;
    }
    @media (max-width: 980px){
      .row{grid-template-columns:1fr 1fr}
      .row3{grid-template-columns:1fr}
      .full{grid-column:1/-1}
    }
    .form-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
    details{
      border:1px solid var(--line);
      border-radius:14px;
      background: rgba(255,255,255,.04);
      padding: 10px 12px;
      margin-top: 12px;
    }
    summary{cursor:pointer;font-weight:900;color:rgba(234,240,255,.9)}
    details .muted{margin:6px 0 0}

    /* KPIs */
    .kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:12px}
    @media (max-width: 1180px){ .kpis{grid-template-columns:repeat(3,1fr)} }
    @media (max-width: 720px){ .kpis{grid-template-columns:1fr 1fr} }
    .kpi{border:1px solid var(--line);background:rgba(255,255,255,.05);border-radius:14px;padding:10px 12px}
    .kpi .v{font-size:18px;font-weight:950}
    .kpi .l{font-size:12px;color:rgba(234,240,255,.7);margin-top:2px}
    .money{font-variant-numeric: tabular-nums;}
    .kpi.bad .v{color:rgba(251,113,133,.95)}
    .kpi.good .v{color:rgba(110,231,183,.95)}
    .kpi.warn .v{color:rgba(251,191,36,.95)}
    .kpi.info .v{color:rgba(96,165,250,.95)}

    /* Table */
    .tablewrap{
      overflow:auto;border-radius:14px;border:1px solid var(--line);
      background:rgba(0,0,0,.12);
    }
    table{width:100%;border-collapse:collapse;min-width:1400px}
    th,td{padding:10px 10px;border-bottom:1px solid var(--line);text-align:left;font-size:13px;vertical-align:middle}
    th{
      font-size:12px;color:rgba(234,240,255,.75);
      background:rgba(255,255,255,.05);
      position:sticky;top:0;z-index:2;
      white-space:nowrap;
    }
    tr:last-child td{border-bottom:none}
    tr:hover td{filter: brightness(1.03)}
    .actionsCell{display:flex;gap:8px;flex-wrap:wrap}
    .chip{
      display:inline-flex;align-items:center;gap:8px;
      padding:4px 10px;border-radius:999px;border:1px solid var(--line);
      font-size:12px;background:rgba(255,255,255,.06);white-space:nowrap;
    }
    .dot{width:10px;height:10px;border-radius:999px;background:var(--info);box-shadow:0 0 0 3px rgba(96,165,250,.15)}
    .chk{width:16px;height:16px}
    .badge{
      display:inline-flex;align-items:center;gap:8px;padding:4px 10px;border-radius:999px;
      border:1px solid var(--line);font-size:12px;font-weight:900;white-space:nowrap;
    }
    td[data-edit]{cursor:pointer}
    td[data-edit]:hover{outline: 2px solid rgba(255,255,255,.08); outline-offset:-2px; border-radius:10px}

    /* Row coloring by task status */
    tr[data-tstatus="À faire"] td{ background: rgba(148,163,184,.06); }
    tr[data-tstatus="En cours"] td{ background: rgba(96,165,250,.10); }
    tr[data-tstatus="Bloquée"] td{ background: rgba(251,113,133,.12); }
    tr[data-tstatus="Terminée"] td{ background: rgba(110,231,183,.12); }

    tfoot td{
      background: rgba(0,0,0,.22);
      font-weight:900;
      position: sticky;
      bottom: 0;
      z-index: 1;
    }

    /* Charts */
    .canvasWrap{display:grid;gap:14px;grid-template-columns:1fr 1fr}
    @media (max-width: 980px){ .canvasWrap{grid-template-columns:1fr} }
    canvas{
      width:100%;
      height:320px;
      display:block;
      border-radius:14px;
      border:1px solid var(--line);
      background: rgba(0,0,0,.14);
    }
    .legend{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
    .pill{
      display:inline-flex;align-items:center;gap:8px;
      padding:6px 10px;border-radius:999px;border:1px solid var(--line);
      background:rgba(255,255,255,.06);
      font-size:12px;color:rgba(234,240,255,.9)
    }

    /* Calendar */
    .calWrap{display:grid;gap:14px;grid-template-columns: 1.05fr .95fr;align-items:start}
    @media (max-width: 980px){ .calWrap{grid-template-columns:1fr} }
    .calHeader{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
    .calTitle{font-weight:950}
    .calGrid{
      display:grid;
      grid-template-columns: repeat(7,1fr);
      gap:8px;
      margin-top:10px;
    }
    .calDow{
      font-size:12px;color:rgba(234,240,255,.65);
      text-align:center;
      padding:6px 0;
    }
    .day{
      border:1px solid var(--line);
      background: rgba(255,255,255,.04);
      border-radius:14px;
      padding:10px;
      min-height: 86px;
      cursor:pointer;
      position:relative;
      overflow:hidden;
    }
    .day:hover{filter:brightness(1.06)}
    .day.mutedDay{opacity:.55}
    .day.today{outline: 2px solid rgba(96,165,250,.45); outline-offset: 2px;}
    .day.selected{outline: 2px solid rgba(110,231,183,.50); outline-offset: 2px;}
    .dayNum{font-weight:950}
    .dayBadges{position:absolute;right:10px;top:10px;display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}
    .mini{
      font-size:11px;
      padding:4px 8px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background: rgba(0,0,0,.18);
      color: rgba(234,240,255,.9);
      white-space:nowrap;
    }
    .mini.bad{background: rgba(251,113,133,.14); border-color: rgba(251,113,133,.25)}
    .mini.warn{background: rgba(251,191,36,.14); border-color: rgba(251,191,36,.25)}
    .mini.good{background: rgba(110,231,183,.14); border-color: rgba(110,231,183,.25)}
    .mini.info{background: rgba(96,165,250,.14); border-color: rgba(96,165,250,.25)}
    .listItem{
      border:1px solid var(--line);
      background: rgba(255,255,255,.04);
      border-radius:14px;
      padding:10px;
      margin-top:10px;
    }
    .listItem h3{margin:0 0 6px;font-size:13px}
    .listItem .meta{font-size:12px;color:rgba(234,240,255,.72);line-height:1.4}
    .toast{
      position:fixed;
      right:14px; bottom:14px;
      background: rgba(17,26,51,.94);
      border:1px solid var(--line);
      border-radius: 14px;
      box-shadow: var(--shadow);
      padding:10px 12px;
      color: rgba(234,240,255,.92);
      font-size: 12px;
      opacity:0;
      transform: translateY(10px);
      transition: all .2s ease;
      pointer-events:none;
      max-width: 360px;
      z-index: 200;
    }
    .toast.show{opacity:1; transform: translateY(0);}
    .kbd{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 11px;
      border:1px solid rgba(255,255,255,.14);
      border-radius: 8px;
      padding: 2px 6px;
      background: rgba(0,0,0,.20);
      color: rgba(234,240,255,.90);
    }
  
    /* Spreadsheet focus */
    td[data-edit]{outline:0}
    td[data-edit].cellFocus{
      outline: 2px solid rgba(96,165,250,.45);
      outline-offset:-2px;
      border-radius:10px;
      position:relative;
    }
    td[data-edit].cellFocus::after{
      content:"";
      position:absolute; inset: -1px;
      border-radius:10px;
      pointer-events:none;
      box-shadow: 0 0 0 3px rgba(96,165,250,.12);
    }

    /* Drag & drop highlight for calendar */
    .day.dragOver{
      outline: 2px dashed rgba(110,231,183,.55);
      outline-offset: 2px;
    }

    /* Modal */
    .modalOverlay{
      position:fixed; inset:0;
      background: rgba(0,0,0,.55);
      display:none;
      align-items:center; justify-content:center;
      z-index: 250;
      padding: 14px;
    }
    .modalOverlay.open{display:flex}
    .modal{
      width:min(980px, 100%);
      max-height: min(86vh, 920px);
      overflow:auto;
      background: rgba(17,26,51,.98);
      border:1px solid rgba(255,255,255,.14);
      border-radius: 18px;
      box-shadow: 0 18px 50px rgba(0,0,0,.45);
      padding: 14px;
    }
    .modalHead{
      display:flex; align-items:flex-start; justify-content:space-between; gap:10px; flex-wrap:wrap;
      margin-bottom: 10px;
    }
    .modalHead h2{margin:0;font-size:16px}
    .modalHead .muted{margin:4px 0 0}
    .xbtn{padding:10px 12px;border-radius:12px}
    .miniTable table{min-width:auto}
    .miniTable th,.miniTable td{padding:8px 8px}
    .badgeSoft{
      display:inline-flex; align-items:center; gap:8px;
      border-radius:999px; padding:6px 10px;
      border:1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.06);
      font-size: 12px;
      font-weight: 850;
      white-space: nowrap;
    }
    .toggle{
      display:inline-flex; gap:6px; border:1px solid rgba(255,255,255,.14);
      background: rgba(255,255,255,.05);
      padding: 5px; border-radius: 14px;
    }
    .toggle button{
      padding:8px 10px;border-radius:12px;border:1px solid transparent;background:transparent;
      color: rgba(234,240,255,.88);cursor:pointer;font-weight:900;
    }
    .toggle button.active{
      background: rgba(110,231,183,.16);
      border-color: rgba(110,231,183,.30);
      color: rgba(234,240,255,.95);
    }


    /* Notion/ClickUp inspired UI */
    .viewbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid rgba(255,255,255,.10);background: rgba(255,255,255,.05);border-radius:16px;margin:10px 0 12px;}
    .viewbar .left,.viewbar .right{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
    .pill{border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.06);padding:8px 10px;border-radius:999px;font-weight:900;cursor:pointer;user-select:none;}
    .pill.active{border-color: rgba(110,231,183,.30);background: rgba(110,231,183,.14);}
    .inputSmall{padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background: rgba(12,18,35,.55);color: rgba(234,240,255,.92);min-width:220px;}
    .chip{display:inline-flex;align-items:center;gap:8px;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.05);font-weight:900;font-size:12px;white-space:nowrap;}
    .tag{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.06);font-size:12px;font-weight:850;}
    .progressBar{height:10px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.06);overflow:hidden;min-width:120px;}
    .progressBar>div{height:100%;background: rgba(110,231,183,.55);width:0%;}

    .board{display:grid;grid-template-columns:repeat(4,minmax(240px,1fr));gap:12px;overflow:auto;padding-bottom:10px;}
    @media (max-width:1100px){.board{grid-template-columns:repeat(2,minmax(240px,1fr));}}
    @media (max-width:720px){.board{grid-template-columns:1fr;}}
    .col{border:1px solid rgba(255,255,255,.12);background: rgba(255,255,255,.04);border-radius:18px;padding:10px;min-height:260px;}
    .colHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:10px;}
    .colTitle{font-weight:950;letter-spacing:.2px}
    .colCount{opacity:.8;font-weight:900}
    .cardTask{border:1px solid rgba(255,255,255,.14);background: rgba(17,26,51,.86);border-radius:16px;padding:10px;margin-bottom:10px;cursor:grab;}
    .cardTask:active{cursor:grabbing}
    .cardTask h4{margin:0 0 6px;font-size:13px;line-height:1.2;}
    .cardMeta{display:flex;flex-wrap:wrap;gap:6px;font-size:12px;opacity:.92;align-items:center;}
    .dropOver{outline:2px dashed rgba(110,231,183,.55);outline-offset:2px;}

    .drawerOverlay{position:fixed;inset:0;background: rgba(0,0,0,.45);display:none;z-index:260;}
    .drawerOverlay.open{display:block}
    .drawer{position:fixed;top:0;right:0;width:min(520px,94vw);height:100vh;background: rgba(10,15,30,.98);border-left:1px solid rgba(255,255,255,.14);box-shadow:-18px 0 40px rgba(0,0,0,.35);transform:translateX(100%);transition:transform .2s ease;z-index:261;display:flex;flex-direction:column;}
    .drawer.open{transform:translateX(0)}
    .drawerHead{padding:14px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;border-bottom:1px solid rgba(255,255,255,.10);}
    .drawerHead h2{margin:0;font-size:15px}
    .drawerBody{padding:14px;overflow:auto;display:flex;flex-direction:column;gap:12px;}
    .drawerGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .drawerGrid .full{grid-column:1/-1;}
    .textarea{width:100%;min-height:90px;resize:vertical;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background: rgba(12,18,35,.55);color: rgba(234,240,255,.92);}
    .listMini{display:flex;flex-direction:column;gap:8px;}
    .lineMini{display:flex;gap:8px;align-items:center;justify-content:space-between;border:1px solid rgba(255,255,255,.12);background: rgba(255,255,255,.04);border-radius:14px;padding:8px 10px;}
    .mutedSmall{opacity:.78;font-size:12px}
    .btnGhost{border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.03);}

    .timeline{border:1px solid rgba(255,255,255,.12);background: rgba(255,255,255,.04);border-radius:18px;padding:12px;overflow:auto;}
    .tlRow{display:grid;grid-template-columns:280px 1fr;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08);min-width:900px;}
    .tlRow:last-child{border-bottom:none}
    .tlName{font-weight:950;}
    .tlTrack{position:relative;height:18px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background: rgba(255,255,255,.06);overflow:hidden;}
    .tlBar{position:absolute;top:0;bottom:0;background: rgba(96,165,250,.45);border-right:2px solid rgba(110,231,183,.65);border-radius:999px;}

</style>
</head>
<body>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <div class="logo" aria-hidden="true"></div>
        <div>
          <h1>Gestion Projets</h1>
          <p>Tâches • Paiements • Factures • Tableaux éditables</p>
        </div>
      </div>

      <div class="top-actions">
        <div class="nav" role="tablist" aria-label="Navigation">
          <button class="tab" data-view="home">Accueil</button>
          <button class="tab" data-view="tasks">Tâches</button>
          <button class="
<!--
**casspairredmi-tech/casspairredmi-tech** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
