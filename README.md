Bloc Chat
========

### A real-time chat client app

Bloc chat is a chat application designed in AngularJS and stores the information in firebase.

Live Preview
---------
* Link

Credits
-------
Bloc Chat was written and designed by Sarah Binion while she attened Bloc's [Frontend Web Development Course](https://www.bloc.io/frontend-development-bootcamp).

Directory Structure
---------

```
├── Gruntfile.js
├── LICENSE
├── Procfile
├── README.md
├── app
│   ├── assets
│   │   └── images
│   │       └── bloc-logo-white.png
│	│
│   ├── pages
│   │   └── index.html
│	│
│   ├── scripts
│   │   └── angular-ui-router.js
│   │   └── angular.js
│   │   └── app.js
│   │   └── ui-bootstrap-tpls-0.14.3.js
│	│
│   ├── styles
│   │   └── angular.css
│   │   └── app.css
│   │   └── jasine-standalone-2.3.4.zip
│   │   └── main.css
│   │   └── normalize.css
│	│
│   └── templates
│       └── landing.html
│		└── myModalContent.html
├── package.json
└── server.js
```

Installation
---------

The project uses Grunt to run tasks in development. Thoroughly review our [resource on using Grunt](https://www.bloc.io/resources/using-grunt) before using this application. It may also help to review [our resource on NPM and `package.json` files](https://www.bloc.io/resources/npm-and-package-json).

Install the project dependencies by running:

```
$ npm install
```

Run the Application
---------

Run the application using the Gruntfile's `default` task:

```
$ grunt
```

The default task runs a simple server on port 3000. To view it in a any browser, go to [http://localhost:3000](http://localhost:3000).

>Note that unless the application is run [via Live Preview in Brackets](#use-in-brackets-live-preview), the browser will need to be refreshed to view the most recent changes.

![Screenshot of project settings URL in Brackets](https://bloc-global-assets.s3.amazonaws.com/images-frontend/screenshots/bloc-frontend-project-starter/live_preview_project_settings.png)

The text in the application will not update on every keystroke, but changes will automatically push when you save the file.

Grunt plugins
---------

A list of the Grunt plugins in this application.

#### Watch

[Grunt watch](https://github.com/gruntjs/grunt-contrib-watch) watches for changes to file content and then executes Grunt tasks when a change is detected.

#### Copy

[Grunt copy](https://github.com/gruntjs/grunt-contrib-copy) copies files from our development folders and puts them in the folder that will be served with the frontend of your application.

#### Clean

[Grunt clean](https://github.com/gruntjs/grunt-contrib-clean) "cleans" or removes all files in your distribution folder (`dist`) so that logic in your stylesheets, templates, or scripts isn't accidentally overridden by previous code in the directory.

#### Hapi

[Grunt Hapi](https://github.com/athieriot/grunt-hapi) runs a server using [`HapiJS`](http://hapijs.com/). Happy is a Node web application framework with robust configuration options.
