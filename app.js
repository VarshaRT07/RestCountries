const theme=document.querySelector('.darkmode');
const listcountries=document.querySelector('.listcountries');
const specific= document.querySelector('.specific');
listcountries.classList.remove('hidden')
specific.classList.remove('hidden')
const header=document.querySelector('.main');
header.classList.remove('hidden');
const back=document.querySelector('.return');
const backBtn=document.getElementById("back");
const search =document.querySelector('form');
var filterSelect = document.getElementById("filter");

//filter by region

filterSelect.addEventListener("change", function() {
  var selectedOption = filterSelect.value;

  var selectedOptionText = filterSelect.options[filterSelect.selectedIndex].text;

  console.log("Selected Option Text: " + selectedOptionText);
  listcountries.classList.add('hidden')

  
  displayFilters( selectedOptionText)

});


//search bar

search.addEventListener('submit', e=>{
  e.preventDefault();

  const findcountry= search.indicountry.value.trim();
  search.reset();
  console.log(findcountry);
  header.classList.add('hidden');
  displaySpecificCountry(findcountry);
})

//back function 

backBtn.addEventListener('click',()=>{
  header.classList.remove('hidden');
  back.classList.add('hidden')
  specific.classList.add('hidden');
  listcountries.classList.remove('hidden');
})


// theme
console.log(theme)
theme.addEventListener('click', ()=>{
    if (document.body.getAttribute("data-theme") === "dark") {
        document.body.setAttribute("data-theme", "light");
        theme.textContent = "Light Mode";
      } else {
        
        document.body.setAttribute("data-theme", "dark");
        theme.textContent = "Dark Mode";
      }
})


const list= document.querySelector('.listcountries');
const countrylist=["germany", "usa", "brazil", "iceland", "afghanistan", "albania", "algeria", "india", "australia", "iceland", "russia"];
const data=[];


function displayCountries(data) {
  console.log(data.length);
  
 for (let i=0; i<data.length; i++) {
   let j=data[i];
   console.log(j)
  
   
  //  listcountries.innerHTML+= `
  //  <div class="country">
   
  //  <div class="country-img">
  //  <img src="${j[0].flags.png}"alt="${j[0].flags.alt}">
  //  </div>
  //  <h4 class="name">${j[0].name.common}</h4>
  //  <div class="country-info">
  //  <p> <strong>Population:</strong> <span> ${j[0].population} </span></p>
  //  <p><b>Region: </b> <span> ${j[0].region} </span></p>
  //  <p><b>Capital: </b><span>${j[0].capital} </span></p>
  //  </div>
  //  </div>
   //`
    listcountries.innerHTML+= `
   <div class="country">
   <div class="country-img">
   <img src="${j.flags.png}"alt="${j.flags.alt}">
   </div>
   <h4 class="name">${j.name}</h4>
   <div class="country-info">
   <p> <strong>Population:</strong> <span> ${j.population} </span></p>
   <p><b>Region: </b> <span> ${j.region} </span></p>
   <p><b>Capital: </b><span>${j.capital} </span></p>
   </div>
   </div>
   `
  }
 
  }



  function displayFilterCountries(data) {
    console.log(data.length)
    listcountries.innerHTML='';
    
   for (let i=0; i<data.length; i++) {
     let j=data[i];
     console.log(j)
    
      listcountries.innerHTML+= `
     <div class="country">
     <div class="country-img">
     <img src="${j.flags.png}"alt="${j.flags.alt}">
     </div>
     <h4 class="name">${j.name.common}</h4>
     <div class="country-info">
     <p> <strong>Population:</strong> <span> ${j.population} </span></p>
     <p><b>Region: </b> <span> ${j.region} </span></p>
     <p><b>Capital: </b><span>${j.capital} </span></p>
     </div>
     </div>
     `
    }
  
       
    }
  
 
const displaySpecificCountry = async (val) =>{
  console.log(val)
  const response = await fetch(`https://restcountries.com/v3.1/name/${val}`);
  const data = await response.json();
  const obj = data[0].name.nativeName
  const obj1 = Object.keys(obj)[0]
  const obj2= Object.keys(data[0].currencies);
  
  back.classList.remove('hidden')
    
    
    specific.innerHTML =`
    <div class="specific-country" >
    <div class="flag">
        <img src="${data[0].flags.png}" alt="">
    </div>
    <div class="info-country">
        
        <div class="left">
            <div>
                <h1>${data[0].name.common}</h1>
            </div>
            <div class="leftie">
                <p><b>Native Name:</b><span>${data[0].name.nativeName[obj1]["common"]}</span></p>
                <p><b>Population:</b><span> ${data[0].population}</span></p>
                <p><b>Region:</b><span>${data[0].region}</span></p>
                <p><b>Sub Region:</b><span><span>${data[0].subregion}</span></p>
                <p><b>Capital:</b><span><span>${data[0].capital}</span></p>
            </div>
        </div>
        <div class="right">
            <p><b>Top level Domain:</b><span>${data[0].tld}</span></p>
            <p><b>Currencies:</b><span>${data[0].currencies[obj2]['name']}</span></p>
            <p><b>Languages:</b><span>${Object.keys(data[0].languages)}</span></p>
            <p><b>Borders:</b> <span>${data[0].borders}</span></p>
        </div>
       
    </div>
   
    
 </div>`
 specific.classList.remove('hidden')
  
  }

  const displayFilters = async (val) =>{
    const response = await fetch(`https://restcountries.com/v3.1/region/${val}`);
    const data = await response.json();
    console.log(data)
    listcountries.classList.remove('hidden')

    displayFilterCountries(data);
    getCards(data);

  }
   
  
  
const getCountries= async ()=>{
  for (let i = 0; i < countrylist.length; i++) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countrylist[i]}`);
    const data1 = await response.json();
    data.push(data1)
    console.log(data);
  }
  displayCountries(data);
  const country= document.querySelectorAll('.country');
  console.log(country)
  for(let l=0;l<country.length;l++){
    country[l].addEventListener('click',()=>{
      header.classList.add('hidden');
      const val=country[l].querySelector('.name').textContent;
      listcountries.classList.add('hidden')
     displaySpecificCountry(val);
    })

  }

  
    
}
// getCountries();

const data3=[]
const getAllCountry =async ()=>{
  const response = await fetch('data.json');
  const data = await response.json();
  // console.log(data)
  
  for(let i=0;i<2;i++){
    const randomNumber = Math.floor(Math.random() * 250) + 1;
    data3.push(data[randomNumber]);
  }
  console.log(data3)
   displayCountries(data);
   getCards(data)
  
}

function getCards(data){
  const country= document.querySelectorAll('.country');
  console.log(country)
  for(let l=0;l<country.length;l++){
    country[l].addEventListener('click',()=>{
      header.classList.add('hidden');
      const val=country[l].querySelector('.name').textContent;
      listcountries.classList.add('hidden')
      displaySpecificCountry(val);
    })

  }
}
getAllCountry();