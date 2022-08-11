let container = document.querySelector('.content_container');
let mainPage = document.querySelector('.page_main');
let grassmeter = document.querySelectorAll('.pollenmeter--grass');
let treemeter = document.querySelectorAll('.pollenmeter--tree');
let weedmeter = document.querySelectorAll('.pollenmeter--weed');

let grasscontainer = document.querySelector('.pollenmeter_container--grass');
let treecontainer = document.querySelector('.pollenmeter_container--tree');
let weedcontainer = document.querySelector('.pollenmeter_container--weed');

let suggestions = [
    "Aartselaar","Antwerpen","Arendonk","Baarle-Hertog","Balen","Beerse","Berlaar","Boechout","Bonheiden","Boom","Bornem","Borsbeek","Brasschaat","Brecht","Dessel","Duffel","Edegem","Essen","Geel","Grobbendonk","Heist-op-den-Berg","Hemiksem","Herentals","Herenthout","Herselt","Hoogstraten","Hove","Hulshout","Kalmthout","Kapellen","Kasterlee","Kontich","Laakdal","Lier","Lille","Lint","Malle","Mechelen","Meerhout","Merksplas","Mol","Mortsel","Niel","Nijlen","Olen","Oud-Turnhout","Putte","Puurs-Sint-Amands","Ranst","Ravels","Retie","Rijkevorsel","Rumst","Schelle","Schilde","Schoten","Sint-Katelijne-Waver","Stabroek","Turnhout","Vorselaar","Vosselaar","Westerlo","Wijnegem","Willebroek","Wommelgem","Wuustwezel","Zandhoven","Zoersel","Zwijndrecht","Alken","As","Beringen","Bilzen","Bocholt","Borgloon","Bree","Diepenbeek","Dilsen-Stokkem","Genk","Gingelom","Halen","Ham","Hamont-Achel","Hasselt","Hechtel-Eksel","Heers","Herk-de-Stad","Herstappe","Heusden-Zolder","Hoeselt","Houthalen-Helchteren","Kinrooi","Kortessem","Lanaken","Leopoldsburg","Lommel","Lummen","Maaseik","Maasmechelen","Nieuwerkerken","Oudsbergen","Peer","Pelt","Riemst","Sint-Truiden","Tessenderlo","Tongeren","Voeren","Wellen","Zonhoven","Zutendaal","Aalst","Aalter","Assenede","Berlare","Beveren","Brakel","Buggenhout","De Pinte","Deinze","Denderleeuw","Dendermonde","Destelbergen","Eeklo","Erpe-Mere","Evergem","Gavere","Gent","Geraardsbergen","Haaltert","Hamme","Herzele","Horebeke","Kaprijke","Kluisbergen","Kruibeke","Kruisem","Laarne","Lebbeke","Lede","Lierde","Lievegem","Lochristi","Lokeren","Maarkedal","Maldegem","Melle","Merelbeke","Moerbeke","Nazareth","Ninove","Oosterzele","Oudenaarde","Ronse","Sint-Gillis-Waas","Sint-Laureins","Sint-Lievens-Houtem","Sint-Martens-Latem","Sint-Niklaas","Stekene","Temse","Waasmunster","Wachtebeke","Wetteren","Wichelen","Wortegem-Petegem","Zele","Zelzate","Zottegem","Zulte","Zwalm","Aarschot","Affligem","Asse","Beersel","Begijnendijk","Bekkevoort","Bertem","Bever","Bierbeek","Boortmeerbeek","Boutersem","Diest","Dilbeek","Drogenbos","Galmaarden","Geetbets","Glabbeek","Gooik","Grimbergen","Haacht","Halle","Herent","Herne","Hoegaarden","Hoeilaart","Holsbeek","Huldenberg","Kampenhout","Kapelle-op-den-Bos","Keerbergen","Kortenaken","Kortenberg","Kraainem","Landen","Lennik","Leuven","Liedekerke","Linkebeek","Linter","Londerzeel","Lubbeek","Machelen","Meise","Merchtem","Opwijk","Oud-Heverlee","Overijse","Pepingen","Roosdaal","Rotselaar","Scherpenheuvel-Zichem","Sint-Genesius-Rode","Sint-Pieters-Leeuw","Steenokkerzeel","Ternat","Tervuren","Tielt-Winge","Tienen","Tremelo","Vilvoorde","Wemmel","Wezembeek-Oppem","Zaventem","Zemst","Zoutleeuw","Alveringem","Anzegem","Ardooie","Avelgem","Beernem","Blankenberge","Bredene","Brugge","Damme","De Haan","De Panne","Deerlijk","Dentergem","Diksmuide","Gistel","Harelbeke","Heuvelland","Hooglede","Houthulst","Ichtegem","Ieper","Ingelmunster","Izegem","Jabbeke","Knokke-Heist","Koekelare","Koksijde","Kortemark","Kortrijk","Kuurne","Langemark-Poelkapelle","Ledegem","Lendelede","Lichtervelde","Lo-Reninge","Menen","Mesen","Meulebeke","Middelkerke","Moorslede","Nieuwpoort","Oostende","Oostkamp","Oostrozebeke","Oudenburg","Pittem","Poperinge","Roeselare","Ruiselede","Spiere-Helkijn","Staden","Tielt","Torhout","Veurne","Vleteren","Waregem","Wervik","Wevelgem","Wielsbeke","Wingene","Zedelgem","Zonnebeke","Zuienkerke","Zwevegem"
    ];

var map = L.map('map').setView([50.8695469, 3.8107086], 13);
var marker = L.marker([50.8695469, 3.8107086]).addTo(map);

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;
// if user press any key and release
inputBox.onkeyup = (e)=>{
    map.removeLayer(marker);
    if(!container.classList.contains('o-hide-accessible')){container.classList.add('o-hide-accessible');}
    if(!mainPage.classList.contains('center_container')){mainPage.classList.add('center_container');}
    let error = document.querySelector(".error_message");
    error.textContent = "";
    
    let userData = e.target.value; //user enetered data
    //converting to lowercase
    let emptyArray = [];
    if(userData){
        if(e.key == "Enter"){icon.click();}
        icon.onclick = ()=>{
            if(suggestions.includes(userData)){getgeocode(userData);
            }else{
                let error = document.querySelector(".error_message");
                error.textContent = "This city doesn't exist or is not a belgian city"
            }
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        //check if selectData is in suggestions array
        if(suggestions.includes(selectData)){getgeocode(selectData);
        }else{
            let error = document.querySelector(".error_message");
            error.textContent = "This city doesn't exist or is not a belgian city"
        }
    }
    searchWrapper.classList.remove("active");
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

let getgeocode = async (stad) => {
	const request = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${stad}&limit=1&appid=5ba393a21a0b49cf23ce537787c84a3d`) 
    console.log(request);
	const data = await request.json();
	console.log(data);
    showMap(data);

};

let showMap = (data) =>{
    console.log(data[0].lat);
    map.setView([data[0].lat, data[0].lon], 13);
    marker = L.marker([data[0].lat, data[0].lon]).addTo(map);
    map.addLayer(marker);

    getPollenData(data[0].lat, data[0].lon);
}

let getPollenData = async (latitude, longitude) => {
    const request = await fetch(`https://api.breezometer.com/pollen/v2/forecast/daily?lat=${latitude}&lon=${longitude}&key=4493bf2fffe4491984a15710d4b5e660&features=types_information&days=1`) 
    console.log(request);
	const data = await request.json();
	console.log(data);
    showPollenData(data);
}

let showPollenData = (data) =>{

    console.log(data.data[0].types.grass.index.value);
    console.log(data.data[0].types.tree.index.value);
    console.log(data.data[0].types.weed.index.value);

    //loop over all elements in grassmeter and delete previous border(s)
    for (let i = 0; i < grassmeter.length; i++) {
        if(grassmeter[i].classList.contains("pollen--border")){
            grassmeter[i].classList.remove("pollen--border");
        }
       
    }

    for (let i = 0; i < treemeter.length; i++) {
        if(treemeter[i].classList.contains("pollen--border")){
            treemeter[i].classList.remove("pollen--border");
        }
       
    }

    for (let i = 0; i < weedmeter.length; i++) {
        if(weedmeter[i].classList.contains("pollen--border")){
            weedmeter[i].classList.remove("pollen--border");
        }
       
    }

    //add class to element in grassmeter ,treemeter & weedmeter 
    if(data.data[0].types.grass.index.value != null){grassmeter[data.data[0].types.grass.index.value -1].classList.add('pollen--border');}
    else{grasscontainer.innerHTML = `<p class="error_message">No pollen data</p>`;}
    if(data.data[0].types.tree.index.value != null){treemeter[data.data[0].types.tree.index.value -1].classList.add('pollen--border');}
    else{treecontainer.innerHTML = `<p class="error_message">No pollen data </p>`;}
    if(data.data[0].types.weed.index.value != null){weedmeter[data.data[0].types.weed.index.value -1].classList.add('pollen--border');}
    else{weedcontainer.innerHTML = `<p class="error_message">No pollen data </p>`;}

    container.classList.remove('o-hide-accessible');
    mainPage.classList.remove('center_container');
    map.invalidateSize()
}

document.addEventListener('DOMContentLoaded', function() {

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    
   
});