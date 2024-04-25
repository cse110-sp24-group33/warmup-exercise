//Function to load emotions from local storage (also to initialize emotions)
function loadEmotions() {
  const storedEmotion = localStorage.getItem("emotions");
  if (storedEmotion != undefined){
    return JSON.parse(storedEmotion);
  } else {
    return {
      upset: 0,
      unhappy: 0,
      neutral: 0,
      happy: 0,
      joyful: 0,
      total: 0  
    }
  }
}

// Initializes the emotion object
let emotions = loadEmotions();

//Function that deletes all local storage
function resetStorage(){
  localStorage.clear();
  emotions = {
    upset: 0,
    unhappy: 0,
    neutral: 0,
    happy: 0,
    joyful: 0,
    total: 0
  };

  //Updates the percentages to 0 in the html
  updatePercentages(emotions, 0);
}

//Event listener for resetting
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () =>{
  resetStorage();
});

// Function to update the percentages in the HTML
function updatePercentages(emotions, total) {
  Object.keys(emotions).forEach(emotion => {
    if (emotion !== "total") {
      const pctElement = document.getElementById(`${emotion}_pct`);
      const percentage = total === 0 ? 0 : Math.round(emotions[emotion] / total * 100);
      pctElement.textContent = `${percentage}%`;
    }
  });
}

// Event listener for form submission
const form = document.querySelector('.meter');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");

  const selectedEmotion = document.querySelector('input[name="feeling"]:checked').value;

  emotions[selectedEmotion]++;
  emotions["total"]++;

  //Saves the number to the localStorage
  localStorage.setItem("emotions", JSON.stringify(emotions));

  // Update the percentages in the HTML
  const total = emotions["total"];
  updatePercentages(emotions, total);

  // Reset the form to be unchecked
  document.querySelector('input[name="feeling"]:checked').checked = false;
});

// Update percentages when page loads
document.addEventListener('DOMContentLoaded', updatePercentages(emotions, emotions["total"]), false);