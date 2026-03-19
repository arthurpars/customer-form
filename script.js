// ============================================================
// FIND ELEMENTS
// ============================================================

const form = document.getElementById("customerForm");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");

const street1 = document.getElementById("street1");
const street2 = document.getElementById("street2");
const city = document.getElementById("city");
const stateProvince = document.getElementById("stateProvince");
const postal = document.getElementById("postal");

const phone = document.getElementById("phone");
const email = document.getElementById("email");

const hearAbout = document.getElementById("hearAbout");
const sectionOther = document.getElementById("section-other");
const otherText = document.getElementById("otherText");

const feedback = document.getElementById("feedback");
const suggestions = document.getElementById("suggestions");

const successModal = document.getElementById("successModal");

// ============================================================
// PATTERNS
// Defined at the top so both validate() and
// real-time listeners can use them.
// ============================================================

const namePattern = /^[A-Za-z\s]+$/; // letters and spaces only
const phonePattern = /^[0-9\s\-\(\)]+$/; // digits, spaces, dashes, parentheses
const emailPattern = /^\S+@\S+\.\S+$/; // basic email shape: x@x.x

// ============================================================
// SHOW / HIDE "OTHER" SECTION
// Runs every time the dropdown value changes.
// ============================================================

hearAbout.addEventListener("change", function () {
  if (hearAbout.value === "Other") {
    sectionOther.style.display = "block";
  } else {
    sectionOther.style.display = "none";
    otherText.value = "";
    otherText.classList.remove("input-error");
  }
});

// ============================================================
// HELPER FUNCTIONS
// showError  → turns a field red and shows its error badge
// clearError → removes all red styling from a field
// ============================================================

function showError(inputEl, errorId, sectionId) {
  inputEl.classList.add("input-error");
  document.getElementById(errorId).classList.add("visible");
  document.getElementById(sectionId).classList.add("error-section");
}

function clearError(inputEl, errorId, sectionId) {
  inputEl.classList.remove("input-error");
  document.getElementById(errorId).classList.remove("visible");
  document.getElementById(sectionId).classList.remove("error-section");
}

// ============================================================
// REAL-TIME BORDER VALIDATION
// Listens on every keystroke and adds/removes the red border.
// Does NOT show the error badge — that only happens on submit.
// ============================================================

// First name — letters only, not empty
firstName.addEventListener("input", function () {
  const value = firstName.value.trim();
  if (value === "" || !namePattern.test(value)) {
    firstName.classList.add("input-error");
  } else {
    firstName.classList.remove("input-error");
  }
});

// Last name — same rules as first name
lastName.addEventListener("input", function () {
  const value = lastName.value.trim();
  if (value === "" || !namePattern.test(value)) {
    lastName.classList.add("input-error");
  } else {
    lastName.classList.remove("input-error");
  }
});

// requiredBorder — reusable helper for "just not empty" fields
// Saves us from writing the same listener 6 times.
function requiredBorder(inputEl) {
  inputEl.addEventListener("input", function () {
    if (inputEl.value.trim() === "") {
      inputEl.classList.add("input-error");
    } else {
      inputEl.classList.remove("input-error");
    }
  });
}

// All address fields are required
requiredBorder(street1);
requiredBorder(street2);
requiredBorder(city);
requiredBorder(stateProvince);
requiredBorder(postal);

// Phone — not empty and must match phone pattern
phone.addEventListener("input", function () {
  const value = phone.value.trim();
  if (value === "" || !phonePattern.test(value)) {
    phone.classList.add("input-error");
  } else {
    phone.classList.remove("input-error");
  }
});

// Email — optional, only red if something was typed and it's invalid
email.addEventListener("input", function () {
  const value = email.value.trim();
  if (value !== "" && !emailPattern.test(value)) {
    email.classList.add("input-error");
  } else {
    email.classList.remove("input-error");
  }
});

// Hear about dropdown
hearAbout.addEventListener("input", function () {
  if (hearAbout.value === "") {
    hearAbout.classList.add("input-error");
  } else {
    hearAbout.classList.remove("input-error");
  }
});

// Other text field
otherText.addEventListener("input", function () {
  if (otherText.value.trim() === "") {
    otherText.classList.add("input-error");
  } else {
    otherText.classList.remove("input-error");
  }
});

// ============================================================
// VALIDATE FUNCTION
// Checks every required field on submit.
// Returns true if all good, false if any errors found.
// ============================================================

function validate() {
  let hasErrors = false;
  let firstErrorSection = null;

  // Marks a field as invalid and remembers the first broken section
  function markError(inputEl, errorId, sectionId) {
    showError(inputEl, errorId, sectionId);
    if (firstErrorSection === null) {
      firstErrorSection = document.getElementById(sectionId);
    }
    hasErrors = true;
  }

  // Wipe all errors from the previous submit attempt
  clearError(firstName, "error-firstName", "section-fullName");
  clearError(lastName, "error-lastName", "section-fullName");
  clearError(postal, "error-address", "section-address");
  clearError(phone, "error-phone", "section-phone");
  clearError(email, "error-email", "section-email");
  clearError(hearAbout, "error-hearAbout", "section-hearAbout");
  clearError(otherText, "error-otherText", "section-other");

  // First name — empty or invalid characters
  if (firstName.value.trim() === "") {
    document.getElementById("error-firstName").textContent =
      "This field is required.";
    markError(firstName, "error-firstName", "section-fullName");
  } else if (!namePattern.test(firstName.value.trim())) {
    document.getElementById("error-firstName").textContent =
      "Only letters are allowed.";
    markError(firstName, "error-firstName", "section-fullName");
  }

  // Last name — empty or invalid characters
  if (lastName.value.trim() === "") {
    document.getElementById("error-lastName").textContent =
      "This field is required.";
    markError(lastName, "error-lastName", "section-fullName");
  } else if (!namePattern.test(lastName.value.trim())) {
    document.getElementById("error-lastName").textContent =
      "Only letters are allowed.";
    markError(lastName, "error-lastName", "section-fullName");
  }

  // Address — all 5 fields required, each gets its own red border
  if (street1.value.trim() === "") street1.classList.add("input-error");
  if (street2.value.trim() === "") street2.classList.add("input-error");
  if (city.value.trim() === "") city.classList.add("input-error");
  if (stateProvince.value.trim() === "")
    stateProvince.classList.add("input-error");
  if (postal.value.trim() === "") postal.classList.add("input-error");

  // Show the shared error badge and pink background if any address field is empty
  if (
    street1.value.trim() === "" ||
    street2.value.trim() === "" ||
    city.value.trim() === "" ||
    stateProvince.value.trim() === "" ||
    postal.value.trim() === ""
  ) {
    markError(postal, "error-address", "section-address");
  }

  // Phone — empty or non-numeric characters
  if (phone.value.trim() === "") {
    document.getElementById("error-phone").textContent =
      "This field is required.";
    markError(phone, "error-phone", "section-phone");
  } else if (!phonePattern.test(phone.value.trim())) {
    document.getElementById("error-phone").textContent =
      "Phone number must contain numbers only.";
    markError(phone, "error-phone", "section-phone");
  }

  // Email — optional but must be valid if filled
  if (email.value.trim() !== "" && !emailPattern.test(email.value.trim())) {
    markError(email, "error-email", "section-email");
  }

  // Hear about — must pick something
  if (hearAbout.value === "") {
    markError(hearAbout, "error-hearAbout", "section-hearAbout");
  }

  // Other — only required when the section is visible
  if (sectionOther.style.display === "block" && otherText.value.trim() === "") {
    markError(otherText, "error-otherText", "section-other");
  }

  // Scroll to the first section that has an error
  if (firstErrorSection !== null) {
    firstErrorSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return !hasErrors;
}

// ============================================================
// MODAL — close when clicking the dark overlay
// Defined once here at the top level, NOT inside the submit
// handler, so it doesn't stack up on every submit.
// ============================================================

successModal.addEventListener("click", function (e) {
  // e.target is the element the user actually clicked.
  // We only close if they clicked the dark background,
  // not the white box inside it.
  if (e.target === successModal) {
    successModal.classList.remove("visible");
  }
});

// ============================================================
// FORM SUBMIT
// ============================================================

form.addEventListener("submit", function (event) {
  // Stop the browser from reloading the page
  event.preventDefault();

  // Stop here if validation found errors
  if (!validate()) {
    return;
  }

  // Collect checked checkboxes into an array
  const recommendCheckboxes = document.querySelectorAll(
    'input[name="recommend"]',
  );
  const recommendValues = [];
  recommendCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      recommendValues.push(checkbox.value);
    }
  });

  // Collect reference table rows as an array of objects
  const references = [
    {
      fullName: document.getElementById("ref1Name").value.trim(),
      address: document.getElementById("ref1Address").value.trim(),
      contactNumber: document.getElementById("ref1Contact").value.trim(),
    },
    {
      fullName: document.getElementById("ref2Name").value.trim(),
      address: document.getElementById("ref2Address").value.trim(),
      contactNumber: document.getElementById("ref2Contact").value.trim(),
    },
  ];

  // Build the final data object
  const formData = {
    fullName: {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
    },
    address: {
      street1: street1.value.trim(),
      street2: street2.value.trim(),
      city: city.value.trim(),
      stateProvince: stateProvince.value.trim(),
      postal: postal.value.trim(),
    },
    phoneNumber: phone.value.trim(),
    email: email.value.trim(),
    hearAbout: hearAbout.value,
    otherText: otherText.value.trim(),
    feedback: feedback.value.trim(),
    suggestions: suggestions.value.trim(),
    recommend: recommendValues,
    references: references,
  };

  // Print to console
  console.log("Form Data:", formData);

  // Show success modal
  successModal.classList.add("visible");

  // Clear all inputs
  form.reset();

  // Hide the "Other" section (form.reset() doesn't reset display)
  sectionOther.style.display = "none";
});
