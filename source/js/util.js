'use strict';

(function () {
  let toUpFirstLetter = function (string) {
    return string[0].toUpperCase() + string.slice(1);
  };

  window.util = {
    toUpFirstLetter: toUpFirstLetter
  };
})();
