// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});

new Vue({
    i18n,
    el: "#production-hell",
    data: {
        currentTab: "Production",
        tabs: ["Production", "Usage", "Empire", "Faction"]
    },
    computed: {
        currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
        },
    }
});
