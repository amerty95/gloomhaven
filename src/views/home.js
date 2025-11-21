export function Home() {
    const container = document.createElement('div');
    container.className = 'container text-center';

    container.innerHTML = `
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
  `;

    return container;
}
