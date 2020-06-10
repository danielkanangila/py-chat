const mix = require("laravel-mix");

mix.sass("assets/scss/main.scss", "static/css")
    .sourceMaps();
mix.react("assets/js/index.js", "static/js/index.js")
    .sourceMaps();
mix.browserSync("localhost:5000");

mix.version();
mix.disableNotifications();