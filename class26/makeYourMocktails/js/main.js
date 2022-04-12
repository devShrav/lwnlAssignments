const DROPDOWN = document.querySelector(`#mocktails-dropdown`)
const BUTTON = document.querySelector(`#get-random-button`)
const IMAGE = document.querySelector(`.mocktail-image`)
const INGREDIENTSTITLE = document.querySelector(`.ingredients-title`)
const INGREDIENTS = document.querySelector(`.mocktail-ingredients`)
const RECIPETITLE = document.querySelector(`.recipe-title`)
const RECIPE = document.querySelector(`.mocktail-recipe`)
const NAME = document.querySelector(`.mocktail-name`)

//Populating the dropdown menu
function populateDropdown(drinksList) {
  drinksList.forEach(element => {
    const option = document.createElement(`option`)
    option.value = element.strDrink
    option.innerText = element.strDrink
    DROPDOWN.appendChild(option)
  });
}

//Getting the list of drinks available in the API
fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
      .then(res => res.json())
      .then(data => {
        populateDropdown(data.drinks)
      })
      .catch(error => {
        console.log(`error ${error}`)
      })


// Displaying the drink details
function populateDrinkDetails (drinkDetails) {
  //Clearing the ingredient list elements
  while(INGREDIENTS.firstChild) {
    INGREDIENTS.removeChild(INGREDIENTS.lastChild)
  }
  //Populating the drink name
  NAME.innerText = drinkDetails.strDrink
  //Pupulating the image
  IMAGE.src = drinkDetails.strDrinkThumb
  //Populating the img alt details
  IMAGE.alt = drinkDetails.strDrink
  //Populating the ingredients and measures
  const drinkDetailsKeys = Object.keys(drinkDetails)
  drinkDetailsKeys.forEach(element => {
    if (element.slice(0,13) === `strIngredient`) {
      if(drinkDetails[element] !== null) {
        //Getting the ingredient number for the measure 
        const num = Number(element.replace(/\D/g,'')) //Extracting the ingredient number: for eg. pulling 7 from strIngredient7
        //Getting the appropriate Measure value
        const measure = `strMeasure` + num // adding the eg. 7 to strMeasure key to get the appropriate measure value
        let measureText = ''
        if(drinkDetails[measure] != null) {
          //Assigning the measure details
          measureText = ` : ` + drinkDetails[measure]
        }
        //Creating ingredients list element
        const olLi = document.createElement(`li`)
        //Populating the list with the ingredient and measure values
        olLi.innerText = drinkDetails[element] + measureText
        //Displaying the ingredients title
        INGREDIENTSTITLE.innerText = `Ingredients:`
        //Adding the ingredient to the list
        INGREDIENTS.appendChild(olLi)
      }
    }
    //Populating the Recipe instructions
    if(element === `strInstructions`) {
      RECIPETITLE.innerText = `Recipe:`
      RECIPE.innerText = drinkDetails[element]
    }
  })
}

//Getting drink details from the API
function getDrinkDetails(name) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
      .then(res => res.json())
      .then(data => {
        populateDrinkDetails(...data.drinks)//passing as object extracted from an array of 1 element
      })
      .catch(error => {
        console.log(`error ${error}`)
      })
}

//Checking for change in the drop down menu and passing the new value
DROPDOWN.addEventListener(`change`, e => {
  if(e.target.value !== `default`){
    getDrinkDetails(e.target.value)
  }
})

//Picking a random recipe name
function generateRandomRecipe() {
  // pick a random drink
  const options = DROPDOWN.children
  const random = Math.floor(Math.random()*options.length)
  // update select dropdown
  DROPDOWN.value = options[random].value
  // display drink details
  getDrinkDetails(DROPDOWN.value)
}

//Checking for button click
BUTTON.addEventListener(`click`, e => {
  generateRandomRecipe()
})

