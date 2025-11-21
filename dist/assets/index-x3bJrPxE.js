(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const u="gloomhaven_jotl_data",v={campaign:{scenarios:Array.from({length:25},(i,o)=>({id:o+1,title:`Scenario ${o+1}`,status:o===0?"unlocked":"locked",notes:""}))},characters:[],activeScenario:{id:null,enemies:[],round:1,elements:{fire:"inert",ice:"inert",air:"inert",earth:"inert",light:"inert",dark:"inert"}}};class f{constructor(){this.state=this.loadState(),this.listeners=[]}loadState(){const o=localStorage.getItem(u);return o?{...v,...JSON.parse(o)}:JSON.parse(JSON.stringify(v))}saveState(){localStorage.setItem(u,JSON.stringify(this.state)),this.notify()}subscribe(o){return this.listeners.push(o),()=>{this.listeners=this.listeners.filter(n=>n!==o)}}notify(){this.listeners.forEach(o=>o(this.state))}updateScenarioStatus(o,n){const e=this.state.campaign.scenarios.find(t=>t.id===o);e&&(e.status=n,this.saveState())}getMaxHp(o,n){const e={"Red Guard":10,Hatchet:8,Demolitionist:8,Voidwarden:6},t={"Red Guard":2,Hatchet:2,Demolitionist:1,Voidwarden:1};return(e[o]||8)+(t[o]||1)*(n-1)}addCharacter(o){const n=this.getMaxHp(o.class,o.level);this.state.characters.push({id:Date.now().toString(),...o,xp:0,gold:0,items:[],perks:[],currentHp:n,conditions:[]}),this.saveState()}updateCharacter(o,n){const e=this.state.characters.findIndex(t=>t.id===o);e!==-1&&(this.state.characters[e]={...this.state.characters[e],...n},this.saveState())}deleteCharacter(o){this.state.characters=this.state.characters.filter(n=>n.id!==o),this.saveState()}startScenario(o){this.state.characters=this.state.characters.map(n=>({...n,currentHp:this.getMaxHp(n.class,n.level),conditions:[]})),this.state.activeScenario={id:o,enemies:[],round:1,elements:{fire:"inert",ice:"inert",air:"inert",earth:"inert",light:"inert",dark:"inert"}},this.saveState()}addEnemy(o){this.state.activeScenario.enemies.push({id:Date.now().toString(),...o,conditions:[]}),this.saveState()}updateEnemy(o,n){const e=this.state.activeScenario.enemies.find(t=>t.id===o);e&&(Object.assign(e,n),this.saveState())}removeEnemy(o){this.state.activeScenario.enemies=this.state.activeScenario.enemies.filter(n=>n.id!==o),this.saveState()}}const s=new f,c={};function d(i,o){c[i]=o}function y(i){const o=document.getElementById(i);function n(){const e=window.location.hash.slice(1)||"home",t=c[e]||c.home;if(t){o.innerHTML="";const a=t();a instanceof Node?o.appendChild(a):typeof a=="string"&&(o.innerHTML=a)}}window.addEventListener("hashchange",n),window.addEventListener("load",n),n()}function b(){const i=document.createElement("div");return i.className="container text-center",i.innerHTML=`
    <h1 class="mb-2">Gloomhaven: Jaws of the Lion<br><span style="font-size: 0.6em; color: var(--color-text-muted)">Assistant</span></h1>
    
    <div class="grid grid-2">
      <a href="#campaign" class="card flex flex-col justify-center" style="min-height: 200px; text-decoration: none;">
        <h2 style="color: var(--color-primary)">Campaign</h2>
        <p>Track your story progress and scenarios.</p>
      </a>
      
      <a href="#characters" class="card flex flex-col justify-center" style="min-height: 200px; text-decoration: none;">
        <h2 style="color: var(--color-accent)">Characters</h2>
        <p>Manage your party, stats, and equipment.</p>
      </a>
      
      <a href="#scenario" class="card flex flex-col justify-center" style="min-height: 200px; text-decoration: none;">
        <h2 style="color: var(--color-danger)">Scenario Helper</h2>
        <p>Track enemies, health, and elements.</p>
      </a>
      
      <a href="#rules" class="card flex flex-col justify-center" style="min-height: 200px; text-decoration: none;">
        <h2 style="color: var(--color-text)">Rules</h2>
        <p>Quick reference for rules and icons.</p>
      </a>
    </div>
  `,i}function x(){const i=document.createElement("div");return i.className="container",i.innerHTML=`
    <h1 class="text-center mb-2">Rules Reference</h1>
    
    <div class="grid grid-2">
      <div class="card">
        <h2>Round Structure</h2>
        <ol style="margin-left: 1.5rem; margin-bottom: 1rem;">
          <li><strong>Card Selection:</strong> Choose 2 cards. One determines initiative.</li>
          <li><strong>Initiative:</strong> Reveal cards. Lowest number goes first.</li>
          <li><strong>Turns:</strong> Perform top action of one card and bottom of the other.</li>
          <li><strong>End of Round:</strong> Shuffle decks if needed, elemental wane.</li>
        </ol>
      </div>
      
      <div class="card">
        <h2>Actions & Combat</h2>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
          <li><strong>Move:</strong> Move up to X hexes. Allies are permeable, enemies are not.</li>
          <li><strong>Attack:</strong> Draw modifier card. Apply damage and effects.</li>
          <li><strong>Range:</strong> Count hexes to target. Must have Line of Sight.</li>
          <li><strong>Advantage:</strong> Draw 2 modifiers, keep better.</li>
          <li><strong>Disadvantage:</strong> Draw 2 modifiers, keep worse.</li>
        </ul>
      </div>

      <div class="card">
        <h2>Resting</h2>
        <ul style="margin-left: 1.5rem; margin-bottom: 1rem;">
          <li><strong>Short Rest:</strong> End of round. Lose one random discard. Recover rest.</li>
          <li><strong>Long Rest:</strong> Initiative 99. Lose one chosen discard. Recover rest. Heal 2. Refresh items.</li>
        </ul>
      </div>

      <div class="card">
        <h2>Difficulty</h2>
        <p class="mb-1">Scenario Level = Average Party Level / 2 (rounded up)</p>
        <table style="width: 100%; text-align: center; font-size: 0.9rem;">
          <tr style="border-bottom: 1px solid var(--color-border);"><th>Lvl</th><th>Monster Lvl</th><th>Gold Conversion</th><th>Trap Dmg</th></tr>
          <tr><td>1</td><td>1</td><td>2</td><td>3</td></tr>
          <tr><td>2</td><td>2</td><td>3</td><td>4</td></tr>
          <tr><td>3</td><td>3</td><td>3</td><td>5</td></tr>
          <tr><td>4</td><td>4</td><td>4</td><td>6</td></tr>
          <tr><td>5</td><td>5</td><td>4</td><td>7</td></tr>
        </table>
      </div>
      
      <div class="card">
        <h2>Conditions</h2>
        <ul style="list-style: none;">
          <li><strong style="color: var(--color-danger)">Muddle:</strong> Disadvantage on attacks.</li>
          <li><strong style="color: var(--color-danger)">Immobilize:</strong> Cannot move.</li>
          <li><strong style="color: var(--color-danger)">Stun:</strong> Cannot act.</li>
          <li><strong style="color: var(--color-danger)">Disarm:</strong> Cannot attack.</li>
          <li><strong style="color: var(--color-danger)">Wound:</strong> 1 damage at start of turn.</li>
          <li><strong style="color: var(--color-danger)">Poison:</strong> +1 damage taken. Heal removes poison.</li>
          <li><strong style="color: var(--color-success)">Strengthen:</strong> Advantage on attacks.</li>
          <li><strong style="color: var(--color-accent)">Invisible:</strong> Cannot be focused or targeted.</li>
          <li><strong style="color: var(--color-success)">Regenerate:</strong> Heal 1 at start of turn. Lost on damage.</li>
        </ul>
      </div>
      
      <div class="card">
        <h2>Elements</h2>
        <p>Elements are infused at the end of the turn.</p>
        <div class="flex mt-1">
           <span style="padding: 4px 8px; background: #c62828; border-radius: 4px;">Fire</span>
           <span style="padding: 4px 8px; background: #1976d2; border-radius: 4px;">Ice</span>
           <span style="padding: 4px 8px; background: #fff; color: #000; border-radius: 4px;">Air</span>
           <span style="padding: 4px 8px; background: #388e3c; border-radius: 4px;">Earth</span>
           <span style="padding: 4px 8px; background: #fbc02d; color: #000; border-radius: 4px;">Light</span>
           <span style="padding: 4px 8px; background: #212121; border: 1px solid #fff; border-radius: 4px;">Dark</span>
        </div>
      </div>
    </div>
  `,i}function w(){const i=document.createElement("div");i.className="container";const o=()=>{const{campaign:n}=s.state;i.innerHTML=`
      <h1 class="text-center mb-2">Campaign Tracker</h1>
      
      <div class="grid grid-3">
        ${n.scenarios.map(e=>`
          <div class="card ${e.status==="completed"?"opacity-75":""}" style="border-left: 5px solid ${g(e.status)}">
            <div class="flex justify-between mb-1">
              <h3>#${e.id}</h3>
              <span style="color: ${g(e.status)}; text-transform: uppercase; font-size: 0.8rem; font-weight: bold;">
                ${e.status}
              </span>
            </div>
            <h4 class="mb-1">${e.title}</h4>
            
            <div class="flex mt-2">
              <button class="secondary" style="font-size: 0.8rem; padding: 4px 8px;" onclick="window.toggleScenario(${e.id})">
                Toggle Status
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `};return window.toggleScenario=n=>{const e=s.state.campaign.scenarios.find(a=>a.id===n);if(!e)return;const t={locked:"unlocked",unlocked:"completed",completed:"locked"}[e.status];s.updateScenarioStatus(n,t)},s.subscribe(o),o(),i}function g(i){switch(i){case"locked":return"var(--color-text-muted)";case"unlocked":return"var(--color-accent)";case"completed":return"var(--color-success)";default:return"var(--color-text)"}}function S(){const i=document.createElement("div");i.className="container";const o=()=>{const{characters:n}=s.state;i.innerHTML=`
      <div class="flex justify-between mb-2">
        <h1>Party Roster</h1>
        <button onclick="window.showAddCharacterModal()">Add Character</button>
      </div>
      
      ${n.length===0?`
        <div class="card text-center" style="padding: 3rem;">
          <p class="mb-1" style="color: var(--color-text-muted)">No characters in your party yet.</p>
          <button class="secondary" onclick="window.showAddCharacterModal()">Create First Character</button>
        </div>
      `:`
        <div class="grid grid-2">
          ${n.map(e=>{const a={Hatchet:"./src/assets/hatchet.png",Demolitionist:"./src/assets/demolitionist.png","Red Guard":"./src/assets/red_guard.png",Voidwarden:"./src/assets/voidwarden.png"}[e.class]||"";return`
            <div class="card">
              <div class="flex justify-between mb-1">
                <div class="flex">
                  ${a?`<img src="${a}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-accent); margin-right: 10px;" alt="${e.class}" />`:""}
                  <div>
                    <h2 class="mb-0" style="font-size: 1.5rem;">${e.name}</h2>
                    <p class="mb-0" style="color: var(--color-text-muted); font-size: 0.9rem;">${e.class}</p>
                  </div>
                </div>
                <div class="flex" style="gap: 4px; align-items: center;">
                  <span style="color: var(--color-accent); font-weight: bold; margin-right: 4px;">Lvl</span>
                  <button class="secondary" style="padding: 0px 6px;" onclick="window.updateStat('${e.id}', 'level', -1)">-</button>
                  <span style="min-width: 10px; text-align: center;">${e.level}</span>
                  <button class="secondary" style="padding: 0px 6px;" onclick="window.updateStat('${e.id}', 'level', 1)">+</button>
                </div>
              </div>
              
              <div class="grid grid-2 mb-1" style="gap: var(--spacing-sm);">
                <div>
                  <label style="font-size: 0.8rem; color: var(--color-text-muted);">XP</label>
                  <div class="flex">
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${e.id}', 'xp', -1)">-</button>
                    <span style="flex: 1; text-align: center;">${e.xp}</span>
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${e.id}', 'xp', 1)">+</button>
                  </div>
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--color-text-muted);">Gold</label>
                  <div class="flex">
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${e.id}', 'gold', -1)">-</button>
                    <span style="flex: 1; text-align: center;">${e.gold}</span>
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${e.id}', 'gold', 1)">+</button>
                  </div>
                </div>
              </div>
              
              <div class="mb-1">
                <label style="font-size: 0.8rem; color: var(--color-text-muted);">Items</label>
                <textarea 
                  rows="2" 
                  placeholder="List items..."
                  onchange="window.updateItems('${e.id}', this.value)"
                >${e.items.join(", ")}</textarea>
              </div>
              
              <div class="text-right mt-1">
                <button class="secondary" style="color: var(--color-danger); border-color: var(--color-danger);" onclick="window.deleteCharacter('${e.id}')">Retire</button>
              </div>
            </div>
            </div>
          `}).join("")}
        </div>
      `}
      
      <!-- Modal -->
      <div id="char-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); align-items: center; justify-content: center; z-index: 1000;">
        <div class="card" style="width: 100%; max-width: 400px;">
          <h2 class="mb-1">New Character</h2>
          <div class="grid gap-1 mb-2">
            <input id="new-char-name" placeholder="Name" />
            <select id="new-char-class">
              <option value="Hatchet">Hatchet</option>
              <option value="Demolitionist">Demolitionist</option>
              <option value="Red Guard">Red Guard</option>
              <option value="Voidwarden">Voidwarden</option>
            </select>
            <input id="new-char-level" type="number" min="1" max="9" value="1" placeholder="Level" />
          </div>
          <div class="flex justify-between">
            <button class="secondary" onclick="window.hideAddCharacterModal()">Cancel</button>
            <button onclick="window.saveNewCharacter()">Create</button>
          </div>
        </div>
      </div>
    `};return window.showAddCharacterModal=()=>{document.getElementById("char-modal").style.display="flex"},window.hideAddCharacterModal=()=>{document.getElementById("char-modal").style.display="none"},window.saveNewCharacter=()=>{const n=document.getElementById("new-char-name").value,e=document.getElementById("new-char-class").value,t=parseInt(document.getElementById("new-char-level").value);n&&(s.addCharacter({name:n,class:e,level:t}),window.hideAddCharacterModal())},window.updateStat=(n,e,t)=>{const a=s.state.characters.find(r=>r.id===n);if(a){let r=a[e]+t;e==="level"?r=Math.min(9,Math.max(1,r)):r=Math.max(0,r),s.updateCharacter(n,{[e]:r})}},window.updateItems=(n,e)=>{const t=e.split(",").map(a=>a.trim()).filter(a=>a);s.updateCharacter(n,{items:t})},window.deleteCharacter=n=>{confirm("Are you sure you want to retire this character?")&&s.deleteCharacter(n)},s.subscribe(o),setTimeout(o,0),i}function $(){const i=document.createElement("div");i.className="container";const o=()=>{const{activeScenario:n}=s.state;i.innerHTML=`
      <div class="flex justify-between mb-2">
        <h1>Scenario Helper</h1>
        <div class="flex">
           <button class="secondary" onclick="window.resetScenario()">Reset</button>
           <button onclick="window.showAddEnemyModal()">Add Enemy</button>
        </div>
      </div>
      
      <!-- Character List -->
      <div class="grid grid-2 mb-2">
        ${s.state.characters.map(e=>{const a={Hatchet:"./src/assets/hatchet.png",Demolitionist:"./src/assets/demolitionist.png","Red Guard":"./src/assets/red_guard.png",Voidwarden:"./src/assets/voidwarden.png"}[e.class]||"",r=s.getMaxHp(e.class,e.level),p=e.currentHp!==void 0?e.currentHp:r,m=e.conditions||[];return`
            <div class="card" style="border-left: 5px solid var(--color-primary);">
              <div class="flex justify-between mb-1">
                <div class="flex">
                  ${a?`<img src="${a}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-accent); margin-right: 10px;" alt="${e.class}" />`:""}
                  <div>
                    <h3 class="mb-0">${e.name}</h3>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted);">${e.class} Lvl ${e.level}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-between items-center mb-1">
                <button class="secondary" style="width: 30px;" onclick="window.updateCharacterHP('${e.id}', -1)">-</button>
                <div class="text-center">
                  <span style="font-size: 1.5rem; font-weight: bold; color: ${p<=3?"var(--color-danger)":"var(--color-text)"};">${p}</span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">/ ${r} HP</span>
                </div>
                <button class="secondary" style="width: 30px;" onclick="window.updateCharacterHP('${e.id}', 1)">+</button>
              </div>
              
              <div class="flex" style="flex-wrap: wrap; gap: 4px;">
                ${["stun","muddle","disarm","immobilize","poison","wound","invisible","strengthen"].map(l=>`
                  <button 
                    onclick="window.toggleCharacterCondition('${e.id}', '${l}')"
                    style="
                      padding: 2px 6px; font-size: 0.7rem; border-radius: 10px; border: 1px solid var(--color-border);
                      background-color: ${m.includes(l)?"var(--color-primary)":"transparent"};
                      color: ${m.includes(l)?"#fff":"var(--color-text-muted)"};
                    "
                  >${l}</button>
                `).join("")}
              </div>
            </div>
          `}).join("")}
      </div>

      <!-- Element Board -->
      <div class="card mb-2">
        <h3 class="mb-1">Elements</h3>
        <div class="flex justify-between" style="overflow-x: auto; padding-bottom: 5px;">
          ${Object.entries(n.elements).map(([e,t])=>`
            <div class="text-center" style="min-width: 60px;">
              <div 
                onclick="window.cycleElement('${e}')"
                style="
                  width: 40px; height: 40px; margin: 0 auto; border-radius: 50%; cursor: pointer;
                  background-color: ${h(e)};
                  opacity: ${t==="inert"?.3:t==="waning"?.6:1};
                  border: 2px solid ${t==="strong"?"#fff":"transparent"};
                  box-shadow: ${t==="strong"?"0 0 10px "+h(e):"none"};
                  transition: all 0.2s;
                "
              ></div>
              <span style="font-size: 0.7rem; text-transform: uppercase; margin-top: 4px; display: block;">${e}</span>
            </div>
          `).join("")}
        </div>
      </div>
      
      <!-- Enemy List -->
      ${n.enemies.length===0?`
        <div class="card text-center" style="padding: 3rem;">
          <p class="mb-1" style="color: var(--color-text-muted)">No enemies on the board.</p>
          <button class="secondary" onclick="window.showAddEnemyModal()">Spawn Enemy</button>
        </div>
      `:`
        <div class="grid grid-2">
          ${n.enemies.map(e=>`
            <div class="card" style="border-left: 5px solid ${e.type==="elite"?"var(--color-accent)":"#fff"}">
              <div class="flex justify-between mb-1">
                <h3 class="mb-0">${e.name} <span style="font-size: 0.8rem; color: var(--color-text-muted);">#${e.number}</span></h3>
                <button class="secondary" style="padding: 2px 6px; color: var(--color-danger); border: none;" onclick="window.removeEnemy('${e.id}')">X</button>
              </div>
              
              <div class="flex justify-between items-center mb-1">
                <button class="secondary" style="width: 30px;" onclick="window.updateEnemyHP('${e.id}', -1)">-</button>
                <div class="text-center">
                  <span style="font-size: 1.5rem; font-weight: bold; color: ${e.hp<=0?"var(--color-text-muted)":"var(--color-text)"};">${e.hp}</span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">HP</span>
                </div>
                <button class="secondary" style="width: 30px;" onclick="window.updateEnemyHP('${e.id}', 1)">+</button>
              </div>
              
              <div class="flex" style="flex-wrap: wrap; gap: 4px;">
                ${["stun","muddle","disarm","immobilize","poison","wound"].map(t=>`
                  <button 
                    onclick="window.toggleCondition('${e.id}', '${t}')"
                    style="
                      padding: 2px 6px; font-size: 0.7rem; border-radius: 10px; border: 1px solid var(--color-border);
                      background-color: ${e.conditions.includes(t)?"var(--color-primary)":"transparent"};
                      color: ${e.conditions.includes(t)?"#fff":"var(--color-text-muted)"};
                    "
                  >${t}</button>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      `}
      
      <!-- Modal -->
      <div id="enemy-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); align-items: center; justify-content: center; z-index: 1000;">
        <div class="card" style="width: 100%; max-width: 400px;">
          <h2 class="mb-1">Spawn Enemy</h2>
          <div class="grid gap-1 mb-2">
            <div>
              <input id="new-enemy-name" list="enemy-list" placeholder="Name (e.g. Vermling Raider)" />
              <datalist id="enemy-list">
                <option value="Vermling Raider">
                <option value="Vermling Scout">
                <option value="Giant Viper">
                <option value="Black Imp">
                <option value="Blood Imp">
                <option value="Living Corpse">
                <option value="Living Spirit">
                <option value="Stone Golem">
                <option value="Zealot">
                <option value="Rat Monstrosity">
                <option value="Chaos Demon">
                <option value="Black Sludge">
              </datalist>
            </div>
            <div class="flex">
              <input id="new-enemy-number" type="number" placeholder="#" style="width: 60px;" />
              <select id="new-enemy-type">
                <option value="normal">Normal</option>
                <option value="elite">Elite</option>
              </select>
            </div>
            <input id="new-enemy-hp" type="number" placeholder="Max HP" />
          </div>
          <div class="flex justify-between">
            <button class="secondary" onclick="window.hideAddEnemyModal()">Cancel</button>
            <button onclick="window.spawnEnemy()">Spawn</button>
          </div>
        </div>
      </div>
    `};return window.showAddEnemyModal=()=>{document.getElementById("enemy-modal").style.display="flex"},window.hideAddEnemyModal=()=>{document.getElementById("enemy-modal").style.display="none"},window.spawnEnemy=()=>{const n=document.getElementById("new-enemy-name").value,e=document.getElementById("new-enemy-number").value,t=document.getElementById("new-enemy-type").value,a=parseInt(document.getElementById("new-enemy-hp").value);n&&a&&(s.addEnemy({name:n,number:e,type:t,hp:a,maxHp:a}),window.hideAddEnemyModal())},window.updateEnemyHP=(n,e)=>{const t=s.state.activeScenario.enemies.find(a=>a.id===n);t&&s.updateEnemy(n,{hp:Math.max(0,t.hp+e)})},window.removeEnemy=n=>{confirm("Remove this enemy?")&&s.removeEnemy(n)},window.toggleCondition=(n,e)=>{const t=s.state.activeScenario.enemies.find(a=>a.id===n);if(t){const a=t.conditions.includes(e)?t.conditions.filter(r=>r!==e):[...t.conditions,e];s.updateEnemy(n,{conditions:a})}},window.updateCharacterHP=(n,e)=>{const t=s.state.characters.find(a=>a.id===n);if(t){const a=s.getMaxHp(t.class,t.level),r=t.currentHp!==void 0?t.currentHp:a;s.updateCharacter(n,{currentHp:Math.min(a,Math.max(0,r+e))})}},window.toggleCharacterCondition=(n,e)=>{const t=s.state.characters.find(a=>a.id===n);if(t){const a=(t.conditions||[]).includes(e)?(t.conditions||[]).filter(r=>r!==e):[...t.conditions||[],e];s.updateCharacter(n,{conditions:a})}},window.cycleElement=n=>{const e=s.state.activeScenario.elements[n],t={inert:"strong",strong:"waning",waning:"inert"}[e];s.state.activeScenario.elements[n]=t,s.saveState(),s.notify()},window.resetScenario=()=>{confirm("Clear all enemies and reset elements?")&&s.startScenario(s.state.activeScenario.id||1)},s.subscribe(o),setTimeout(o,0),i}function h(i){return{fire:"#c62828",ice:"#1976d2",air:"#f5f5f5",earth:"#388e3c",light:"#fbc02d",dark:"#212121"}[i]||"#fff"}d("home",b);d("campaign",w);d("characters",S);d("scenario",$);d("rules",x);document.querySelector("#app").innerHTML=`
  <nav style="background-color: var(--color-surface); border-bottom: 1px solid var(--color-border); padding: var(--spacing-md) 0; position: sticky; top: 0; z-index: 100;">
    <div class="container flex justify-between">
      <a href="#home" style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--color-accent);">Jaws of the Lion</a>
      <div class="flex">
        <a href="#campaign">Campaign</a>
        <a href="#characters">Party</a>
        <a href="#scenario">Play</a>
        <a href="#rules">Rules</a>
      </div>
    </div>
  </nav>
  <main id="main-content" style="padding-top: var(--spacing-xl);"></main>
`;y("main-content");
