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

// Booking form submission
let form = document.getElementById("bookingForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let match = document.getElementById("match").value;
        let category = document.getElementById("category").value;

        let quantityInput = document.getElementById("quantity") ||
                            document.getElementById("tickets");

        let quantity = quantityInput.value;

        // Add booking to table if it exists
        let bookingTable = document.getElementById("bookingTable");

        if (bookingTable) {
            let priceList = {
                "General": 700,
                "Premium": 1500,
                "VIP": 3500,
                "general": 700,
                "premium": 1500,
                "vip": 3500
            };

            let price = priceList[category] || 0;
            let total = price * Number(quantity);

            bookingTable.innerHTML = "";

            let row = bookingTable.insertRow();

            row.insertCell(0).innerText = "B001";
            row.insertCell(1).innerText = name;
            row.insertCell(2).innerText = match;
            row.insertCell(3).innerText = category;
            row.insertCell(4).innerText = quantity;
            row.insertCell(5).innerText = "₹" + total;
        }

        // Update booking summary if available
        if (document.getElementById("summaryMatch")) {
            document.getElementById("summaryMatch").innerText = match;
            document.getElementById("summaryCategory").innerText = category;
            document.getElementById("summaryQuantity").innerText = quantity;

            let priceList = {
                "General": 700,
                "Premium": 1500,
                "VIP": 3500,
                "general": 700,
                "premium": 1500,
                "vip": 3500
            };

            let price = priceList[category] || 0;

            document.getElementById("ticketPrice").innerText = price;
            document.getElementById("totalPrice").innerText =
                price * Number(quantity);
        }

        let successMessage = document.getElementById("successMessage");

        if (successMessage) {
            successMessage.innerText = "Booking submitted successfully!";
        }

        showToast("Booking submitted successfully!");
    });
}