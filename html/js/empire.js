Vue.component("tab-empire", {
    data: function () {
        return {
            regular_planets: ["Abyz","Arinam","Arnor","Bereg","Centauri","Coorneeq","Dal Bootha","Fria","Gral","Lazar","Lirta IV","Lodor","Lor","Mecatol Rex","Meer","Mehar Xull","Mellon","New Albion","Quann","Qucen'n","Rarron","Resculon","Sakulag","Saudor","Starpoint","Tar'Mann","Tequ'ran","Thibah","Torkan","Vefut II","Wellon","XXehan","Zohbat"],
            factions_planets: {"Arborec":["Nestphar"],"Creuss":["Creuss"],"Hacan":["Hercant","Arretze","Kamdorn"],"Jol-Nar":["Jol","Nar"],"L1Z1X":["[0.0.0]"],"Letnev":["Arc Prime","Wren Terra"],"Mentak":["Moll Primus"],"Muaat":["Muuat"],"Naalu":["Druaa","Maaluuk"],"Nekro Virus":["Mordai II"],"Saar":["Lisis II","Ragh"],"Sardakk N'orr":["Tren'Lak","Quinarra"],"Sol":["Jord"],"Winnu":["Winnu"],"Xxcha":["Archon Wren","Green Archon Tau"],"Yin":["Darien"],"Yssaril":["Retillion","Shalloq"]}
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="planet in regular_planets">
            <div class="col">
                <empire-planet v-bind:planet="planet"></empire-planet>
            </div>
        </div>                   
    </div>
`
});

Vue.component("empire-planet", {
    props: ['planet'],
    data() {
        return {
            isActive: false
        };
    },
    template: `
        <button type="button" class="btn btn-block" @click="planet_select()" v-bind:class="[isActive ? 'btn-primary' : 'btn-secondary']">
            {{ planet }}
        </button>
    `,
    methods: {
        planet_select: function () {
            this.isActive = !this.isActive;
        }
    },
    mounted() {
        this.isActive = LsManager.get_value( 'owned_planets', this.planet );
    },
    watch: {
        isActive(newStatus) {
            LsManager.set_value( 'owned_planets', this.planet, newStatus );
        }
    }
});