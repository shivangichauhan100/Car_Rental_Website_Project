//frontend>scripts>main.js
  document.addEventListener("DOMContentLoaded", function () {
    const pickupLocationDropdown = document.getElementById("pickup-location");
    const pickupAreaDropdown = document.getElementById("pickup-area");

    const cityAreas = {
      Delhi: ["Connaught Place", "Karol Bagh", "Saket", "Dwarka", "Rajouri Garden", "Lajpat Nagar", "Vasant Kunj", "Rohini"],
      Mumbai: ["Andheri", "Bandra", "Juhu", "Borivali", "Powai" ,"Dadar", "Thane", "Malad"],
      Chennai: ["T. Nagar", "Velachery", "Adyar", "Anna Nagar", "Tambaram", "Porur", "Nungamabakkam", "MyLapore"],
      Kolkata: ["Salt Lake", "Howrah", "Park Street", "Ballygunge"],
      Bangalore: ["Indiranagar", "Koramangala", "Whitefield", "MG Road"]
    };

    pickupLocationDropdown.addEventListener("change", function () {
      const selectedCity = this.value;
      const areas = cityAreas[selectedCity] || [];

      // Clear previous options
      pickupAreaDropdown.innerHTML = '<option value="">-- Select an Area --</option>';

      // Add new options
      areas.forEach(area => {
        const option = document.createElement("option");
        option.value = area;
        option.textContent = area;
        pickupAreaDropdown.appendChild(option);
      });
    });
});

class LocationHandler {
  constructor() {
    this.gpsBtn = document.getElementById("gps-btn");
    this.gpsStatus = document.getElementById("gps-status");
    this.pickupLocation = document.getElementById("pickup-location");
    this.pickupArea = document.getElementById("pickup-area");
    this.mapContainer = document.getElementById("map-container");
    this.map = null;
    this.marker = null;
    
    this.init();
  }
  
  init() {
    if (this.gpsBtn) {
      this.gpsBtn.addEventListener("click", this.getLocation.bind(this));
    }
    
    // Initialize map container (hidden by default)
    if (this.mapContainer) {
      this.mapContainer.style.display = "none";
    }
  }

  async getLocation() {
    if (!navigator.geolocation) {
      this.showStatus("Geolocation is not supported by your browser", "error");
      return;
    }

    this.showLoading();
    
    try {
      const position = await this.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      // Show map with location
      this.showMap(latitude, longitude);
      
      // Reverse geocode to get address
      const address = await this.reverseGeocode(latitude, longitude);
      this.showStatus(`Location found: ${address}`, "success");
      
      // Try to match with our locations
      this.matchWithServiceAreas(address);
      
    } catch (error) {
      this.handleGeolocationError(error);
    } finally {
      this.hideLoading();
    }
  }
  
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    });
  }
  
  showMap(lat, lng) {
    // Show map container
    this.mapContainer.style.display = "block";
    
    // Initialize map if not already done
    if (!this.map) {
      this.map = L.map('map').setView([lat, lng], 15);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    } else {
      this.map.setView([lat, lng], 15);
    }
    
    // Add or update marker
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = L.marker([lat, lng]).addTo(this.map)
        .bindPopup("Your location")
        .openPopup();
    }
  }
  
  async reverseGeocode(lat, lng) {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      
      if (data.address) {
        return this.formatAddress(data.address);
      }
      return "Address not available";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Could not determine address";
    }
  }
  
  formatAddress(address) {
    const parts = [];
    if (address.road) parts.push(address.road);
    if (address.suburb) parts.push(address.suburb);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.country) parts.push(address.country);
    
    return parts.join(", ");
  }
  
  matchWithServiceAreas(address) {
    // Simple implementation - you might want to enhance this
    const cityOptions = Array.from(this.pickupLocation.options).map(opt => opt.value);
    
    for (const city of cityOptions) {
      if (city && address.toLowerCase().includes(city.toLowerCase())) {
        this.pickupLocation.value = city;
        this.pickupLocation.dispatchEvent(new Event('change'));
        break;
      }
    }
  }
  
  showLoading() {
    this.gpsBtn.classList.add('loading');
    this.gpsBtn.disabled = true;
    this.showStatus("Locating...", "loading");
    
    // Add loading spinner
    const spinner = document.createElement('i');
    spinner.className = 'fa-solid fa-spinner fa-spin';
    this.gpsBtn.insertBefore(spinner, this.gpsBtn.querySelector('i'));
  }
  
  hideLoading() {
    this.gpsBtn.classList.remove('loading');
    this.gpsBtn.disabled = false;
    
    // Remove loading spinner
    const spinner = this.gpsBtn.querySelector('.fa-spinner');
    if (spinner) {
      spinner.remove();
    }
  }
  
  showStatus(message, type = "info") {
    this.gpsStatus.textContent = message;
    this.gpsStatus.className = type;
    
    // Auto-hide success messages after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        if (this.gpsStatus.textContent === message) {
          this.gpsStatus.textContent = "";
        }
      }, 5000);
    }
  }
  
  handleGeolocationError(error) {
    let message = "An error occurred while getting your location";
    
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "Location access was denied. Please enable permissions.";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        message = "The request to get location timed out.";
        break;
    }
    
    this.showStatus(message, "error");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  new LocationHandler();
});