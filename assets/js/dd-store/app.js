var food = [];

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

function renderHTMLTemplate(file, idHTML, type) {
  readTextFile(file, function(text) {
    food = JSON.parse(text); //parse JSON

    var wrapper = document.getElementById(idHTML);
    var myHTML = '';

    for (let i = 0; i < food.length; i++) {
      myHTML += foodTemplate(food[i], type);
    }
    wrapper.innerHTML = myHTML;
  });
}

renderHTMLTemplate("assets/data/food.json", "food", 1);
renderHTMLTemplate("assets/data/drink.json", "drink", 2);

function viewFoodDetail(foodId, type) {
  if (type == 1) {
    renderDetailModal("assets/data/food.json", foodId);
  }
  if (type == 2) {
    renderDetailModal("assets/data/drink.json", foodId);
  }
  openModal("foodDetailModal");
}

function renderDetailModal(file, foodId) {
  readTextFile(file, function(text) {
    food = JSON.parse(text); //parse JSON

    let myHTML = '';
    for (let i = 0; i < food.length; i++) {
      if (food[i].id == foodId) {
        myHTML += detailFoodTemplate(food[i]);
        break;
      }
    }
    document.getElementById("foodDetail").innerHTML = myHTML;
  });
}

function openModal(modal) {
  const myModal = new bootstrap.Modal(document.getElementById(modal));
  myModal.show();
}

/**
 * HTML Template
 */

function foodTemplate(object, type) {
  return `
  <div class="col-lg-12 col-xl-6 col-xxl-6">
    <div class="food label-info m-mb-16">
      <div class="flex-sb">
        <div class="flex">
          <div class="icon-circle">
            <img class="media-object" src="${object.image}" alt="">
          </div>
          <div class="content-body">
            <a href="javascript:void(0)" onclick="viewFoodDetail(${object.id}, ${type})">${object.name}</a>
            <div class="food-info">
              <p>Giá: ${object.price}<sup>đ</sup>
            </div>
          </div>
        </div>
        <div class="flex">
          <a href="https://m.me/messages/t/100010226316967" class="btn-more mx-0" target="_blank">
            <i class="fas fa-comment-dots text-success"></i>
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

function detailFoodTemplate(object) {
  return `
  <div class="flex">
    <div class="icon-circle">
      <img class="media-object" src="${object.image}" alt="">
    </div>
    <div class="content-body">
      <h3>${object.name}</h3>
      <p class="price">Giá: ${object.price}<sup>đ</sup></p>
    </div>
  </div>`;
}