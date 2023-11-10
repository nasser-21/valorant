import { crearCardDetails} from "./modules/funtions.js";
const apiUrl = "https://valorant-api.com/v1/agents";


fetch(apiUrl)
.then(response => response.json())
.then(data => {
    const agents = data.data
    console.log(agents);
        crearCardDetails(agents)

    
})