const output = document.getElementById("output");

// show "Loading..." row with required id
output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

// function to make a promise with random delay 1–3 seconds
function createPromise(name) {
  const delay = (Math.random() * 2 + 1).toFixed(3); 
  return new Promise(res => setTimeout(() => res({ name, time: delay }), delay * 1000));
}

const start = performance.now();
Promise.all([
  createPromise("Promise 1"),
  createPromise("Promise 2"),
  createPromise("Promise 3")
]).then(results => {
  output.innerHTML = "";
  results.forEach(r => {
    output.innerHTML += `<tr><td>${r.name}</td><td>${parseFloat(r.time).toFixed(3)}</td></tr>`;
  });
  const total = ((performance.now() - start) / 1000).toFixed(3);
  output.innerHTML += `<tr><td>Total</td><td>${total}</td></tr>`;
});
