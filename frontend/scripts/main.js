//frontend>scripts>main.js
 document.getElementById("search-button").addEventListener("click", function () {
    const pickupLocation = document.getElementById("pickup-location").value;
    const dropoffLocation = document.getElementById("dropoff-location").value;
    const pickupDate = document.getElementById("pickup-date").value;
    const returnDate = document.getElementById("return-date").value;

    if (!pickupDate || !returnDate) {
        alert("Please select both pickup and return dates.");
        return;
    }
    const searchQuery = `search.html?pickup=${pickupLocation}&dropoff=${dropoffLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`;
    window.location.href = searchQuery;
});
