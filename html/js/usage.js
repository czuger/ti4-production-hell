Vue.component("tab-usage", {
    computed: {
        usablePlanets: function () {
            return LsManager.get_selected_items( 'ownedPlanets' ).sort();
        }
    },
    template: `
    <div>
        <div v-for="planet in usablePlanets">
            <usable-planet v-bind:planet="planet"></usable-planet>        
        </div>                           
        <other-options></other-options>
    </div>
`
});

Vue.component("other-options", {
    data() {
        return {
            sarween_tools: false,
            improved_dock: false
        };
    },
    template: `
        <div>
            <div class="row mt-3">
                <div class="col-12">
                    <button type="button" class="btn btn-block" @click="swapTools()" v-bind:class="[sarween_tools ? 'btn-warning' : 'btn-secondary']">
                        {{ $t( 'message.sarween_tools' ) }}
                    </button>
                </div>
            </div>
           <div class="row mt-3">
                <div class="col-12">
                    <button type="button" class="btn btn-block" @click="swapDock()" v-bind:class="[improved_dock ? 'btn-warning' : 'btn-secondary']">
                        {{ $t( 'message.improved_dock' ) }}
                    </button>
                </div>
            </div>        
        </div>
    `,
    methods: {
        swapTools: function () {
            this.sarween_tools = !this.sarween_tools;
        },
        swapDock: function () {
            this.improved_dock = !this.improved_dock;
        }

    },
    mounted() {
        this.sarween_tools = LsManager.get_value( 'sarweenTools', 'own' );
        this.improved_dock = LsManager.get_value( 'improvedDock', 'own' );
    },
    watch: {
        sarween_tools(newStatus) {
            LsManager.set_value( 'sarweenTools', 'own', newStatus );
        },
        improved_dock(newStatus) {
            LsManager.set_value( 'improvedDock', 'own', newStatus );
        }
    }
});

Vue.component("usable-planet", {
    props: ['planet'],
    data() {
        return {
            planetEngaged: true,
            hasDock: false,
            localPlanetsProductionValue: planetsProductionValue
        };
    },
    template: `
        <div class="row mt-3">
            <div class="col-9">
                <button type="button" class="btn btn-block" @click="planetEngage()" v-bind:class="[planetEngaged ? 'btn-primary' : 'btn-secondary']">
                    {{ planet }}
                    {{ planet + ' (' + localPlanetsProductionValue[ planet ] + ')' }}
                </button>
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-block" @click="setDock()" v-bind:class="[hasDock ? 'btn-warning' : 'btn-secondary']">
                    {{ hasDock ? 'Dock' : $t('message.nothing') }}
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