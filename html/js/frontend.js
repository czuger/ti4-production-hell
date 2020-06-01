new Vue({
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
