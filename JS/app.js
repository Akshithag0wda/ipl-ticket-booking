// Toast notification
function showToast(message) {
    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

// Smooth scrolling to booking
document.querySelectorAll('a[href="#booking"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("booking").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Booking form opened!");
    });
});


// 1. Team filter
const teamFilter = document.getElementById("teamFilter");
const matchRows = document.querySelectorAll("#matchTable tr");

teamFilter.addEventListener("change", function () {

    const selectedTeam = teamFilter.value;

    matchRows.forEach(function (row) {

        const teams = row.dataset.teams.split(" ");

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});


// 2. Grid and List view
const matchTable = document.getElementById("matchTable");

document.getElementById("gridView").addEventListener("click", function () {

    matchTable.classList.remove("list-view");
    matchTable.classList.add("grid-view");

    showToast("Grid view enabled!");

});

document.getElementById("listView").addEventListener("click", function () {

    matchTable.classList.remove("grid-view");
    matchTable.classList.add("list-view");

    showToast("List view enabled!");

});


// 3. Hamburger menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });

});


// 4. Live booking summary
const matchSelect = document.getElementById("match");
const categorySelect = document.getElementById("category");
const quantityInput = document.getElementById("quantity");

function updateSummary() {

    const selectedMatch = matchSelect.value;
    const selectedCategory = categorySelect.value;
    const quantity = Number(quantityInput.value) || 0;

    const prices = {
        "RCB vs CSK": {
            "General": 700,
            "Premium": 1500,
            "VIP": 3500
        },

        "MI vs KKR": {
            "General": 900,
            "Premium": 1800,
            "VIP": 4000
        },

        "CSK vs DC": {
            "General": 800,
            "Premium": 1600,
            "VIP": 3200
        }
    };

    let price = 0;

    if (selectedMatch && selectedCategory) {
        price = prices[selectedMatch][selectedCategory];
    }

    document.getElementById("summaryMatch").textContent =
        selectedMatch || "-";

    document.getElementById("summaryCategory").textContent =
        selectedCategory || "-";

    document.getElementById("ticketPrice").textContent = price;

    document.getElementById("summaryQuantity").textContent =
        quantity;

    document.getElementById("totalPrice").textContent =
        price * quantity;
}

matchSelect.addEventListener("change", updateSummary);
categorySelect.addEventListener("change", updateSummary);
quantityInput.addEventListener("input", updateSummary);


// 5. Booking form submission
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const match = matchSelect.value;
    const category = categorySelect.value;
    const quantity = Number(quantityInput.value);

    if (quantity < 1 || quantity > 10) {
        showToast("Please enter quantity between 1 and 10!");
        return;
    }

    updateSummary();

    const total = Number(
        document.getElementById("totalPrice").textContent
    );

    const bookingTable = document.getElementById("bookingTable");

    bookingTable.innerHTML = "";

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>B001</td>
        <td>${name}</td>
        <td>${match}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>₹${total}</td>
    `;

    bookingTable.appendChild(row);

    showToast("Booking submitted successfully!");

    const successMessage = document.getElementById("successMessage");

    if (successMessage) {
        successMessage.textContent = "Booking submitted successfully!";
    }

});


// 6. Book button smooth scrolling
document.querySelectorAll('a[href="#schedule"]').forEach(function (link) {

    link.addEventListener("click", function () {

        document.getElementById("schedule").scrollIntoView({
            behavior: "smooth"
        });

    });

});