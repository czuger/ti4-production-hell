let language = window.navigator.userLanguage || window.navigator.language;
let locale = null;

if( language ){
    language = language.substring( 0, 2 );

    if( language == 'fr' ){
        locale = 'fr';
    }
    else
    {
        locale = 'en';
    }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: locale, // set locale
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
