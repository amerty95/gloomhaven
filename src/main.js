import { initRouter, registerRoute } from './router.js';
import { Home } from './views/home.js';
import { Rules } from './views/rules.js';
import { Campaign } from './views/campaign.js';
import { Characters } from './views/characters.js';
import { Scenario } from './views/scenario.js';

// Register Routes
registerRoute('home', Home);
registerRoute('campaign', Campaign);
registerRoute('characters', Characters);
registerRoute('scenario', Scenario);
registerRoute('rules', Rules);

// Main Layout
document.querySelector('#app').innerHTML = `
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
`;

// Initialize Router
initRouter('main-content');
