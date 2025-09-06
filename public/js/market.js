const searchBtn = document.getElementById("searchBtn");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const avgCard = document.getElementById("avgCard");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", fetchMarketData);
if (loadSampleBtn) {
  loadSampleBtn.addEventListener("click", loadSampleData);
}

async function fetchMarketData() {
  const state = document.getElementById("stateInput").value.trim();
  const district = document.getElementById("districtInput").value.trim();
  const commodity = document.getElementById("commodityInput").value.trim();
  const market = document.getElementById("marketInput").value.trim();

  // Capitalize commodity name to match API format
  const capitalizedCommodity = commodity ? commodity.charAt(0).toUpperCase() + commodity.slice(1).toLowerCase() : '';

  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (district) params.append("district", district);
  if (capitalizedCommodity) params.append("commodity", capitalizedCommodity);
  if (market) params.append("market", market);
  params.append("limit", "20"); // Get more results

  console.log('🔍 Searching with params:', params.toString());

  try {
    const res = await fetch(`/api/crop-price?${params.toString()}`);
    const data = await res.json();

    console.log('📊 API Response:', data);

    if (data.records && data.records.length > 0) {
      displayAvgCard(data.records);
      displayResultTable(data.records);
    } else {
      avgCard.innerHTML = `<p>No data found for these filters. Try searching without filters to see available data.</p>`;
      resultDiv.innerHTML = "";
    }

  } catch (err) {
    console.error('❌ Error:', err);
    avgCard.innerHTML = `<p>Error fetching data: ${err}</p>`;
    resultDiv.innerHTML = "";
  }
}

// Average modal price card
function displayAvgCard(records) {
  if (!records || records.length === 0) {
    avgCard.innerHTML = "No data found for these filters.";
    return;
  }

  const statePriceMap = {};
  const stateCountMap = {};

  records.forEach(r => {
    const priceKg = r.modal_price / 100; // quintal → kg
    if (!statePriceMap[r.state]) {
      statePriceMap[r.state] = 0;
      stateCountMap[r.state] = 0;
    }
    statePriceMap[r.state] += priceKg;
    stateCountMap[r.state]++;
  });

  let html = "<h3>Average Modal Price per State (₹/Kg)</h3>";
  for (let state in statePriceMap) {
    const avg = (statePriceMap[state] / stateCountMap[state]).toFixed(2);
    html += `<p>${state}: ₹${avg}</p>`;
  }

  avgCard.innerHTML = html;
}

// Optional: table with full filtered data
function displayResultTable(records) {
  if (!records || records.length === 0) {
    resultDiv.innerHTML = "";
    return;
  }

  let html = `<table>
    <tr>
      <th>Commodity</th>
      <th>Market</th>
      <th>State</th>
      <th>Modal Price (₹/Kg)</th>
      <th>Date</th>
    </tr>`;

  records.forEach(r => {
    const priceKg = (r.modal_price / 100).toFixed(2);
    html += `<tr>
      <td>${r.commodity}</td>
      <td>${r.market || "—"}</td>
      <td>${r.state}</td>
      <td>${priceKg}</td>
      <td>${r.arrival_date}</td>
    </tr>`;
  });

  html += "</table>";
  resultDiv.innerHTML = html;
}

// Load sample data without filters
async function loadSampleData() {
  console.log('📊 Loading sample data...');
  
  try {
    const res = await fetch('/api/crop-price?limit=10');
    const data = await res.json();

    console.log('📊 Sample data response:', data);

    if (data.records && data.records.length > 0) {
      displayAvgCard(data.records);
      displayResultTable(data.records);
    } else {
      avgCard.innerHTML = `<p>No sample data available.</p>`;
      resultDiv.innerHTML = "";
    }

  } catch (err) {
    console.error('❌ Error loading sample data:', err);
    avgCard.innerHTML = `<p>Error loading sample data: ${err}</p>`;
    resultDiv.innerHTML = "";
  }
}
