import { store } from '../store.js';

export function Campaign() {
    const container = document.createElement('div');
    container.className = 'container';

    const render = () => {
        const { campaign } = store.state;

        container.innerHTML = `
      <h1 class="text-center mb-2">Campaign Tracker</h1>
      
      <div class="grid grid-3">
        ${campaign.scenarios.map(scenario => `
          <div class="card ${scenario.status === 'completed' ? 'opacity-75' : ''}" style="border-left: 5px solid ${getStatusColor(scenario.status)}">
            <div class="flex justify-between mb-1">
              <h3>#${scenario.id}</h3>
              <span style="color: ${getStatusColor(scenario.status)}; text-transform: uppercase; font-size: 0.8rem; font-weight: bold;">
                ${scenario.status}
              </span>
            </div>
            <h4 class="mb-1">${scenario.title}</h4>
            
            <div class="flex mt-2">
              <button class="secondary" style="font-size: 0.8rem; padding: 4px 8px;" onclick="window.toggleScenario(${scenario.id})">
                Toggle Status
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    };

    // Helper to cycle status
    window.toggleScenario = (id) => {
        const scenario = store.state.campaign.scenarios.find(s => s.id === id);
        if (!scenario) return;

        const nextStatus = {
            'locked': 'unlocked',
            'unlocked': 'completed',
            'completed': 'locked'
        }[scenario.status];

        store.updateScenarioStatus(id, nextStatus);
    };

    // Subscribe to store updates
    store.subscribe(render);

    // Initial render
    render();

    return container;
}

function getStatusColor(status) {
    switch (status) {
        case 'locked': return 'var(--color-text-muted)';
        case 'unlocked': return 'var(--color-accent)';
        case 'completed': return 'var(--color-success)';
        default: return 'var(--color-text)';
    }
}
