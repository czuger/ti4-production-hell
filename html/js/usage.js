Vue.component("tab-usage", {
    computed: {
        usable_planets: function () {
            return LsManager.get_selected_items( 'owned_planets' );
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="planet in usable_planets">
            <div class="col">
                <usable-planet v-bind:planet="planet"></usable-planet>
            </div>
        </div>                           
    </div>
`
});

Vue.component("usable-planet", {
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
        this.isActive = LsManager.get_value( 'used_planets', this.planet );
    },
    watch: {
        isActive(newStatus) {
            LsManager.set_value( 'used_planets', this.planet, newStatus );
        }
    }
});