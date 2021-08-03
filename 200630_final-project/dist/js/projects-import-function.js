$(document).ready(function () {
  /////---------- Get Json ----------/////
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'js/project-list.json', true);
  xhttp.onreadystatechange = function () {
    //if(xhttp.status >=200 && xhttp.status <400) //success
    // if (this.readyState == 4 && this.status == 200)
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var project = response.projects;

      renderHTML(project);
    }
  };
  xhttp.send();

  //-------------- function to Json: insert HTML --------------//
  function renderHTML(data) {
    let output = '';
    $.each(data, function (i) {
      output += `
        <a href="" class="item" data-type= "${data[i].type}">
          <div class="item-img">
            <div class="item-img-inner" style="background-image: url(${data[i].img})"></div>
          </div>
          <div class="item-text">
            <h3 class="item-title">${data[i].title}</h3>
            <div class="item-hidden">
              <ul class="item-hidden-info">
                <li class="info-completion">${data[i].project_info.completion[0]}
                  <span>${data[i].project_info.completion[1]}</span>
                </li>
                <li class="info-location">${data[i].project_info.location[0]}
                  <span>${data[i].project_info.location[1]}</span>
                </li>
                <li class="info-area">${data[i].project_info.area[0]}
                  <span>${data[i].project_info.area[1]}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-hidden-arrow">
            <svg class="arrow-right" viewBox="0 0 70 25">
              <path class="arrow-right-path" d="M50.15,22.81,60.06,13h0a1.45,1.45,0,0,0,0-2h0L50.15,1.19a1.44,1.44,0,1,0-2,2l7.43,7.34H6a1.43,1.43,0,0,0,0,2.86H55.56l-7.43,7.34a1.47,1.47,0,0,0-.43,1,1.42,1.42,0,0,0,.42,1A1.44,1.44,0,0,0,50.15,22.81Z"/>
            </svg>
          </div>
          <div class="item-hidden-blend">
            <div class="item-hidden-blend-bg"></div>
          </div>
        </a>`;
    });
    console.log(data[0].project_info.completion);
    console.log(data[0].project_info.completion[0]);
    console.log(data[0].project_info.completion[1]);

    $projectItems = $('.items');
    $projectItems.append(output);
    /// ! const variable here ! ///
  }
});
