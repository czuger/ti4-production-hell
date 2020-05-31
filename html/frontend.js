Vue.component("tab-production", {
    template: "<div>Production component</div>"
});
Vue.component("tab-usage", {
    template: "<div>Usage component</div>"
});
Vue.component("tab-empire", {
    template: "<div>Empire component</div>"
});
Vue.component("tab-faction", {
    template: "<div>Faction component</div>"
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