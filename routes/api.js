const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "579b464db66ec23bdd00000184ca3b7476e64720686100c3cf29b25b";
const API_URL = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24";

router.get("/crop-price", async (req, res) => {
  const { commodity, state, district, market, arrival_date, limit } = req.query;

  try {
    // Try to find data with smart date fallback
    const result = await findDataWithDateFallback({
      commodity,
      state,
      district,
      market,
      limit: limit || 20
    });

    if (result.success) {
      res.json({
        success: true,
        records: result.records,
        searchDate: result.searchDate,
        message: result.message
      });
    } else {
      res.json({
        success: false,
        records: [],
        message: result.message
      });
    }
  } catch (err) {
    console.error('❌ API Error:', err.message);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch API data", 
      details: err.message 
    });
  }
});

// Smart date fallback function
async function findDataWithDateFallback(filters) {
  const { commodity, state, district, market, limit } = filters;
  
  // Generate dates for the last 7 days (MM-DD-YYYY format)
  const dates = generateLast7Days();
  
  console.log('🔍 Starting smart date search for:', { commodity, state, district, market, limit });
  
  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    console.log(`📅 Trying date ${i + 1}/7: ${currentDate}`);
    
    try {
      // Build API parameters
      const params = new URLSearchParams();
      params.append("api-key", API_KEY);
      params.append("format", "json");
      params.append("limit", limit);
      params.append("filters[Arrival_Date]", currentDate);

      if (commodity) params.append("filters[Commodity]", commodity);
      if (state) params.append("filters[State]", state);
      if (district) params.append("filters[District]", district);
      if (market) params.append("filters[Market]", market);

      const url = `${API_URL}?${params.toString()}`;
      const response = await axios.get(url);
      
      if (response.data.records && response.data.records.length > 0) {
        console.log(`✅ Found data for ${currentDate}: ${response.data.records.length} records`);
        
        const records = response.data.records.map(r => ({
          state: r.State,
          commodity: r.Commodity,
          modal_price: parseFloat(r.Modal_Price), // ₹ per quintal
          arrival_date: r.Arrival_Date,
          market: r.Market || 'N/A'
        }));

        return {
          success: true,
          records: records,
          searchDate: currentDate,
          message: i === 0 ? 'Latest data found' : `Data from ${currentDate} (${i} days ago)`
        };
      } else {
        console.log(`❌ No data for ${currentDate}`);
      }
    } catch (error) {
      console.log(`⚠️ Error searching ${currentDate}:`, error.message);
    }
  }
  
  // No data found in last 7 days
  const commodityText = commodity ? ` for ${commodity}` : '';
  return {
    success: false,
    records: [],
    message: `No data found${commodityText} in the last 7 days`
  };
}

// Generate last 7 days in MM-DD-YYYY format
function generateLast7Days() {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    dates.push(`${month}-${day}-${year}`);
  }
  
  return dates;
}

module.exports = router;
