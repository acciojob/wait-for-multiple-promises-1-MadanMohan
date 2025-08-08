// script.js

const output = document.getElementById("output");

// Show the loading row initially
output.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

// Helper to create a promise with a random delay between 1–3 seconds
function createPromise(name) {
  const delay = (Math.random() * 2 + 1).toFixed(3); // seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, time: parseFloat(delay) });
    }, delay * 1000);
  });
}

// Create the promises
const p1 = createPromise("Promise 1");
const p2 = createPromise("Promise 2");
const p3 = createPromise("Promise 3");

// Start timer for measuring total time
const startTime = performance.now();

Promise.all([p1, p2, p3]).then(results => {
  // Calculate total time taken (actual elapsed time)
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  // Remove loading row
  output.innerHTML = "";

  // Add rows for each promise
  results.forEach(result => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${result.name}</td>
      <td>${result.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
});
