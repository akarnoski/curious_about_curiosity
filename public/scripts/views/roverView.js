'use strict';
var app = app || {};

(function(module) {
  const roverView = {};

  // const ui = function() {
  //
  // };

  // const render = Handlebars.compile($('#placeholder-template').text());

  // roverView.index = function() {
  //   // ui();
  //   // $('main').append(
  //   //   app.rover.with('name').map(render)
  //   // );
  // };

  roverView.populateAbout = function(about) {
    let template = Handlebars.compile($('#about-template').text());

    app.Curiosity.all[1].rover.cameras.forEach(function(ele, i) {
    $.extend(ele, app.cameraModel.properties[i]);
    })

    $('#about-details').append(template(app.Curiosity.all[1]));

    function createStats() {
      let template = Handlebars.compile($('#stats-template').text());
      $('#stats-details').append(template(app.cameraModel.stats));
    }
    createStats();
  }

  roverView.populateWeather = function(weather) {
    let template = Handlebars.compile($('#weather-template').text());
    $('#weather-details').append(template(weather));
  }

  roverView.populateFilters = function(images) {
    let template = Handlebars.compile($('#camera-template').text());
    images.map(camera => $('#camera-filter').append(template({val: camera})));
    roverView.handleFilter();
  }

  roverView.populatePhotos = function(images) {
    let template = Handlebars.compile($('#photos-template').text());
    images.photos.map(image => $('#photos-rotation').append(template(image)));
    $('#photos-rotation').slick({
      centerMode: true,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: '15px',
            slidesToShow: 1
          }
        }
      ]
    });
    //$('#photos-rotation').append(template(images.photos));
  }

  module.roverView = roverView;
})(app);

$(function() {
  $('#popupDatePicker').datepick({
    dateFormat: 'yyyy-mm-dd',
    onSelect: function() {
      $('#weather-details').html('');
      app.roverController.index(this.value)
    }
  });
});
