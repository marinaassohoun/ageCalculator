const ageCalculator = {
  userInput: null,
  calculateBtn: null,
  displayResult: null,
  lastCalculation: null,
  isBirthdayPopupShown: false,
  birthdayPopupClosed: false, // Ajout d'une variable pour suivre si le popup a été fermé
  init: () => {
    ageCalculator.userInput = document.querySelector("#date");
    ageCalculator.userInput.max = new Date().toISOString().split("T")[0];
    ageCalculator.calculateBtn = document.querySelector(".calculate-btn");
    ageCalculator.calculateBtn.addEventListener(
      "click",
      ageCalculator.calculateAge
    );

    ageCalculator.displayResult = document.querySelector(".display");
  },
  calculateAge: () => {
    // Get date of birth from user input
    let birthDate = new Date(ageCalculator.userInput.value);
    // Check if the date of birth is valid
    if (isNaN(birthDate)) {
      ageCalculator.displayResult.innerHTML = ` <div class="age-result"> <p id="result">Please enter your birth date. <span class="hand">\u{1F446}</span></p> </div>`; // Display the error message
      return; // Exit function
    }

    // Extract day, month and year from date of birth
    let userBirthdayDay = birthDate.getDate();
    let userBirthdayMonth = birthDate.getMonth() + 1; // Months start at 0, so we add 1
    let userBirthdayYear = birthDate.getFullYear();

    // Get the current date
    let today = new Date();

    // Extract day, month and year from current date
    let thisDay = today.getDate();
    let thisMonth = today.getMonth() + 1; // Months start at 0, so we add 1
    let thisYear = today.getFullYear();

    // Initialization of variables for age in years, months and days
    let ageDays, ageMonths, ageYears;

    // Calculate age in years by subtracting year of birth from current year
    ageYears = thisYear - userBirthdayYear;

    // Calculate age in months taking into account the month of birth
    if (
      thisMonth > userBirthdayMonth || // Check if the current month is greater than the month of birth
      (thisMonth === userBirthdayMonth && thisDay >= userBirthdayDay) // Or if the current month is the same as the month of birth and the current day is greater than or equal to the day of birth
    ) {
      ageMonths = thisMonth - userBirthdayMonth; // Calculate the number of months by subtracting the month of birth from the current month
    } else {
      ageYears--; // If the previous condition is not met, reduce the number of years by 1
      ageMonths = 12 + thisMonth - userBirthdayMonth; // Calculate the number of months by adding 12 to the current month then subtracting the month of birth
    }

    // Calculate age in days taking into account the day of birth
    if (thisDay >= userBirthdayDay) {
      // Check if the current day is greater than or equal to the day of birth
      ageDays = thisDay - userBirthdayDay; // Calculate the number of days by subtracting the day of birth from the current day
    } else {
      ageMonths--; // If the previous condition is not met, reduce the number of months by 1
      ageDays =
        ageCalculator.getDaysInMonth(userBirthdayYear, userBirthdayMonth) + // Gets the number of days in the month of birth
        thisDay -
        userBirthdayDay; // Add the current day to the number of days in the month of birth, then subtract the day of birth
    }

    // Check if the previous calculation is the same as the current calculation
    if (
      ageCalculator.lastCalculation === `${ageYears}-${ageMonths}-${ageDays}`
    ) {
      // If it is the same, do nothing
      return;
    }

    // Check if it's the user's birthday and display the appropriate message
    if (thisDay === userBirthdayDay && thisMonth === userBirthdayMonth) {
      if (
        !ageCalculator.isBirthdayPopupShown ||
        ageCalculator.birthdayPopupClosed
      ) {
        ageCalculator.dateMessage(ageDays, ageMonths, ageYears);
        ageCalculator.isBirthdayPopupShown = true;
        ageCalculator.birthdayPopupClosed = false; // Reset closed popup variable
      }
    } else {
      // Store the current result as the last calculation
      ageCalculator.lastCalculation = `${ageYears}-${ageMonths}-${ageDays}`;

      // Reset popup display variables
      ageCalculator.isBirthdayPopupShown = false;
      ageCalculator.birthdayPopupClosed = false;

      // Display the result in HTML
      ageCalculator.displayResult.innerHTML = ` <div class="age-result"> <p id="result">You are <span>${ageYears}</span> years, <span>${ageMonths}</span > months and <span>${ageDays}</span> days old.</p> </div>`;
    }
  },

  getDaysInMonth: (year, month) => {
    return new Date(year, month, 0).getDate();
  },
  dateMessage: (ageDays, ageMonths, ageYears) => {
    ageCalculator.displayResult.innerHTML = `
     <div id="birthdayWish-popup" class="popup">
        <a href="#" class="close-popup" >&times;</a>
        <div class="popup-header">
            <h2>Happy Birthday !</h2>
        </div>
        <div class="popup-content">
            <span id="cake">
                &#x1F382;
            </span>
            <p id="result">
                Today, you are <span>${ageYears}</span> years, <span>${ageMonths}</span> months and <span>${ageDays}</span> days old.
            </p>
        </div>
      </div>
     `;
    ageCalculator.displayResult.classList.add("overlay");
    const closePopup = document.querySelector(".close-popup");
    closePopup.addEventListener("click", ageCalculator.closeBirthdayPopup);
    ageCalculator.displayResult.classList.remove("hide");
  },

  closeBirthdayPopup: () => {
    ageCalculator.displayResult.classList.add("hide");
    ageCalculator.birthdayPopupClosed = true; // Mark the popup as closed
  },
};
