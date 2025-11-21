export function Rules() {
  const container = document.createElement('div');
  container.className = 'container';

  container.innerHTML = `
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
  `;

  return container;
}
