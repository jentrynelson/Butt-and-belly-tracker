<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#111827" />
  <title>Butt & Belly Tracker</title>

  <link rel="manifest" href="manifest.json" />
  <link rel="stylesheet" href="styles.css" />

  <!-- Free charting library -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
</head>
<body>
  <header class="container">
    <div class="title-row">
      <h1>Butt &amp; Belly Tracker</h1>
      <button id="installBtn" class="ghost" hidden>Install</button>
    </div>
    <p class="subtitle">Diapers, feeds, weight, and reorder links — tracked by age, with graphs.</p>
    <p class="muted tiny">Saves on-device (PWA). Quick log for wet/poop and feed amounts.</p>
  </header>

  <main class="container">
    <!-- Baby profile -->
    <section class="card">
      <div class="results-header">
        <h2>Baby profile</h2>
        <div class="muted" id="ageText"></div>
      </div>

      <div class="row">
        <label class="field">
          <span>Name (optional)</span>
          <input id="babyName" placeholder="e.g., Baby N" />
        </label>

        <label class="field">
          <span>Date of birth</span>
          <input id="babyDob" type="date" />
        </label>

        <label class="field">
          <span>Units</span>
          <select id="unitSelect">
            <option value="us">US (oz, lb)</option>
            <option value="metric">Metric (mL, kg)</option>
          </select>
        </label>
      </div>

      <div class="actions">
        <button id="saveProfileBtn">Save profile</button>
      </div>

      <p class="muted tiny">
        Recommendations are informational and can’t replace your pediatrician’s guidance—especially if baby is premature, has reflux, or poor weight gain.
      </p>
    </section>

    <!-- Quick actions: diaper event + feed + weight -->
    <section class="card">
      <h2>Quick log</h2>

      <div class="grid2">
        <div class="panel">
          <h3>Diaper change</h3>
          <p class="muted tiny">Tap Wet/Poop → choose diaper inventory item → choose size used.</p>

          <div class="actions">
            <button id="logWetBtn" class="ghost">Wet</button>
            <button id="logPoopBtn" class="ghost">Poop</button>
          </div>

          <div class="row">
            <label class="field">
              <span>Use from inventory item</span>
              <select id="diaperInvSelect"></select>
            </label>

            <label class="field">
              <span>Size used (follow-up)</span>
              <select id="diaperSizeUsed">
                <option value="">(optional)</option>
                <option value="N">N</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </label>

            <label class="field">
              <span>Timestamp</span>
              <input id="diaperTime" type="datetime-local" />
            </label>
          </div>
        </div>

        <div class="panel">
          <h3>Feeding + Weight</h3>

          <div class="row">
            <label class="field">
              <span>Feed amount (oz or mL)</span>
              <input id="feedAmount" type="number" min="0" step="0.5" placeholder="e.g., 4" />
            </label>

            <label class="field">
              <span>Timestamp</span>
              <input id="feedTime" type="datetime-local" />
            </label>

            <div class="field">
              <span>&nbsp;</span>
              <button id="logFeedBtn" class="ghost">Log feed</button>
            </div>
          </div>

          <div class="row">
            <label class="field">
              <span>Weight (lb or kg)</span>
              <input id="weightValue" type="number" min="0" step="0.01" placeholder="e.g., 10.25" />
            </label>

            <label class="field">
              <span>Timestamp</span>
              <input id="weightTime" type="datetime-local" />
            </label>

            <div class="field">
              <span>&nbsp;</span>
              <button id="logWeightBtn" class="ghost">Log weight</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommendations -->
    <section class="card">
      <div class="results-header">
        <h2>Today’s summary & informational ranges</h2>
        <div class="muted" id="todaySummary"></div>
      </div>
      <div id="recommendations" class="muted"></div>
    </section>

    <!-- Charts -->
    <section class="card">
      <h2>Graphs</h2>
      <div class="chartGrid">
        <div class="chartCard">
          <h3>Diapers per day</h3>
          <canvas id="chartDiapers"></canvas>
        </div>
        <div class="chartCard">
          <h3>Formula/milk intake per day</h3>
          <canvas id="chartFeeds"></canvas>
        </div>
        <div class="chartCard">
          <h3>Weight over time</h3>
          <canvas id="chartWeight"></canvas>
        </div>
      </div>
    </section>

    <!-- Inventory -->
    <section class="card">
      <h2>Inventory (with reorder links)</h2>

      <div class="row">
        <label class="field">
          <span>Type</span>
          <select id="typeSelect">
            <option value="diaper">Diapers</option>
            <option value="formula">Formula</option>
          </select>
        </label>

        <label class="field">
          <span>Brand</span>
          <input id="brandInput" placeholder="e.g., Pampers, Huggies, Kirkland..." />
        </label>

        <label class="field" id="sizeField">
          <span>Size (optional)</span>
          <input id="sizeInput" placeholder="e.g., N, 1, 2..." />
        </label>
      </div>

      <div class="row">
        <label class="field">
          <span>Quantity you have now</span>
          <input id="qtyInput" type="number" min="0" step="1" placeholder="e.g., 120" />
        </label>

        <label class="field">
          <span>Reorder link (optional)</span>
          <input id="linkInput" placeholder="Paste a product link (Amazon/Target/Walmart/etc.)" />
        </label>

        <label class="field">
          <span>Low-stock alert threshold</span>
          <input id="thresholdInput" type="number" min="0" step="1" placeholder="e.g., 30" />
        </label>
      </div>

      <div class="actions">
        <button id="addBtn">Add / Update Item</button>
        <button id="resetFormBtn" class="ghost">Reset form</button>
      </div>

      <div class="row">
        <label class="field">
          <span>Filter</span>
          <select id="filterSelect">
            <option value="all">All</option>
            <option value="diaper">Diapers</option>
            <option value="formula">Formula</option>
            <option value="low">Low stock only</option>
          </select>
        </label>

        <label class="field">
          <span>Search</span>
          <input id="searchInput" type="search" placeholder="Search by brand..." />
        </label>

        <label class="field">
          <span>Sort</span>
          <select id="sortSelect">
            <option value="type">Type</option>
            <option value="brand">Brand</option>
            <option value="qty">Quantity</option>
          </select>
        </label>
      </div>

      <div class="actions">
        <button id="exportBtn" class="ghost">Export (copy)</button>
        <button id="importBtn" class="ghost">Import</button>
        <button id="clearAllBtn" class="danger">Clear all</button>
      </div>

      <div id="inventory" class="results" aria-live="polite"></div>
    </section>

    <!-- Import modal -->
    <dialog id="importModal">
      <div class="modal-header">
        <h3>Import</h3>
        <button id="importCloseBtn" class="ghost">Close</button>
      </div>
      <div class="modal-body">
        <p class="muted">Paste exported JSON here.</p>
        <textarea id="importText" rows="10" style="width:100%"></textarea>
        <div class="actions">
          <button id="importDoBtn">Import now</button>
        </div>
      </div>
    </dialog>

    <footer class="container footer">
      <div class="fineprint">
        Data is saved on your device (localStorage). If you clear browser data, it resets.
      </div>
    </footer>
  </main>

  <script src="app.js"></script>
</body>
</html>
