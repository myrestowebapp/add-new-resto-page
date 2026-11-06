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
   PHONE COUNTRY INPUT COMPONENT (WITH WHATSAPP OTP VERIFICATION)
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
    this.isVerified = false;
    this.verifiedPhoneNumber = '';
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

        <!-- WhatsApp OTP Verification Strip -->
        <div class="phone-verify-strip" id="${this.id}-verifyStrip">
          <div class="verify-status-col">
            <div id="${this.id}-unverifiedBadge" class="phone-verify-status unverified">
              <span class="status-dot"></span>
              <span class="status-text">WhatsApp OTP Verification Required</span>
            </div>
            <div id="${this.id}-verifiedBadge" class="phone-verify-status verified" style="display: none;">
              <span class="status-icon">✓</span>
              <span class="status-text" id="${this.id}-verifiedText">Verified via WhatsApp OTP</span>
            </div>
          </div>
          <button type="button" id="${this.id}-verifyBtn" class="btn-verify-otp">
            <span>💬</span> Verify via WhatsApp OTP
          </button>
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
    this.verifyBtn = document.getElementById(`${this.id}-verifyBtn`);
    this.unverifiedBadge = document.getElementById(`${this.id}-unverifiedBadge`);
    this.verifiedBadge = document.getElementById(`${this.id}-verifiedBadge`);
    this.verifiedText = document.getElementById(`${this.id}-verifiedText`);
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

      // If user modifies verified phone number, invalidate verification status
      if (this.isVerified && this.getFullNumber() !== this.verifiedPhoneNumber) {
        this.setVerified(false);
      }
      
      // Sync with Step 4 manager display
      updateSyncedManagerNumber();
    });

    this.verifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.handleVerifyClick();
    });

    document.addEventListener('click', (e) => {
      if (this.dropdownOpen && !this.box.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  handleVerifyClick() {
    if (!this.isValid()) {
      showNotification(`Please enter a complete ${this.currentCountry.mobileDigits}-digit mobile number first.`, 'error');
      this.input.focus();
      return;
    }
    const fullNumber = this.getFullNumber();
    openWhatsAppOtpModal(fullNumber, () => {
      this.setVerified(true);
    });
  }

  setVerified(status) {
    this.isVerified = !!status;
    if (this.isVerified) {
      this.verifiedPhoneNumber = this.getFullNumber();
      this.unverifiedBadge.style.display = 'none';
      this.verifiedBadge.style.display = 'inline-flex';
      this.verifiedText.textContent = `✓ ${this.verifiedPhoneNumber} Verified`;
      this.verifyBtn.textContent = 'Re-verify';
      this.verifyBtn.classList.add('btn-reverify');
    } else {
      this.verifiedPhoneNumber = '';
      this.unverifiedBadge.style.display = 'inline-flex';
      this.verifiedBadge.style.display = 'none';
      this.verifyBtn.innerHTML = '<span>💬</span> Verify via WhatsApp OTP';
      this.verifyBtn.classList.remove('btn-reverify');
    }
    updateSyncedManagerNumber();
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
    
    // Invalidate verification if country changes
    if (this.isVerified) {
      this.setVerified(false);
    }

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
    if (contactPhoneInput.isVerified) {
      syncedDisplay.innerHTML = `<strong style="color: #18794e;">${full}</strong> · <span style="display:inline-flex;align-items:center;gap:4px;color:#008767;background:#e6f7f2;border:1px solid #a7ebd8;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;">✓ Verified via WhatsApp OTP</span>`;
    } else {
      syncedDisplay.innerHTML = `<span>${full}</span> <span style="color:#b76e00;font-size:11px;font-weight:700;">(WhatsApp OTP verification pending in Step 2)</span>`;
    }
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

  // Update Step 4 Legal & Tax Compliance fields for selected country
  updateLegalSectionForCountry(countryValue);
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
   COUNTRY-SPECIFIC LEGAL & TAX COMPLIANCE SPECIFICATION
   ========================================================== */
const COUNTRY_LEGAL_CONFIG = {
  'India': {
    badge: '🇮🇳 India Compliance (FSSAI & GST)',
    licenseLabel: 'Food Safety License / FSSAI Number',
    licensePlaceholder: 'e.g. 14-digit FSSAI Registration / State License',
    licenseTypes: [
      'Basic FSSAI Registration (Petty Food Business)',
      'State Food Safety License',
      'Central Food Safety License'
    ],
    taxName: 'GST',
    taxApplicableQuestion: 'GST Applicable?',
    taxCategoryLabel: 'GST Category',
    taxCategories: [
      'Regular Taxpayer',
      'Composition Scheme (Restaurant 5%)',
      'Exempted / Below Turnover Threshold'
    ],
    taxIdLabel: 'GSTIN (15 Digits)',
    taxIdPlaceholder: 'e.g. 32AAAAA0000A1Z5 (15 digits)',
    taxCertLabel: 'GST Registration Certificate',
    taxCertUploadText: 'Upload GST Certificate (PDF / Image)',
    businessTypes: [
      'Sole Proprietorship',
      'Partnership Firm',
      'Limited Liability Partnership (LLP)',
      'Private Limited Company (Pvt Ltd)',
      'Public Limited Company',
      'One Person Company (OPC)'
    ]
  },
  'Saudi Arabia': {
    badge: '🇸🇦 Saudi Arabia (ZATCA & Baladiya)',
    licenseLabel: 'Baladiya / SFDA Food License Number',
    licensePlaceholder: 'e.g. Baladiya Municipality Permit / SFDA ID',
    licenseTypes: [
      'Municipality (Baladiya) Food & Health License',
      'Commercial Registration (CR - Sijil Tijari)',
      'SFDA Food Facility Registration'
    ],
    taxName: 'VAT',
    taxApplicableQuestion: 'VAT (ZATCA) Applicable?',
    taxCategoryLabel: 'VAT Category (ZATCA)',
    taxCategories: [
      'Standard Rated (15%)',
      'Zero-Rated Supplies (0%)',
      'Exempt Supplies'
    ],
    taxIdLabel: 'ZATCA VAT / TIN (15 Digits)',
    taxIdPlaceholder: 'e.g. 300000000000003 (15 digits)',
    taxCertLabel: 'ZATCA VAT Certificate',
    taxCertUploadText: 'Upload ZATCA VAT Certificate (PDF / Image)',
    businessTypes: [
      'Limited Liability Company (LLC - Sharikah Dhat Mas\'ouliyyah)',
      'Sole Proprietorship (Muassasa Fardiyyah)',
      'Simplified Joint Stock Company',
      'Joint Stock Company',
      'Branch of Foreign Company'
    ]
  },
  'United Arab Emirates': {
    badge: '🇦🇪 UAE (FTA & Economic Dept)',
    licenseLabel: 'Trade License / Food Permit Number',
    licensePlaceholder: 'e.g. DED Trade License / Municipality Permit',
    licenseTypes: [
      'Commercial Trade License (Mainland DED)',
      'Professional License',
      'Tourism & Hospitality License',
      'Free Zone Company License'
    ],
    taxName: 'VAT',
    taxApplicableQuestion: 'VAT (FTA) Applicable?',
    taxCategoryLabel: 'VAT Category (FTA)',
    taxCategories: [
      'Standard Rated (5%)',
      'Zero-Rated Supplies (0%)',
      'Exempt Supplies'
    ],
    taxIdLabel: 'Tax Registration Number (TRN - 15 Digits)',
    taxIdPlaceholder: 'e.g. 100000000000003 (15 digits)',
    taxCertLabel: 'FTA VAT Certificate',
    taxCertUploadText: 'Upload FTA VAT Certificate (PDF / Image)',
    businessTypes: [
      'Limited Liability Company (LLC)',
      'Sole Establishment (Muassasa)',
      'Civil Company',
      'Free Zone Establishment / Company (FZE / FZCO)',
      'Branch of Foreign / Local Company'
    ]
  },
  'Qatar': {
    badge: '🇶🇦 Qatar Compliance',
    licenseLabel: 'Baladiya Municipality / Commercial Permit',
    licensePlaceholder: 'e.g. Ministry of Commerce & Municipality License',
    licenseTypes: [
      'Municipality Food Hygiene License',
      'Commercial Registration (CR Qatar)',
      'Tourism Authority License'
    ],
    taxName: 'Tax Card',
    taxApplicableQuestion: 'Tax Card / Corporate Tax Applicable?',
    taxCategoryLabel: 'Tax Status',
    taxCategories: ['Standard Tax Registered', 'Exempted Entity'],
    taxIdLabel: 'Tax Identification Number (TIN)',
    taxIdPlaceholder: 'e.g. 00000000 (TIN Number)',
    taxCertLabel: 'Qatar Tax Card / CR Certificate',
    taxCertUploadText: 'Upload Tax Card / CR Copy',
    businessTypes: [
      'Limited Liability Company (W.L.L. / LLC)',
      'Sole Proprietorship',
      'General Partnership',
      'Branch Office'
    ]
  },
  'Oman': {
    badge: '🇴🇲 Oman Compliance',
    licenseLabel: 'Municipality Food License / CR Number',
    licensePlaceholder: 'e.g. Commercial Registration or Muscat Municipality Permit',
    licenseTypes: [
      'Municipality Food Establishment Permit',
      'Commercial Registration (MOCI Oman)'
    ],
    taxName: 'VAT',
    taxApplicableQuestion: 'VAT (OTA 5%) Applicable?',
    taxCategoryLabel: 'VAT Category (Oman Tax Authority)',
    taxCategories: ['Standard Rated (5%)', 'Zero-Rated', 'Exempt'],
    taxIdLabel: 'VAT Identification Number (15 Digits)',
    taxIdPlaceholder: 'e.g. OM100000000000003',
    taxCertLabel: 'Oman VAT Certificate',
    taxCertUploadText: 'Upload VAT Certificate (PDF / Image)',
    businessTypes: [
      'Limited Liability Company (LLC)',
      'Sole Proprietorship',
      'Joint Stock Company (SAOC / SAOG)',
      'Foreign Branch'
    ]
  },
  'Kuwait': {
    badge: '🇰🇼 Kuwait Compliance',
    licenseLabel: 'PAFN Food Safety & Commercial License',
    licensePlaceholder: 'e.g. Public Authority for Food & Nutrition Permit',
    licenseTypes: [
      'PAFN Food Safety License',
      'Ministry of Commerce Commercial License'
    ],
    taxName: 'Commercial Tax',
    taxApplicableQuestion: 'Commercial Registration / Tax Registered?',
    taxCategoryLabel: 'Registration Category',
    taxCategories: ['Standard Commercial Registration', 'Exempt'],
    taxIdLabel: 'Commercial Registration (CR Number)',
    taxIdPlaceholder: 'e.g. Kuwait CR Number',
    taxCertLabel: 'Commercial License Certificate',
    taxCertUploadText: 'Upload Commercial License',
    businessTypes: [
      'With Limited Liability (W.L.L.)',
      'Sole Proprietorship',
      'General Partnership',
      'Joint Venture'
    ]
  },
  'Bahrain': {
    badge: '🇧🇭 Bahrain Compliance',
    licenseLabel: 'Ministry of Health / Municipality Food License',
    licensePlaceholder: 'e.g. Sijilat Commercial Registration or MOH Permit',
    licenseTypes: [
      'Ministry of Health Food Hygiene Permit',
      'Municipality Commercial License (Sijilat)'
    ],
    taxName: 'VAT',
    taxApplicableQuestion: 'VAT (NBR 10%) Applicable?',
    taxCategoryLabel: 'VAT Category (NBR)',
    taxCategories: ['Standard Rated (10%)', 'Zero-Rated', 'Exempt'],
    taxIdLabel: 'VAT Account Number (15 Digits)',
    taxIdPlaceholder: 'e.g. 200000000000002',
    taxCertLabel: 'NBR VAT Certificate',
    taxCertUploadText: 'Upload NBR VAT Certificate',
    businessTypes: [
      'With Limited Liability (W.L.L.)',
      'Individual Establishment',
      'Bahrain Shareholding Company (BSC)',
      'Branch of Foreign Company'
    ]
  },
  'United Kingdom': {
    badge: '🇬🇧 UK Compliance (HMRC & FSA)',
    licenseLabel: 'Food Business Registration Number',
    licensePlaceholder: 'Local council food premises registration code',
    licenseTypes: [
      'Local Council Food Premises Registration',
      'Premises License (Licensing Act 2003)',
      'Food Hygiene Rating Registered'
    ],
    taxName: 'VAT',
    taxApplicableQuestion: 'VAT (HMRC) Applicable?',
    taxCategoryLabel: 'VAT Category (HMRC)',
    taxCategories: [
      'Standard Rate (20%)',
      'Reduced Rate (5%)',
      'Flat Rate Scheme for Catering',
      'Exempt / Below VAT Threshold'
    ],
    taxIdLabel: 'VAT Registration Number (VRN)',
    taxIdPlaceholder: 'e.g. GB 123 4567 89',
    taxCertLabel: 'HMRC VAT Certificate',
    taxCertUploadText: 'Upload VAT Certificate (PDF / Image)',
    businessTypes: [
      'Private Limited Company (Ltd)',
      'Sole Trader',
      'Partnership',
      'Limited Liability Partnership (LLP)',
      'Public Limited Company (PLC)'
    ]
  },
  'United States': {
    badge: '🇺🇸 US Compliance (State Health & IRS)',
    licenseLabel: 'Health Permit / Food Service License',
    licensePlaceholder: 'e.g. County Health Dept Food Facility Permit',
    licenseTypes: [
      'Retail Food Establishment Permit',
      'Food Service Sanitation / Health Certificate',
      'State Food Service License'
    ],
    taxName: 'Sales Tax',
    taxApplicableQuestion: 'Sales Tax & Federal EIN Registered?',
    taxCategoryLabel: 'Tax Classification',
    taxCategories: [
      'State Sales Tax Registered',
      'Reseller / Food Wholesale',
      'Exempt Entity'
    ],
    taxIdLabel: 'Federal EIN / State Sales Tax ID',
    taxIdPlaceholder: 'e.g. 12-3456789 (EIN) / State Tax ID',
    taxCertLabel: 'State Sales Tax Certificate / EIN Letter',
    taxCertUploadText: 'Upload Tax Permit or Form SS-4 (EIN)',
    businessTypes: [
      'Limited Liability Company (LLC)',
      'C-Corporation',
      'S-Corporation',
      'Sole Proprietorship',
      'General Partnership',
      'Limited Partnership (LP)'
    ]
  },
  'Default': {
    badge: '🌐 Regional Legal Compliance',
    licenseLabel: 'Food Safety License / Commercial Trade License',
    licensePlaceholder: 'Local authority food hygiene or trade license number',
    licenseTypes: [
      'Standard Food Hygiene Permit',
      'Commercial Trade License',
      'Municipality Business Permit'
    ],
    taxName: 'VAT / Tax',
    taxApplicableQuestion: 'VAT / Sales Tax Applicable?',
    taxCategoryLabel: 'Tax Category',
    taxCategories: [
      'Standard Rate',
      'Zero-Rated',
      'Exempt / Below Threshold'
    ],
    taxIdLabel: 'Tax Identification Number (TIN)',
    taxIdPlaceholder: 'Enter Tax ID / TIN Number',
    taxCertLabel: 'Tax Registration Certificate',
    taxCertUploadText: 'Upload Tax Certificate (PDF / Image)',
    businessTypes: [
      'Limited Liability Company (LLC)',
      'Sole Proprietorship',
      'Partnership',
      'Corporation / Inc.',
      'Other Registered Business Entity'
    ]
  }
};

function updateLegalSectionForCountry(countryName) {
  const config = COUNTRY_LEGAL_CONFIG[countryName] || COUNTRY_LEGAL_CONFIG['Default'];
  
  const legalBadge = document.getElementById('legalCountryBadge');
  if (legalBadge) legalBadge.textContent = config.badge;

  const foodLicenseLabel = document.getElementById('foodLicenseLabel');
  if (foodLicenseLabel) foodLicenseLabel.innerHTML = `${config.licenseLabel} <span class="req">*</span>`;

  const foodLicenseInput = document.getElementById('foodLicenseInput');
  if (foodLicenseInput) foodLicenseInput.placeholder = config.licensePlaceholder;

  const licenseTypeSelect = document.getElementById('licenseTypeSelect');
  if (licenseTypeSelect) {
    licenseTypeSelect.innerHTML = '<option value="">Select license type</option>';
    config.licenseTypes.forEach(lt => {
      const opt = document.createElement('option');
      opt.value = lt;
      opt.textContent = lt;
      licenseTypeSelect.appendChild(opt);
    });
    if (config.licenseTypes.length > 0) licenseTypeSelect.selectedIndex = 1;
  }

  const taxApplicableQuestion = document.getElementById('taxApplicableQuestion');
  if (taxApplicableQuestion) taxApplicableQuestion.innerHTML = `${config.taxApplicableQuestion} <span class="req">*</span>`;

  const taxCategoryLabel = document.getElementById('taxCategoryLabel');
  if (taxCategoryLabel) taxCategoryLabel.innerHTML = `${config.taxCategoryLabel} <span class="req">*</span>`;

  const taxCategorySelect = document.getElementById('taxCategorySelect');
  if (taxCategorySelect) {
    taxCategorySelect.innerHTML = '<option value="">Select category</option>';
    config.taxCategories.forEach(tc => {
      const opt = document.createElement('option');
      opt.value = tc;
      opt.textContent = tc;
      taxCategorySelect.appendChild(opt);
    });
    if (config.taxCategories.length > 0) taxCategorySelect.selectedIndex = 1;
  }

  const taxIdLabel = document.getElementById('taxIdLabel');
  if (taxIdLabel) taxIdLabel.innerHTML = `${config.taxIdLabel} <span class="req">*</span>`;

  const taxIdInput = document.getElementById('taxIdInput');
  if (taxIdInput) taxIdInput.placeholder = config.taxIdPlaceholder;

  const taxCertLabel = document.getElementById('taxCertLabel');
  if (taxCertLabel) taxCertLabel.textContent = config.taxCertLabel;

  const taxCertUploadText = document.getElementById('taxCertUploadText');
  if (taxCertUploadText) taxCertUploadText.textContent = config.taxCertUploadText;

  const businessTypeSelect = document.getElementById('businessTypeSelect');
  if (businessTypeSelect) {
    businessTypeSelect.innerHTML = '<option value="">Select business type</option>';
    config.businessTypes.forEach(bt => {
      const opt = document.createElement('option');
      opt.value = bt;
      opt.textContent = bt;
      businessTypeSelect.appendChild(opt);
    });
    if (config.businessTypes.length > 0) businessTypeSelect.selectedIndex = 1;
  }
}

// Initial Legal & Tax setup for default country
updateLegalSectionForCountry('India');

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

  // Step 2: Country Selection, Store Email, Store Contact Phone, WhatsApp OTP, Manager Password, Service formats
  if (stepNumber === 2) {
    if (!countrySelect.value) {
      showNotification('Please select the restaurant\'s country first.', 'error');
      countrySelect.focus();
      return false;
    }

    const storeEmail = document.getElementById('storeEmail');
    if (!storeEmail || !storeEmail.value.trim()) {
      showNotification('Please enter the Restaurant Official Email Address.', 'error');
      storeEmail?.focus();
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(storeEmail.value.trim())) {
      showNotification('Please enter a valid official email address (e.g. store@restaurant.com).', 'error');
      storeEmail.focus();
      return false;
    }

    if (!contactPhoneInput.isValid()) {
      showNotification(`Please enter a valid ${contactPhoneInput.currentCountry.mobileDigits}-digit store manager mobile number for ${contactPhoneInput.currentCountry.name}.`, 'error');
      contactPhoneInput.input.focus();
      return false;
    }

    if (!contactPhoneInput.isVerified) {
      showNotification('Store manager mobile number must be verified with WhatsApp OTP before proceeding.', 'error');
      contactPhoneInput.handleVerifyClick();
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

// Upload name preview (for document certificates, excluding logo and cover which use cropper)
document.querySelectorAll('.upload input:not(#logoFileInput):not(#coverFileInput)').forEach(input => input.addEventListener('change', () => {
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

/* ==========================================================
   WHATSAPP OTP VERIFICATION MODAL CONTROLLER
   ========================================================== */
const otpModal = document.getElementById('otpModal');
const closeOtpModalBtn = document.getElementById('closeOtpModalBtn');
const cancelOtpModalBtn = document.getElementById('cancelOtpModalBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const otpTargetPhoneDisplay = document.getElementById('otpTargetPhoneDisplay');
const otpErrorAlert = document.getElementById('otpErrorAlert');
const otpTimerText = document.getElementById('otpTimerText');
const otpCountdown = document.getElementById('otpCountdown');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpBoxes = document.querySelectorAll('.otp-digit-box');

let otpTimerInterval = null;
let otpSuccessCallback = null;

function openWhatsAppOtpModal(phoneNumber, onVerified) {
  otpSuccessCallback = onVerified;
  if (otpTargetPhoneDisplay) {
    otpTargetPhoneDisplay.textContent = phoneNumber;
  }
  if (otpErrorAlert) {
    otpErrorAlert.style.display = 'none';
  }
  
  // Clear existing inputs
  otpBoxes.forEach(b => {
    b.value = '';
    b.classList.remove('filled');
  });

  if (otpModal) {
    otpModal.style.display = 'flex';
    startOtpCountdown(30);
    setTimeout(() => {
      if (otpBoxes[0]) otpBoxes[0].focus();
    }, 120);
  }
}

function closeWhatsAppOtpModal() {
  if (otpModal) {
    otpModal.style.display = 'none';
  }
  if (otpTimerInterval) {
    clearInterval(otpTimerInterval);
    otpTimerInterval = null;
  }
}

function startOtpCountdown(seconds) {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  let remaining = seconds;
  if (otpTimerText) otpTimerText.style.display = 'inline';
  if (resendOtpBtn) resendOtpBtn.style.display = 'none';
  if (otpCountdown) otpCountdown.textContent = `${remaining}s`;

  otpTimerInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(otpTimerInterval);
      otpTimerInterval = null;
      if (otpTimerText) otpTimerText.style.display = 'none';
      if (resendOtpBtn) resendOtpBtn.style.display = 'inline';
    } else {
      if (otpCountdown) otpCountdown.textContent = `${remaining}s`;
    }
  }, 1000);
}

if (closeOtpModalBtn) closeOtpModalBtn.addEventListener('click', closeWhatsAppOtpModal);
if (cancelOtpModalBtn) cancelOtpModalBtn.addEventListener('click', closeWhatsAppOtpModal);

if (resendOtpBtn) {
  resendOtpBtn.addEventListener('click', () => {
    otpBoxes.forEach(b => {
      b.value = '';
      b.classList.remove('filled');
    });
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
    startOtpCountdown(30);
    if (otpBoxes[0]) otpBoxes[0].focus();
    showNotification('A new 6-digit verification code was sent to your WhatsApp.', 'success');
  });
}

// Otp digit boxes keyboard handling (paste, backspace, arrow navigation)
otpBoxes.forEach((box, index) => {
  box.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '');
    box.value = val ? val[val.length - 1] : '';
    if (box.value) {
      box.classList.add('filled');
      if (index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    } else {
      box.classList.remove('filled');
    }
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && index > 0) {
      otpBoxes[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpBoxes[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < otpBoxes.length - 1) {
      otpBoxes[index + 1].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (verifyOtpBtn) verifyOtpBtn.click();
    }
  });

  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    pasted.split('').forEach((digit, i) => {
      if (otpBoxes[i]) {
        otpBoxes[i].value = digit;
        otpBoxes[i].classList.add('filled');
      }
    });
    const nextIdx = Math.min(pasted.length, otpBoxes.length - 1);
    if (otpBoxes[nextIdx]) otpBoxes[nextIdx].focus();
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
  });
});

if (verifyOtpBtn) {
  verifyOtpBtn.addEventListener('click', () => {
    const enteredCode = Array.from(otpBoxes).map(b => b.value).join('');
    if (enteredCode.length < 6) {
      if (otpErrorAlert) {
        otpErrorAlert.style.display = 'block';
        otpErrorAlert.textContent = '⚠️ Please enter the complete 6-digit WhatsApp code.';
      }
      return;
    }

    // Any 6-digit code or test code (e.g. 123456) accepted for verification
    closeWhatsAppOtpModal();
    if (typeof otpSuccessCallback === 'function') {
      otpSuccessCallback();
    }
    showNotification('🎉 WhatsApp mobile number verified successfully!', 'success');
  });
}

/* ==========================================================
   IMAGE CROPPER CONTROLLER (LOGO 400x400 & COVER 16:6)
   ========================================================== */
const cropperModal = document.getElementById('cropperModal');
const closeCropperModalBtn = document.getElementById('closeCropperModalBtn');
const cancelCropperBtn = document.getElementById('cancelCropperBtn');
const applyCropBtn = document.getElementById('applyCropBtn');
const cropperTitle = document.getElementById('cropperTitle');
const cropperSubtitle = document.getElementById('cropperSubtitle');
const cropperCanvasArea = document.getElementById('cropperCanvasArea');
const cropperTransformContainer = document.getElementById('cropperTransformContainer');
const cropperSourceImg = document.getElementById('cropperSourceImg');
const cropMaskRect = document.getElementById('cropMaskRect');
const cropFrameBox = document.getElementById('cropFrameBox');
const cropperDimensionsBadge = document.getElementById('cropperDimensionsBadge');
const cropperZoomSlider = document.getElementById('cropperZoomSlider');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');

// Upload fields & preview elements
const logoFileInput = document.getElementById('logoFileInput');
const logoUploadBox = document.getElementById('logoUploadBox');
const logoPreviewCard = document.getElementById('logoPreviewCard');
const logoPreviewImg = document.getElementById('logoPreviewImg');
const reCropLogoBtn = document.getElementById('reCropLogoBtn');
const removeLogoBtn = document.getElementById('removeLogoBtn');
const croppedLogoData = document.getElementById('croppedLogoData');

const coverFileInput = document.getElementById('coverFileInput');
const coverUploadBox = document.getElementById('coverUploadBox');
const coverPreviewCard = document.getElementById('coverPreviewCard');
const coverPreviewImg = document.getElementById('coverPreviewImg');
const reCropCoverBtn = document.getElementById('reCropCoverBtn');
const removeCoverBtn = document.getElementById('removeCoverBtn');
const croppedCoverData = document.getElementById('croppedCoverData');

let rawLogoDataUrl = null;
let rawCoverDataUrl = null;

let currentCropMode = null; // 'logo' | 'cover'
let cropZoom = 1;
let cropPan = { x: 0, y: 0 };
let isCropDragging = false;
let cropDragStart = { x: 0, y: 0 };

const CROP_CONFIGS = {
  logo: {
    title: 'Crop Restaurant Logo',
    subtitle: 'Drag to position and use the zoom slider to frame your logo (400 × 400 px).',
    aspectRatio: 1, // 1:1 square
    outputWidth: 400,
    outputHeight: 400,
    boxWidth: 240,
    boxHeight: 240,
    badgeText: '400 × 400 px (1:1 Square)'
  },
  cover: {
    title: 'Crop Restaurant Cover Image',
    subtitle: 'Drag to position and zoom to frame your cover banner in 16:6 landscape format.',
    aspectRatio: 16 / 6, // 2.66667
    outputWidth: 1600,
    outputHeight: 600,
    boxWidth: 360,
    boxHeight: 135, // 360 / (16/6)
    badgeText: '16:6 Landscape (1600 × 600 px)'
  }
};

function openImageCropper(mode, imageSrc) {
  currentCropMode = mode;
  const cfg = CROP_CONFIGS[mode];
  if (!cfg) return;

  if (cropperTitle) cropperTitle.textContent = cfg.title;
  if (cropperSubtitle) cropperSubtitle.textContent = cfg.subtitle;
  if (cropperDimensionsBadge) cropperDimensionsBadge.textContent = cfg.badgeText;

  // Set crop frame box dimensions
  if (cropFrameBox) {
    cropFrameBox.style.width = `${cfg.boxWidth}px`;
    cropFrameBox.style.height = `${cfg.boxHeight}px`;
    cropFrameBox.style.left = `calc(50% - ${cfg.boxWidth / 2}px)`;
    cropFrameBox.style.top = `calc(50% - ${cfg.boxHeight / 2}px)`;
  }

  // Update SVG mask cutout
  if (cropMaskRect) {
    cropMaskRect.setAttribute('x', `calc(50% - ${cfg.boxWidth / 2}px)`);
    cropMaskRect.setAttribute('y', `calc(50% - ${cfg.boxHeight / 2}px)`);
    cropMaskRect.setAttribute('width', `${cfg.boxWidth}`);
    cropMaskRect.setAttribute('height', `${cfg.boxHeight}`);
  }

  // Reset transforms
  cropZoom = 1;
  cropPan = { x: 0, y: 0 };
  if (cropperZoomSlider) cropperZoomSlider.value = 1;

  if (cropperSourceImg) {
    cropperSourceImg.src = imageSrc;
    cropperSourceImg.onload = () => {
      const imgW = cropperSourceImg.naturalWidth;
      const imgH = cropperSourceImg.naturalHeight;
      const scale = Math.max(cfg.boxWidth / imgW, cfg.boxHeight / imgH, 1);
      cropperSourceImg.style.width = `${imgW * (cfg.boxWidth / imgW)}px`;
      cropperSourceImg.style.height = 'auto';
      updateCropperTransform();
    };
  }

  if (cropperModal) {
    cropperModal.style.display = 'flex';
  }
}

function closeImageCropper() {
  if (cropperModal) {
    cropperModal.style.display = 'none';
  }
}

function updateCropperTransform() {
  if (cropperTransformContainer) {
    cropperTransformContainer.style.transform = `translate(${cropPan.x}px, ${cropPan.y}px) scale(${cropZoom})`;
  }
}

// Mouse dragging handlers
if (cropperCanvasArea) {
  cropperCanvasArea.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isCropDragging = true;
    cropperCanvasArea.classList.add('dragging');
    cropDragStart = { x: e.clientX - cropPan.x, y: e.clientY - cropPan.y };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isCropDragging) return;
    cropPan = {
      x: e.clientX - cropDragStart.x,
      y: e.clientY - cropDragStart.y
    };
    updateCropperTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isCropDragging) {
      isCropDragging = false;
      cropperCanvasArea.classList.remove('dragging');
    }
  });

  // Touch drag handlers
  cropperCanvasArea.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      isCropDragging = true;
      cropDragStart = { x: t.clientX - cropPan.x, y: t.clientY - cropPan.y };
    }
  });

  cropperCanvasArea.addEventListener('touchmove', (e) => {
    if (!isCropDragging || e.touches.length !== 1) return;
    const t = e.touches[0];
    cropPan = {
      x: t.clientX - cropDragStart.x,
      y: t.clientY - cropDragStart.y
    };
    updateCropperTransform();
  });

  cropperCanvasArea.addEventListener('touchend', () => {
    isCropDragging = false;
  });

  // Wheel zoom
  cropperCanvasArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    cropZoom = Math.min(Math.max(0.5, cropZoom + delta), 3.5);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

// Zoom range and buttons
if (cropperZoomSlider) {
  cropperZoomSlider.addEventListener('input', () => {
    cropZoom = parseFloat(cropperZoomSlider.value);
    updateCropperTransform();
  });
}

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    cropZoom = Math.min(3.5, cropZoom + 0.15);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    cropZoom = Math.max(0.5, cropZoom - 0.15);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    cropZoom = 1;
    cropPan = { x: 0, y: 0 };
    if (cropperZoomSlider) cropperZoomSlider.value = 1;
    updateCropperTransform();
  });
}

if (closeCropperModalBtn) closeCropperModalBtn.addEventListener('click', closeImageCropper);
if (cancelCropperBtn) cancelCropperBtn.addEventListener('click', closeImageCropper);

// Perform HTML5 Canvas Crop
if (applyCropBtn) {
  applyCropBtn.addEventListener('click', () => {
    const cfg = CROP_CONFIGS[currentCropMode];
    if (!cfg || !cropperSourceImg || !cropperSourceImg.src) return;

    const canvas = document.createElement('canvas');
    canvas.width = cfg.outputWidth;
    canvas.height = cfg.outputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const naturalW = cropperSourceImg.naturalWidth || cfg.outputWidth;
    const naturalH = cropperSourceImg.naturalHeight || cfg.outputHeight;
    const displayedW = cropperSourceImg.offsetWidth || cfg.boxWidth;
    const displayedH = cropperSourceImg.offsetHeight || cfg.boxHeight;

    const scaleX = naturalW / displayedW;
    const scaleY = naturalH / displayedH;

    const safeZoom = Math.max(0.1, cropZoom);
    const cropCenterX = displayedW / 2 - (cropPan.x / safeZoom);
    const cropCenterY = displayedH / 2 - (cropPan.y / safeZoom);

    const sourceCropW = (cfg.boxWidth / safeZoom) * scaleX;
    const sourceCropH = (cfg.boxHeight / safeZoom) * scaleY;

    const sourceCropX = (cropCenterX - (cfg.boxWidth / (2 * safeZoom))) * scaleX;
    const sourceCropY = (cropCenterY - (cfg.boxHeight / (2 * safeZoom))) * scaleY;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      cropperSourceImg,
      sourceCropX,
      sourceCropY,
      sourceCropW,
      sourceCropH,
      0,
      0,
      cfg.outputWidth,
      cfg.outputHeight
    );

    const croppedResult = canvas.toDataURL('image/png', 0.95);

    if (currentCropMode === 'logo') {
      if (croppedLogoData) croppedLogoData.value = croppedResult;
      if (logoPreviewImg) logoPreviewImg.src = croppedResult;
      if (logoUploadBox) logoUploadBox.style.display = 'none';
      if (logoPreviewCard) logoPreviewCard.style.display = 'flex';
      showNotification('Restaurant Logo cropped to 400 × 400 px successfully!', 'success');
    } else if (currentCropMode === 'cover') {
      if (croppedCoverData) croppedCoverData.value = croppedResult;
      if (coverPreviewImg) coverPreviewImg.src = croppedResult;
      if (coverUploadBox) coverUploadBox.style.display = 'none';
      if (coverPreviewCard) coverPreviewCard.style.display = 'flex';
      showNotification('Restaurant Cover cropped to landscape (16:6) successfully!', 'success');
    }

    closeImageCropper();
  });
}

// File input change handlers
if (logoFileInput) {
  logoFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawLogoDataUrl = evt.target.result;
      openImageCropper('logo', rawLogoDataUrl);
    };
    reader.readAsDataURL(file);
  });
}

if (coverFileInput) {
  coverFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawCoverDataUrl = evt.target.result;
      openImageCropper('cover', rawCoverDataUrl);
    };
    reader.readAsDataURL(file);
  });
}

// Re-crop buttons
if (reCropLogoBtn) {
  reCropLogoBtn.addEventListener('click', () => {
    if (rawLogoDataUrl) {
      openImageCropper('logo', rawLogoDataUrl);
    } else if (logoFileInput) {
      logoFileInput.click();
    }
  });
}

if (removeLogoBtn) {
  removeLogoBtn.addEventListener('click', () => {
    if (logoFileInput) logoFileInput.value = '';
    if (croppedLogoData) croppedLogoData.value = '';
    rawLogoDataUrl = null;
    if (logoPreviewCard) logoPreviewCard.style.display = 'none';
    if (logoUploadBox) logoUploadBox.style.display = 'flex';
  });
}

if (reCropCoverBtn) {
  reCropCoverBtn.addEventListener('click', () => {
    if (rawCoverDataUrl) {
      openImageCropper('cover', rawCoverDataUrl);
    } else if (coverFileInput) {
      coverFileInput.click();
    }
  });
}

if (removeCoverBtn) {
  removeCoverBtn.addEventListener('click', () => {
    if (coverFileInput) coverFileInput.value = '';
    if (croppedCoverData) croppedCoverData.value = '';
    rawCoverDataUrl = null;
    if (coverPreviewCard) coverPreviewCard.style.display = 'none';
    if (coverUploadBox) coverUploadBox.style.display = 'flex';
  });
}

/* ==========================================================
   WHATSAPP OTP VERIFICATION MODAL CONTROLLER
   ========================================================== */
const otpModal = document.getElementById('otpModal');
const closeOtpModalBtn = document.getElementById('closeOtpModalBtn');
const cancelOtpModalBtn = document.getElementById('cancelOtpModalBtn');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');
const otpTargetPhoneDisplay = document.getElementById('otpTargetPhoneDisplay');
const otpErrorAlert = document.getElementById('otpErrorAlert');
const otpTimerText = document.getElementById('otpTimerText');
const otpCountdown = document.getElementById('otpCountdown');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const otpBoxes = document.querySelectorAll('.otp-digit-box');

let otpTimerInterval = null;
let otpSuccessCallback = null;

function openWhatsAppOtpModal(phoneNumber, onVerified) {
  otpSuccessCallback = onVerified;
  if (otpTargetPhoneDisplay) {
    otpTargetPhoneDisplay.textContent = phoneNumber;
  }
  if (otpErrorAlert) {
    otpErrorAlert.style.display = 'none';
  }
  
  // Clear existing inputs
  otpBoxes.forEach(b => {
    b.value = '';
    b.classList.remove('filled');
  });

  if (otpModal) {
    otpModal.style.display = 'flex';
    startOtpCountdown(30);
    setTimeout(() => {
      if (otpBoxes[0]) otpBoxes[0].focus();
    }, 120);
  }
}

function closeWhatsAppOtpModal() {
  if (otpModal) {
    otpModal.style.display = 'none';
  }
  if (otpTimerInterval) {
    clearInterval(otpTimerInterval);
    otpTimerInterval = null;
  }
}

function startOtpCountdown(seconds) {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  let remaining = seconds;
  if (otpTimerText) otpTimerText.style.display = 'inline';
  if (resendOtpBtn) resendOtpBtn.style.display = 'none';
  if (otpCountdown) otpCountdown.textContent = `${remaining}s`;

  otpTimerInterval = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(otpTimerInterval);
      otpTimerInterval = null;
      if (otpTimerText) otpTimerText.style.display = 'none';
      if (resendOtpBtn) resendOtpBtn.style.display = 'inline';
    } else {
      if (otpCountdown) otpCountdown.textContent = `${remaining}s`;
    }
  }, 1000);
}

if (closeOtpModalBtn) closeOtpModalBtn.addEventListener('click', closeWhatsAppOtpModal);
if (cancelOtpModalBtn) cancelOtpModalBtn.addEventListener('click', closeWhatsAppOtpModal);

if (resendOtpBtn) {
  resendOtpBtn.addEventListener('click', () => {
    otpBoxes.forEach(b => {
      b.value = '';
      b.classList.remove('filled');
    });
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
    startOtpCountdown(30);
    if (otpBoxes[0]) otpBoxes[0].focus();
    showNotification('A new 6-digit verification code was sent to your WhatsApp.', 'success');
  });
}

// Otp digit boxes keyboard handling (paste, backspace, arrow navigation)
otpBoxes.forEach((box, index) => {
  box.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '');
    box.value = val ? val[val.length - 1] : '';
    if (box.value) {
      box.classList.add('filled');
      if (index < otpBoxes.length - 1) {
        otpBoxes[index + 1].focus();
      }
    } else {
      box.classList.remove('filled');
    }
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !box.value && index > 0) {
      otpBoxes[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpBoxes[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < otpBoxes.length - 1) {
      otpBoxes[index + 1].focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (verifyOtpBtn) verifyOtpBtn.click();
    }
  });

  box.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    pasted.split('').forEach((digit, i) => {
      if (otpBoxes[i]) {
        otpBoxes[i].value = digit;
        otpBoxes[i].classList.add('filled');
      }
    });
    const nextIdx = Math.min(pasted.length, otpBoxes.length - 1);
    if (otpBoxes[nextIdx]) otpBoxes[nextIdx].focus();
    if (otpErrorAlert) otpErrorAlert.style.display = 'none';
  });
});

if (verifyOtpBtn) {
  verifyOtpBtn.addEventListener('click', () => {
    const enteredCode = Array.from(otpBoxes).map(b => b.value).join('');
    if (enteredCode.length < 6) {
      if (otpErrorAlert) {
        otpErrorAlert.style.display = 'block';
        otpErrorAlert.textContent = '⚠️ Please enter the complete 6-digit WhatsApp code.';
      }
      return;
    }

    // Any 6-digit code or test code (e.g. 123456) accepted for verification
    closeWhatsAppOtpModal();
    if (typeof otpSuccessCallback === 'function') {
      otpSuccessCallback();
    }
    showNotification('🎉 WhatsApp mobile number verified successfully!', 'success');
  });
}

/* ==========================================================
   IMAGE CROPPER CONTROLLER (LOGO 400x400 & COVER 16:6)
   ========================================================== */
const cropperModal = document.getElementById('cropperModal');
const closeCropperModalBtn = document.getElementById('closeCropperModalBtn');
const cancelCropperBtn = document.getElementById('cancelCropperBtn');
const applyCropBtn = document.getElementById('applyCropBtn');
const cropperTitle = document.getElementById('cropperTitle');
const cropperSubtitle = document.getElementById('cropperSubtitle');
const cropperCanvasArea = document.getElementById('cropperCanvasArea');
const cropperTransformContainer = document.getElementById('cropperTransformContainer');
const cropperSourceImg = document.getElementById('cropperSourceImg');
const cropMaskRect = document.getElementById('cropMaskRect');
const cropFrameBox = document.getElementById('cropFrameBox');
const cropperDimensionsBadge = document.getElementById('cropperDimensionsBadge');
const cropperZoomSlider = document.getElementById('cropperZoomSlider');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');

// Upload fields & preview elements
const logoFileInput = document.getElementById('logoFileInput');
const logoUploadBox = document.getElementById('logoUploadBox');
const logoPreviewCard = document.getElementById('logoPreviewCard');
const logoPreviewImg = document.getElementById('logoPreviewImg');
const reCropLogoBtn = document.getElementById('reCropLogoBtn');
const removeLogoBtn = document.getElementById('removeLogoBtn');
const croppedLogoData = document.getElementById('croppedLogoData');

const coverFileInput = document.getElementById('coverFileInput');
const coverUploadBox = document.getElementById('coverUploadBox');
const coverPreviewCard = document.getElementById('coverPreviewCard');
const coverPreviewImg = document.getElementById('coverPreviewImg');
const reCropCoverBtn = document.getElementById('reCropCoverBtn');
const removeCoverBtn = document.getElementById('removeCoverBtn');
const croppedCoverData = document.getElementById('croppedCoverData');

let rawLogoDataUrl = null;
let rawCoverDataUrl = null;

let currentCropMode = null; // 'logo' | 'cover'
let cropZoom = 1;
let cropPan = { x: 0, y: 0 };
let isCropDragging = false;
let cropDragStart = { x: 0, y: 0 };

const CROP_CONFIGS = {
  logo: {
    title: 'Crop Restaurant Logo',
    subtitle: 'Drag to position and use the zoom slider to frame your logo (400 × 400 px).',
    aspectRatio: 1, // 1:1 square
    outputWidth: 400,
    outputHeight: 400,
    boxWidth: 240,
    boxHeight: 240,
    badgeText: '400 × 400 px (1:1 Square)'
  },
  cover: {
    title: 'Crop Restaurant Cover Image',
    subtitle: 'Drag to position and zoom to frame your cover banner in 16:6 landscape format.',
    aspectRatio: 16 / 6, // 2.66667
    outputWidth: 1600,
    outputHeight: 600,
    boxWidth: 360,
    boxHeight: 135, // 360 / (16/6)
    badgeText: '16:6 Landscape (1600 × 600 px)'
  }
};

function openImageCropper(mode, imageSrc) {
  currentCropMode = mode;
  const cfg = CROP_CONFIGS[mode];
  if (!cfg) return;

  if (cropperTitle) cropperTitle.textContent = cfg.title;
  if (cropperSubtitle) cropperSubtitle.textContent = cfg.subtitle;
  if (cropperDimensionsBadge) cropperDimensionsBadge.textContent = cfg.badgeText;

  // Set crop frame box dimensions
  if (cropFrameBox) {
    cropFrameBox.style.width = `${cfg.boxWidth}px`;
    cropFrameBox.style.height = `${cfg.boxHeight}px`;
    cropFrameBox.style.left = `calc(50% - ${cfg.boxWidth / 2}px)`;
    cropFrameBox.style.top = `calc(50% - ${cfg.boxHeight / 2}px)`;
  }

  // Update SVG mask cutout
  if (cropMaskRect) {
    cropMaskRect.setAttribute('x', `calc(50% - ${cfg.boxWidth / 2}px)`);
    cropMaskRect.setAttribute('y', `calc(50% - ${cfg.boxHeight / 2}px)`);
    cropMaskRect.setAttribute('width', `${cfg.boxWidth}`);
    cropMaskRect.setAttribute('height', `${cfg.boxHeight}`);
  }

  // Reset transforms
  cropZoom = 1;
  cropPan = { x: 0, y: 0 };
  if (cropperZoomSlider) cropperZoomSlider.value = 1;

  if (cropperSourceImg) {
    cropperSourceImg.src = imageSrc;
    cropperSourceImg.onload = () => {
      const imgW = cropperSourceImg.naturalWidth;
      const imgH = cropperSourceImg.naturalHeight;
      const scale = Math.max(cfg.boxWidth / imgW, cfg.boxHeight / imgH, 1);
      cropperSourceImg.style.width = `${imgW * (cfg.boxWidth / imgW)}px`;
      cropperSourceImg.style.height = 'auto';
      updateCropperTransform();
    };
  }

  if (cropperModal) {
    cropperModal.style.display = 'flex';
  }
}

function closeImageCropper() {
  if (cropperModal) {
    cropperModal.style.display = 'none';
  }
}

function updateCropperTransform() {
  if (cropperTransformContainer) {
    cropperTransformContainer.style.transform = `translate(${cropPan.x}px, ${cropPan.y}px) scale(${cropZoom})`;
  }
}

// Mouse dragging handlers
if (cropperCanvasArea) {
  cropperCanvasArea.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isCropDragging = true;
    cropperCanvasArea.classList.add('dragging');
    cropDragStart = { x: e.clientX - cropPan.x, y: e.clientY - cropPan.y };
  });

  window.addEventListener('mousemove', (e) => {
    if (!isCropDragging) return;
    cropPan = {
      x: e.clientX - cropDragStart.x,
      y: e.clientY - cropDragStart.y
    };
    updateCropperTransform();
  });

  window.addEventListener('mouseup', () => {
    if (isCropDragging) {
      isCropDragging = false;
      cropperCanvasArea.classList.remove('dragging');
    }
  });

  // Touch drag handlers
  cropperCanvasArea.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      isCropDragging = true;
      cropDragStart = { x: t.clientX - cropPan.x, y: t.clientY - cropPan.y };
    }
  });

  cropperCanvasArea.addEventListener('touchmove', (e) => {
    if (!isCropDragging || e.touches.length !== 1) return;
    const t = e.touches[0];
    cropPan = {
      x: t.clientX - cropDragStart.x,
      y: t.clientY - cropDragStart.y
    };
    updateCropperTransform();
  });

  cropperCanvasArea.addEventListener('touchend', () => {
    isCropDragging = false;
  });

  // Wheel zoom
  cropperCanvasArea.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.08 : -0.08;
    cropZoom = Math.min(Math.max(0.5, cropZoom + delta), 3.5);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

// Zoom range and buttons
if (cropperZoomSlider) {
  cropperZoomSlider.addEventListener('input', () => {
    cropZoom = parseFloat(cropperZoomSlider.value);
    updateCropperTransform();
  });
}

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    cropZoom = Math.min(3.5, cropZoom + 0.15);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    cropZoom = Math.max(0.5, cropZoom - 0.15);
    if (cropperZoomSlider) cropperZoomSlider.value = cropZoom;
    updateCropperTransform();
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    cropZoom = 1;
    cropPan = { x: 0, y: 0 };
    if (cropperZoomSlider) cropperZoomSlider.value = 1;
    updateCropperTransform();
  });
}

if (closeCropperModalBtn) closeCropperModalBtn.addEventListener('click', closeImageCropper);
if (cancelCropperBtn) cancelCropperBtn.addEventListener('click', closeImageCropper);

// Perform HTML5 Canvas Crop
if (applyCropBtn) {
  applyCropBtn.addEventListener('click', () => {
    const cfg = CROP_CONFIGS[currentCropMode];
    if (!cfg || !cropperSourceImg || !cropperSourceImg.src) return;

    const canvas = document.createElement('canvas');
    canvas.width = cfg.outputWidth;
    canvas.height = cfg.outputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const naturalW = cropperSourceImg.naturalWidth || cfg.outputWidth;
    const naturalH = cropperSourceImg.naturalHeight || cfg.outputHeight;
    const displayedW = cropperSourceImg.offsetWidth || cfg.boxWidth;
    const displayedH = cropperSourceImg.offsetHeight || cfg.boxHeight;

    const scaleX = naturalW / displayedW;
    const scaleY = naturalH / displayedH;

    const safeZoom = Math.max(0.1, cropZoom);
    const cropCenterX = displayedW / 2 - (cropPan.x / safeZoom);
    const cropCenterY = displayedH / 2 - (cropPan.y / safeZoom);

    const sourceCropW = (cfg.boxWidth / safeZoom) * scaleX;
    const sourceCropH = (cfg.boxHeight / safeZoom) * scaleY;

    const sourceCropX = (cropCenterX - (cfg.boxWidth / (2 * safeZoom))) * scaleX;
    const sourceCropY = (cropCenterY - (cfg.boxHeight / (2 * safeZoom))) * scaleY;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      cropperSourceImg,
      sourceCropX,
      sourceCropY,
      sourceCropW,
      sourceCropH,
      0,
      0,
      cfg.outputWidth,
      cfg.outputHeight
    );

    const croppedResult = canvas.toDataURL('image/png', 0.95);

    if (currentCropMode === 'logo') {
      if (croppedLogoData) croppedLogoData.value = croppedResult;
      if (logoPreviewImg) logoPreviewImg.src = croppedResult;
      if (logoUploadBox) logoUploadBox.style.display = 'none';
      if (logoPreviewCard) logoPreviewCard.style.display = 'flex';
      showNotification('Restaurant Logo cropped to 400 × 400 px successfully!', 'success');
    } else if (currentCropMode === 'cover') {
      if (croppedCoverData) croppedCoverData.value = croppedResult;
      if (coverPreviewImg) coverPreviewImg.src = croppedResult;
      if (coverUploadBox) coverUploadBox.style.display = 'none';
      if (coverPreviewCard) coverPreviewCard.style.display = 'flex';
      showNotification('Restaurant Cover cropped to landscape (16:6) successfully!', 'success');
    }

    closeImageCropper();
  });
}

// File input change handlers
if (logoFileInput) {
  logoFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawLogoDataUrl = evt.target.result;
      openImageCropper('logo', rawLogoDataUrl);
    };
    reader.readAsDataURL(file);
  });
}

if (coverFileInput) {
  coverFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawCoverDataUrl = evt.target.result;
      openImageCropper('cover', rawCoverDataUrl);
    };
    reader.readAsDataURL(file);
  });
}

// Re-crop buttons
if (reCropLogoBtn) {
  reCropLogoBtn.addEventListener('click', () => {
    if (rawLogoDataUrl) {
      openImageCropper('logo', rawLogoDataUrl);
    } else if (logoFileInput) {
      logoFileInput.click();
    }
  });
}

if (removeLogoBtn) {
  removeLogoBtn.addEventListener('click', () => {
    if (logoFileInput) logoFileInput.value = '';
    if (croppedLogoData) croppedLogoData.value = '';
    rawLogoDataUrl = null;
    if (logoPreviewCard) logoPreviewCard.style.display = 'none';
    if (logoUploadBox) logoUploadBox.style.display = 'flex';
  });
}

if (reCropCoverBtn) {
  reCropCoverBtn.addEventListener('click', () => {
    if (rawCoverDataUrl) {
      openImageCropper('cover', rawCoverDataUrl);
    } else if (coverFileInput) {
      coverFileInput.click();
    }
  });
}

if (removeCoverBtn) {
  removeCoverBtn.addEventListener('click', () => {
    if (coverFileInput) coverFileInput.value = '';
    if (croppedCoverData) croppedCoverData.value = '';
    rawCoverDataUrl = null;
    if (coverPreviewCard) coverPreviewCard.style.display = 'none';
    if (coverUploadBox) coverUploadBox.style.display = 'flex';
  });
}

// Final Submit
document.getElementById('setupForm').addEventListener('submit', event => {
  event.preventDefault();
  if (!validateStep(currentStep)) return;

  const storeName = document.getElementById('restoName').value;
  const storePhone = contactPhoneInput.getFullNumber();
  showNotification(`🎉 Setup Completed Successfully! Restaurant "${storeName}" registered with Country: ${chosenCountry}, Manager Phone: ${storePhone}, and Google Maps Location verified.`, 'success');
});
