const { description } = require("../../package");

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: "Wordpress Notes",
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        [
            "meta",
            {
                name: "theme-color",
                content: "#3eaf7c",
            },
        ],
        [
            "meta",
            {
                name: "apple-mobile-web-app-capable",
                content: "yes",
            },
        ],
        [
            "meta",
            {
                name: "apple-mobile-web-app-status-bar-style",
                content: "black",
            },
        ],
    ],

    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: "",
        editLinks: false,
        docsDir: "",
        editLinkText: "",
        lastUpdated: false,
        nav: [
            {
                text: "Guides",
                link: "/guides/",
            },
            {
                text: "Tips",
                link: "/tips/",
            },
        ],
        sidebar: {
            "/guides/": [
                {
                    title: "Guides",
                    collapsable: false,
                    children: [
                        "",
                        "child-theme-support",
                        "develop-theme",
                        "create-plugin",
                        "create-wp-plugin-with-vue",
                        "api-integration",
                        "create-widget",
                        "wpml",
                        "elementor",
                    ],
                },
            ],
            "/tips/": [
                {
                    title: "Tips",
                    collapsable: false,
                    children: [
                        "",
                        "json-print-pretty",
                        "add-widget-everywhere",
                    ],
                },
            ],
        },
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        "@vuepress/plugin-back-to-top",
        "@vuepress/plugin-medium-zoom",
        [
            "flexsearch",
            {
                /*
        Plugin custom options
      */
                maxSuggestions: 10, // how many search suggestions to show on the menu, the default is 10.
                searchPaths: ["path1", "path2"], // an array of paths to search in, keep it null to search all docs.
                searchHotkeys: ["s"], // Hot keys to activate the search input, the default is "s" but you can add more.
                searchResultLength: 60, // the length of the suggestion result text by characters, the default is 60 characters.
                /*
        Default FlexSearch options
        To override the default options you can see available options at https://github.com/nextapps-de/flexsearch
      */
                search_options: {
                    encode: "icase",
                    tokenize: "forward",
                    resolution: 9,
                    doc: {
                        id: "key",
                        field: ["title", "content", "headers"],
                    },
                },
            },
        ],
    ],
};
