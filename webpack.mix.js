const mix = require("laravel-mix");

mix.sass("assets/scss/main.scss", "static/css")
    .sourceMaps();
mix.react("assets/js/index.js", "static/js/index.js")
    .sourceMaps();

mix.version();
mix.disableNotifications();