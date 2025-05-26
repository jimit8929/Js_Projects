const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

// Example prompts
const examplePrompts = [
  "A futuristic city skyline at sunset",
  "A serene forest with a river running through it",
  "A close-up of a flower with dew drops",
  "A bustling market scene in a foreign country",
  "A cozy cabin in the woods during winter",
  "A vibrant underwater scene with colorful fish",
  "A retro diner with neon lights",
  "A majestic eagle soaring over a canyon",
  "A surreal dreamscape with floating islands",
  "A steampunk-inspired airship flying through the clouds",
  "A tranquil beach with palm trees and a sunset",
  "A busy city street at night with blurred lights",
  "A whimsical garden with oversized flowers",
  "A dramatic mountain range with a stormy sky",
  "A vintage car parked in front of a classic diner",
  "A peaceful countryside with rolling hills and a barn",
  "A futuristic robot in a high-tech lab",
];

//function for displaying example prompts
if (promptBtn && promptInput) {
  promptBtn.addEventListener("click", () => {
    const prompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    promptInput.value = prompt;
    promptInput.focus();
  });
}

// Compute allowed dimensions for SDXL
const getimagedimensions = (aspectratio) => {
    // Allowed dimensions for SDXL
    const allowed = [
        { width: 1024, height: 1024 },
        { width: 1152, height: 896 },
        { width: 1216, height: 832 },
        { width: 1344, height: 768 },
        { width: 1536, height: 640 },
        { width: 640, height: 1536 },
        { width: 768, height: 1344 },
        { width: 832, height: 1216 },
        { width: 896, height: 1152 },
    ];
    const [w, h] = aspectratio.split(":").map(Number);
    // Find the allowed size with closest aspect ratio
    let best = allowed[0];
    let minDiff = Infinity;
    for (const size of allowed) {
        const ratioAllowed = size.width / size.height;
        const ratioTarget = w / h;
        const diff = Math.abs(ratioAllowed - ratioTarget);
        if (diff < minDiff) {
            minDiff = diff;
            best = size;
        }
    }
    return { width: best.width, height: best.height };
};

// Replace spinner with generated or fallback image
const updateImageCard = (index, src) => {
  console.log(`Updating card ${index} to src`, src);
  const card = document.getElementById(`img-card-${index}`);
  if (!card) return;
  card.classList.remove("loading");
  card.innerHTML = `
    <img src="${src}" alt="Result" class="result-img" />
    <div class="img-overlay">
      <a href="${src}" download="${Date.now()}.png" class="img-download-btn">
        <i class="fa-solid fa-download"></i>
      </a>
    </div>
  `;
};


// --- New: Ultra API integration for image generation ---
const STABILITY_API_KEY = "sk-6bqhn3F26VfETpwyQlfcvO6990rvPMyRAcICBz0pm23F7ir1";
const STABILITY_ENDPOINTS = {
  ultra: "https://api.stability.ai/v2beta/stable-image/generate/ultra",
  sd3: "https://api.stability.ai/v2beta/stable-image/generate/sd3",
  core: "https://api.stability.ai/v2beta/stable-image/generate/core"
};

async function generateImages(count, aspectRatio, prompt, model) {
  if (!prompt || !aspectRatio) {
    alert("Please enter a valid prompt and aspect ratio!");
    return;
  }
  const { width, height } = getimagedimensions(aspectRatio);
  const endpoint = STABILITY_ENDPOINTS[model] || STABILITY_ENDPOINTS.ultra;
  const output_format = model === "sd3" ? "jpeg" : "webp";
  for (let i = 0; i < count; i++) {
    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", output_format);
      formData.append("width", width);
      formData.append("height", height);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${STABILITY_API_KEY}`,
          Accept: "image/*"
        },
        body: formData
      });
      if (response.status === 200) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        updateImageCard(i, url);
      } else {
        const errText = await response.text();
        console.error(`Stability API error: ${response.status}: ${errText}`);
        updateImageCard(i, './assets/test.png');
      }
    } catch (err) {
      console.error("Stability API JS error:", err);
      updateImageCard(i, './assets/test.png');
    }
  }
}

const createImageCards = (model, count, aspectRatio, prompt) => {
  console.log("createImageCards", count, aspectRatio, prompt);
  gridGallery.innerHTML = "";
  for (let i = 0; i < count; i++) {
    gridGallery.innerHTML += `
      <div class="img-card loading" id="img-card-${i}" style="aspect-ratio: ${aspectRatio};">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="status-text">Generating...</p>
        </div>
      </div>`;
  }
  generateImages(count, aspectRatio, prompt, model);
};

promptForm.addEventListener("submit", e => {
  e.preventDefault();
  const model = document.getElementById("model-select").value || "ultra";
  const count = parseInt(countSelect.value, 10) || 1;
  const ratio = ratioSelect.value || "1:1";
  const prompt = promptInput.value.trim();
  createImageCards(model, count, ratio, prompt);
});