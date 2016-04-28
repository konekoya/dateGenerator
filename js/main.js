var DateGenerator = (function() {

  var doc = document;
  var date = new Date();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth();
  var weekDayArr = ['一', '二', '三', '四', '五', '六', '日'];
  var len = '';
  var count = '';
  var span = '';
  var outPut = doc.querySelector('.output');
  var submitBtn = doc.querySelector('.submit-btn');
  var copyBtn = doc.querySelector('.copy-btn');
  var div = doc.createElement('div');
  var yearPicker = doc.querySelector('.year-picker');
  var monthPicker = doc.querySelector('.month-picker');


  function setBackground(config) {
    // temp solution, should come up a better and rubost one to replace this
    if (config) {
      return;
    }

    var colors = config.colors; // fallback color is handled by CSS
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    doc.body.style.backgroundColor = '#' + randomColor;
  }

  function appendResult() {
    copyBtn.classList.add('btn-is-active');
    outPut.appendChild(div);
  }

  function bindEvents() {

    function handleSubmit(evt) {
      var year = Number(yearPicker.value || currentYear);
      yearPicker.value = year;
      var month = Number(monthPicker.options[monthPicker.selectedIndex].value);
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
      var i = -1;
      var len = lastDay.getDate() + 1;
      var count = firstDay.getDay() - 1;

      div.innerHTML = '';

      // prevent undefined day
      if (count === -1) {
        count = 6;
      }

      // create elements
      for (i = 1; i < len; i++) {
        span = doc.createElement('span');
        span.className = 'item';
        if (count > 6) {
          count = 0;
        }
        span.textContent = (month + 1) + '/' + i + '(' + weekDayArr[count] + ')';
        div.appendChild(span)
        count++;
      }

      // append the result
      if (outPut) {
        appendResult();
      }

      evt.preventDefault();
    }

    submitBtn.addEventListener('click', handleSubmit, false);
  }

  function init() {
    // set up default settings
    yearPicker.value = currentYear;
    monthPicker.value = currentMonth;

    setBackground({
      color: ['2980B9', '2C3E50', '1695A3', '468966']
    });
    bindEvents();

    var clipboard = new Clipboard(copyBtn);

    clipboard.on('success', function(e) {
      console.log(e);
    });

    clipboard.on('error', function(e) {
      console.log(e);
    });

  };

  var publicAPI = {
    init: init
  };

  return publicAPI;

}());

window.onload = function() {
  DateGenerator.init();
};
