

Vue.component("tab-production", {
    data: function () {
        return {
            available_outputs: ["Infanterie","Chasseurs","Destroyers","Croiseurs","Transporteurs","Cuirassés","Vaisseau amiral","Soleil de guerre"],
            refreshSum: 1
        }
    },
    computed: {
        usable_planets: function () {
            return LsManager.get_selected_items( 'owned_planets' );
        },
        producedUnits: function() {
            var amount = 0;
            $('.produced_units').each(function(){
                amount += parseInt($(this).val());
            });

            console.log( amount );
            return amount;
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="output in available_outputs">
            <div class="col-8">{{ output }}</div>
            <div class="col">
                <available-output v-bind:output_type="output"></available-output>
            </div>
        </div>                           
        <div class="row mt-3">
            <div class="col-8">Nombre d'unités</div>
            <div class="col" v-on:refresh-sum="refreshSum += 1">
                {{ producedUnits }}
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
        <input class="produced_units" type="number" v-model="amount" v-on:change="$emit('refresh-sum')">
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