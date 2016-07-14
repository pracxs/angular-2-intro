// borrowed one from Julie Ralph repo ng2-test-seed and "Two Fucking Developers: Testing Angular 2 with Karma and Jasmine" article

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {}

// standard systemjs.config.js with base/dist for specs

var map = {
    'app':                        'base/dist', // 'app',
    'rxjs':                       'base/node_modules/rxjs',
    //'angular2-in-memory-web-api': 'base/node_modules/angular2-in-memory-web-api',
    '@angular':                   'base/node_modules/@angular',
    'symbol-observable':          'base/node_modules/symbol-observable'
}

var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    // 'angular2-in-memory-web-api': { defaultExtension: 'js' },
    // extra package with specs and our .ts files
    'base/dist': {
        defaultExtension: 'js',
        format: 'register',
        map: Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, {})
    }
}

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade',
    '@angular/forms',
    'symbol-observable'
]

packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' }
})

var config = {
    map: map,
    packages: packages
}

// filterSystemConfig - index.html's chance to modify config before we register it.
// if (global.filterSystemConfig) { global.filterSystemConfig(config) }

System.config(config)

// load browser adapter

System.import('@angular/platform-browser/src/browser/browser_adapter')
    .then(function(browser_adapter) { browser_adapter.BrowserDomAdapter.makeCurrent() })
    .then(function() { return Promise.all(resolveTestFiles()) })
    .then(
        function() { 
            __karma__.start() 
        }, function(error) { 
            __karma__.error(error.stack || error) 
        })

function createPathRecords(pathsMapping, appPath) {
    // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
    var pathParts = appPath.split('/')
    var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/')
    //console.log(moduleName)
    moduleName = moduleName.replace(/\.js$/, '')
    pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]
    return pathsMapping
}

function onlyAppFiles(filePath) {
    return /\/base\/dist\/(?!.*\.spec\.js$).*\.js$/.test(filePath)
}

function onlySpecFiles(path) {
    return /\.spec\.js$/.test(path)
}

function resolveTestFiles() {
    return Object.keys(window.__karma__.files)  // All files served by Karma.
        .filter(onlySpecFiles)
        .map(function(moduleName) {
            // loads all spec files via their global module names (e.g.
            // 'base/dist/vg-player/vg-player.spec')
            return System.import(moduleName)
        })
}
