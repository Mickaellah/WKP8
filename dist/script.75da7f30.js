// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
var songs = [{
  title: 'Santimaka',
  artist: 'Mr Sayd',
  style: 'Pop',
  length: '03:55',
  picture: 'https://i1.sndcdn.com/artworks-000250917292-7gecrq-t500x500.jpg',
  id: 1598082946292
}, {
  title: 'Tsy avelako ho nofy',
  artist: 'Skaiz',
  style: 'Slow',
  length: '03:40',
  picture: 'https://tononkira.serasera.org/media/tononkira/o/skaiz.jpg',
  id: 1598082974091
}, {
  title: 'Chantal',
  artist: 'Tsy avelako',
  style: 'Slow',
  length: '03:35',
  picture: 'https://i.ytimg.com/vi/3r3_fclSHZw/hqdefault.jpg',
  id: 1598082974019
}, {
  title: 'Mafy orina',
  artist: 'Johane',
  style: 'Slow',
  length: '04:15',
  picture: 'https://tononkira.serasera.org/media/tononkira/o/images5.jpg',
  id: 1598082974190
}]; // Grab some elements that might be needed.

var form = document.querySelector('.music_form');
var listOfSongs = document.querySelector('.song_lists');
var addBttn = document.querySelector('.addBtn');
var search = document.querySelector('#search');
var musicStyle = document.querySelector('#styles');
var reseteButton = document.querySelector('.resetBtn'); // A function which generate the objects into html.

var songList = function songList() {
  var html = songs.map(function (song) {
    return "\n        <li class=\"list_item\">\n            <ul class=\"lists\">\n                <li><img src=\"".concat(song.picture, "\" alt=\"Artist's image\"></li>\n                <li>").concat(song.title, " <br>\n                    <small>").concat(song.style, "</small>\n                </li>\n                <li>").concat(song.artist, " <br>\n                    <small>").concat(song.length, "</small>\n                </li>\n                <li class=\"score\" onclick={increase()}>SCORE: 0</li>\n                <li>\n                    <button class=\"add\" type=\"button\">\n                        +1\n                    </button>\n                </li>\n                <li>\n                    <button class=\"deleteBtn\">\n                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\" fill=\"#747474\"/>\n                        </svg>\n                    </button>\n                </li>\n            </ul>\n        </li>\n    ");
  }).join('');
  listOfSongs.insertAdjacentHTML('beforeend', html);
};

songList(); // listOfSongs.dispatchEvent(new CustomEvent('itemUpdated'));
// A function for the submit button.

var addSong = function addSong(e) {
  e.preventDefault();
  var forms = e.currentTarget;
  var newSong = {
    title: forms.title.value,
    artist: forms.artist.value,
    style: forms.style.value,
    length: forms.length.value,
    picture: forms.picture.value,
    id: Date.now()
  };
  songs.push(newSong); // listOfSongs.dispatchEvent(new CustomEvent('itemUpdated'));

  songList();
  forms.reset();
}; // Handle +1 button


var handleClick = function handleClick(e) {
  var increment = e.target.closest('button.add');

  if (increment) {
    var counter = 0;
    counter++;
    document.querySelector('.score').innerHTML += counter;
    songList();
  }
}; // A function for finding a song by its title.


var findSongByTitle = function findSongByTitle() {
  var findSong = songs.find(function (song) {
    return song.title === songs.title;
  });
  console.log(findSong);
  var html = songs.map(function (song) {
    return "\n        <li class=\"list_item\">\n            <ul class=\"lists\">\n                <li><img src=\"".concat(song.picture, "\" alt=\"Artist's image\"></li>\n                <li>").concat(song.title, " <br>\n                    <small>").concat(song.style, "</small>\n                </li>\n                <li>").concat(song.artist, " <br>\n                    <small>").concat(song.length, "</small>\n                </li>\n                <li class=\"score\" onclick={increase()}>SCORE: 0</li>\n                <li>\n                    <button class=\"add\" type=\"button\">\n                        +1\n                    </button>\n                </li>\n                <li>\n                    <button class=\"deleteBtn\">\n                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\" fill=\"#747474\"/>\n                        </svg>\n                    </button>\n                </li>\n            </ul>\n        </li>\n        ");
  }).join('');
  listOfSongs.innerHTML = html;
}; // To filter the songs by which style you choose from the dropdown.


var filteredByStyle = function filteredByStyle(id) {
  var filteredSong = [].concat(songs);
  filteredSong = filteredSong.filter(function (song) {
    return song.id === id;
  });
  var html = filteredSong.map(function (song) {
    return "\n        <li class=\"list_item\">\n            <ul class=\"lists\">\n                <li><img src=\"".concat(song.picture, "\" alt=\"Artist's image\"></li>\n                <li>").concat(song.title, " <br>\n                    <small>").concat(song.style, "</small>\n                </li>\n                <li>").concat(song.artist, " <br>\n                    <small>").concat(song.length, "</small>\n                </li>\n                <li class=\"score\" onclick={increase()}>SCORE: 0</li>\n                <li>\n                    <button class=\"add\" type=\"button\">\n                        +1\n                    </button>\n                </li>\n                <li>\n                    <button class=\"deleteBtn\">\n                        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\" fill=\"#747474\"/>\n                        </svg>\n                    </button>\n                </li>\n            </ul>\n        </li>\n        ");
  }).join('');
  listOfSongs.innerHTML = html;
}; // Sort the element ny its score.


var sortElement = function sortElement() {
  var sortedElement = songs.map().document.querySelector('.score').sort(function (a, b) {
    return b - a;
  });
}; // Event listeners.


form.addEventListener('submit', addSong);
listOfSongs.addEventListener('click', handleClick);
search.addEventListener('keydown', findSongByTitle);
musicStyle.addEventListener('change', filteredByStyle); // An event listener for the reset button.

reseteButton.addEventListener('click', function (e) {
  songList();
}); // Event delegation for delete button.

window.addEventListener('click', function (e) {
  if (e.target.closest('button.deleteBtn')) {
    var parentElement = e.target.closest('.list_item');
    var childElement = e.target.closest('.lists');
    parentElement.removeChild(childElement);
  }
});
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49855" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map