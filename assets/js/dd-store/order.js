$(document).ready(function() {

  $('[name="noodle"]').change(function() {
    getPrice();
  });

  $('[name="sausage"]').change(function() {
    getPrice();
  });

  $('[name="dried-beef"]').change(function() {
    getPrice();
  });

  $('[name="egg"]').change(function() {
    getPrice();
  });

  $('[name="bean-sprouts"]').change(function() {
    getPrice();
  });

  $('[name="vegetable"]').change(function() {
    getPrice();
  });

  getPrice();
});

function getPrice() {

  let noodele = $('[name="noodle"]').val();
  let sausage = $('[name="sausage"]').val();
  let driedBeef = $('[name="dried-beef"]').val();
  let egg = $('[name="egg"]').val();


  let noodelePrice = (noodele === "Hảo hảo") ? 5000 : 10000;

  let sausagePrice = (sausage === "Không") ? 0 :
    (sausage === "1 cái") ? 10000 :
    (sausage === "2 cái") ? 18000 : 25000;

  let driedBeefPrice = (driedBeef === "Không") ? 0 :
    (driedBeef === "Có") ? 5000 : 8000;

  let eggPrice = (egg === "Không") ? 0 :
    (egg === "1 quả") ? 5000 :
    (egg === "2 quả") ? 10000 : 15000;

  let totalPrice = noodelePrice + sausagePrice + driedBeefPrice + eggPrice;
  $("#total-price").html(formatCurrency(totalPrice + ''));
  $("#totalPrice").val(formatCurrency(totalPrice + ''));
}

function formatCurrency(total) {
  if (total.length >= 5)
    total = total.substring(0, 2) + '.' + total.substring(2);
  return total;
}

var $form = $('form#order-form');
var url = 'https://script.google.com/macros/s/AKfycbzlGuPUHf1gqRLEp5OmgWSIUWNokLq3pOxfhGrnzAj5eQD2BJHe/exec';
document.getElementById('time').value = new Date().toLocaleString();

$('#submit-form').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize()
  }).success(
    $('#toastSuccess').toast('show')
  );
})