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
    } else if (element.party == "D") {
      listDemo.push(element);
    }
  });
}

//
// FETCH FROM API
//

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
        states(listMembers.members);
      } else {
        addData(listMembers.members);
        createDataNos();
      }
    })
    .catch(function(error) {
      console.log("Request failed: " + error.message);
    });
}

//
// CREATE SENATE AND HOUSE DYNAMIC FULL TABLES
//

//
// FILTERING FUNCTIONS
//

let filterRep = document.getElementById("filterRep");
let filterDem = document.getElementById("filterDem");
let filterIndp = document.getElementById("filterIndp");
let filterState = document.getElementById("satesMenu");

let checkRep = true;
let checkDem = true;
let checkIndp = true;

let rowId = 0;

function dynamicTable(array) {
  let box = document.getElementById("listTbody");

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
    if (rowId == 1) {
      newRow.className = "demRows " + element.state;
    } else if (rowId == 2) {
      newRow.className = "repRows " + element.state;
    } else if (rowId == 3) {
      newRow.className = "indpRows " + element.state;
    }

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
}

function displayDem(array) {
  let box = document.getElementById("listTbody");
  if (checkDem) {
    rowId = 1;
    dynamicTable(listDemo);
  } else if (!checkDem) {
    var item = document.getElementsByClassName("demRows");
    while (item[0]) item[0].parentNode.removeChild(item[0]);
  }
}

function displayRep(array) {
  let box = document.getElementById("listTbody");
  if (checkRep) {
    rowId = 2;
    dynamicTable(listRep);
  } else if (!checkRep) {
    var item = document.getElementsByClassName("repRows");
    while (item[0]) item[0].parentNode.removeChild(item[0]);
  }
}

function displayIndp(array) {
  let box = document.getElementById("listTbody");
  if (checkIndp) {
    rowId = 3;
    dynamicTable(listIndp);
  } else if (!checkIndp) {
    var item = document.getElementsByClassName("indpRows");
    while (item[0]) item[0].parentNode.removeChild(item[0]);
  }
}

function states(array) {
  let allStates = ["All States"];
  let dropdownStates = document.getElementById("statesMenu");
  let newOption = document.createElement("option");
  newOption.className = "dropdown-item";
  newOption.value = allStates[0];
  dropdownStates.append(newOption);
  newOption.innerHTML = allStates[0];
  array.forEach((element) => {
    if (allStates.includes(element.state) === false) {
      allStates.push(element.state);
      let newOption = document.createElement("option");
      newOption.className = "dropdown-item";
      newOption.value = element.state;
      dropdownStates.append(newOption);
      newOption.innerHTML = element.state;
    }
  });
}

if (
  window.location.pathname === "/pages/senate.html" ||
  window.location.pathname === "/pages/house.html"
) {
  /* filterDem.onchange = function filter() {
    checkDem = !checkDem;
    displayDem(listDemo);
    rowId = 1;
  };

  filterRep.onchange = function filter() {
    checkRep = !checkRep;
    displayRep(listRep);
    rowId = 2;
  };

  filterIndp.onchange = function filter() {
    checkIndp = !checkIndp;
    displayIndp(listIndp);
    rowId = 3;
  }; */
  document.getElementById("statesMenu").addEventListener("change", filter);
  document.getElementById("filterDem").addEventListener("click", filter);
  document.getElementById("filterRep").addEventListener("click", filter);
  document.getElementById("filterIndp").addEventListener("click", filter);
}

getData();
