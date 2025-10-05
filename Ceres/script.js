// Button: open maps (demo)
const viewBtn = document.getElementById('view-maps-btn');
if (viewBtn) {
  viewBtn.addEventListener('click', () => {
    alert('Redirecting to energy maps…');
  });
}

// Dropdowns (season + map type)
const seasonSelect = document.getElementById('season-select');
const mapTypeSelect = document.getElementById('map-type');

[seasonSelect, mapTypeSelect].forEach(select => {
  if (select) {
    select.addEventListener('change', () => {
      const season = seasonSelect ? seasonSelect.value : 'annual';
      const map = mapTypeSelect ? mapTypeSelect.value : 'shortwave';
      console.log(`Showing ${map} map in ${season}`);
    });
  }
});

// Sliders (cloudiness + albedo)
const cloudiness = document.getElementById('cloudiness');
const albedo = document.getElementById('albedo');
const cloudValue = document.getElementById('cloud-value');
const albedoValue = document.getElementById('albedo-value');
const balanceResult = document.getElementById('balance-result');

function updateBalance() {
  if (!cloudiness || !albedo || !balanceResult) return;
  const cloud = parseInt(cloudiness.value, 10);
  const alb = parseInt(albedo.value, 10);
  const balance = (100 - alb) - (cloud * 0.3);
  balanceResult.textContent = `${balance.toFixed(1)} W/m²`;
}

if (cloudiness) {
  cloudiness.addEventListener('input', () => {
    if (cloudValue) cloudValue.textContent = cloudiness.value;
    updateBalance();
  });
}

if (albedo) {
  albedo.addEventListener('input', () => {
    if (albedoValue) albedoValue.textContent = albedo.value;
    updateBalance();
  });
}

// Initialize values
updateBalance();
