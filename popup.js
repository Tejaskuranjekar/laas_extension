const inputText = document.getElementById("inputText");
const summarizeBtn = document.getElementById("summarize");
const funBtn = document.getElementById("funSummary");
const summaryArea = document.getElementById("summaryArea");
const summaryText = document.getElementById("summaryText");
const historyList = document.getElementById("historyList");

let summaryCount = 0;
let history = [];

// -------------------- Offline Summarizer --------------------
function simpleSummarize(text, maxSentences = 3) {
  if (!text) return "";
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const freq = {};
  text.toLowerCase().split(/\W+/).forEach(w => {
    if (w.length < 3) return;
    freq[w] = (freq[w] || 0) + 1;
  });
  const scored = sentences.map(s => {
    const words = s.toLowerCase().split(/\W+/);
    let score = 0;
    words.forEach(w => (score += freq[w] || 0));
    return { s: s.trim(), score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxSentences).map(x => x.s).join(" ");
}

// -------------------- Fun Meme Summarizer --------------------
function funSummarize() {
  const jokes = [
    "Bhai short me: Netas fighting, aam aadmi crying. 🤦",
    "In short: Paisa hi paisa hoga, common man sad hoga. 💸",
    "Summary: Study hard, warna meme bano. 📚😂",
    "Arre bas itna samajh lo: drama zyada, result thoda. 🎭",
    "TL;DR: Coffee kam, stress zyada. ☕😵"
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// -------------------- History --------------------
function addToHistory(summary) {
  history.unshift(summary);
  if (history.length > 5) history.pop();
  historyList.innerHTML = "";
  history.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1}: ${s}`;
    historyList.appendChild(li);
  });
}

// -------------------- Gamification --------------------
function showBadge(count) {
  let msg = "";
  if (count === 1) msg = "🔥 First summary! Shuruat dhamaka hai!";
  else if (count === 5) msg = "👑 Level up! Productivity pro ban gaya!";
  else if (count === 10) msg = "🚀 LAAS Master! Ab tu unstoppable hai!";
  if (msg) alert(msg);
}

// -------------------- Easter Egg --------------------
function checkEasterEgg(count) {
  if (count === 10) {
    alert("🥚 Bro, zyada kaam mat kar, thoda chai break le ☕.");
    summaryCount = 0; // reset
  }
}

// -------------------- Event Listeners --------------------
summarizeBtn.onclick = () => {
  const txt = inputText.value.trim();
  if (!txt) return alert("Paste some text first.");
  const count = Number(document.getElementById("sentCount").value);
  const summ = simpleSummarize(txt, count);

  summaryArea.style.display = "block";
  summaryText.innerText = summ;

  summaryCount++;
  addToHistory(summ);
  showBadge(summaryCount);
  checkEasterEgg(summaryCount);
};

funBtn.onclick = () => {
  const txt = inputText.value.trim();
  if (!txt) return alert("Paste some text first.");
  const funny = funSummarize();

  summaryArea.style.display = "block";
  summaryText.innerText = funny;

  summaryCount++;
  addToHistory(funny);
  showBadge(summaryCount);
  checkEasterEgg(summaryCount);
};

// -------------------- Quick Share --------------------
document.getElementById("copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText(summaryText.innerText).then(() => {
    alert("✅ Copied to clipboard!");
  });
});

document.getElementById("whatsappBtn").addEventListener("click", () => {
  const msg = encodeURIComponent(summaryText.innerText);
  window.open(`https://wa.me/?text=${msg}`, "_blank");
});