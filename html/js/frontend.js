Vue.component("tab-production", {
    template: "<div>Production component</div>"
});

new Vue({
    el: "#production-hell",
    data: {
        currentTab: "Empire",
        tabs: ["Production", "Usage", "Empire", "Faction"]
    },
    computed: {
        currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
        },
    }
});
