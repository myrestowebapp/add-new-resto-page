// State management for 8 full-page sections
let currentStep = 1;
const totalSteps = 8;
const stepNames = [
  "Account Information",
  "Basic Restaurant Details",
  "Location Details",
  "Operational Details",
  "Legal & Tax Details",
  "Brand & Media",
  "Banking & Settlement",
  "Restaurant Login & Security"
];

/* ==========================================================
   WAZPP COUNTRY PHONE DATA SPECIFICATION
   ========================================================== */
const COUNTRIES_PHONE_DATA = [
  // Primary / Home
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳', mobileDigits: 10, formatExample: '98765 43210' },

  // India's Neighbouring Countries
  { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰', mobileDigits: 9, formatExample: '71 234 5678' },
  { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵', mobileDigits: 10, formatExample: '984 1234567' },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩', mobileDigits: 10, formatExample: '1712 345678' },
  { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻', mobileDigits: 7, formatExample: '712 3456' },
  { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹', mobileDigits: 8, formatExample: '17 12 34 56' },
  { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲', mobileDigits: 10, formatExample: '9 1234 5678' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', mobileDigits: 9, formatExample: '81 234 5678' },

  // Middle East / GCC
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', mobileDigits: 9, formatExample: '50 123 4567' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', mobileDigits: 9, formatExample: '50 123 4567' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦', mobileDigits: 8, formatExample: '3312 3456' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼', mobileDigits: 8, formatExample: '9123 4567' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲', mobileDigits: 8, formatExample: '9123 4567' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭', mobileDigits: 8, formatExample: '3612 3456' },

  // Southeast Asia & Pacific
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', mobileDigits: 8, formatExample: '8123 4567' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', mobileDigits: 10, formatExample: '12 345 6789' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', mobileDigits: 10, formatExample: '812 3456 7890' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', mobileDigits: 10, formatExample: '917 123 4567' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺', mobileDigits: 9, formatExample: '412 345 678' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿', mobileDigits: 9, formatExample: '21 123 4567' },

  // Western Markets
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸', mobileDigits: 10, formatExample: '555 000 0000' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧', mobileDigits: 10, formatExample: '7911 123456' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦', mobileDigits: 10, formatExample: '555 000 0000' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪', mobileDigits: 10, formatExample: '151 23456789' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷', mobileDigits: 9, formatExample: '6 12 34 56 78' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪', mobileDigits: 9, formatExample: '85 123 4567' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱', mobileDigits: 9, formatExample: '6 12345678' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸', mobileDigits: 9, formatExample: '612 34 56 78' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹', mobileDigits: 10, formatExample: '320 1234567' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷', mobileDigits: 11, formatExample: '11 98765 4321' },

  // African Nations
  { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬', mobileDigits: 10, formatExample: '802 123 4567' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦', mobileDigits: 9, formatExample: '82 123 4567' },
  { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪', mobileDigits: 9, formatExample: '712 345678' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬', mobileDigits: 10, formatExample: '10 1234 5678' }
];

/* Phone Input Component Generator */
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
          <!-- Country Trigger Button -->
          <button type="button" class="phone-trigger-btn" id="${this.id}-trigger" title="Click to change country code">
            <span class="phone-trigger-flag" id="${this.id}-flag">${this.currentCountry.flag}</span>
            <span class="phone-trigger-code" id="${this.id}-code">${this.currentCountry.code}</span>
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
    this.codeEl = document.getElementById(`${this.id}-code`);
    this.dialEl = document.getElementById(`${this.id}-dial`);
    this.hint = document.getElementById(`${this.id}-hint`);
    this.iconWrap = document.getElementById(`${this.id}-iconWrap`);
  }

  bindEvents() {
    // Toggle Popover
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown();
    });

    // Search in Popover
    this.searchInput.addEventListener('input', () => {
      this.searchQuery = this.searchInput.value.toLowerCase().trim();
      this.renderCountryList();
    });

    // Numeric constraint & digit limiting
    this.input.addEventListener('input', () => {
      // Strictly strip all non-numeric characters
      let raw = this.input.value.replace(/\D/g, '');
      // Constrain strictly to country's mobileDigits length
      if (raw.length > this.currentCountry.mobileDigits) {
        raw = raw.slice(0, this.currentCountry.mobileDigits);
      }
      this.input.value = raw;
      this.updateState();
    });

    // Close dropdown when clicked outside
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
    // Close any other open phone dropdowns on the page
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
    this.codeEl.textContent = countryObj.code;
    this.dialEl.textContent = countryObj.dialCode;
    this.input.placeholder = countryObj.formatExample;
    this.input.maxLength = countryObj.mobileDigits;

    // Truncate existing input digits if longer than new country's limit
    let digits = this.input.value.replace(/\D/g, '');
    if (digits.length > countryObj.mobileDigits) {
      digits = digits.slice(0, countryObj.mobileDigits);
      this.input.value = digits;
    }

    this.hint.innerHTML = `Standard format for <strong>${countryObj.name}</strong> (${countryObj.mobileDigits} digits)`;
    this.updateState();
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
    // If optional and has value, must still be complete digits
    if (val.length > 0) {
      return val.length === this.currentCountry.mobileDigits;
    }
    return true;
  }
}

// Initialize the Wazpp-style phone components
const contactPhoneInput = new PhoneCountryInputComponent('contactPhoneContainer', {
  id: 'contactPhone',
  label: 'Contact Mobile Number',
  required: true,
  initialCountry: 'IN'
});

const storePhoneInput = new PhoneCountryInputComponent('storePhoneContainer', {
  id: 'storePhone',
  label: 'Store Mobile Number (Optional)',
  required: false,
  initialCountry: 'IN'
});

const loginPhoneInput = new PhoneCountryInputComponent('loginPhoneContainer', {
  id: 'loginPhone',
  label: 'Restaurant Login Mobile Number',
  required: true,
  initialCountry: 'IN'
});

// Country selection logic for Section 2
const countrySelect = document.getElementById('restaurantCountry');
const basicDetailsRest = document.getElementById('basicDetailsRest');
const lockedNotice = document.getElementById('lockedNotice');
const countryStatus = document.getElementById('countryStatus');
const selectedCountryName = document.getElementById('selectedCountryName');
const quickChips = document.querySelectorAll('.country-chip');

function applyCountrySelection(countryValue) {
  if (!countryValue) {
    basicDetailsRest.classList.add('locked');
    lockedNotice.style.display = 'flex';
    countryStatus.style.display = 'none';
    basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = true);
    contactPhoneInput.input.disabled = true;
    storePhoneInput.input.disabled = true;
    quickChips.forEach(chip => chip.classList.remove('selected'));
    return;
  }

  // Unlock fields
  basicDetailsRest.classList.remove('locked');
  lockedNotice.style.display = 'none';
  countryStatus.style.display = 'inline-flex';
  selectedCountryName.textContent = countryValue;
  basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = false);
  contactPhoneInput.input.disabled = false;
  storePhoneInput.input.disabled = false;

  // Highlight active chip if matches
  quickChips.forEach(chip => {
    if (chip.dataset.country.toLowerCase() === countryValue.toLowerCase()) {
      chip.classList.add('selected');
    } else {
      chip.classList.remove('selected');
    }
  });

  // Synchronize the Wazpp phone country inputs with the selected country
  const matchedCountry = COUNTRIES_PHONE_DATA.find(c => 
    c.name.toLowerCase() === countryValue.toLowerCase() ||
    c.code.toLowerCase() === countryValue.toLowerCase()
  );
  if (matchedCountry) {
    contactPhoneInput.setCountry(matchedCountry);
    storePhoneInput.setCountry(matchedCountry);
    loginPhoneInput.setCountry(matchedCountry);
  }
}

// Country Dropdown Change
countrySelect.addEventListener('change', () => {
  applyCountrySelection(countrySelect.value);
});

// Quick Country Chips Click
quickChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const country = chip.dataset.country;
    countrySelect.value = country;
    // In case exact value is not direct match, check options
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

// Initially disable fields in Basic Details until country is selected
basicDetailsRest.querySelectorAll('input:not([id*="Phone"]), select, textarea').forEach(el => el.disabled = true);
contactPhoneInput.input.disabled = true;
storePhoneInput.input.disabled = true;

// Validate a specific step
function validateStep(stepNumber) {
  const stepEl = document.querySelector(`.section-step[data-step="${stepNumber}"]`);
  if (!stepEl) return true;

  // Special validation for Step 1: terms
  if (stepNumber === 1) {
    const terms = document.getElementById('terms');
    if (!terms.checked) {
      showNotification('Please accept the Terms & Conditions to proceed.', 'error');
      terms.focus();
      return false;
    }
  }

  // Special validation for Step 2: Country Selection and Phone Validation
  if (stepNumber === 2) {
    if (!countrySelect.value) {
      showNotification('Please select the restaurant\'s country first / ദയവായി രാജ്യം തിരഞ്ഞെടുക്കുക.', 'error');
      countrySelect.focus();
      return false;
    }

    // Validate Contact Mobile Number
    if (!contactPhoneInput.isValid()) {
      showNotification(`Please enter a valid ${contactPhoneInput.currentCountry.mobileDigits}-digit contact mobile number for ${contactPhoneInput.currentCountry.name}.`, 'error');
      contactPhoneInput.input.focus();
      return false;
    }

    // Validate Store Mobile Number if provided
    if (!storePhoneInput.isValid()) {
      showNotification(`Please enter a complete ${storePhoneInput.currentCountry.mobileDigits}-digit store mobile number for ${storePhoneInput.currentCountry.name}, or leave it empty.`, 'error');
      storePhoneInput.input.focus();
      return false;
    }
  }

  // Standard HTML5 validity check for all other required inputs in this step
  const inputs = stepEl.querySelectorAll('input:not([disabled]):not([id*="Phone"]), select:not([disabled]), textarea:not([disabled])');
  for (const input of inputs) {
    if (!input.checkValidity()) {
      input.reportValidity();
      showNotification('Please complete all required fields in this section.', 'error');
      input.focus();
      return false;
    }
  }

  // Special validation for Step 4: Service formats
  if (stepNumber === 4) {
    const services = stepEl.querySelectorAll('input[name="service"]:checked');
    if (services.length === 0) {
      showNotification('Please select at least one Service Format.', 'error');
      return false;
    }
  }

  // Special validation for Step 8: Login Mobile Number
  if (stepNumber === 8) {
    if (!loginPhoneInput.isValid()) {
      showNotification(`Please enter a valid ${loginPhoneInput.currentCountry.mobileDigits}-digit login mobile number for ${loginPhoneInput.currentCountry.name}.`, 'error');
      loginPhoneInput.input.focus();
      return false;
    }
  }

  hideNotification();
  return true;
}

// Step switching function
function goToStep(step) {
  if (step > currentStep) {
    // Validate current step before advancing
    if (!validateStep(currentStep)) return;
  }

  if (step < 1 || step > totalSteps) return;

  currentStep = step;
  updateUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateUI() {
  // Show only active step card
  document.querySelectorAll('.section-step').forEach(sec => {
    const secStep = parseInt(sec.dataset.step, 10);
    sec.classList.toggle('active', secStep === currentStep);
  });

  // Update sidebar step indicators
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

  // Update top progress bar
  const progressPercent = Math.round((currentStep / totalSteps) * 100);
  document.getElementById('progressFillBar').style.width = progressPercent + '%';
  document.getElementById('progressPercentage').textContent = progressPercent + '%';
  document.getElementById('progressStepCount').textContent = `Step ${currentStep} of ${totalSteps}`;
  document.getElementById('progressSectionName').textContent = stepNames[currentStep - 1];
}

// Allow clicking on sidebar steps
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

// Conditional Fields
const holidayRadios = document.querySelectorAll('input[name="holiday"]');
const holidayDay = document.getElementById('holidayDay');
holidayRadios.forEach(r => r.addEventListener('change', () => {
  const show = document.querySelector('input[name="holiday"]:checked').value === 'yes';
  holidayDay.style.display = show ? 'block' : 'none';
  const sel = holidayDay.querySelector('select');
  if (sel) sel.required = show;
}));

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

// Password Visibility Toggle
document.querySelectorAll('.toggle').forEach(btn => btn.addEventListener('click', () => {
  const input = document.getElementById(btn.dataset.target);
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
}));

// File Upload Name Display
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

// Final Form Submission
document.getElementById('setupForm').addEventListener('submit', event => {
  event.preventDefault();
  
  // Validate the final step
  if (!validateStep(currentStep)) return;

  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirmPassword').value;

  if (password !== confirm) {
    showNotification('Password and Confirm Password do not match.', 'error');
    document.getElementById('confirmPassword').focus();
    return;
  }

  showNotification('🎉 Setup Completed Successfully! Restaurant profile created with country: ' + (countrySelect.value || 'Selected Country') + '. Contact Phone: ' + contactPhoneInput.getFullNumber(), 'success');
});

