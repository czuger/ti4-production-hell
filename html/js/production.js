Vue.component("tab-production", {
    data: function () {
        return {
            available_outputs: ["Infanterie","Chasseurs","Destroyers","Croiseurs","Transporteurs","Cuirassés","Vaisseau amiral","Soleil de guerre"]
        }
    },
    computed: {
        usable_planets: function () {
            return LsManager.get_selected_items( 'owned_planets' );
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="output in available_outputs">
            <div class="col">
                <available-output v-bind:output="output"></available-output>
            </div>
        </div>                           
    </div>
`
});

Vue.component("available-output", {
    props: ['output'],
    data() {
        return {
            isActive: false
        };
    },
    template: `
        <button type="button" class="btn btn-block" v-bind:class="[isActive ? 'btn-primary' : 'btn-secondary']">
            {{ output }}
        </button>
    `,
    methods: {
        planet_select: function () {
            this.isActive = !this.isActive;
        }
    },
    mounted() {
        this.isActive = LsManager.get_value( 'outputs', this.planet );
    },
    watch: {
        isActive(newStatus) {
            LsManager.set_value( 'outputs', this.planet, newStatus );
        }
    }
});