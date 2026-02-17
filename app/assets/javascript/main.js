// ES6 or Vanilla JavaScript
// Display the date
document.addEventListener("DOMContentLoaded", () => {
  function formatDateDDMMYYYY(date) {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }


  const today = new Date();
  document.getElementById("date").textContent = formatDateDDMMYYYY(today);

  function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true }; // no seconds
    document.getElementById("time").textContent = now.toLocaleTimeString([], options);
  }

  updateTime();
  setInterval(updateTime, 1000);
});

//Sortaable Table - MOJ
document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("[data-module='moj-sortable-table']");
  if (!table) return;

  const headers = table.querySelectorAll("th");
  headers.forEach((header, index) => {
    // Remove existing sort indicators if they already exist
    const existingIndicator = header.querySelector(".sort-indicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Create and append a new sort indicator
    let sortIndicator = document.createElement("span");
    sortIndicator.className = "sort-indicator";
    sortIndicator.setAttribute("aria-hidden", "true");

sortIndicator.innerHTML = `
<svg class="sort-icon" width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"></path>
  <path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"></path>
</svg>
`;

    header.appendChild(sortIndicator);

    header.addEventListener("click", function () {
      const isAscending = header.getAttribute("aria-sort") === "ascending";
      sortTableByColumn(table, index, !isAscending);
    });
  });

  function sortTableByColumn(table, columnIndex, ascending) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((rowA, rowB) => {
      const cellA = rowA.children[columnIndex].getAttribute("data-sort-value")
        || rowA.children[columnIndex].innerText.trim();
      const cellB = rowB.children[columnIndex].getAttribute("data-sort-value")
        || rowB.children[columnIndex].innerText.trim();

      const compare = !isNaN(cellA) && !isNaN(cellB) ? cellA - cellB : cellA.localeCompare(cellB,
        undefined, { numeric: true });

      return ascending ? compare : -compare;
    });

    rows.forEach(row => tbody.appendChild(row));

    // Reset all headers
    table.querySelectorAll("th").forEach(th => {
      th.setAttribute("aria-sort", "none");
      const indicator = th.querySelector(".sort-indicator");
      if (indicator) {
        indicator.innerHTML = `
<svg class="sort-icon" width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"></path>
  <path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"></path>
</svg>
`; // Reset icon
      }
    });

    // Set the sorted column
    headers[columnIndex].setAttribute("aria-sort", ascending ? "ascending" : "descending");
    headers[columnIndex].querySelector(".sort-indicator").innerHTML = ascending ? `
<svg class="sort-icon" width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.1875 9.5L10.9609 3.95703L13.7344 9.5H8.1875Z" fill="currentColor"></path>

</svg>
` : `
<svg class="sort-icon" width="22" height="22" focusable="false" aria-hidden="true" role="img" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">

  <path d="M13.7344 12.0781L10.9609 17.6211L8.1875 12.0781H13.7344Z" fill="currentColor"></path>
</svg>
`;
  }
});




