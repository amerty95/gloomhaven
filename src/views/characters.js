import { store } from '../store.js';

export function Characters() {
  const container = document.createElement('div');
  container.className = 'container';

  const render = () => {
    const { characters } = store.state;

    container.innerHTML = `
      <div class="flex justify-between mb-2">
        <h1>Party Roster</h1>
        <button onclick="window.showAddCharacterModal()">Add Character</button>
      </div>
      
      ${characters.length === 0 ? `
        <div class="card text-center" style="padding: 3rem;">
          <p class="mb-1" style="color: var(--color-text-muted)">No characters in your party yet.</p>
          <button class="secondary" onclick="window.showAddCharacterModal()">Create First Character</button>
        </div>
      ` : `
        <div class="grid grid-2">
          ${characters.map(char => {
      const images = {
        'Hatchet': './src/assets/hatchet.png',
        'Demolitionist': './src/assets/demolitionist.png',
        'Red Guard': './src/assets/red_guard.png',
        'Voidwarden': './src/assets/voidwarden.png'
      };
      const imagePath = images[char.class] || '';

      return `
            <div class="card">
              <div class="flex justify-between mb-1">
                <div class="flex">
                  ${imagePath ? `<img src="${imagePath}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-accent); margin-right: 10px;" alt="${char.class}" />` : ''}
                  <div>
                    <h2 class="mb-0" style="font-size: 1.5rem;">${char.name}</h2>
                    <p class="mb-0" style="color: var(--color-text-muted); font-size: 0.9rem;">${char.class}</p>
                  </div>
                </div>
                <div class="flex" style="gap: 4px; align-items: center;">
                  <span style="color: var(--color-accent); font-weight: bold; margin-right: 4px;">Lvl</span>
                  <button class="secondary" style="padding: 0px 6px;" onclick="window.updateStat('${char.id}', 'level', -1)">-</button>
                  <span style="min-width: 10px; text-align: center;">${char.level}</span>
                  <button class="secondary" style="padding: 0px 6px;" onclick="window.updateStat('${char.id}', 'level', 1)">+</button>
                </div>
              </div>
              
              <div class="grid grid-2 mb-1" style="gap: var(--spacing-sm);">
                <div>
                  <label style="font-size: 0.8rem; color: var(--color-text-muted);">XP</label>
                  <div class="flex">
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${char.id}', 'xp', -1)">-</button>
                    <span style="flex: 1; text-align: center;">${char.xp}</span>
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${char.id}', 'xp', 1)">+</button>
                  </div>
                </div>
                <div>
                  <label style="font-size: 0.8rem; color: var(--color-text-muted);">Gold</label>
                  <div class="flex">
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${char.id}', 'gold', -1)">-</button>
                    <span style="flex: 1; text-align: center;">${char.gold}</span>
                    <button class="secondary" style="padding: 2px 8px;" onclick="window.updateStat('${char.id}', 'gold', 1)">+</button>
                  </div>
                </div>
              </div>
              
              <div class="mb-1">
                <label style="font-size: 0.8rem; color: var(--color-text-muted);">Items</label>
                <textarea 
                  rows="2" 
                  placeholder="List items..."
                  onchange="window.updateItems('${char.id}', this.value)"
                >${char.items.join(', ')}</textarea>
              </div>
              
              <div class="text-right mt-1">
                <button class="secondary" style="color: var(--color-danger); border-color: var(--color-danger);" onclick="window.deleteCharacter('${char.id}')">Retire</button>
              </div>
            </div>
            </div>
          `;
    }).join('')}
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
    `;
  };

  // Actions
  window.showAddCharacterModal = () => {
    document.getElementById('char-modal').style.display = 'flex';
  };

  window.hideAddCharacterModal = () => {
    document.getElementById('char-modal').style.display = 'none';
  };

  window.saveNewCharacter = () => {
    const name = document.getElementById('new-char-name').value;
    const className = document.getElementById('new-char-class').value;
    const level = parseInt(document.getElementById('new-char-level').value);

    if (name) {
      store.addCharacter({ name, class: className, level });
      window.hideAddCharacterModal();
    }
  };

  window.updateStat = (id, stat, delta) => {
    const char = store.state.characters.find(c => c.id === id);
    if (char) {
      let newValue = char[stat] + delta;
      if (stat === 'level') {
        newValue = Math.min(9, Math.max(1, newValue));
      } else {
        newValue = Math.max(0, newValue);
      }
      store.updateCharacter(id, { [stat]: newValue });
    }
  };

  window.updateItems = (id, value) => {
    const items = value.split(',').map(i => i.trim()).filter(i => i);
    store.updateCharacter(id, { items });
  };

  window.deleteCharacter = (id) => {
    if (confirm('Are you sure you want to retire this character?')) {
      store.deleteCharacter(id);
    }
  };

  store.subscribe(render);

  // Defer initial render to ensure DOM is ready if needed, though synchronous is fine here
  setTimeout(render, 0);

  return container;
}
