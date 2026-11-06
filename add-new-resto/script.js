// State management for 4 full-page sections
let currentStep = 1;
const totalSteps = 4;
const stepNames = [
  "Account Information",
  "Basic Restaurant Details",
  "Location Details",
  "Legal & Workspace Setup"
];

/* ==========================================================
   WAZPP COUNTRY PHONE DATA SPECIFICATION
   ========================================================== */
const COUNTRIES_PHONE_DATA = [
  // Primary / Home
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', mobileDigits: 10, formatExample: '98765 43210', lat: 20.5937, lng: 78.9629, zoom: 5 },

  // India's Neighbouring Countries
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', mobileDigits: 9, formatExample: '71 234 5678', lat: 7.8731, lng: 80.7718, zoom: 7 },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', mobileDigits: 10, formatExample: '984 1234567', lat: 28.3949, lng: 84.1240, zoom: 7 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', mobileDigits: 10, formatExample: '1712 345678', lat: 23.6850, lng: 90.3563, zoom: 7 },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻', mobileDigits: 7, formatExample: '712 3456', lat: 3.2028, lng: 73.2207, zoom: 8 },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹', mobileDigits: 8, formatExample: '17 12 34 56', lat: 27.5142, lng: 90.4336, zoom: 8 },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲', mobileDigits: 10, formatExample: '9 1234 5678', lat: 21.9162, lng: 95.9560, zoom: 6 },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', mobileDigits: 9, formatExample: '81 234 5678', lat: 15.8700, lng: 100.9925, zoom: 6 },

  // Middle East / GCC
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', mobileDigits: 9, formatExample: '50 123 4567', lat: 23.4241, lng: 53.8478, zoom: 7 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', mobileDigits: 9, formatExample: '50 123 4567', lat: 23.8859, lng: 45.0792, zoom: 5 },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', mobileDigits: 8, formatExample: '3312 3456', lat: 25.3548, lng: 51.1839, zoom: 9 },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', mobileDigits: 8, formatExample: '9123 4567', lat: 29.3117, lng: 47.4818, zoom: 8 },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', mobileDigits: 8, formatExample: '9123 4567', lat: 21.4735, lng: 55.9754, zoom: 6 },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', mobileDigits: 8, formatExample: '3612 3456', lat: 26.0667, lng: 50.5577, zoom: 10 },

  // Southeast Asia & Pacific
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', mobileDigits: 8, formatExample: '8123 4567', lat: 1.3521, lng: 103.8198, zoom: 11 },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', mobileDigits: 10, formatExample: '12 345 6789', lat: 4.2105, lng: 101.9758, zoom: 6 },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', mobileDigits: 10, formatExample: '812 3456 7890', lat: -0.7893, lng: 113.9213, zoom: 5 },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', mobileDigits: 10, formatExample: '917 123 4567', lat: 12.8797, lng: 121.7740, zoom: 6 },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', mobileDigits: 9, formatExample: '412 345 678', lat: -25.2744, lng: 133.7751, zoom: 4 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', mobileDigits: 9, formatExample: '21 123 4567', lat: -40.9006, lng: 174.8860, zoom: 5 },

  // Western Markets
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', mobileDigits: 10, formatExample: '555 000 0000', lat: 37.0902, lng: -95.7129, zoom: 4 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', mobileDigits: 10, formatExample: '7911 123456', lat: 55.3781, lng: -3.4360, zoom: 6 },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', mobileDigits: 10, formatExample: '555 000 0000', lat: 56.1304, lng: -106.3468, zoom: 4 },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', mobileDigits: 10, formatExample: '151 23456789', lat: 51.1657, lng: 10.4515, zoom: 6 },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', mobileDigits: 9, formatExample: '6 12 34 56 78', lat: 46.2276, lng: 2.2137, zoom: 6 },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', mobileDigits: 9, formatExample: '85 123 4567', lat: 53.1424, lng: -7.6921, zoom: 7 },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', mobileDigits: 9, formatExample: '6 12345678', lat: 52.1326, lng: 5.2913, zoom: 7 },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', mobileDigits: 9, formatExample: '612 34 56 78', lat: 40.4637, lng: -3.7492, zoom: 6 },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', mobileDigits: 10, formatExample: '320 1234567', lat: 41.8719, lng: 12.5674, zoom: 6 },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', mobileDigits: 11, formatExample: '11 98765 4321', lat: -14.2350, lng: -51.9253, zoom: 4 },

  // African Nations
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', mobileDigits: 10, formatExample: '802 123 4567', lat: 9.0820, lng: 8.6753, zoom: 6 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', mobileDigits: 9, formatExample: '82 123 4567', lat: -30.5595, lng: 22.9375, zoom: 5 },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', mobileDigits: 9, formatExample: '712 345678', lat: -0.0236, lng: 37.9062, zoom: 6 },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', mobileDigits: 10, formatExample: '10 1234 5678', lat: 26.8206, lng: 30.8025, zoom: 6 }
];

/* ==========================================================
   PRELOADED REGIONAL STATES & DISTRICTS
   ========================================================== */
const PRELOADED_LOCATIONS = {
  'India': {
    states: [
      { name: 'Kerala', districts: ['Alappuzha', 'Ernakulam (Kochi)', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Thiruvananthapuram', 'Thrissur', 'Wayanad'] },
      { name: 'Tamil Nadu', districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Vellore', 'Thanjavur', 'Dindigul'] },
      { name: 'Karnataka', districts: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Mangaluru', 'Hubballi-Dharwad', 'Belagavi', 'Udupi', 'Shivamogga', 'Davanagere', 'Tumakuru'] },
      { name: 'Maharashtra', districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nagpur', 'Nashik', 'Aurangabad', 'Navi Mumbai', 'Solapur', 'Kolhapur'] },
      { name: 'Delhi', districts: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi', 'Dwarka'] },
      { name: 'Telangana', districts: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Rangareddy', 'Medchal-Malkajgiri'] },
      { name: 'Gujarat', districts: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar', 'Jamnagar'] },
      { name: 'Uttar Pradesh', districts: ['Lucknow', 'Kanpur', 'Noida', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad', 'Meerut'] },
      { name: 'West Bengal', districts: ['Kolkata', 'Howrah', 'North 24 Parganas', 'South 24 Parganas', 'Durgapur', 'Siliguri'] },
      { name: 'Rajasthan', districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'] },
      { name: 'Punjab', districts: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'] },
      { name: 'Andhra Pradesh', districts: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati'] }
    ]
  },
  'United Arab Emirates': {
    states: [
      { name: 'Dubai', districts: ['Downtown Dubai', 'Business Bay', 'Deira', 'Bur Dubai', 'Dubai Marina', 'Jumeirah', 'Al Barsha', 'Al Quoz', 'Mirdif', 'JLT'] },
      { name: 'Abu Dhabi', districts: ['Abu Dhabi City', 'Al Ain', 'Al Dhafra', 'Mussafah', 'Khalifa City', 'Yas Island', 'Saadiyat Island'] },
      { name: 'Sharjah', districts: ['Sharjah City', 'Khor Fakkan', 'Kalba', 'Al Dhaid', 'Al Majaz', 'Al Nahda'] },
      { name: 'Ajman', districts: ['Ajman City', 'Masfout', 'Manama', 'Al Nuaimia'] },
      { name: 'Ras Al Khaimah', districts: ['Ras Al Khaimah City', 'Al Jazirah Al Hamra', 'Al Rams', 'Al Nakheel'] },
      { name: 'Fujairah', districts: ['Fujairah City', 'Dibba Al-Fujairah', 'Al Bidya'] },
      { name: 'Umm Al Quwain', districts: ['Umm Al Quwain City', 'Falaj Al Mualla'] }
    ]
  },
  'Saudi Arabia': {
    states: [
      { name: 'Riyadh Region', districts: ['Riyadh Central', 'Al Olaya', 'Al Malaz', 'Al Kharj', 'Ad Diriyah', 'Al Majma\'ah'] },
      { name: 'Makkah Region', districts: ['Jeddah', 'Makkah City', 'Taif', 'Rabigh', 'Al Qunfudhah'] },
      { name: 'Eastern Province', districts: ['Dammam', 'Al Khobar', 'Jubail', 'Dhahran', 'Qatif', 'Al Hofuf'] },
      { name: 'Madinah Region', districts: ['Madinah City', 'Yanbu', 'Al Ula'] },
      { name: 'Asir Region', districts: ['Abha', 'Khamis Mushait'] },
      { name: 'Tabuk Region', districts: ['Tabuk City', 'Duba', 'NEOM Area'] }
    ]
  },
  'Qatar': {
    states: [
      { name: 'Doha', districts: ['Doha Central', 'West Bay', 'The Pearl', 'Al Sadd', 'Msheireb', 'Old Airport'] },
      { name: 'Al Rayyan', districts: ['Al Rayyan City', 'Education City', 'Muaither', 'Al Gharrafa'] },
      { name: 'Al Wakrah', districts: ['Al Wakrah City', 'Mesaieed', 'Al Wukair'] },
      { name: 'Al Khor', districts: ['Al Khor City', 'Al Thakhira'] }
    ]
  },
  'Oman': {
    states: [
      { name: 'Muscat Governorate', districts: ['Muttrah', 'Bawshar', 'Seeb', 'Ruwi', 'Al Qurum', 'Al Khuwair'] },
      { name: 'Dhofar Governorate', districts: ['Salalah', 'Taqah', 'Mirbat'] },
      { name: 'Al Batinah North', districts: ['Sohar', 'Shinas', 'Liwa', 'Saham'] },
      { name: 'Al Dakhiliyah', districts: ['Nizwa', 'Bahla', 'Samail'] }
    ]
  },
  'Kuwait': {
    states: [
      { name: 'Al Asimah (Capital)', districts: ['Kuwait City', 'Sharq', 'Mirgab', 'Dasman', 'Shuwaikh'] },
      { name: 'Hawalli Governorate', districts: ['Hawalli City', 'Salmiya', 'Rumaithiya', 'Jabriya', 'Bayan'] },
      { name: 'Al Farwaniyah', districts: ['Farwaniya City', 'Khaitan', 'Jleeb Al-Shuyoukh', 'Rabiya'] },
      { name: 'Al Ahmadi', districts: ['Ahmadi City', 'Fahaheel', 'Mangaf', 'Mahboula'] }
    ]
  },
  'Bahrain': {
    states: [
      { name: 'Capital Governorate', districts: ['Manama', 'Juffair', 'Seef', 'Adliya', 'Umm Al Hassam'] },
      { name: 'Muharraq Governorate', districts: ['Muharraq City', 'Busaiteen', 'Hidd', 'Amwaj Islands'] },
      { name: 'Northern Governorate', districts: ['Budaiya', 'Saar', 'Hamad Town', 'Janabiyah'] },
      { name: 'Southern Governorate', districts: ['Riffa', 'Isa Town', 'Zallaq'] }
    ]
  },
  'United Kingdom': {
    states: [
      { name: 'England', districts: ['Greater London', 'Greater Manchester', 'West Midlands (Birmingham)', 'West Yorkshire (Leeds)', 'Merseyside (Liverpool)', 'Bristol'] },
      { name: 'Scotland', districts: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'] },
      { name: 'Wales', districts: ['Cardiff', 'Swansea', 'Newport'] },
      { name: 'Northern Ireland', districts: ['Belfast', 'Derry', 'Lisburn'] }
    ]
  },
  'United States': {
    states: [
      { name: 'California', districts: ['Los Angeles County', 'San Francisco Bay Area', 'San Diego County', 'Orange County', 'Santa Clara County'] },
      { name: 'New York', districts: ['New York City (Manhattan)', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Buffalo', 'Rochester'] },
      { name: 'Texas', districts: ['Harris County (Houston)', 'Dallas County', 'Travis County (Austin)', 'Bexar County (San Antonio)'] },
      { name: 'Florida', districts: ['Miami-Dade County', 'Broward County (Fort Lauderdale)', 'Orange County (Orlando)', 'Hillsborough County (Tampa)'] },
      { name: 'Illinois', districts: ['Cook County (Chicago)', 'DuPage County', 'Lake County'] }
    ]
  }
};

/* ==========================================================
   PHONE COUNTRY INPUT COMPONENT (SINGLE CLEAN TRIGGER)
   ========================================================== */
class PhoneCountryInputComponent {
  constructor(containerId, options) {
    this.container = document.getElementById(containerId);
    this.id = options.id;
    this.label = options.label;
    this.required = !!options.required;
    this.initialCountry = this.resolveCountry(options.initialCountry || 'IN');
    this.currentCountry = this.initialCountry;
    this.dropdownOpen = false;
    this.searchQuery = '';
    this.render();
    this.bindEvents();
  }

  resolveCountry(query) {
    if (!query) return COUNTRIES_PHONE_DATA[0];
    const q = query.toLowerCase().trim();
    return COUNTRIES_PHONE_DATA.find(c => 
      c.code.toLowerCase() === q ||
      c.name.toLowerCase() === q ||
      c.dialCode === q
    ) || COUNTRIES_PHONE_DATA[0];
  }

  render() {
    this.container.innerHTML = `
      <div class="phone-country-group" id="${this.id}-group">
        <div class="phone-header-row">
          <label class="phone-label" for="${this.id}-input">
            ${this.label} ${this.required ? '<span class="req">*</span>' : ''}
          </label>
          <div class="phone-counter-pill" id="${this.id}-counter">
            0 / ${this.currentCountry.mobileDigits} digits
          </div>
        </div>

        <div class="phone-field-box" id="${this.id}-box">
          <!-- Clean Country Trigger Button without repeating letters -->
          <button type="button" class="phone-trigger-btn" id="${this.id}-trigger" title="Click to change country code">
            <span class="phone-trigger-flag" id="${this.id}-flag">${this.currentCountry.flag}</span>
            <span class="phone-trigger-dial" id="${this.id}-dial">${this.currentCountry.dialCode}</span>
            <svg class="phone-trigger-arrow" id="${this.id}-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dynamic Phone Input -->
          <div class="phone-input-wrap">
            <input
              type="tel"
              inputmode="numeric"
              id="${this.id}-input"
              class="phone-text-input"
              placeholder="${this.currentCountry.formatExample}"
              maxlength="${this.currentCountry.mobileDigits}"
              ${this.required ? 'required' : ''}
            />
            <div class="phone-icon-end" id="${this.id}-iconWrap">
              <span class="phone-wa-icon" title="Mobile Number">💬</span>
            </div>
          </div>

          <!-- Country Popover -->
          <div class="phone-popover" id="${this.id}-popover" style="display: none;">
            <div class="phone-popover-search">
              <input type="text" id="${this.id}-search" placeholder="Search country or code..." />
            </div>
            <div class="phone-popover-list" id="${this.id}-list"></div>
          </div>
        </div>

        <div class="phone-footer-row">
          <span class="phone-footer-hint" id="${this.id}-hint">
            Standard format for <strong>${this.currentCountry.name}</strong> (${this.currentCountry.mobileDigits} digits)
          </span>
          <span class="phone-footer-wa">WhatsApp enabled</span>
        </div>
      </div>
    `;

    this.input = document.getElementById(`${this.id}-input`);
    this.box = document.getElementById(`${this.id}-box`);
    this.counter = document.getElementById(`${this.id}-counter`);
    this.trigger = document.getElementById(`${this.id}-trigger`);
    this.popover = document.getElementById(`${this.id}-popover`);
    this.searchInput = document.getElementById(`${this.id}-search`);
    this.list = document.getElementById(`${this.id}-list`);
    this.arrow = document.getElementById(`${this.id}-arrow`);
    this.flag = document.getElementById(`${this.id}-flag`);
    this.dialEl = document.getElementById(`${this.id}-dial`);
    this.hint = document.getElementById(`${this.id}-hint`);
    this.iconWrap = document.getElementById(`${this.id}-iconWrap`);
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    this.searchInput.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value.toLowerCase().trim();
      this.renderCountryList();
    });

    this.input.addEventListener('input', () => {
      let raw = this.input.value.replace(/\D/g, '');
      if (raw.length > this.currentCountry.mobileDigits) {
        raw = raw.slice(0, this.currentCountry.mobileDigits);
      }
      this.input.value = raw;
      this.updateState();
      // Sync with Step 4 manager display
      updateSyncedManagerNumber();
    });

    document.addEventListener('click', (e) => {
      if (this.dropdownOpen && !this.box.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    if (this.dropdownOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    document.querySelectorAll('.phone-popover').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.phone-trigger-arrow').forEach(a => a.classList.remove('open'));
    
    this.dropdownOpen = true;
    this.popover.style.display = 'flex';
    this.arrow.classList.add('open');
    this.searchQuery = '';
    this.searchInput.value = '';
    this.renderCountryList();
    setTimeout(() => this.searchInput.focus(), 80);
  }

  closeDropdown() {
    this.dropdownOpen = false;
    this.popover.style.display = 'none';
    this.arrow.classList.remove('open');
  }

  renderCountryList() {
    const filtered = COUNTRIES_PHONE_DATA.filter(c => 
      c.name.toLowerCase().includes(this.searchQuery) ||
      c.code.toLowerCase().includes(this.searchQuery) ||
      c.dialCode.includes(this.searchQuery)
    );

    if (filtered.length === 0) {
      this.list.innerHTML = `<div class="phone-empty-search">No countries found matching "${this.searchQuery}"</div>`;
      return;
    }

    this.list.innerHTML = filtered.map(c => {
      const isSelected = c.code === this.currentCountry.code;
      return `
        <button type="button" class="phone-country-item ${isSelected ? 'selected' : ''}" data-code="${c.code}">
          <div class="phone-item-left">
            <span class="phone-item-flag">${c.flag}</span>
            <span class="phone-item-name">${c.name}</span>
          </div>
          <div class="phone-item-right">
            <span class="phone-item-digits">(${c.mobileDigits} digits)</span>
            <span class="phone-item-dial">${c.dialCode}</span>
          </div>
        </button>
      `;
    }).join('');

    this.list.querySelectorAll('.phone-country-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.dataset.code;
        this.selectCountryByCode(code);
        this.closeDropdown();
        this.input.focus();
      });
    });
  }

  selectCountryByCode(code) {
    const found = COUNTRIES_PHONE_DATA.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (found) {
      this.setCountry(found);
    }
  }

  setCountry(countryObj) {
    this.currentCountry = countryObj;
    this.flag.textContent = countryObj.flag;
    this.dialEl.textContent = countryObj.dialCode;
    this.input.placeholder = countryObj.formatExample;
    this.input.maxLength = countryObj.mobileDigits;

    let digits = this.input.value.replace(/\D/g, '');
    if (digits.length > countryObj.mobileDigits) {
      digits = digits.slice(0, countryObj.mobileDigits);
      this.input.value = digits;
    }

    this.hint.innerHTML = `Standard format for <strong>${countryObj.name}</strong> (${countryObj.mobileDigits} digits)`;
    this.updateState();
    updateSyncedManagerNumber();
  }

  updateState() {
    const count = this.input.value.length;
    const requiredDigits = this.currentCountry.mobileDigits;
    const isComplete = count === requiredDigits;

    if (isComplete) {
      this.counter.textContent = `${count} / ${requiredDigits} digits ✓`;
      this.counter.classList.add('complete');
      this.box.classList.add('complete');
      this.iconWrap.innerHTML = `<span class="phone-check-badge">✓</span>`;
    } else {
      this.counter.textContent = `${count} / ${requiredDigits} digits`;
      this.counter.classList.remove('complete');
      this.box.classList.remove('complete');
      this.iconWrap.innerHTML = `<span class="phone-wa-icon" title="Mobile Number">💬</span>`;
    }
  }

  getValue() {
    return this.input.value.trim();
  }

  getFullNumber() {
    const val = this.getValue();
    return val ? `${this.currentCountry.dialCode} ${val}` : '';
  }

  isValid() {
    const val = this.getValue();
    if (this.required) {
      return val.length === this.currentCountry.mobileDigits;
    }
    return true;
  }
}

// Single mobile input field: Store Contact (Manager) Mobile Number
const contactPhoneInput = new PhoneCountryInputComponent('contactPhoneContainer', {
  id: 'contactPhone',
  label: 'Store Contact (Manager) Mobile Number',
  required: true,
  initialCountry: 'IN'
});

function updateSyncedManagerNumber() {
  const syncedDisplay = document.getElementById('syncedManagerNumberText');
  if (!syncedDisplay) return;
  const full = contactPhoneInput.getFullNumber();
  if (full && contactPhoneInput.isValid()) {
    syncedDisplay.innerHTML = `<strong style="color: #18794e;">${full}</strong> · Verified Store Manager Number`;
  } else if (full) {
    syncedDisplay.innerHTML = `<span>${full}</span> (Incomplete number)`;
  } else {
    syncedDisplay.textContent = 'No mobile number entered yet (will sync from Step 2)';
  }
}

/* ==========================================================
   COUNTRY SELECTION IN SECTION 2
   ========================================================== */
const countrySelect = document.getElementById('restaurantCountry');
const basicDetailsRest = document.getElementById('basicDetailsRest');
const lockedNotice = document.getElementById('lockedNotice');
const countryStatus = document.getElementById('countryStatus');
const selectedCountryName = document.getElementById('selectedCountryName');
const quickChips = document.querySelectorAll('.country-chip');
const locationCountryBadge = document.getElementById('locationCountryBadge');
const stateSelect = document.getElementById('stateSelect');
const districtSelect = document.getElementById('districtSelect');

let chosenCountry = 'India';

function applyCountrySelection(countryValue) {
  if (!countryValue) {
    basicDetailsRest.classList.add('locked');
    lockedNotice.style.display = 'flex';
    countryStatus.style.display = 'none';
    basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = true);
    contactPhoneInput.input.disabled = true;
    quickChips.forEach(chip => chip.classList.remove('selected'));
    return;
  }

  chosenCountry = countryValue;
  basicDetailsRest.classList.remove('locked');
  lockedNotice.style.display = 'none';
  countryStatus.style.display = 'inline-flex';
  selectedCountryName.textContent = countryValue;
  basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = false);
  contactPhoneInput.input.disabled = false;

  quickChips.forEach(chip => {
    if (chip.dataset.country.toLowerCase() === countryValue.toLowerCase()) {
      chip.classList.add('selected');
    } else {
      chip.classList.remove('selected');
    }
  });

  const matchedCountry = COUNTRIES_PHONE_DATA.find(c => 
    c.name.toLowerCase() === countryValue.toLowerCase() ||
    c.code.toLowerCase() === countryValue.toLowerCase()
  );
  if (matchedCountry) {
    contactPhoneInput.setCountry(matchedCountry);
  }

  // Populate Location Details states without asking country again
  populateStatesForCountry(countryValue);
}

countrySelect.addEventListener('change', () => {
  applyCountrySelection(countrySelect.value);
});

quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const country = chip.dataset.country;
    countrySelect.value = country;
    let matched = false;
    for (let opt of countrySelect.options) {
      if (opt.value.toLowerCase() === country.toLowerCase()) {
        countrySelect.value = opt.value;
        matched = true;
        break;
      }
    }
    if (!matched) countrySelect.value = "Other";
    applyCountrySelection(country);
  });
});

// Initially disable fields until country is selected
basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = true);
contactPhoneInput.input.disabled = true;

/* ==========================================================
   DYNAMIC STATE & DISTRICT POPULATION FOR SECTION 3
   ========================================================= */
function populateStatesForCountry(countryName) {
  if (locationCountryBadge) {
    locationCountryBadge.innerHTML = `📍 Country: <strong>${countryName}</strong>`;
  }

  const regionData = PRELOADED_LOCATIONS[countryName];
  stateSelect.innerHTML = '<option value="">Select State / Province</option>';
  districtSelect.innerHTML = '<option value="">Select District</option>';

  if (regionData && regionData.states && regionData.states.length > 0) {
    regionData.states.forEach(st => {
      const opt = document.createElement('option');
      opt.value = st.name;
      opt.textContent = st.name;
      stateSelect.appendChild(opt);
    });

    // Auto-select first state for convenience (e.g. Kerala if India, Dubai if UAE)
    stateSelect.selectedIndex = 1;
    populateDistrictsForState(countryName, stateSelect.value);
  } else {
    // Fallback for other countries
    const generalStates = ['Central Province', 'Northern Region', 'Southern Region', 'Western Region', 'Eastern Region', 'Capital District', 'Other'];
    generalStates.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      stateSelect.appendChild(opt);
    });
    populateDistrictsForState(countryName, 'Central Province');
  }
}

function populateDistrictsForState(countryName, stateName) {
  districtSelect.innerHTML = '<option value="">Select District</option>';
  const regionData = PRELOADED_LOCATIONS[countryName];
  if (regionData && regionData.states) {
    const stateObj = regionData.states.find(s => s.name === stateName);
    if (stateObj && stateObj.districts) {
      stateObj.districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        districtSelect.appendChild(opt);
      });
      return;
    }
  }

  // Fallback districts
  ['Central District', 'Downtown', 'North Zone', 'South Zone', 'Main Area'].forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    districtSelect.appendChild(opt);
  });
}

stateSelect.addEventListener('change', () => {
  populateDistrictsForState(chosenCountry, stateSelect.value);
});

// Initial call for India
populateStatesForCountry('India');

/* ==========================================================
   INTERACTIVE GOOGLE MAPS LOCATION PICKER (LEAFLET / API)
   ========================================================== */
const mapModal = document.getElementById('mapModal');
const openMapPickerBtn = document.getElementById('openMapPickerBtn');
const closeMapModalBtn = document.getElementById('closeMapModalBtn');
const cancelMapModalBtn = document.getElementById('cancelMapModalBtn');
const confirmMapLocationBtn = document.getElementById('confirmMapLocationBtn');
const googleMapsUrlInput = document.getElementById('googleMapsUrl');
const mapSelectedBadge = document.getElementById('mapSelectedBadge');
const mapSelectedAddress = document.getElementById('mapSelectedAddress');
const mapCoordsDisplay = document.getElementById('mapCoordsDisplay');
const mapSearchInput = document.getElementById('mapSearchInput');
const mapSearchBtn = document.getElementById('mapSearchBtn');

let leafletMap = null;
let mapMarker = null;
let currentCoords = null;
let currentAddressString = '';

function initLeafletMap(centerLat, centerLng, zoomLevel) {
  if (!leafletMap) {
    leafletMap = L.map('interactiveMap').setView([centerLat, centerLng], zoomLevel);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | Google Maps Pin Generator'
    }).addTo(leafletMap);

    leafletMap.on('click', function(e) {
      setPinLocation(e.latlng.lat, e.latlng.lng);
    });
  } else {
    leafletMap.setView([centerLat, centerLng], zoomLevel);
    leafletMap.invalidateSize();
  }
}

function setPinLocation(lat, lng, label) {
  currentCoords = { lat: lat.toFixed(6), lng: lng.toFixed(6) };
  if (!mapMarker) {
    mapMarker = L.marker([lat, lng], { draggable: true }).addTo(leafletMap);
    mapMarker.on('dragend', function(e) {
      const pos = e.target.getLatLng();
      setPinLocation(pos.lat, pos.lng);
    });
  } else {
    mapMarker.setLatLng([lat, lng]);
  }

  currentAddressString = label || `Lat: ${currentCoords.lat}, Lng: ${currentCoords.lng}`;
  mapCoordsDisplay.innerHTML = `<strong>${currentCoords.lat}, ${currentCoords.lng}</strong> · ${currentAddressString}`;
  confirmMapLocationBtn.disabled = false;
}

openMapPickerBtn.addEventListener('click', () => {
  mapModal.style.display = 'flex';
  const countryData = COUNTRIES_PHONE_DATA.find(c => c.name.toLowerCase() === chosenCountry.toLowerCase()) || COUNTRIES_PHONE_DATA[0];
  const defaultLat = countryData.lat || 10.8505; // Kerala default
  const defaultLng = countryData.lng || 76.2711;
  const zoom = countryData.zoom || 8;

  setTimeout(() => {
    initLeafletMap(defaultLat, defaultLng, zoom);
    if (!currentCoords) {
      setPinLocation(defaultLat, defaultLng, `${chosenCountry} Area Pin`);
    }
  }, 100);
});

function closeMapModal() {
  mapModal.style.display = 'none';
}

closeMapModalBtn.addEventListener('click', closeMapModal);
cancelMapModalBtn.addEventListener('click', closeMapModal);

confirmMapLocationBtn.addEventListener('click', () => {
  if (currentCoords) {
    const gmapsUrl = `https://www.google.com/maps?q=${currentCoords.lat},${currentCoords.lng}`;
    googleMapsUrlInput.value = gmapsUrl;
    mapSelectedBadge.style.display = 'flex';
    mapSelectedAddress.textContent = `${currentCoords.lat}, ${currentCoords.lng} (${currentAddressString})`;
    closeMapModal();
  }
});

// Search on map
mapSearchBtn.addEventListener('click', executeMapSearch);
mapSearchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    executeMapSearch();
  }
});

function executeMapSearch() {
  const query = mapSearchInput.value.trim();
  if (!query) return;

  const fullQuery = `${query}, ${chosenCountry}`;
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);
        leafletMap.setView([lat, lon], 14);
        setPinLocation(lat, lon, item.display_name.split(',')[0]);
      } else {
        alert(`Could not find "${query}" in ${chosenCountry}. Please click directly on the map to pin.`);
      }
    })
    .catch(() => {
      alert('Search service busy. Please click directly on the map to drop the pin.');
    });
}

/* ==========================================================
   WIZARD NAVIGATION & VALIDATION
   ========================================================== */
function validateStep(stepNumber) {
  const stepEl = document.querySelector(`.section-step[data-step="${stepNumber}"]`);
  if (!stepEl) return true;

  // Step 1: terms
  if (stepNumber === 1) {
    const terms = document.getElementById('terms');
    if (!terms.checked) {
      showNotification('Please accept the Terms & Conditions to proceed.', 'error');
      terms.focus();
      return false;
    }
  }

  // Step 2: Country Selection, Store Contact Phone, Manager Password, Service formats
  if (stepNumber === 2) {
    if (!countrySelect.value) {
      showNotification('Please select the restaurant\'s country first.', 'error');
      countrySelect.focus();
      return false;
    }

    if (!contactPhoneInput.isValid()) {
      showNotification(`Please enter a valid ${contactPhoneInput.currentCountry.mobileDigits}-digit store manager mobile number for ${contactPhoneInput.currentCountry.name}.`, 'error');
      contactPhoneInput.input.focus();
      return false;
    }

    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (!password || password.length < 8) {
      showNotification('Manager Password must be at least 8 characters long.', 'error');
      document.getElementById('password').focus();
      return false;
    }
    if (password !== confirm) {
      showNotification('Manager Password and Confirm Password do not match.', 'error');
      document.getElementById('confirmPassword').focus();
      return false;
    }

    const services = stepEl.querySelectorAll('input[name="service"]:checked');
    if (services.length === 0) {
      showNotification('Please select at least one Service Format provided by the restaurant.', 'error');
      return false;
    }
  }

  // Step 3: Location details and Google Maps
  if (stepNumber === 3) {
    if (!googleMapsUrlInput.value) {
      showNotification('Please select and confirm your exact location on Google Maps using the button.', 'error');
      openMapPickerBtn.focus();
      return false;
    }
  }

  // General required validation
  const inputs = stepEl.querySelectorAll('input:not([disabled]):not([id*="Phone"]), select:not([disabled]), textarea:not([disabled])');
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      showNotification('Please complete all required fields in this section.', 'error');
      input.focus();
      return false;
    }
  }

  hideNotification();
  return true;
}

function goToStep(step) {
  if (step > currentStep) {
    if (!validateStep(currentStep)) return;
  }

  if (step < 1 || step > totalSteps) return;

  currentStep = step;
  updateUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI() {
  document.querySelectorAll('.section-step').forEach(sec => {
    const secStep = parseInt(sec.dataset.step, 10);
    sec.classList.toggle('active', secStep === currentStep);
  });

  document.querySelectorAll('.step-list .step').forEach(stepBtn => {
    const stepNum = parseInt(stepBtn.dataset.step, 10);
    stepBtn.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      stepBtn.classList.add('active');
    } else if (stepNum < currentStep) {
      stepBtn.classList.add('completed');
      stepBtn.querySelector('.step-num').innerHTML = '✓';
    } else {
      stepBtn.querySelector('.step-num').textContent = stepNum;
    }
  });

  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  document.getElementById('progressFillBar').style.width = progressPercent + '%';
  document.getElementById('progressPercentage').textContent = progressPercent + '%';
  document.getElementById('progressStepCount').textContent = `Step ${currentStep} of ${totalSteps}`;
  document.getElementById('progressSectionName').textContent = stepNames[currentStep - 1];

  updateSyncedManagerNumber();
}

// Sidebar step clicks
document.querySelectorAll('.step-list .step').forEach(stepBtn => {
  stepBtn.addEventListener('click', () => {
    const targetStep = parseInt(stepBtn.dataset.step, 10);
    if (targetStep < currentStep) {
      goToStep(targetStep);
    } else if (targetStep > currentStep) {
      if (validateStep(currentStep)) {
        goToStep(targetStep);
      }
    }
  });
});

/* ==========================================================
   GST & PASSWORDS & UTILITIES
   ========================================================== */
const gstRadios = document.querySelectorAll('input[name="gst"]');
const gstFields = ['gstCategory', 'gstNumber', 'gstCertificate'].map(id => document.getElementById(id));
gstRadios.forEach(r => r.addEventListener('change', () => {
  const show = document.querySelector('input[name="gst"]:checked').value === 'yes';
  gstFields.forEach(el => {
    if (!el) return;
    el.style.display = show ? 'block' : 'none';
    const requiredInput = el.querySelector('input, select');
    if (requiredInput && el.id !== 'gstCertificate') requiredInput.required = show;
  });
}));

// Password toggle
document.querySelectorAll('.toggle').forEach(btn => btn.addEventListener('click', () => {
  const input = document.getElementById(btn.dataset.target);
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
}));

// Upload name preview
document.querySelectorAll('.upload input').forEach(input => input.addEventListener('change', () => {
  const strong = input.closest('.upload').querySelector('strong');
  strong.textContent = input.files.length ? input.files[0].name : 'Choose file';
}));

function showNotification(text, type) {
  const msg = document.getElementById('message');
  msg.className = `message ${type}`;
  msg.textContent = text;
  msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function hideNotification() {
  const msg = document.getElementById('message');
  msg.className = 'message';
  msg.style.display = 'none';
  msg.textContent = '';
}

// Final Submit
document.getElementById('setupForm').addEventListener('submit', event => {
  event.preventDefault();
  if (!validateStep(currentStep)) return;

  const storeName = document.getElementById('restoName').value;
  const storePhone = contactPhoneInput.getFullNumber();
  showNotification(`🎉 Setup Completed Successfully! Restaurant "${storeName}" registered with Country: ${chosenCountry}, Manager Phone: ${storePhone}, and Google Maps Location verified.`, 'success');
});
