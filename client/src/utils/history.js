// // utils/history.js

// export function getShortTerm() {
//   const data = localStorage.getItem("shortTermTextHistory");
//   return data ? JSON.parse(data) : [];
// }

// export function saveShortTerm(entry) {
//   const history = getShortTerm();
//   const newEntry = {
//     id: Date.now(),
//     ...entry,
//     timestamp: new Date().toISOString(),
//   };
//   history.unshift(newEntry);
//   localStorage.setItem("shortTermTextHistory", JSON.stringify(history));
// }
// Save an entry to short-term memory
export function saveShortTerm(entry) {
  if (!entry) return;

  const existing = JSON.parse(localStorage.getItem("shortTermHistory")) || [];
  existing.unshift(entry); // Add to the beginning
  localStorage.setItem("shortTermHistory", JSON.stringify(existing));
}

// Get all short-term entries
export function getShortTerm() {
  return JSON.parse(localStorage.getItem("shortTermHistory")) || [];
}

// Clear short-term memory if needed
export function clearShortTerm() {
  localStorage.removeItem("shortTermHistory");
}
