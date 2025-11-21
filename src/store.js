const STORAGE_KEY = 'gloomhaven_jotl_data';

const defaultState = {
  campaign: {
    scenarios: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Scenario ${i + 1}`,
      status: i === 0 ? 'unlocked' : 'locked', // locked, unlocked, completed
      notes: ''
    }))
  },
  characters: [],
  activeScenario: {
    id: null,
    enemies: [],
    round: 1,
    elements: { fire: 'inert', ice: 'inert', air: 'inert', earth: 'inert', light: 'inert', dark: 'inert' }
  }
};

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultState, ...JSON.parse(stored) } : JSON.parse(JSON.stringify(defaultState));
  }

  saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Campaign Actions
  updateScenarioStatus(id, status) {
    const scenario = this.state.campaign.scenarios.find(s => s.id === id);
    if (scenario) {
      scenario.status = status;
      this.saveState();
    }
  }

  // Helper
  getMaxHp(className, level) {
    const baseHp = {
      'Red Guard': 10,
      'Hatchet': 8,
      'Demolitionist': 8,
      'Voidwarden': 6
    };
    const hpPerLevel = {
      'Red Guard': 2,
      'Hatchet': 2,
      'Demolitionist': 1,
      'Voidwarden': 1
    };

    return (baseHp[className] || 8) + ((hpPerLevel[className] || 1) * (level - 1));
  }

  // Character Actions
  addCharacter(character) {
    const maxHp = this.getMaxHp(character.class, character.level);
    this.state.characters.push({
      id: Date.now().toString(),
      ...character,
      xp: 0,
      gold: 0,
      items: [],
      perks: [],
      currentHp: maxHp,
      conditions: []
    });
    this.saveState();
  }

  updateCharacter(id, updates) {
    const index = this.state.characters.findIndex(c => c.id === id);
    if (index !== -1) {
      // If level changes, update current HP if it was at max? Or just let user handle it.
      // For now just simple update.
      this.state.characters[index] = { ...this.state.characters[index], ...updates };
      this.saveState();
    }
  }

  deleteCharacter(id) {
    this.state.characters = this.state.characters.filter(c => c.id !== id);
    this.saveState();
  }

  // Active Scenario Actions
  startScenario(id) {
    // Reset character HP and conditions on scenario start
    this.state.characters = this.state.characters.map(c => ({
      ...c,
      currentHp: this.getMaxHp(c.class, c.level),
      conditions: []
    }));

    this.state.activeScenario = {
      id,
      enemies: [],
      round: 1,
      elements: { fire: 'inert', ice: 'inert', air: 'inert', earth: 'inert', light: 'inert', dark: 'inert' }
    };
    this.saveState();
  }

  addEnemy(enemy) {
    this.state.activeScenario.enemies.push({
      id: Date.now().toString(),
      ...enemy,
      conditions: []
    });
    this.saveState();
  }

  updateEnemy(id, updates) {
    const enemy = this.state.activeScenario.enemies.find(e => e.id === id);
    if (enemy) {
      Object.assign(enemy, updates);
      this.saveState();
    }
  }

  removeEnemy(id) {
    this.state.activeScenario.enemies = this.state.activeScenario.enemies.filter(e => e.id !== id);
    this.saveState();
  }
}

export const store = new Store();
