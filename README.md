responsive-ECEProject
=====================

Project for the Responsive Design class at ECE Paris.

# Quickstart

Clone this project and then move into it:
```bash
git clone https://github.com/theofidry/responsive-ECEProject.git
cd responsive-ECEProject
```

Install Node.js: [link](http://nodejs.org/).

Install dependencies:
```bash
npm install
``

Install [Grunt](http://gruntjs.com/):
```bash
npm install -g grunt
```

Build assets:
```bash
grunt build
```

Now just serve the `public` folder as the web root.

# Development

## Layout

```
•
└── app
    ├── assets
    |   ├── css   # CSS files
    |   ├── img   # images
    |   └── js    # JavaScript files
    └── public    # view
```

All files are concatenated and minifyed to optimise the application.

## Grunt tasks

Main tasks:

* `grunt clean`: clean build directory
* `grunt watch`: watcher to compile css, js, images, views on change
* `grunt css`: concatenate CSS files
* `grunt css-prod`: concatenate and minify CSS files
* `grunt html`: copy content of `app/public` folder
* `grunt html-prod`: copy content of `app/public` folder and minify html files
* `grunt img`: copy images
* `grunt img-prod`: copy and compress images
* `grunt js`: concatenate JS files
* `grunt js-prod`: concatenate and minify JS files
* `grunt`: compile everything in dev mode
* `grunt build`: compile everything in production mode
* `grunt start`: convenience for `build` + `watch`
* `grunt server`: start static server on port 1337

# Contributors

* [Théo FIDRY](https://github.com/theofidry)
* Sacha MASSON
* Martin LEGRIS

# License

Copyright © 2014, [Théo FIDRY](https://github.com/theofidry), ISC License.
