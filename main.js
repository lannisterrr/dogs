// fetch whatever data that is in this URL.

// Use of promises before ES6.

// promise has a function named 'then' with function as an argument. once this fetching is complete than this 'func.' inside then will run.
//response = dog api server response
// response.json() -> It will not return the data, instead it will return another promise
// now will chain a 'then' at the end of the function that will run after response.json() is completed

/* old school
fetch("https://dog.ceo/api/breeds/list/all").then(function(response){
    return response.json()
}).then(function(data){
    console.log(data);
})
*/

// Modern way Asyn await
// await - awaiting for the data to come from the server
// async - If we want to use await to handle our promises , then we have to use async function
// fetch will resolve as soon we hear from the server, like the simple header info.

let timer 
let deleteFirstPhotoDelay

async function start(){
   try{
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json(); // actaul value of the response
    console.log(data);

    createBreedList(data.message); // message is a property from the api which contain all the breeds
   }catch(e){
    console.log("there was a problem fetching the list" +e);
   }
}

start();

// create an html select drop down - `template string` for text dropdown to a new line
// Object.keys(breedList) = will return its properties as an array.
// map() - give a function that you want to be applied in each item in the array.
// join() - join converts an array into single string of text . we do this get rid of space and commas

function createBreedList(breedList){
    document.getElementById('breed').innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Choose a dog breed</option>
    ${Object.keys(breedList).map(function(breed){
        return `<option>${breed}</option>`
    }).join('')}
</select>
    
 `
}

async function loadByBreed(breed){
    if(breed !="Choose a dog breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
        const data = await response.json()
        createSlideshow(data.message)
    }else{
        location.reload();
    }
}

function createSlideshow(images){
    
    let currentPosition = 0;
    clearInterval(timer)
    clearInterval(deleteFirstPhotoDelay)

    if(images.length > 1){

         // Gives the first image of the dog we choose
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
   `
 
   currentPosition +=2;
   if(images.length === 2) currentPosition = 0
  timer =  setInterval(nextSlide,3000); 

    }else{
        // the idea here is to not call the next image if there is only one image
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide"></div>
   `


    }
   

   function nextSlide(){
       document.getElementById('slideshow').insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>
       `)

     deleteFirstPhotoDelay =  setTimeout(function(){
        document.querySelector(".slide").remove()
       },1000)

       if(currentPosition + 1 >= images.length){
            currentPosition = 0
       }else{
            currentPosition++
       }    
   }


   var stopBtn = document.getElementById('stop');
   var playing = true;

function pauseSlideshow() {
    stopBtn.innerHTML = 'Play';
    playing = false;
    clearInterval(timer);
}

function playSlideshow() {
    stopBtn.innerHTML = 'Pause';
    playing = true;
    timer = setInterval(nextSlide,3000);
}

stopBtn.onclick = function() {
    if(playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
};



}



