const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// **STORY CODE HERE**
const storyText = "One night, :insertx: was wandering through :inserty: when suddenly, :insertz:.  A nearby security guard, named Bob, just shrugged.  It turns out :insertx: had been warned about the dangers of :inserty:.";

const insertX = ["a shadowy figure","a lone traveler", "an intrepid explorer"];
const insertY = ["the haunted forest","the abandoned amusement park","the forbidden library"];
const insertZ = ["vanished without a trace","discovered a hidden portal","stumbled upon an ancient artifact"];

randomize.addEventListener('click', result);

function result() {

  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replace(':insertx:',xItem);
  newStory = newStory.replace(':inserty:',yItem);
  newStory = newStory.replace(':insertz:',zItem);
  newStory = newStory.replace(':insertx:',xItem);


  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("us").checked) {
    const weight = Math.round(300 * 0.453592);
    const temperature =  Math.round((94-32) * 5 / 9);

    newStory = newStory.replace("94 fahrenheit", temperature + " centigrade");
    newStory = newStory.replace("300 pounds", weight + " kilograms");
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

