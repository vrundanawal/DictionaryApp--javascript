//https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=your-api-key

let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let apiKey ='ab2ff6be-1c85-40ab-bad0-85f3f1c8ecb6';
let notFound =document.querySelector('.not_found');
let definationBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');


searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    //clear data
   
    audioBox.innerHTML = '';
    notFound.innerText = '';
    definationBox.innerText='';

    //get input data
    var word = input.value;
    //call api
    if(word == ''){
        alert('Word is required');
        return;
    }
    getData(word);

})


async function getData(word){
   // input.value = '';
    loading.style.display = 'block';
    //Ajax call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data =await response.json();
    console.log(data);
    //if empty result
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = "No result found";
        return;
    }

    //If result is suggestions
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }

    //Result found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
   // console.log(defination)
    definationBox.innerText = defination;

    //sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }

}


function renderSound(soundName){
    //https://media.merriam-webster.com/soundc11
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key =${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}