'use strict';

(function () {
  let content = document.querySelector('.content tbody');
  let itemTemplate = document.querySelector('#item')
    .content
    .querySelector('.item');

  let renderContent = function (item) {
    let contentItem = itemTemplate.cloneNode(true);
    contentItem.querySelector('.item__id').textContent = item.id;
    contentItem.querySelector('.item__name').textContent = window.util.toUpFirstLetter(item.name);
    contentItem.querySelector('.item__year').textContent = item.year;
    contentItem.querySelector('.item__color-square').style.backgroundColor = item.color;
    contentItem.querySelector('.item__color-hex').textContent = item.color;
    contentItem.querySelector('.item__value').textContent = item.pantone_value;

    return contentItem;
  };

  let renderContentList = function (d) {
    let dataArray = d.data;
    dataArray.forEach(function (el) {
      content.appendChild(renderContent(el));
    });

    let inputs = document.querySelectorAll('.header__input');
    let reset = document.querySelector('.table__reset');

    let idList = content.querySelectorAll('.td__id');
    let nameList = content.querySelectorAll('.td__name');
    let yearList = content.querySelectorAll('.td__year');
    let colorList = content.querySelectorAll('.td__color');
    let valueList = content.querySelectorAll('.td__value');

    let hideColumn = function (id) {
      switch (id) {
        case 'id':
          return idList.forEach(function (el) {
            el.classList.add('hidden');
          });
        case 'name':
          return nameList.forEach(function (el) {
            el.classList.add('hidden');
          });
        case 'year':
          return yearList.forEach(function (el) {
            el.classList.add('hidden');
          });
        case 'color':
          return colorList.forEach(function (el) {
            el.classList.add('hidden');
          });
        case 'value':
          return valueList.forEach(function (el) {
            el.classList.add('hidden');
          });
        default:
          return content.querySelectorAll('td').forEach(function (el) {
            el.classList.remove('hidden');
          });
      }
    }

    inputs.forEach(function (el) {
      el.addEventListener('change', function () {
        hideColumn(el.id);
        reset.disabled = false;
      });
    });

    reset.addEventListener('click', function () {
      hideColumn();
      reset.disabled = true;
      inputs.forEach(function (el) {
        el.checked = true;
      });
    })
  };

  window.backend.load(renderContentList);
})();
