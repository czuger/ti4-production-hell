

Vue.component("tab-production", {
    data: function () {
        return {
            available_outputs: ["Infanterie","Chasseurs","Destroyers","Croiseurs","Transporteurs","Cuirassés","Vaisseau amiral","Soleil de guerre"],
            total_produced_units: 0
        }
    },
    computed: {
        usable_planets: function () {
            return LsManager.get_selected_items('owned_planets');
        }
    },
    methods: {
        onUpdateProduction: function () {
            var amount = 0;
            $('.produced_units').each(function(){
                amount += parseInt($(this).val());
            });

            this.total_produced_units = amount;
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="output in available_outputs">
            <div class="col-8">{{ output }}</div>
            <div class="col">
                <!--The event catcher has to be on the component caller-->
                <available-output v-bind:output_type="output" v-on:update-production="onUpdateProduction"></available-output>
            </div>
        </div>                           
        <div class="row mt-3">
            <div class="col-8">Nombre d'unités</div>
            <div class="col">
                {{ total_produced_units }}
            </div>
        </div>                           
        
    </div>
`
});

Vue.component("available-output", {
    props: ['output_type'],
    data() {
        return {
            amount: 0
        };
    },
    template: `
        <!--The event name you send has to be Kebab case, Camel case won't work-->
        <input class="produced_units" type="number" v-model="amount" v-on:change="$emit('update-production')">
    `,
    methods: {
        planet_engage: function () {
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