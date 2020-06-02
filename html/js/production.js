// Had strange issues with unitsCost in data() function. So I keep all big hash outside.
// Except availableUnits because it is required by vue to have it in data()

const unitsCost = { 'inf': 0.5, 'fig': 0.5, 'des': 1, 'cru': 2, 'car': 3, 'dread': 4, 'flag': 8, 'sun': 12 };
const planetsInSameSystem = {"Abyz":["Abyz","Fria"],"Fria":["Abyz","Fria"],"Arinam":["Arinam","Meer"],"Meer":["Arinam","Meer"],"Arnor":["Arnor","Lor"],"Lor":["Arnor","Lor"],"Bereg":["Bereg","Lirta IV"],"Lirta IV":["Bereg","Lirta IV"],"Centauri":["Centauri","Gral"],"Gral":["Centauri","Gral"],"Coorneeq":["Coorneeq","Resculon"],"Resculon":["Coorneeq","Resculon"],"Dal Bootha":["Dal Bootha","XXehan"],"XXehan":["Dal Bootha","XXehan"],"Lazar":["Lazar","Sakulag"],"Sakulag":["Lazar","Sakulag"],"Lodor":["Lodor"],"Mecatol Rex":["Mecatol Rex"],"Mehar Xull":["Mehar Xull"],"Mellon":["Mellon","Zohbat"],"Zohbat":["Mellon","Zohbat"],"New Albion":["New Albion","Starpoint"],"Starpoint":["New Albion","Starpoint"],"Quann":["Quann"],"Qucen'n":["Qucen'n","Rarron"],"Rarron":["Qucen'n","Rarron"],"Saudor":["Saudor"],"Tar'Mann":["Tar'Mann"],"Tequ'ran":["Tequ'ran","Torkan"],"Torkan":["Tequ'ran","Torkan"],"Thibah":["Thibah"],"Vefut II":["Vefut II"],"Wellon":["Wellon"],"Nestphar":["Nestphar"],"Creuss":["Creuss"],"Hercant":["Hercant","Arretze","Kamdorn"],"Arretze":["Hercant","Arretze","Kamdorn"],"Kamdorn":["Hercant","Arretze","Kamdorn"],"Jol":["Jol","Nar"],"Nar":["Jol","Nar"],"[0.0.0]":["[0.0.0]"],"Arc Prime":["Arc Prime","Wren Terra"],"Wren Terra":["Arc Prime","Wren Terra"],"Moll Primus":["Moll Primus"],"Muuat":["Muuat"],"Druaa":["Druaa","Maaluuk"],"Maaluuk":["Druaa","Maaluuk"],"Mordai II":["Mordai II"],"Lisis II":["Lisis II","Ragh"],"Ragh":["Lisis II","Ragh"],"Tren'Lak":["Tren'Lak","Quinarra"],"Quinarra":["Tren'Lak","Quinarra"],"Jord":["Jord"],"Winnu":["Winnu"],"Archon Wren":["Archon Wren","Green Archon Tau"],"Green Archon Tau":["Archon Wren","Green Archon Tau"],"Darien":["Darien"],"Retillion":["Retillion","Shalloq"],"Shalloq":["Retillion","Shalloq"]};
const planetsProductionValue = {"Abyz":3,"Fria":2,"Arinam":1,"Meer":0,"Arnor":2,"Lor":1,"Bereg":3,"Lirta IV":2,"Centauri":1,"Gral":1,"Coorneeq":1,"Resculon":2,"Dal Bootha":0,"XXehan":1,"Lazar":1,"Sakulag":2,"Lodor":3,"Mecatol Rex":1,"Mehar Xull":1,"Mellon":0,"Zohbat":3,"New Albion":1,"Starpoint":3,"Quann":2,"Qucen'n":1,"Rarron":0,"Saudor":2,"Tar'Mann":1,"Tequ'ran":2,"Torkan":0,"Thibah":1,"Vefut II":2,"Wellon":1,"Nestphar":3,"Creuss":4,"Hercant":1,"Arretze":2,"Kamdorn":0,"Jol":1,"Nar":2,"[0.0.0]":5,"Arc Prime":4,"Wren Terra":2,"Moll Primus":4,"Muuat":4,"Druaa":3,"Maaluuk":0,"Mordai II":4,"Lisis II":1,"Ragh":2,"Tren'Lak":1,"Quinarra":3,"Jord":4,"Winnu":3,"Archon Wren":2,"Green Archon Tau":1,"Darien":4,"Retillion":2,"Shalloq":1};

Vue.component("tab-production", {
    data: function () {
        return {
            availableUnits: [ 'inf', 'fig', 'des', 'cru', 'car', 'dread', 'flag', 'sun' ],
            producedUnits: { 'inf': 0, 'fig': 0, 'des': 0, 'cru': 0, 'car': 0, 'dread': 0, 'flag': 0, 'sun': 0 },
            totalProducedUnits: 0,
            totalCost: 0,
            selectedDock: null,
            localPlanetsProductionValue: planetsProductionValue
        }
    },
    computed: {
        usable_planets: function () {
            return LsManager.get_selected_items('owned_planets');
        },
        availableDock: function (){
            return LsManager.get_selected_items('hasDock');
        },
        maxUnits: function (){
            var dockList = LsManager.get_selected_items('hasDock');
            var planetsInSystem = planetsInSameSystem[ this.selectedDock ];
            var docks = _.intersection(dockList, planetsInSystem);

            var result = 0;

            const hasImprovedDock = LsManager.get_value( 'improvedDock', 'own' );
            const dockProductionValue = hasImprovedDock ? 4 : 2;

            for( var dock of docks ){
                result += ( planetsProductionValue[ dock ] + dockProductionValue )
            }

            return result;
        },
        maxProduction: function (){
            const empire = LsManager.get_selected_items('ownedPlanets');
            const engagedPlanets = LsManager.get_selected_items('engagedPlanets');

            const usablePlanets = _.difference(empire, engagedPlanets);

            var result = 0;

            for( var planet of usablePlanets ){
                result += ( planetsProductionValue[ planet ] )
            }

            return result;
        }

    },
    methods: {
        onUpdateProduction: function (_data) {
            // console.log( 'update' );
            console.log( _data );

            var totalAmount = 0
            var totalCost = 0;

            let unit, new_amount;
            [ unit, new_amount ] = _data
            this.producedUnits[ unit ] = new_amount;

            for (let [unit, amount] of Object.entries(this.producedUnits)) {
                totalAmount += amount;

                const unitCost = unitsCost[ unit ];
                const cost = unitCost * amount;

                totalCost += cost;
            }

            const hasSarweenTools = ( LsManager.get_value( 'sarweenTools', 'own' ) === true );
            if( hasSarweenTools && totalCost > 0 ){
                totalCost -= 1;
            }

            this.totalProducedUnits = totalAmount;
            this.totalCost = Math.ceil( totalCost );
        }
    },
    template: `
    <div>
        <label for="select-dock-id" class="mt-1">
            {{ $t( 'message.choose_dock' ) }}
        </label>
        <select v-model="selectedDock" class="form-control" id="select-dock-id">
          <option v-for="dock in availableDock" v-bind:value="dock">
            {{ dock + ' (' + localPlanetsProductionValue[ dock ] + ')' }}
          </option>
        </select>
        <div class="row mt-3" v-for="unit in availableUnits">
            <div class="col-6">{{ $t( 'message.' + unit ) }}</div>
            <div class="col">
                <!--The event catcher has to be on the component caller-->
                <available-output v-bind:unitType="unit" v-on:update-production="onUpdateProduction"></available-output>
            </div>
        </div>                           
        <div class="row mt-3">
            <div class="col">
                <button type="button" class="btn btn-block" v-bind:class="[totalProducedUnits <= maxUnits ? 'btn-success' : 'btn-danger']">
                    {{ $t( 'message.units_number' ) }}
                    <span class="badge badge-light">{{ totalProducedUnits }}</span>
                    /
                    <span class="badge badge-light">{{ maxUnits }} </span>
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <button type="button" class="btn btn-block" v-bind:class="[totalCost <= maxProduction ? 'btn-success' : 'btn-danger']">
                    {{ $t( 'message.total_cost' ) }}
                    <span class="badge badge-light">{{ totalCost }}</span>
                    /
                    <span class="badge badge-light">{{ maxProduction }} </span>
                </button>
            </div>
        </div>                           
    </div>
`
});

Vue.component("available-output", {
    props: ['unitType'],
    data() {
        return {
            amount: 0
        };
    },
    methods: {
        onAdd: function (_ut) {
            this.amount += 1;
            this.$emit('update-production', [_ut, this.amount] );
        },
        onRemove: function (_ut) {
            this.amount -= 1;
            if( this.amount < 0){ this.amount = 0; }
            this.$emit('update-production', [_ut, this.amount] );
        }
    },
    template: `
        <div>
            <button class="btn btn-danger" @click="onRemove(unitType)">
            -
            </button>
            <!--The event name you send has to be Kebab case, Camel case won't work-->
            <!--<input class="produced_units" v-bind:unit_name="this.unitType" type="number" v-model="amount" v-on:change="$emit('update-production')">-->
            <button class="btn btn-light">
            {{ amount }}
            </button>
            <button class="btn btn-success" @click="onAdd(unitType)">
            +
            </button>
        </div>
    `
});