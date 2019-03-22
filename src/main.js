import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/styles.scss';
import { Doctor } from './js/logic.js';

$(document).ready(function() {

  function findDoc(condition) {
    const promise = doctors.getDoctor(condition);
    promise.then(function(response) {
      const body = JSON.parse(response);
      const checkData = doctors.checkResults(body);
      if (checkData === false) {
        $("#results").append(`Unable to find a doctor for ${condition}`);
      }

      body.data.forEach(function(element) {
        $("#results").append(`First Name: ${element.profile.first_name} ${element.profile.last_name}<br>`);
        element.practices.forEach(function(element2){
          const address = element2.visit_address;
          if(address.street2 === undefined) {
            $("#results").append(`Office Address: <br> ${address.street}<br> ${address.city}, ${address.state} ${address.zip}<br>`)
          } else {
            $("#results").append(`Office Address: <br> ${address.street} ${address.street2}<br> ${address.city}, ${address.state} ${address.zip}<br>`)
          }
          element2.phones.forEach(function(element3){
            // console.log(element3.number);
            let newPhone = doctors.formatPhone(element3.number);
            $("#results").append(`Phone Number: ${newPhone}<br>Type: ${element3.type}<br>`)
          })
          // console.log(element2.phones);
          if (element2.website === undefined) {
            console.log(element2.website);
          } else {
            $("#results").append(`Website: <a href=${element2.website} target="_blank">${element2.website}<br>`);
          }
          if (element2.accepts_new_patients === true){
            $("#results").append(`Accepts new patients: Yes<br><br>`)
          } else {
            $("#results").append(`Accepts new patients: No<br><br>`)
          }
        })
      });
      // console.log("it worked");
    }, function(error) {
      $('#results').text(`There was an error processing your request: ${error.message}`);
      // console.log("it didn't work");
    })
  }
  const doctors = new Doctor

  $("form#docInput").submit(function(event) {
    event.preventDefault();
    const condition = $("#condition").val();
    findDoc(condition);

  })

})
