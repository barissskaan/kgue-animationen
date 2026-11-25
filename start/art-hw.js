(function () {
  'use strict';

  const pins = Array.from({ length: 14 }, (_, i) => {
    const x = 126 + i * 12;
    const y = 136 + i * 12;
    return `<rect x="${x}" y="108" width="4" height="20" rx="2"/>
      <rect x="${x}" y="304" width="4" height="20" rx="2"/>
      <rect x="92" y="${y}" width="26" height="4" rx="2"/>
      <rect x="294" y="${y}" width="26" height="4" rx="2"/>`;
  }).join('');

  const cells = Array.from({ length: 36 }, (_, i) => {
    const row = Math.floor(i / 6);
    const col = i % 6;
    return `<rect class="die-cell${[4, 13, 22, 27].includes(i) ? ' live' : ''}"
      x="${158 + col * 16}" y="${166 + row * 16}" width="16" height="16"
      style="--phase:${-(row + col) * 0.12}s;--idle:${-i * 0.7}s"/>`;
  }).join('');

  const sticks = Array.from({ length: 4 }, (_, stick) => {
    const x = 438 + stick * 64;
    const chips = Array.from({ length: 6 }, (_, chip) => `<g>
      <path class="ram-leads detail" d="M${x + 6} ${112 + chip * 22}h4m-4 6h4m34-6h4m-4 6h4"/>
      <rect class="memory-chip" x="${x + 10}" y="${106 + chip * 22}" width="34" height="16" rx="2"
        style="--scan:${-(stick * 6 + chip) / 3}s;--burst:${-(chip + stick * 2) * 0.12}s"/>
      <path class="chip-mark detail" d="M${x + 16} ${112 + chip * 22}h8"/>
    </g>`).join('');
    const contacts = Array.from({ length: 11 }, (_, i) => `<rect x="${x + 6 + i * 4}" y="244" width="2" height="12" rx="0"/>`).join('');
    return `<g class="ram-stick">
      <rect class="stick-shadow" x="${x + 2}" y="100" width="54" height="162" rx="6"/>
      <rect class="stick-board" x="${x}" y="96" width="54" height="162" rx="6"/>
      <path class="stick-rail detail" d="M${x + 4} 104v132h46V104"/>
      ${chips}
      <path class="contact-bed" d="M${x + 4} 242h46v12q0 4-4 4h-38q-4 0-4-4Z"/>
      <g class="gold-contacts">${contacts}</g>
      <path class="stick-notch" d="M${x + 30} 258v-8h4v8"/>
      <circle class="solder" cx="${x + 6}" cy="100" r="2"/>
      <circle class="solder" cx="${x + 48}" cy="100" r="2"/>
    </g>`;
  }).join('');

  const buses = Array.from({ length: 8 }, (_, i) => {
    const d = `M320 ${138 + i * 12}H338L354 ${122 + i * 12}H406L430 ${146 + i * 12}H438`;
    return `<path class="bus-copper" d="${d}"/>
      <path class="bus-data" d="${d}" style="--flow:${-i * 0.28}s"/>
      <circle class="solder bus-pad" cx="326" cy="${138 + i * 12}" r="2"/>`;
  }).join('');

  const requests = Array.from({ length: 6 }, (_, i) => `<path d="M${164 + i * 12} 26V54L${128 + i * 12} 90V108"/>
    <circle class="solder" cx="${164 + i * 12}" cy="28" r="2"/>`).join('');

  const holes = [[32, 32], [728, 32], [32, 408], [728, 408]].map(([x, y]) => `<g>
    <circle class="mount-ring" cx="${x}" cy="${y}" r="8"/>
    <circle class="mount-hole" cx="${x}" cy="${y}" r="4"/>
  </g>`).join('');

  const capacitors = [[56, 148], [56, 204], [56, 260], [648, 328], [686, 328]].map(([x, y]) => `<g>
    <path class="component-leads" d="M${x} ${y - 16}v32"/>
    <circle class="capacitor-body" cx="${x}" cy="${y}" r="12"/>
    <circle class="capacitor-top" cx="${x}" cy="${y}" r="8"/>
    <path class="capacitor-score detail" d="M${x - 4} ${y}h8m-4-4v8"/>
  </g>`).join('');

  const resistors = Array.from({ length: 6 }, (_, i) => {
    const x = 108 + i * 22;
    return `<g><path class="component-leads" d="M${x + 4} 352v36"/>
      <rect class="resistor" x="${x}" y="360" width="8" height="20" rx="2"/>
      <path class="resistor-band detail" d="M${x} 366h8m-8 8h8"/></g>`;
  }).join('');

  (window.GIN3_ART = window.GIN3_ART || {}).hw = {
    edge: '#08130f',
    svg: `<svg class="art art-hw" viewBox="0 0 760 440" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="760" height="440" rx="22" fill="#0f1f1a"/>
      <defs>
        <linearGradient id="hw-package" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#272c2e"/><stop offset="100%" stop-color="#121416"/>
        </linearGradient>
        <linearGradient id="hw-metal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#b9bec6"/><stop offset="50%" stop-color="#7d898b"/>
          <stop offset="100%" stop-color="#a8afb7"/>
        </linearGradient>
      </defs>

      <g class="board-outline"><rect x="24" y="24" width="712" height="392" rx="14"/></g>
      <g class="traces">
        ${requests}
        <path d="M248 28v30l38 38h54m-80-68v24l38 38h42"/>
        <path d="M56 72h36l16-16h28M56 84h40l16-16h12"/>
        <path d="M304 48h88l24 24v22m-100-34h70l18 18v16"/>
        <path d="M464 28v18h172l24 24v14m-184-56v6h168l28 28v22"/>
        <path d="M708 108h12v162l-20 20h-82m90-170v142l-16 16h-74"/>
        <path d="M56 280v36l20 20v54h-20m12-110v28l20 20v70H56"/>
        <path d="M272 324v16h134l24 24m-146-40v4h128l18 18"/>
        <path d="M236 364h52l18 18h90l16-16h18m-194 10h46l18 18h102l10-10h18"/>
        <path d="M600 352h20l16 16h80m-116-4h16l16 16h84"/>
        <path d="M476 404h174l14-14h52"/>
      </g>
      <g class="vias">
        <circle cx="340" cy="96" r="3"/><circle cx="340" cy="90" r="2"/>
        <circle cx="416" cy="96" r="3"/><circle cx="404" cy="96" r="2"/>
        <circle cx="56" cy="72" r="3"/><circle cx="56" cy="84" r="2"/>
        <circle cx="618" cy="290" r="3"/><circle cx="618" cy="278" r="2"/>
        <circle cx="716" cy="368" r="3"/><circle cx="716" cy="380" r="2"/>
        <circle cx="476" cy="404" r="3"/><circle cx="56" cy="398" r="3"/>
      </g>

      <g class="bus">${buses}</g>

      <g class="cpu" data-stop="cpu">
        <rect class="socket" x="100" y="114" width="212" height="208" rx="12"/>
        <path class="socket-mark detail" d="M106 132v-10h10m180 0h10v10m0 170v12h-10m-180 0h-10v-12"/>
        <g class="processor-pins">${pins}</g>
        <rect class="package-shadow" x="118" y="130" width="180" height="180" rx="10"/>
        <rect class="processor-package" x="116" y="126" width="180" height="180" rx="10"/>
        <rect class="package-rim detail" x="124" y="134" width="164" height="164" rx="6"/>
        <path class="orientation-mark" d="M128 144v10h10Z"/>
        <rect class="die-surround" x="144" y="152" width="124" height="124" rx="6"/>
        <rect class="die" x="148" y="156" width="116" height="116" rx="4"/>
        <g class="die-grid detail">${cells}</g>
        <path class="die-registration detail" d="M152 160h4m100 0h4m-108 108h4m100 0h4"/>
        <text class="cpu-print" x="206" y="294" text-anchor="middle">CPU</text>
        <circle class="package-dot" cx="276" cy="286" r="2"/>
        <rect class="hit" x="80" y="100" width="250" height="230" fill="transparent"/>
      </g>

      <g class="ram" data-stop="ram">
        <text class="ram-print" x="438" y="86">RAM</text>
        <path class="ram-indicator" d="M634 82h10m4 0h10m4 0h10m4 0h10"/>
        ${sticks}
        <rect class="hit" x="430" y="70" width="270" height="210" fill="transparent"/>
      </g>

      <g class="ssd">
        <rect class="ssd-shadow" x="432" y="316" width="170" height="80" rx="8"/>
        <rect class="ssd-board" x="430" y="312" width="170" height="80" rx="8"/>
        <rect class="ssd-outline detail" x="436" y="318" width="152" height="68" rx="4"/>
        <path class="ssd-traces detail" d="M484 338h10m-10 8h10m-10 8h10m58-16h20v-12h16m-36 20h24v-12h12m-36 20h28v-12h8"/>
        <path class="component-leads" d="M440 334h46m-46 10h46m-46 10h46m-46 10h46"/>
        <rect class="storage-chip" x="444" y="328" width="40" height="44" rx="4"/>
        <rect class="storage-chip" x="494" y="328" width="58" height="30" rx="4"/>
        <path class="chip-mark detail" d="M452 336h10m40 0h16"/>
        <g class="gold-contacts">
          <path d="M592 324h8v8h-8Zm0 12h8v8h-8Zm0 12h8v8h-8Zm0 12h8v8h-8Zm0 12h8v8h-8Z"/>
        </g>
        <text x="500" y="380">SSD</text>
        <circle class="ssd-screw" cx="440" cy="382" r="2"/>
        <circle class="ssd-screw" cx="582" cy="382" r="2"/>
      </g>

      <g class="small-parts">
        ${capacitors}
        ${resistors}
        <g class="crystal">
          <path class="component-leads" d="M338 286h64m-64 12h64"/>
          <rect class="crystal-case" x="344" y="278" width="52" height="28" rx="8"/>
          <rect class="crystal-inset detail" x="350" y="284" width="40" height="16" rx="4"/>
          <path class="crystal-score detail" d="M358 288h24"/>
        </g>
        <g class="bypass-parts">
          <path class="component-leads" d="M332 48h28m-28 12h28M344 252h28m-28 12h28"/>
          <rect x="340" y="44" width="12" height="8" rx="2"/>
          <rect x="340" y="56" width="12" height="8" rx="2"/>
          <rect x="352" y="248" width="12" height="8" rx="2"/>
          <rect x="352" y="260" width="12" height="8" rx="2"/>
        </g>
      </g>
      ${holes}
    </svg>`,
    css: `
      .art-hw { display:block; width:100%; height:auto; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; }
      .art-hw text { font-family:"JetBrains Mono",ui-monospace,Menlo,monospace; font-size:12px; font-weight:600; letter-spacing:2px; fill:#b9bec6; stroke:none; }
      .art-hw .detail { stroke-width:1; }
      .art-hw .board-outline { fill:none; stroke:#41604b; opacity:.22; }
      .art-hw .traces { fill:none; stroke:#c9a24b; stroke-opacity:.55; }
      .art-hw .solder { fill:#c9a24b; stroke:none; opacity:.7; }
      .art-hw .vias { fill:#0f1f1a; stroke:#c9a24b; opacity:.55; }
      .art-hw .bus-copper { fill:none; stroke:#c9a24b; opacity:.55; }
      .art-hw .bus-data { fill:none; stroke:#e4c875; stroke-dasharray:4 42; opacity:.65; animation:hw-flow 5s linear infinite; animation-delay:var(--flow); }
      .art-hw .socket { fill:#1c3025; stroke:#4f9a3f; stroke-opacity:.45; }
      .art-hw .socket-mark { fill:none; stroke:#76976a; opacity:.65; }
      .art-hw .processor-pins { fill:#b9bec6; stroke:#687174; stroke-width:1; }
      .art-hw .package-shadow,.art-hw .stick-shadow,.art-hw .ssd-shadow { fill:#08130f; stroke:none; }
      .art-hw .processor-package { fill:url(#hw-package); stroke:#626c68; }
      .art-hw .package-rim { fill:none; stroke:#40494a; }
      .art-hw .orientation-mark { fill:#b9bec6; stroke:none; opacity:.65; }
      .art-hw .die-surround { fill:#121416; stroke:#587b50; }
      .art-hw .die { fill:#749879; stroke:#a1b99a; transition:fill .3s,stroke .3s,filter .3s; }
      .art-hw .die-cell { fill:#34563d; stroke:#729071; }
      .art-hw .die-cell.live { animation:hw-die-idle 6s ease-in-out infinite; animation-delay:var(--idle); }
      .art-hw .die-registration { fill:none; stroke:#d6dfbb; }
      .art-hw .package-dot { fill:#4f9a3f; stroke:none; }
      .art-hw .cpu-print { fill:#b9c5b9; }
      .art-hw .stick-board { fill:#254e32; stroke:#658257; }
      .art-hw .stick-rail { fill:none; stroke:#c9a24b; opacity:.55; }
      .art-hw .ram-leads { fill:none; stroke:#b9bec6; opacity:.7; }
      .art-hw .memory-chip { fill:#121416; stroke:#667867; stroke-width:1; animation:hw-ram-idle 8s linear infinite; animation-delay:var(--scan); }
      .art-hw .chip-mark { fill:none; stroke:#7c8785; opacity:.45; }
      .art-hw .contact-bed { fill:#18291e; stroke:none; }
      .art-hw .gold-contacts { fill:#c9a24b; stroke:none; }
      .art-hw .stick-notch { fill:#0f1f1a; stroke:#8a9c75; stroke-width:1; }
      .art-hw .ram-print { fill:#96b68c; }
      .art-hw .ram-indicator { stroke:#4f9a3f; opacity:.65; }
      .art-hw .ssd-board { fill:#20322d; stroke:#607068; }
      .art-hw .ssd-outline { fill:none; stroke:#42564b; }
      .art-hw .ssd-traces { fill:none; stroke:#c9a24b; opacity:.55; }
      .art-hw .storage-chip { fill:#121416; stroke:#626b68; }
      .art-hw .ssd-screw { fill:#b9bec6; stroke:none; }
      .art-hw .component-leads { fill:none; stroke:#b9bec6; }
      .art-hw .capacitor-body { fill:#121416; stroke:#53685b; }
      .art-hw .capacitor-top { fill:url(#hw-metal); stroke:#c5ccc9; }
      .art-hw .capacitor-score { fill:none; stroke:#4b5954; }
      .art-hw .resistor { fill:#9b8861; stroke:#c4b18a; stroke-width:1; }
      .art-hw .resistor-band { stroke:#292c26; }
      .art-hw .crystal-case { fill:url(#hw-metal); stroke:#c9d0ca; }
      .art-hw .crystal-inset { fill:none; stroke:#66766b; }
      .art-hw .crystal-score { fill:none; stroke:#e1e5da; }
      .art-hw .bypass-parts { fill:#a7966b; stroke:#cbbd95; stroke-width:1; }
      .art-hw .mount-ring { fill:#718577; stroke:#a2b09b; stroke-width:1; }
      .art-hw .mount-hole { fill:#08130f; stroke:#182e22; stroke-width:1; }
      .art-hw .hit { stroke:none; pointer-events:all; }
      .art-hw .cpu.act .die { fill:#d6bb43; stroke:#ffd400; filter:drop-shadow(0 0 6px #ffd400); }
      .art-hw .cpu.act .die-cell { animation:hw-die-wave 1.2s ease-in-out infinite; animation-delay:var(--phase); }
      .art-hw .cpu.act .die-surround { stroke:#ffd400; }
      .art-hw .cpu.act .cpu-print,.art-hw .ram.act .ram-print { fill:#ffd400; }
      .art-hw .cpu.act .package-dot { fill:#ffd400; }
      .art-hw .ram.act .memory-chip { animation:hw-ram-burst 1.2s ease-in-out infinite; animation-delay:var(--burst); }
      .art-hw .ram.act .ram-indicator { stroke:#ffd400; opacity:1; filter:drop-shadow(0 0 6px #ffd400); }
      .art-hw .ram.act .stick-board { stroke:#b6b94c; }
      .art-hw:has([data-stop].act) .bus-data { stroke:#ffd400; opacity:1; animation-duration:1s; }
      @keyframes hw-flow { to { stroke-dashoffset:-184; } }
      @keyframes hw-die-idle { 0%,65%,100% { fill:#34563d; } 32% { fill:#84ae6b; } }
      @keyframes hw-die-wave { 0%,100% { fill:#586b35; } 38% { fill:#ffd400; } 62% { fill:#e4d87e; } }
      @keyframes hw-ram-idle { 0%,8%,100% { fill:#121416; } 2%,4% { fill:#507a42; } }
      @keyframes hw-ram-burst { 0%,100% { fill:#365336; stroke:#81985b; } 30%,64% { fill:#ffd400; stroke:#f0dc83; } }
      @media (prefers-reduced-motion: reduce) { .art-hw * { animation:none!important; } .art-hw .cpu.act .die-cell { fill:#d9c653; } .art-hw .ram.act .memory-chip { fill:#cdbb49; stroke:#ffd400; } }
    `
  };
}());
