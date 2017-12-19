# CS Global Regulation Protocol Application

## Prerequisite
> [node >= 8.0 and npm >= 5.3](https://nodejs.org/en/download/)
> [angular-cli >= 1.5](https://github.com/angular/angular-cli#installation)

!!! Note: this project uses the `node-sass` npm package, which, on windows machines requires the [`node-gyp` prerequisites](https://github.com/nodejs/node-gyp#on-windows).

Install all dependencies by running `npm install` in project's root folder.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Lint
Run `ng lint` for linting.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Environment configuration files
Please find the env configuration files located in `src/environments/`, as follows:
> `environment.ts` config file for development environment
> `environment.prod.ts` config file for production environment

The available configurations are:
> `production` sets current environment as production or not
> `api` Mock urls for the api (locations to json files, as of this moment)
> `mapsApiKey` The google maps api key to use in the application. It is required in api v3. Check [here](https://developers.google.com/maps/documentation/javascript/get-api-key) to see how to get one.

Before building for production, please make sure you have all necessary configurations set in `src/environments/environment.prod.ts`.
If nothing is set there, the default values will come from the development configuration file `src/environments/environment.ts`.

***Note*** There's a deprecation notice while building for production. This issue has already been raised on angular-cli's page: https://github.com/angular/angular-cli/issues/8598, it will probably be updated within the next version. 

## 3rd party libraries used
> [bootstrapV4](http://getbootstrap.com/)
> [normalize.css](https://necolas.github.io/normalize.css/)
> [ng-bootstrap](https://ng-bootstrap.github.io/)
> [SortableJS](https://github.com/rubaxa/Sortable)
> [MarkerClustererPlus](https://github.com/googlemaps/v3-utility-library/tree/master/markerclustererplus)
> [InfoBox](https://github.com/googlemaps/v3-utility-library/tree/master/infobox)

## CSS validation
> [`appearance`](http://caniuse.com/#search=appearance) This is needed to customize the input, no other way to do it.
> [`pointer-events`](http://caniuse.com/#search=pointer-events) Pointer events is fully supported, the validator will throw error, but it isn't an actual css problem.
> The warnings & errors are from `normalize.css` that tries to make all inputs/elements look the same in every browser, and from `bootstrap.css` .

## Deploying to heroku
Make sure you have latest Heroku CLI installed:
``` sh
$ npm install -g heroku-cli
```

Login to heroku:
``` sh
$ heroku login
```

Create the heroku application:
``` sh
$ heroku apps:create <application-name>
```
Replace `<application-name>` with the name of the application you'd like. eg:
``` sh
$ heroku apps:create admin-pages-ui
```

$ cd my-project/
$ git init
$ heroku git:remote -a admin-pages-ui
Deploy your application

Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

See your running app at `https://<application-name>.heroku.com`, in the given example it would be: `https://admin-pages-ui.herokuapp.com/`, or simply open it by running:
``` sh
$ heroku open
```
