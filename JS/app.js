// Reusable toast notification
function showToast(message) {
    let toast = document.createElement("div");

    toast.className = "toast";
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

// Smooth scrolling to booking form
document.querySelectorAll('a[href="#booking"]').forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        let booking = document.getElementById("booking");

        if (booking) {
            booking.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Booking form opened!");
        }
    });
});

// Select booking form controls
let form = document.getElementById("bookingForm");

let matchInput = document.getElementById("match");
let categoryInput = document.getElementById("category");
let quantityInput = document.getElementById("quantity");

// Ticket prices
let priceList = {
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

// Update Booking Summary
function updateSummary(showMessage) {

    let match = matchInput.value;
    let category = categoryInput.value;
    let quantity = Number(quantityInput.value);

    // Validate quantity
    if (quantity < 1 || quantity > 10 || !Number.isInteger(quantity)) {
        quantity = 0;
    }

    let price = 0;

    if (match && category) {
        price = priceList[match][category];
    }

    let total = price * quantity;

    document.getElementById("summaryMatch").innerText =
        match || "-";

    document.getElementById("summaryCategory").innerText =
        category || "-";

    document.getElementById("ticketPrice").innerText = price;

    document.getElementById("summaryQuantity").innerText =
        quantity;

    document.getElementById("totalPrice").innerText = total;

    if (showMessage) {
        showToast("Booking summary updated!");
    }

    return total;
}

// Live update when match changes
matchInput.addEventListener("change", function() {
    updateSummary(true);
});

// Live update when category changes
categoryInput.addEventListener("change", function() {
    updateSummary(true);
});

// Live update when quantity changes
quantityInput.addEventListener("input", function() {
    updateSummary(false);
});

quantityInput.addEventListener("change", function() {
    updateSummary(true);
});

// Booking form submission
if (form) {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("name").value;
        let match = matchInput.value;
        let category = categoryInput.value;
        let quantity = Number(quantityInput.value);

        let total = updateSummary(false);

        // Add booking to table
        let bookingTable = document.getElementById("bookingTable");

        if (bookingTable) {

            bookingTable.innerHTML = "";

            let row = bookingTable.insertRow();

            row.insertCell(0).innerText = "B001";
            row.insertCell(1).innerText = name;
            row.insertCell(2).innerText = match;
            row.insertCell(3).innerText = category;
            row.insertCell(4).innerText = quantity;
            row.insertCell(5).innerText = "₹" + total;
        }

        showToast("Booking submitted successfully!");
    });
}