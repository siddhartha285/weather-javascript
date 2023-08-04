const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".search");
const form=document.querySelector("form");

let target="Mysore";
const fetchData= async(target)=>{

  try {
    const url=`https://api.weatherapi.com/v1/current.json?key=d15f94b8f007499e90b101328232307&q=${target}`;
    const response=await fetch(url);
    const data=await response.json();
    const {current:{temp_c,condition:{text,icon}},
            location:{name, localtime},
                }=data;
    console.log(data);
    updateDom(temp_c,name,localtime,icon,text);
  } catch (error) {
    alert("Location not Found");
  }

};

function updateDom(temperature,city,time,emoji,text){
    temperatureField.innerHTML=temperature;
    cityField.innerText=city;
    const exactTime=time.split(" ")[1];
    const exactDate=time.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();
    dateField.innerText=`${exactTime}-${getDayFullName(exactDay)} ${exactDate}`
    emojiField.src=emoji;
    weatherField.innerText=text;
}
fetchData(target);

function getDayFullName(num){
    switch(num)
    {
        case 0:
            return "Sunday";
            break;
            
        case 1:
                return "Monday";
                break;
        case 2:
            return "Tuesday";
            break;

        case 3:
            return "Wednesday";
            break;
        
        case 4:
            return "Thursday";
            break;

        case 5:
            return "Friday";
            break;
        
        case 6:
            return "Saturday";
            break;
            
        }
}

form.addEventListener("submit",(e)=>{
e.preventDefault();
target=searchField.value;
fetchData(target);

})