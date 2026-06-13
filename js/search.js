/* ============================================================
   Hardware Handbook — search.js
   Client-side full-text search over the site index
   ============================================================ */

'use strict';

// ── Search Index ──────────────────────────────────────────
// Each entry: { title, path, category, tags, excerpt }
// Populated at build time; we define it inline here as a
// comprehensive static list matching the site structure.

const SEARCH_INDEX = [
  // ── Fundamentals
  { title: 'Voltage, Current & Power', path: 'chapters/fundamentals/voltage-current-power.html', category: 'Fundamentals', icon: '⚡', tags: ['ohm', 'watts', 'volts', 'amps', 'joule'] },
  { title: 'Conventional Current vs Electron Flow', path: 'chapters/fundamentals/conventional-current.html', category: 'Fundamentals', icon: '⚡', tags: ['current direction', 'electron'] },
  { title: "Ohm's Law", path: 'chapters/fundamentals/ohms-law.html', category: 'Fundamentals', icon: '⚡', tags: ['resistance', 'V=IR', 'resistor'] },
  { title: 'Grounding', path: 'chapters/fundamentals/grounding.html', category: 'Fundamentals', icon: '⚡', tags: ['GND', 'ground plane', 'reference'] },
  { title: 'Return Current Paths', path: 'chapters/fundamentals/return-current-paths.html', category: 'Fundamentals', icon: '⚡', tags: ['ground return', 'current loop'] },
  { title: 'Pull-up & Pull-down Resistors', path: 'chapters/fundamentals/pullups-pulldowns.html', category: 'Fundamentals', icon: '⚡', tags: ['pull-up', 'pull-down', 'resistor', 'GPIO'] },
  { title: 'Floating Inputs', path: 'chapters/fundamentals/floating-inputs.html', category: 'Fundamentals', icon: '⚡', tags: ['undefined state', 'noise', 'GPIO'] },
  { title: 'Open Drain / Open Collector', path: 'chapters/fundamentals/open-drain.html', category: 'Fundamentals', icon: '⚡', tags: ['open drain', 'wired-AND', 'I2C'] },
  { title: 'Push-Pull Output', path: 'chapters/fundamentals/push-pull.html', category: 'Fundamentals', icon: '⚡', tags: ['totem pole', 'output stage'] },
  { title: 'Digital Logic Basics', path: 'chapters/fundamentals/digital-logic.html', category: 'Fundamentals', icon: '⚡', tags: ['logic levels', '3.3V', '5V', 'TTL', 'CMOS'] },

  // ── Circuit Analysis
  { title: "Kirchhoff's Laws", path: 'chapters/circuit-analysis/kirchhoffs-laws.html', category: 'Circuit Analysis', icon: '🔁', tags: ['KVL', 'KCL', 'mesh', 'nodal'] },
  { title: 'Voltage Divider', path: 'chapters/circuit-analysis/voltage-divider.html', category: 'Circuit Analysis', icon: '🔁', tags: ['resistor divider', 'attenuation'] },
  { title: 'Current Divider', path: 'chapters/circuit-analysis/current-divider.html', category: 'Circuit Analysis', icon: '🔁', tags: ['parallel resistors'] },
  { title: 'RC Circuits', path: 'chapters/circuit-analysis/rc-circuits.html', category: 'Circuit Analysis', icon: '🔁', tags: ['time constant', 'tau', 'capacitor', 'charging'] },
  { title: 'RL Circuits', path: 'chapters/circuit-analysis/rl-circuits.html', category: 'Circuit Analysis', icon: '🔁', tags: ['inductor', 'time constant', 'transient'] },
  { title: 'LC Circuits', path: 'chapters/circuit-analysis/lc-circuits.html', category: 'Circuit Analysis', icon: '🔁', tags: ['tank circuit', 'resonance', 'oscillation'] },
  { title: 'Resonance', path: 'chapters/circuit-analysis/resonance.html', category: 'Circuit Analysis', icon: '🔁', tags: ['resonant frequency', 'Q factor', 'bandwidth'] },
  { title: 'Filter Basics', path: 'chapters/circuit-analysis/filter-basics.html', category: 'Circuit Analysis', icon: '🔁', tags: ['low-pass', 'high-pass', 'band-pass', 'cutoff'] },

  // ── Capacitors
  { title: 'Capacitor Basics', path: 'chapters/capacitors/capacitor-basics.html', category: 'Capacitors', icon: '🔋', tags: ['farad', 'capacitance', 'charge', 'ESR'] },
  { title: 'Capacitor Types', path: 'chapters/capacitors/capacitor-types.html', category: 'Capacitors', icon: '🔋', tags: ['ceramic', 'electrolytic', 'film', 'tantalum', 'X5R', 'X7R'] },
  { title: 'Bypass Capacitors', path: 'chapters/capacitors/bypass-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['bypass', '100nF', 'noise', 'power supply'] },
  { title: 'Decoupling Capacitors', path: 'chapters/capacitors/decoupling-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['decoupling', 'IC power', 'placement'] },
  { title: 'Bulk Capacitors', path: 'chapters/capacitors/bulk-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['bulk cap', 'energy storage', 'large cap'] },
  { title: 'Input Capacitors', path: 'chapters/capacitors/input-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['input cap', 'regulator', 'VIN'] },
  { title: 'Output Capacitors', path: 'chapters/capacitors/output-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['output cap', 'VOUT', 'stability'] },
  { title: 'Filter Capacitors', path: 'chapters/capacitors/filter-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['filtering', 'ripple', 'EMI'] },
  { title: 'AC Coupling Capacitors', path: 'chapters/capacitors/ac-coupling-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['AC coupling', 'DC block', 'signal'] },
  { title: 'Bootstrap Capacitors', path: 'chapters/capacitors/bootstrap-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['bootstrap', 'gate driver', 'high-side'] },
  { title: 'Snubber Capacitors', path: 'chapters/capacitors/snubber-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['snubber', 'ringing', 'spike', 'switching'] },
  { title: 'Timing Capacitors', path: 'chapters/capacitors/timing-capacitors.html', category: 'Capacitors', icon: '🔋', tags: ['timer', '555', 'RC time constant'] },

  // ── Power
  { title: 'Power Distribution', path: 'chapters/power/power-distribution.html', category: 'Power', icon: '🔌', tags: ['PDN', 'power delivery network'] },
  { title: 'LDO Regulators', path: 'chapters/power/ldo.html', category: 'Power', icon: '🔌', tags: ['LDO', 'linear regulator', 'dropout voltage'] },
  { title: 'Buck Converter', path: 'chapters/power/buck-converter.html', category: 'Power', icon: '🔌', tags: ['buck', 'step-down', 'switching regulator', 'SMPS'] },
  { title: 'Boost Converter', path: 'chapters/power/boost-converter.html', category: 'Power', icon: '🔌', tags: ['boost', 'step-up', 'SMPS'] },
  { title: 'Buck-Boost Converter', path: 'chapters/power/buck-boost-converter.html', category: 'Power', icon: '🔌', tags: ['buck-boost', 'SEPIC', 'inverting'] },
  { title: 'Power Sequencing', path: 'chapters/power/power-sequencing.html', category: 'Power', icon: '🔌', tags: ['power-up sequence', 'PMIC', 'enable'] },
  { title: 'Reverse Polarity Protection', path: 'chapters/power/reverse-polarity-protection.html', category: 'Power', icon: '🔌', tags: ['reverse polarity', 'protection', 'MOSFET', 'diode'] },
  { title: 'Fuse Selection', path: 'chapters/power/fuse-selection.html', category: 'Power', icon: '🔌', tags: ['fuse', 'overcurrent', 'fast blow', 'slow blow'] },
  { title: 'TVS Diodes', path: 'chapters/power/tvs-diodes.html', category: 'Power', icon: '🔌', tags: ['TVS', 'transient', 'ESD', 'clamping'] },
  { title: 'Overcurrent Protection', path: 'chapters/power/overcurrent-protection.html', category: 'Power', icon: '🔌', tags: ['current limit', 'OCP', 'short circuit'] },
  { title: 'Inrush Current Protection', path: 'chapters/power/inrush-current-protection.html', category: 'Power', icon: '🔌', tags: ['inrush', 'NTC', 'soft start'] },
  { title: 'Trace Current Capacity', path: 'chapters/power/trace-current-capacity.html', category: 'Power', icon: '🔌', tags: ['trace width', 'IPC-2221', 'current rating'] },

  // ── MOSFETs
  { title: 'MOSFET Basics', path: 'chapters/mosfets/mosfet-basics.html', category: 'MOSFETs', icon: '🔷', tags: ['MOSFET', 'FET', 'Vgs', 'Vds', 'Id'] },
  { title: 'N-Channel MOSFET', path: 'chapters/mosfets/n-channel-mosfet.html', category: 'MOSFETs', icon: '🔷', tags: ['NMOS', 'N-channel', 'low-side switch'] },
  { title: 'P-Channel MOSFET', path: 'chapters/mosfets/p-channel-mosfet.html', category: 'MOSFETs', icon: '🔷', tags: ['PMOS', 'P-channel', 'high-side switch'] },
  { title: 'Body Diode', path: 'chapters/mosfets/body-diode.html', category: 'MOSFETs', icon: '🔷', tags: ['body diode', 'intrinsic diode', 'reverse conduction'] },
  { title: 'Gate Charge', path: 'chapters/mosfets/gate-charge.html', category: 'MOSFETs', icon: '🔷', tags: ['Qg', 'gate charge', 'switching speed', 'Miller'] },
  { title: 'Gate Resistors', path: 'chapters/mosfets/gate-resistors.html', category: 'MOSFETs', icon: '🔷', tags: ['gate resistor', 'Rg', 'ringing', 'EMI'] },
  { title: 'Gate Pull-down Resistors', path: 'chapters/mosfets/gate-pulldown-resistors.html', category: 'MOSFETs', icon: '🔷', tags: ['gate pull-down', 'floating gate', 'safe state'] },
  { title: 'Low-Side Switching', path: 'chapters/mosfets/low-side-switching.html', category: 'MOSFETs', icon: '🔷', tags: ['low side', 'N-channel', 'GND switching'] },
  { title: 'High-Side Switching', path: 'chapters/mosfets/high-side-switching.html', category: 'MOSFETs', icon: '🔷', tags: ['high side', 'P-channel', 'bootstrap', 'gate driver'] },
  { title: 'Flyback Diodes', path: 'chapters/mosfets/flyback-diodes.html', category: 'MOSFETs', icon: '🔷', tags: ['flyback', 'freewheeling diode', 'inductive kick', 'solenoid'] },
  { title: 'MOSFET Safe Operating Area', path: 'chapters/mosfets/mosfet-soa.html', category: 'MOSFETs', icon: '🔷', tags: ['SOA', 'thermal runaway', 'safe operating area'] },

  // ── Communication
  { title: 'UART Basics', path: 'chapters/communication/uart.html', category: 'Communication', icon: '📡', tags: ['UART', 'serial', 'baud rate', 'TX', 'RX'] },
  { title: 'I2C Basics', path: 'chapters/communication/i2c-basics.html', category: 'Communication', icon: '📡', tags: ['I2C', 'TWI', 'SDA', 'SCL', 'address'] },
  { title: 'I2C Pull-ups', path: 'chapters/communication/i2c-pullups.html', category: 'Communication', icon: '📡', tags: ['I2C pull-up', '4.7k', 'bus capacitance'] },
  { title: 'SPI Basics', path: 'chapters/communication/spi-basics.html', category: 'Communication', icon: '📡', tags: ['SPI', 'MOSI', 'MISO', 'SCLK', 'CS'] },
  { title: 'SPI Chip Select', path: 'chapters/communication/spi-chip-select.html', category: 'Communication', icon: '📡', tags: ['chip select', 'CS', 'NSS', 'multiple devices'] },
  { title: 'CAN Bus Basics', path: 'chapters/communication/can-basics.html', category: 'Communication', icon: '📡', tags: ['CAN', 'CAN bus', 'differential', 'CANH', 'CANL'] },
  { title: 'CAN Bus Termination', path: 'chapters/communication/can-termination.html', category: 'Communication', icon: '📡', tags: ['CAN termination', '120 ohm', 'impedance'] },
  { title: 'RS-485 Basics', path: 'chapters/communication/rs485-basics.html', category: 'Communication', icon: '📡', tags: ['RS-485', 'half duplex', 'Modbus', 'differential'] },
  { title: 'RS-485 Termination', path: 'chapters/communication/rs485-termination.html', category: 'Communication', icon: '📡', tags: ['RS-485 termination', '120 ohm', 'stub'] },

  // ── PCB Design
  { title: 'PCB Design Overview', path: 'chapters/pcb/pcb-overview.html', category: 'PCB', icon: '🟢', tags: ['PCB', 'layout', 'routing'] },
  { title: 'Trace Width', path: 'chapters/pcb/trace-width.html', category: 'PCB', icon: '🟢', tags: ['trace width', 'IPC-2221', 'mil', 'current'] },
  { title: 'Via Current Capacity', path: 'chapters/pcb/via-current-capacity.html', category: 'PCB', icon: '🟢', tags: ['via', 'current', 'thermal via', 'resistance'] },
  { title: 'Via Stitching', path: 'chapters/pcb/via-stitching.html', category: 'PCB', icon: '🟢', tags: ['via stitching', 'ground stitching', 'EMI', 'shielding'] },
  { title: 'Copper Pours', path: 'chapters/pcb/copper-pours.html', category: 'PCB', icon: '🟢', tags: ['copper pour', 'flood fill', 'polygon'] },
  { title: 'Ground Pours', path: 'chapters/pcb/ground-pours.html', category: 'PCB', icon: '🟢', tags: ['ground plane', 'GND flood', 'return path'] },
  { title: 'Thermal Relief', path: 'chapters/pcb/thermal-relief.html', category: 'PCB', icon: '🟢', tags: ['thermal relief', 'spokes', 'solderability'] },
  { title: 'Decoupling Cap Placement', path: 'chapters/pcb/decoupling-placement.html', category: 'PCB', icon: '🟢', tags: ['decoupling placement', 'close to IC', 'loop area'] },
  { title: '2-Layer PCB Stackup', path: 'chapters/pcb/stackup-2layer.html', category: 'PCB', icon: '🟢', tags: ['2 layer', 'stackup', 'signal layer', 'ground plane'] },
  { title: '4-Layer PCB Stackup', path: 'chapters/pcb/stackup-4layer.html', category: 'PCB', icon: '🟢', tags: ['4 layer', 'stackup', 'power plane', 'impedance'] },

  // ── Sensors
  { title: 'ADC Basics', path: 'chapters/sensors/adc-basics.html', category: 'Sensors', icon: '📊', tags: ['ADC', 'analog to digital', 'resolution', 'sampling'] },
  { title: 'Op-Amp Basics', path: 'chapters/sensors/opamps.html', category: 'Sensors', icon: '📊', tags: ['op-amp', 'operational amplifier', 'gain', 'virtual ground'] },
  { title: 'Current Sensing', path: 'chapters/sensors/current-sensing.html', category: 'Sensors', icon: '📊', tags: ['current sense', 'shunt', 'hall effect', 'INA'] },
  { title: 'Shunt Resistors', path: 'chapters/sensors/shunt-resistors.html', category: 'Sensors', icon: '📊', tags: ['shunt resistor', 'current shunt', 'milliohm'] },
  { title: 'Thermistors', path: 'chapters/sensors/thermistors.html', category: 'Sensors', icon: '📊', tags: ['thermistor', 'NTC', 'PTC', 'temperature'] },

  // ── Signal Integrity
  { title: 'Ringing & Overshoot', path: 'chapters/signal-integrity/ringing.html', category: 'Signal Integrity', icon: '〰️', tags: ['ringing', 'overshoot', 'undershoot', 'impedance'] },
  { title: 'Reflections', path: 'chapters/signal-integrity/reflections.html', category: 'Signal Integrity', icon: '〰️', tags: ['reflections', 'transmission line', 'impedance mismatch'] },
  { title: 'Series Termination', path: 'chapters/signal-integrity/series-termination.html', category: 'Signal Integrity', icon: '〰️', tags: ['series termination', 'source termination', 'ringing'] },
  { title: 'Controlled Impedance', path: 'chapters/signal-integrity/controlled-impedance.html', category: 'Signal Integrity', icon: '〰️', tags: ['controlled impedance', '50 ohm', 'microstrip', 'stripline'] },
  { title: 'Differential Pair Routing', path: 'chapters/signal-integrity/differential-pair-routing.html', category: 'Signal Integrity', icon: '〰️', tags: ['differential pair', 'USB', 'LVDS', 'length matching'] },

  // ── EMI/EMC
  { title: 'EMI Basics', path: 'chapters/emi-emc/emi-basics.html', category: 'EMI/EMC', icon: '📻', tags: ['EMI', 'electromagnetic interference', 'FCC', 'CE'] },
  { title: 'Ferrite Beads', path: 'chapters/emi-emc/ferrite-beads.html', category: 'EMI/EMC', icon: '📻', tags: ['ferrite bead', 'EMI filter', 'power line filter'] },
  { title: 'Common Mode Chokes', path: 'chapters/emi-emc/common-mode-chokes.html', category: 'EMI/EMC', icon: '📻', tags: ['common mode choke', 'differential', 'EMI'] },
  { title: 'Return Path Design', path: 'chapters/emi-emc/return-paths.html', category: 'EMI/EMC', icon: '📻', tags: ['return path', 'ground slot', 'current loop'] },

  // ── MCU Design
  { title: 'Reset Circuit', path: 'chapters/mcu-design/reset-circuit.html', category: 'MCU Design', icon: '🔲', tags: ['reset', 'NRST', 'RC reset', 'supervisor'] },
  { title: 'Crystal Oscillator', path: 'chapters/mcu-design/crystal-oscillator.html', category: 'MCU Design', icon: '🔲', tags: ['crystal', 'oscillator', 'load capacitors', 'XTAL'] },
  { title: 'Programming Header', path: 'chapters/mcu-design/programming-header.html', category: 'MCU Design', icon: '🔲', tags: ['programming', 'SWD', 'JTAG', 'ISP', 'header'] },
  { title: 'Debug Header', path: 'chapters/mcu-design/debug-header.html', category: 'MCU Design', icon: '🔲', tags: ['debug', 'SWD', 'JTAG', 'ARM', 'header'] },

  // ── Robotics
  { title: 'Robot Power Architecture', path: 'chapters/robotics/robot-power-architecture.html', category: 'Robotics', icon: '🤖', tags: ['robot power', '24V', 'motor power', 'logic power'] },
  { title: 'CAN Bus Design for Robotics', path: 'chapters/robotics/can-bus-design.html', category: 'Robotics', icon: '🤖', tags: ['CAN bus', 'robotics', 'motor controller'] },
  { title: 'Solenoid Driver Protection', path: 'chapters/robotics/solenoid-driver-protection.html', category: 'Robotics', icon: '🤖', tags: ['solenoid', 'flyback', 'TPS4H160', 'protection'] },
  { title: 'Motor Driver Protection', path: 'chapters/robotics/motor-driver-protection.html', category: 'Robotics', icon: '🤖', tags: ['motor driver', 'H-bridge', 'current sense', 'fault'] },
  { title: 'Emergency Stop Circuit', path: 'chapters/robotics/emergency-stop-circuit-design.html', category: 'Robotics', icon: '🤖', tags: ['e-stop', 'emergency stop', 'safety relay', 'STO'] },

  // ── Projects
  { title: 'Solenoid Controller Board', path: 'chapters/projects/solenoid-controller-board.html', category: 'Projects', icon: '🛠️', tags: ['solenoid controller', 'TPS4H160', 'MCP23S17', 'ADS1115', '8-channel'] },
  { title: 'ESP32 Minimum Board', path: 'chapters/projects/esp32-minimum-board.html', category: 'Projects', icon: '🛠️', tags: ['ESP32', 'minimum design', 'WiFi', 'Bluetooth'] },
  { title: 'CAN Node', path: 'chapters/projects/can-node.html', category: 'Projects', icon: '🛠️', tags: ['CAN node', 'transceiver', 'STM32', 'robotics'] },
  { title: 'Motor Driver Board', path: 'chapters/projects/motor-driver-board.html', category: 'Projects', icon: '🛠️', tags: ['motor driver', 'H-bridge', 'PWM', 'current sense'] },
  { title: 'Robot Control Board', path: 'chapters/projects/robot-control-board.html', category: 'Projects', icon: '🛠️', tags: ['robot control', 'central board', 'CAN', 'power'] },
];

// ── Fuzzy search ──────────────────────────────────────────
function scoreEntry(entry, query) {
  const q = query.toLowerCase();
  const title = entry.title.toLowerCase();
  const cat   = entry.category.toLowerCase();
  const tags  = (entry.tags || []).join(' ').toLowerCase();

  let score = 0;
  if (title === q)             score += 100;
  if (title.startsWith(q))     score += 60;
  if (title.includes(q))       score += 40;
  if (cat.includes(q))         score += 20;
  if (tags.includes(q))        score += 15;

  // word-by-word match
  const words = q.split(/\s+/).filter(Boolean);
  words.forEach(w => {
    if (title.includes(w)) score += 10;
    if (tags.includes(w))  score += 5;
  });

  return score;
}

function search(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim();

  return SEARCH_INDEX
    .map(entry => ({ entry, score: scoreEntry(entry, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ entry }) => entry);
}

// ── Highlight matched text ────────────────────────────────
function highlight(text, query) {
  const q = query.trim();
  if (!q) return text;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

// ── Render results ────────────────────────────────────────
function renderResults(results, query, container) {
  if (!container) return;
  container.innerHTML = '';

  if (!results.length) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; color: var(--text-3); font-size: 0.875rem;">
        No results for <strong style="color:var(--text-2)">"${query}"</strong>
      </div>`;
    return;
  }

  // Group by category
  const groups = {};
  results.forEach(r => {
    if (!groups[r.category]) groups[r.category] = [];
    groups[r.category].push(r);
  });

  Object.entries(groups).forEach(([cat, items]) => {
    const groupLabel = document.createElement('div');
    groupLabel.style.cssText = `padding: 6px 20px 4px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.1em;`;
    groupLabel.textContent = cat;
    container.appendChild(groupLabel);

    items.forEach((item, idx) => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = getRelativePath(item.path);
      a.setAttribute('data-idx', container.querySelectorAll('.search-result-item').length);

      a.innerHTML = `
        <div class="search-result-icon">${item.icon || '📄'}</div>
        <div>
          <div class="search-result-title">${highlight(item.title, query)}</div>
          <div class="search-result-path">${item.category}</div>
        </div>`;

      a.addEventListener('click', () => closeSearchPanel());
      container.appendChild(a);
    });
  });
}

// ── Get correct relative path from current page location ──
function getRelativePath(targetPath) {
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth <= 0 ? '' : '../'.repeat(depth);
  return prefix + targetPath;
}

// ── Close search panel ─────────────────────────────────────
function closeSearchPanel() {
  document.querySelector('.search-overlay')?.classList.remove('open');
}

// ── Keyboard navigation in search results ─────────────────
let focusedResultIdx = -1;

function moveFocus(dir) {
  const items = document.querySelectorAll('.search-result-item');
  if (!items.length) return;
  items[focusedResultIdx]?.classList.remove('focused');
  focusedResultIdx = Math.max(0, Math.min(items.length - 1, focusedResultIdx + dir));
  items[focusedResultIdx]?.classList.add('focused');
  items[focusedResultIdx]?.scrollIntoView({ block: 'nearest' });
}

// ── Initialize search UI ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const input     = document.querySelector('.search-input');
  const results   = document.querySelector('.search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    focusedResultIdx = -1;
    const q = input.value.trim();
    if (q.length < 2) {
      results.innerHTML = `
        <div style="padding:24px;text-align:center;color:var(--text-3);font-size:0.875rem;">
          Start typing to search…
        </div>`;
      return;
    }
    renderResults(search(q), q, results);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown')  { e.preventDefault(); moveFocus(1); }
    if (e.key === 'ArrowUp')    { e.preventDefault(); moveFocus(-1); }
    if (e.key === 'Enter') {
      const focused = document.querySelector('.search-result-item.focused');
      if (focused) { focused.click(); return; }
      const first = document.querySelector('.search-result-item');
      if (first) first.click();
    }
  });
});
