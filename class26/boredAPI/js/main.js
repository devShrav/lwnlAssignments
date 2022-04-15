
const ACTIVITY = document.querySelector('#activity')
const TYPE = document.querySelector('#type')
const PARTICIPANTS = document.querySelector('#participants')
const PRICE = document.querySelector('#price')

function clearFields() {
  ACTIVITY.textContent = `Activity: `
  TYPE.textContent = `Type: `
  PARTICIPANTS.textContent = `Participants: `
  PRICE.textContent = `Price: `
  document.querySelector('.displayContainer').classList.remove('hidden')
}



function getRandom() {
  fetch(`http://www.boredapi.com/api/activity/`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      displayActivity(data)
    })
    .catch(err => {
      console.log(`Error: ${err}`)
    })
}

function getActivity() {
  const activityType = document.querySelector('#activities').value
  fetch(`http://www.boredapi.com/api/activity?type=${activityType}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      displayActivity(data)
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function displayActivity(data) {
  clearFields()
  ACTIVITY.textContent += data.activity
  TYPE.textContent += data.type
  PARTICIPANTS.textContent += data.participants
  PRICE.textContent += data.price

}



document.querySelector("#randomActivity").addEventListener("click", getRandom);
document.querySelector("#selectActivity").addEventListener("click", getActivity);
// clearFields()