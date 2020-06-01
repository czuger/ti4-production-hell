Vue.component("tab-usage", {
    computed: {
        usablePlanets: function () {
            return LsManager.get_selected_items( 'owned_planets' );
        }
    },
    template: `
    <div>
        <div v-for="planet in usablePlanets">
            <usable-planet v-bind:planet="planet"></usable-planet>        
        </div>                           
    </div>
`
});

Vue.component("usable-planet", {
    props: ['planet'],
    data() {
        return {
            planetEngaged: true,
            hasDock: false
        };
    },
    template: `
        <div class="row mt-3">
            <div class="col-9">
                <button type="button" class="btn btn-block" @click="planetEngage()" v-bind:class="[planetEngaged ? 'btn-primary' : 'btn-secondary']">
                    {{ planet }}
                </button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-block" @click="setDock()" v-bind:class="[hasDock ? 'btn-warning' : 'btn-secondary']">
                    {{ hasDock ? 'Dock' : 'Rien' }}
                </button>
            </div>                
        </div>
    `,
    methods: {
        planetEngage: function () {
            this.planetEngaged = !this.planetEngaged;
        },
        setDock: function () {
            this.hasDock = !this.hasDock;
        }
    },
    mounted() {
        this.planetEngaged = LsManager.get_value( 'engagedPlanets', this.planet );
        this.hasDock = LsManager.get_value( 'hasDock', this.planet );
    },
    watch: {
        planetEngaged(newStatus) {
            LsManager.set_value( 'engagedPlanets', this.planet, newStatus );
        },
        hasDock(newStatus) {
            LsManager.set_value( 'hasDock', this.planet, newStatus );
        }

    }
});