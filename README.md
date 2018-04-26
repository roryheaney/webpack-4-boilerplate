# Rory Heaney - Webpack 4 Boilerplate

## Requirements

| Prerequisite    | How to check | MISC
| --------------- | ------------ | ------------- |
| install [NVM](https://github.com/coreybutler/nvm-windows)   | `nvm list`     | in the CMD promt, you'll see your NODE versions availble or already isntalled |
| NVM install 8.9.4  | `nvm install 8.9.4`    | this will take care of both your NODE & NPM version |
| NVM = 8.9.4    | `nvm use 8.9.4`    | this will take care of both your NODE & NPM version |


## Features

* Latest Version of [WebPack 4](https://github.com/webpack/webpack), (currently 4.6.0 at this commit)
* CSS injecting
* JS SPLITCHUNKS in production
* Webpack Modes ran in the command line instead of in the CONFIG
* eslint basic set up
* babel
* stylelint
* starter assets folder for reference and demo building
* ZURB XY GRID

## From the command line
* dev: `npm run dev` : basic package compilation and ouput (WEBPACK MODE DEVELOPMENT)
* watch: `npm run watch` : basic package compilation and ouput (WEBPACK MODE DEV) + watching
* prod: `npm run prod` : production asset building / minification / uglify (WEBPACK MODE PRODUCTION)


## Get Started
* make sure **NVM** is set to **8.9.4**
* from the command line, run `npm install` in your working directory
* in **build/webpack.config.js** update the **BrowserSyncPlugin PROXY** to your corresponding local URL
* in **build/webpack.config.js** update the **BrowserSyncPlugin FILES > MATCH** to your corresponding html/php/etc
* you can then run `npm run dev` just to make sure everything is building, or dive right into working with `npm run watch`


## MISC (looking into / working on / etc)
* css injecting works after the 2nd or 3rd save of your SCSS files, this is being looking to (js of course reloads the page)

## Documenation
* package references / helpful notes coming soon - ish
