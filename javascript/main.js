let listDemo = [];
let listRep = [];
let listIndp = [];
let listMembers;

function createLists(array) {
  array.forEach((element) => {
    if (element.party == "R") {
      listRep.push(element);
    } else if (element.party == "I") {
      listIndp.push(element);
    } else {
      listDemo.push(element);
    }
  });
}

function getData() {
  fetch(URL, {
    headers: {
      "X-API-Key": "E7gpCDZxoNHoNjc5XZE65kKGSRLMIUBHrFQUK9Hi"
    }
  })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(data) {
      listMembers = data.results[0];
      createLists(listMembers.members);

      if (
        window.location.pathname === "/pages/senate.html" ||
        window.location.pathname === "/pages/house.html"
      ) {
        displayDem(listDemo);
        displayRep(listRep);
        displayIndp(listIndp);
      } else {
        addData(listMembers.members);
        createDataNos();
      }
    })
    .catch(function(error) {
      console.log("Request failed: " + error.message);
    });
}
let filterRep = document.getElementById("filterRep");
let filterDem = document.getElementById("filterDem");
let filterIndp = document.getElementById("filterIndp");

let checkRep = true;
let checkDem = true;
let checkIndp = true;

function displayDem(array) {
  let box = document.getElementById("listTbody");
  if (checkDem) {
    let name = "";
    function createName(person) {
      if (person.middle_name == null) {
        name = person.first_name + " " + person.last_name;
      } else {
        name =
          person.first_name + " " + person.middle_name + " " + person.last_name;
      }
    }

    let newRow;
    let newData;

    array.forEach((element) => {
      newRow = document.createElement("tr");
      newRow.id = "demRows";
      box.append(newRow);

      newData = document.createElement("td");
      createName(element);
      newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.party;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.state;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.seniority;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.votes_with_party_pct;
      newRow.append(newData);
    });
  } else if (!checkDem) {
    var item = document.getElementById("demRows");
    array.forEach((item) => {
      box.removeChild(box.childNodes[0]);
    });
  }
}

function displayRep(array) {
  let box = document.getElementById("listTbody");
  if (checkRep) {
    let name = "";
    function createName(person) {
      if (person.middle_name == null) {
        name = person.first_name + " " + person.last_name;
      } else {
        name =
          person.first_name + " " + person.middle_name + " " + person.last_name;
      }
    }

    let newRow;
    let newData;

    array.forEach((element) => {
      newRow = document.createElement("tr");
      newRow.id = "repRow";
      box.append(newRow);

      newData = document.createElement("td");
      createName(element);
      newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.party;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.state;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.seniority;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.votes_with_party_pct;
      newRow.append(newData);
    });
  } else if (!checkRep) {
    var item = document.getElementById("repRows");
    array.forEach((item) => {
      box.removeChild(box.childNodes[0]);
    });
  }
}

function displayIndp(array) {
  let box = document.getElementById("listTbody");
  if (checkIndp) {
    let name = "";
    function createName(person) {
      if (person.middle_name == null) {
        name = person.first_name + " " + person.last_name;
      } else {
        name =
          person.first_name + " " + person.middle_name + " " + person.last_name;
      }
    }

    let newRow;
    let newData;

    array.forEach((element) => {
      newRow = document.createElement("tr");
      newRow.id = "indpRows";
      box.append(newRow);

      newData = document.createElement("td");
      createName(element);
      newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.party;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.state;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.seniority;
      newRow.append(newData);

      newData = document.createElement("td");
      newData.innerText = element.votes_with_party_pct;
      newRow.append(newData);
    });
  } else if (!checkIndp) {
    var item = document.getElementById("indpRows");
    array.forEach((item) => {
      box.removeChild(box.childNodes[0]);
    });
  }
}

if (
  window.location.pathname === "/pages/senate.html" ||
  window.location.pathname === "/pages/house.html"
) {
  filterDem.onchange = function filter() {
    checkDem = !checkDem;
    displayDem(listDemo);
  };

  filterRep.onchange = function filter() {
    checkRep = !checkRep;
    displayRep(listRep);
  };

  filterIndp.onchange = function filter() {
    checkIndp = !checkIndp;
    displayIndp(listIndp);
  };
}

getData();
