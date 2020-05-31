main = function() {

    Vue.component("tab-production", {
        template: "<div>Production component</div>"
    });
    Vue.component("tab-usage", {
        template: "<div>Usage component</div>"
    });
// Vue.component("tab-empire", {
// });
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
            if (localStorage.isActiveHash) {

                const _ls = JSON.parse( localStorage.isActiveHash );

                // console.log( _ls );

                if( _ls[ this.faction ] ){
                    this.isActive = _ls[ this.faction ];
                }
            }
        },
        watch: {
            isActive(newStatus) {
                console.log( newStatus );

                if( localStorage.isActiveHash ){
                    var _ls = localStorage.isActiveHash;
                }else{
                    var _ls = "{}"
                }

                _ls = JSON.parse( _ls );
                _ls[ this.faction ] = newStatus;

                localStorage.isActiveHash = JSON.stringify(_ls);
            }
        }

    });


    new Vue({
        el: "#production-hell",
        data: {
            currentTab: "Faction",
            tabs: ["Production", "Usage", "Empire", "Faction"]
        },
        computed: {
            currentTabComponent: function() {
                return "tab-" + this.currentTab.toLowerCase();
            }
        }
    });
};

$(function() {
    main();
});