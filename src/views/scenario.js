import { store } from '../store.js';

export function Scenario() {
  const container = document.createElement('div');
  container.className = 'container';

  const render = () => {
    const { activeScenario } = store.state;

    container.innerHTML = `
      <div class="flex justify-between mb-2">
        <h1>Scenario Helper</h1>
        <div class="flex">
           <button class="secondary" onclick="window.resetScenario()">Reset</button>
           <button onclick="window.showAddEnemyModal()">Add Enemy</button>
        </div>
      </div>
      
      <!-- Character List -->
      <div class="grid grid-2 mb-2">
        ${store.state.characters.map(char => {
      const images = {
        'Hatchet': './src/assets/hatchet.png',
        'Demolitionist': './src/assets/demolitionist.png',
        'Red Guard': './src/assets/red_guard.png',
        'Voidwarden': './src/assets/voidwarden.png'
      };
      const imagePath = images[char.class] || '';
      const maxHp = store.getMaxHp(char.class, char.level);
      // Ensure currentHp is set (for existing chars)
      const currentHp = char.currentHp !== undefined ? char.currentHp : maxHp;
      const conditions = char.conditions || [];

      return `
            <div class="card" style="border-left: 5px solid var(--color-primary);">
              <div class="flex justify-between mb-1">
                <div class="flex">
                  ${imagePath ? `<img src="${imagePath}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-accent); margin-right: 10px;" alt="${char.class}" />` : ''}
                  <div>
                    <h3 class="mb-0">${char.name}</h3>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted);">${char.class} Lvl ${char.level}</span>
                  </div>
                </div>
              </div>
              
              <div class="flex justify-between items-center mb-1">
                <button class="secondary" style="width: 30px;" onclick="window.updateCharacterHP('${char.id}', -1)">-</button>
                <div class="text-center">
                  <span style="font-size: 1.5rem; font-weight: bold; color: ${currentHp <= 3 ? 'var(--color-danger)' : 'var(--color-text)'};">${currentHp}</span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">/ ${maxHp} HP</span>
                </div>
                <button class="secondary" style="width: 30px;" onclick="window.updateCharacterHP('${char.id}', 1)">+</button>
              </div>
              
              <div class="flex" style="flex-wrap: wrap; gap: 4px;">
                ${['stun', 'muddle', 'disarm', 'immobilize', 'poison', 'wound', 'invisible', 'strengthen'].map(cond => `
                  <button 
                    onclick="window.toggleCharacterCondition('${char.id}', '${cond}')"
                    style="
                      padding: 2px 6px; font-size: 0.7rem; border-radius: 10px; border: 1px solid var(--color-border);
                      background-color: ${conditions.includes(cond) ? 'var(--color-primary)' : 'transparent'};
                      color: ${conditions.includes(cond) ? '#fff' : 'var(--color-text-muted)'};
                    "
                  >${cond}</button>
                `).join('')}
              </div>
            </div>
          `;
    }).join('')}
      </div>

      <!-- Element Board -->
      <div class="card mb-2">
        <h3 class="mb-1">Elements</h3>
        <div class="flex justify-between" style="overflow-x: auto; padding-bottom: 5px;">
          ${Object.entries(activeScenario.elements).map(([element, state]) => `
            <div class="text-center" style="min-width: 60px;">
              <div 
                onclick="window.cycleElement('${element}')"
                style="
                  width: 40px; height: 40px; margin: 0 auto; border-radius: 50%; cursor: pointer;
                  background-color: ${getElementColor(element)};
                  opacity: ${state === 'inert' ? 0.3 : state === 'waning' ? 0.6 : 1};
                  border: 2px solid ${state === 'strong' ? '#fff' : 'transparent'};
                  box-shadow: ${state === 'strong' ? '0 0 10px ' + getElementColor(element) : 'none'};
                  transition: all 0.2s;
                "
              ></div>
              <span style="font-size: 0.7rem; text-transform: uppercase; margin-top: 4px; display: block;">${element}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Enemy List -->
      ${activeScenario.enemies.length === 0 ? `
        <div class="card text-center" style="padding: 3rem;">
          <p class="mb-1" style="color: var(--color-text-muted)">No enemies on the board.</p>
          <button class="secondary" onclick="window.showAddEnemyModal()">Spawn Enemy</button>
        </div>
      ` : `
        <div class="grid grid-2">
          ${activeScenario.enemies.map(enemy => `
            <div class="card" style="border-left: 5px solid ${enemy.type === 'elite' ? 'var(--color-accent)' : '#fff'}">
              <div class="flex justify-between mb-1">
                <h3 class="mb-0">${enemy.name} <span style="font-size: 0.8rem; color: var(--color-text-muted);">#${enemy.number}</span></h3>
                <button class="secondary" style="padding: 2px 6px; color: var(--color-danger); border: none;" onclick="window.removeEnemy('${enemy.id}')">X</button>
              </div>
              
              <div class="flex justify-between items-center mb-1">
                <button class="secondary" style="width: 30px;" onclick="window.updateEnemyHP('${enemy.id}', -1)">-</button>
                <div class="text-center">
                  <span style="font-size: 1.5rem; font-weight: bold; color: ${enemy.hp <= 0 ? 'var(--color-text-muted)' : 'var(--color-text)'};">${enemy.hp}</span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted); display: block;">HP</span>
                </div>
                <button class="secondary" style="width: 30px;" onclick="window.updateEnemyHP('${enemy.id}', 1)">+</button>
              </div>
              
              <div class="flex" style="flex-wrap: wrap; gap: 4px;">
                ${['stun', 'muddle', 'disarm', 'immobilize', 'poison', 'wound'].map(cond => `
                  <button 
                    onclick="window.toggleCondition('${enemy.id}', '${cond}')"
                    style="
                      padding: 2px 6px; font-size: 0.7rem; border-radius: 10px; border: 1px solid var(--color-border);
                      background-color: ${enemy.conditions.includes(cond) ? 'var(--color-primary)' : 'transparent'};
                      color: ${enemy.conditions.includes(cond) ? '#fff' : 'var(--color-text-muted)'};
                    "
                  >${cond}</button>
                `).join('')}
              </div>
            </div>
          `).join('')}
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
    `;
  };

  // Actions
  window.showAddEnemyModal = () => {
    document.getElementById('enemy-modal').style.display = 'flex';
  };

  window.hideAddEnemyModal = () => {
    document.getElementById('enemy-modal').style.display = 'none';
  };

  window.spawnEnemy = () => {
    const name = document.getElementById('new-enemy-name').value;
    const number = document.getElementById('new-enemy-number').value;
    const type = document.getElementById('new-enemy-type').value;
    const hp = parseInt(document.getElementById('new-enemy-hp').value);

    if (name && hp) {
      store.addEnemy({ name, number, type, hp, maxHp: hp });
      window.hideAddEnemyModal();
    }
  };

  window.updateEnemyHP = (id, delta) => {
    const enemy = store.state.activeScenario.enemies.find(e => e.id === id);
    if (enemy) {
      store.updateEnemy(id, { hp: Math.max(0, enemy.hp + delta) });
    }
  };

  window.removeEnemy = (id) => {
    if (confirm('Remove this enemy?')) {
      store.removeEnemy(id);
    }
  };

  window.toggleCondition = (id, condition) => {
    const enemy = store.state.activeScenario.enemies.find(e => e.id === id);
    if (enemy) {
      const conditions = enemy.conditions.includes(condition)
        ? enemy.conditions.filter(c => c !== condition)
        : [...enemy.conditions, condition];
      store.updateEnemy(id, { conditions });
    }
  };

  window.updateCharacterHP = (id, delta) => {
    const char = store.state.characters.find(c => c.id === id);
    if (char) {
      const maxHp = store.getMaxHp(char.class, char.level);
      const currentHp = char.currentHp !== undefined ? char.currentHp : maxHp;
      store.updateCharacter(id, { currentHp: Math.min(maxHp, Math.max(0, currentHp + delta)) });
    }
  };

  window.toggleCharacterCondition = (id, condition) => {
    const char = store.state.characters.find(c => c.id === id);
    if (char) {
      const conditions = (char.conditions || []).includes(condition)
        ? (char.conditions || []).filter(c => c !== condition)
        : [...(char.conditions || []), condition];
      store.updateCharacter(id, { conditions });
    }
  };

  window.cycleElement = (element) => {
    // This would require updating the store to handle element cycling
    // For now, let's just implement a local toggle or simple store update if we added it
    // Since store.js has 'activeScenario', let's update it there.
    // We need to add updateElement to store or just update the whole object.
    // Let's assume we can update the state directly for this prototype or add a method.
    // I'll add a quick hack to update it via a new method I'll inject or just modify state if I could, 
    // but better to stick to the pattern. I'll add a method to store.js in a separate step if needed, 
    // or just use a generic update.

    // Actually, I didn't add updateElement to store.js. 
    // Let's just read, modify, save for now using a direct access pattern if possible, 
    // or better, add the method to store.js in a subsequent step.
    // For now, I'll leave it visual-only or non-functional until I patch store.js?
    // No, I should make it work. I'll add a generic 'updateScenario' method to store.js later.
    // Wait, I can just use `store.state.activeScenario.elements[element] = ...; store.saveState(); store.notify();`
    // It's not clean but it works for this prototype.

    const current = store.state.activeScenario.elements[element];
    const next = { 'inert': 'strong', 'strong': 'waning', 'waning': 'inert' }[current];

    store.state.activeScenario.elements[element] = next;
    store.saveState();
    store.notify();
  };

  window.resetScenario = () => {
    if (confirm('Clear all enemies and reset elements?')) {
      store.startScenario(store.state.activeScenario.id || 1);
    }
  };

  store.subscribe(render);
  setTimeout(render, 0);

  return container;
}

function getElementColor(element) {
  const colors = {
    fire: '#c62828',
    ice: '#1976d2',
    air: '#f5f5f5',
    earth: '#388e3c',
    light: '#fbc02d',
    dark: '#212121'
  };
  return colors[element] || '#fff';
}
