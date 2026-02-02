// ============================== DOM ELEMENTS ==============================

// Section:1
const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const contactError = document.querySelector("#contactError");

// Section:2
const categorySelect = document.querySelector("#categorySelect");
const serviceSelect = document.querySelector("#serviceSelect");
const serviceError = document.querySelector("#serviceError");

// Section:3
const appointmentDateInput = document.querySelector("#appointmentDate");
const timeSlotInput = document.querySelector("#timeSlot");
const timeError = document.querySelector("#timeError");

// Section:4
const notesInput = document.querySelector("#notes");
const firstTimeCheckbox = document.querySelector("#firstTime");

// Section:5
const agreeCheckbox = document.querySelector("#agree");
const agreementError = document.querySelector("#agreementError");

// Submit Button & Toaster
const submitBtn = document.querySelector("#submitBtn");
const toast = document.querySelector("#toast");

// Full Form
const form = document.querySelector("#appointmentForm");

// ============================== SERVICE/SUBSERVICES ==============================
const servicesByCategory = {
	doctor: [
		"General Physician Consultation",
		"Dermatology Consultation",
		"Dental Checkup",
		"Eye Checkup",
		"ENT Consultation",
		"Pediatric Consultation",
		"Orthopedic Consultation",
		"Cardiology Consultation",
		"Physiotherapy Session",
		"Nutrition / Diet Consultation",
		"Vaccination / Immunization",
	],
	salon: [
		"Haircut",
		"Hair Styling",
		"Hair Coloring",
		"Hair Highlights",
		"Hair Spa",
		"Beard Trim / Shave",
		"Blow Dry",
		"Hair Extensions",
	],
	parlour: [
		"Facial",
		"Clean Up",
		"Bleach / Glow Treatment",
		"Waxing (Full / Partial)",
		"Threading",
		"Makeup / Party Makeup",
		"Eyebrow",
	],
	nails: [
		"Manicure",
		"Pedicure",
		"Gel Nails",
		"Acrylic Nails",
		"Nail Art / Design",
		"Nail Repair",
		"Paraffin Wax Treatment",
	],
	spa: [
		"Full Body Massage",
		"Aromatherapy Massage",
		"Deep Tissue Massage",
		"Swedish Massage",
		"Hot Stone Massage",
		"Body Scrub",
		"Body Polishing",
		"Steam / Sauna Session",
	],
	therapy: [
		"Individual Counseling",
		"Couples Counseling",
		"Family Therapy",
		"Stress Management",
		"CBT Session",
		"Career / Life Coaching",
		"Rehabilitation Therapy",
	],
	fitness: [
		"Personal Training",
		"Yoga Class",
		"Pilates",
		"Zumba / Dance Fitness",
		"Aerobics / Cardio",
		"Strength Training",
		"CrossFit",
		"Bootcamp Classes",
		"Weight Loss Program",
	],
	homeServices: [
		"Plumbing",
		"Electrical Work",
		"House Cleaning",
		"AC / Appliance Repair",
		"Carpentry",
		"Pest Control",
		"Painting",
		"Home Moving Assistance",
		"Laundry / Dry Cleaning",
	],
	other: [
		"Consultation / Advice",
		"Custom Service Request",
		"Event / Party Service",
		"Tutoring / Classes",
		"Pet Care Services",
		"Photography / Videography",
	],
};
serviceSelect.disabled = true;

// On selection of any category
categorySelect.addEventListener("change", () => {
	// Get selected service category
	const selectedCategory = categorySelect.value;
	serviceSelect.innerHTML = `<option value ="">Select Service</option>`;

	// Show services list respective of selected category
	const services = servicesByCategory[selectedCategory];
	console.log(services);
	console.log((serviceSelect.disabled = !selectedCategory));

	// Loop through array & add each service as option
	if (services) {
		services.forEach((service) => {
			const option = document.createElement("option");
			option.value = service;
			option.textContent = service;
			serviceSelect.appendChild(option);
		});
	}
});

// ============================== FORM VALIDATIONS ==============================
form.addEventListener("submit", (e) => {
	e.preventDefault();
	let isValid = true;

	// Clear previous error messages
	contactError.textContent = "";
	serviceError.textContent = "";
	timeError.textContent = "";
	agreementError.textContent = "";

	// ==================== SECTION: 1 VALIDATION ====================
	// ---------- Fullname validation ----------
	const fullName = fullNameInput.value.trim().replace(/\s+/g, " ");
	if (fullName === "") {
		contactError.textContent = "Full name is required";
		isValid = false;
		return;
	}
	console.log(fullName);

	// ---------- Email validation ----------
	const email = emailInput.value.trim();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (email === "") {
		contactError.textContent = "Email is required";
		isValid = false;
		return;
	}
	if (!emailRegex.test(email)) {
		contactError.textContent = "Please enter a valid email";
		isValid = false;
		return;
	}

	// ---------- Phone Number validation ----------
	const phone = phoneInput.value.trim();
	const phonePattern = /^[0-9]{10}$/;
	if (phone === "") {
		contactError.textContent = "Phone number is required.";
		return;
	}
	if (!phonePattern.test(phone)) {
		contactError.textContent = "Enter a valid 10-digit phone number.";
		return;
	}

	// ==================== SECTION: 2 VALIDATION ====================
	// ---------- Category selection validation ----------
	const selectedCategory = categorySelect.value;
	if (selectedCategory === "") {
		serviceError.textContent = "Please select a category.";
		return;
	}

	// ---------- Service selection validation ----------
	const selectedService = serviceSelect.value;
	if (selectedService === "") {
		serviceError.textContent = "Please select a service";
		return;
	}

	// ==================== SECTION: 3 VALIDATION ====================
	// ---------- Date selection validation ----------
	const appointmentDate = appointmentDateInput.value;
	if (appointmentDate === "") {
		timeError.textContent = "Please select an appointment date";
		return;
	}

	// ---------- Time selection validation ----------
	const timeSlot = timeSlotInput.value;
	if (timeSlot === "") {
		timeError.textContent = "Please select a time slot";
		return;
	}

	// ==================== AGREEMENT VALIDATION ====================
	if (!agreeCheckbox.checked) {
		agreementError.textContent = "You must agree to the terms";
		return;
	}

	// alert("Form submitted successfully!");
	showToast("Submitted Successfully.");
	resetForm();
});

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("show");
	setTimeout(() => {
		toast.classList.remove("show");
	}, 3000);
}

function resetForm() {
	form.reset();

	// Reset sub-service dropdown
	serviceSelect.innerHTML = `<option value="">Select Service</option>`;
	serviceSelect.disabled = true;

	// Scroll to top
	window.scrollTo({ top: 0, behavior: "smooth" });
}
