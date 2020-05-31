Vue.component("tab-faction", {
    data: function () {
        return {
            factions: ["Arborec","Creuss","Hacan","Jol-Nar","L1Z1X","Letnev","Mentak","Muaat","Naalu","Nekro Virus","Saar","Sardakk N'orr","Sol","Winnu","Xxcha","Yin","Yssaril"]
        }
    },
    template: `
    <div>
        <div class="row mt-3" v-for="faction in factions">
            <div class="col">
                <faction-element v-bind:faction="faction"></faction-element>
            </div>
        </div>                   
    </div>
`
});

Vue.component("faction-element", {
    props: ['faction'],
    data() {
        return {
            isActive: false
        };
    },
    template: `
        <button type="button" class="btn btn-block" @click="faction_select(faction)" v-bind:class="[isActive ? 'btn-primary' : 'btn-secondary']">
            {{ faction }}
        </button>
`,
    methods: {
        faction_select: function (faction) {
            this.isActive = !this.isActive;
        }
    },
    mounted() {
        this.isActive = LsManager.get_value( 'factions', this.faction );
    },
    watch: {
        isActive(newStatus) {
            LsManager.set_value('factions', this.faction, newStatus);
        }
    }

});