import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { Doctor } from './js/logic.js';

$(document).ready(function() {
  const doctors = new Doctor

  function findDoc() {
    let promise = doctors.getDoctor();
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log("it worked");
    }, function(error) {
      console.log("it didn't work");
    })
  }

  $("form#docInput").submit(function(event) {
    event.preventDefault();
    const condition = $("condition").val();
    console.log(condition);
    findDoc();
  })

})
