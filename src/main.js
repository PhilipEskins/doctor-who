import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { Doctor } from './js/logic.js';

$(document).ready(function() {
  const doctors = new Doctor

  function findDoc() {
    const promise = doctors.getDoctor();
    promise.then(function(response) {
      const body = JSON.parse(response);
      body.data.forEach(function(element) {
        $("#results").append(`First Name: ${element.profile.first_name} ${element.profile.last_name}<br>`);
        element.practices.forEach(function(element2){
          const address = element2.visit_address;
          $("#results").append(`Office Address: <br> ${address.street} ${address.street2}<br> ${address.city}, ${address.state} ${address.zip}`)
          // console.log(element2.visit_address);
          console.log(element2.phones);
          if (element2.website === undefined) {
            console.log(element2.website);
          } else {
            $("#results").append(`Website: ${element2.website}`);
          }
          if (element2.accepts_new_patients === true){
            $("#results").append(`Accepts new patients: Yes<br>`)
          } else {
            $("#results").append(`Accepts new patients: No<br>`)
          }
        })
      });
      console.log("it worked");
    }, function(error) {
      console.log("it didn't work");
    })
  }

  $("form#docInput").submit(function(event) {
    event.preventDefault();
    const condition = $("#condition").val();
    console.log(condition);
    findDoc();
  })

})
