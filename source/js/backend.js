'use strict';

(function () {
  const URL_LOAD = 'https://reqres.in/api/unknown?per_page=12';

  window.backend = {
    load: function (onLoad) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();
