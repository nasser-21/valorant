const apiUrl = "https://valorant-api.com/v1/agents";

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      agents: [],
      agentsfilter: [],
      agentsbkp: [],
      roles: [],
      categoriesSelected: [],
      valorText: "",
      favoritos: [],
    };
  },
  mounted() {},
  created() {
    this.callAgents(apiUrl);
    let datosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) 
        if(datosLocalStorage){
            this.favoritos = datosLocalStorage
        }
  },
  methods: {
    callAgents(url) {
      fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        this.agentsfilter = data.data;

        this.agents = this.agentsfilter.filter((agent) => agent.role != null);

        this.agentsbkp = this.agents;

        console.log(this.agents);

        this.roles = Array.from(new Set(this.agents.map((agent) => agent.role.displayName)))
        })
    },
    agregarFavorito(agent){
      if(this.favoritos.includes(agent)){
          console.log("ya existe")
        }
        else{
            this.favoritos.push(agent)
            localStorage.setItem('favoritos',JSON.stringify(this.favoritos))
        }  
    },
    quitarFavorito(agent){
      const index = this.favoritos.findIndex(fav => fav.id == agent.id) 
      if(index !== -1 ){
          this.favoritos.splice(index, 1)
      }
      console.log(this.favoritos);
      localStorage.setItem('favoritos',JSON.stringify(this.favoritos))
  }

},

  computed: {
    superFiltro() {
      let primerFiltro = this.agentsbkp.filter((agent) =>
        agent.displayName.toLowerCase().includes(this.valorText.toLowerCase())
      );

      if (this.categoriesSelected.length == 0) {
        this.agents = primerFiltro;
      } else {
        this.agents = primerFiltro.filter((agent) =>
          this.categoriesSelected.includes(agent.role.displayName)
        );
      }
    },
  },
}).mount("#app");




