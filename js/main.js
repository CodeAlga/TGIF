//
// GLOBAL VARIABLES
//

let listDemo = [];
let listRep = [];
let listIndp = [];
let listMembers = [];
let listState = [];

let filterRep = document.getElementById("filterRep");
let filterDem = document.getElementById("filterDem");
let filterIndp = document.getElementById("filterIndp");
let filterState = document.getElementById("statesMenu");

let checkRep = true;
let checkDem = true;
let checkIndp = true;
let stateValue = "All States";

//
// FETCH FROM API
//

function getData() {
  document.getElementById("loader").classList.remove("d-none");
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
      init();
    })
    .catch(function(error) {
      console.log("Request failed: " + error.message);
    });
}

//
// CREATE SENATE AND HOUSE DYNAMIC FULL TABLES
//

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
    if (element.party == "D") {
      newRow.className = "demRows " + element.state;
    } else if (element.party == "R") {
      newRow.className = "repRows " + element.state;
    } else if (element.party == "I") {
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

//
// FILTERING FUNCTIONS
//

function states(array) {
  let allStates = [];
  filterState = document.getElementById("statesMenu");
  array.forEach((element) => {
    if (allStates.includes(element.state) === false) {
      allStates.push(element.state);
    }
  });
  allStates.sort();
  allStates.unshift("All States");
  allStates.forEach((state) => {
    let newOption = document.createElement("option");
    newOption.className = "dropdown-item";
    newOption.value = state;
    newOption.innerHTML = state;
    filterState.append(newOption);
  });
}

function filter() {
  if (filterState.value == "All States") {
    if (checkDem && checkRep && checkIndp) {
      document.getElementById("listTbody").innerHTML = "";
      dynamicTable(listMembers.members);
    } else {
      if (!checkDem || !checkRep || !checkIndp) {
        let localArray = listMembers.members.filter(
          (member) =>
            (document.getElementById("filterDem").checked &&
              member.party == "D") ||
            (document.getElementById("filterRep").checked &&
              member.party == "R") ||
            (document.getElementById("filterIndp").checked &&
              member.party == "I")
        );
        document.getElementById("listTbody").innerHTML = "";
        dynamicTable(localArray);
      }
    }
  } else if (filterState.value != "All States") {
    if (checkDem && checkRep && checkIndp) {
      document.getElementById("listTbody").innerHTML = "";
      dynamicTable(listState);
    } else {
      if (!checkDem || !checkRep || !checkIndp) {
        let localArray = listState.filter(
          (member) =>
            (document.getElementById("filterDem").checked &&
              member.party == "D") ||
            (document.getElementById("filterRep").checked &&
              member.party == "R") ||
            (document.getElementById("filterIndp").checked &&
              member.party == "I")
        );
        document.getElementById("listTbody").innerHTML = "";
        dynamicTable(localArray);
      }
    }
  }
  if (document.getElementById("listTbody").innerHTML == "") {
    document.getElementById("listTbody").innerHTML =
      "<tr><td colspan='5' class='text-center p-3 font-weight-bold'> No data matches that criteria </td></tr>";
  }
}

//
// CONDITIONALS
//

if (
  window.location.pathname.includes("/pages/senate.html") ||
  window.location.pathname.includes("/pages/house.html")
) {
  filterDem.onchange = function call() {
    checkDem = !checkDem;
    rowId = 1;
    filter();
  };

  filterRep.onchange = function call() {
    checkRep = !checkRep;
    rowId = 2;
    filter();
  };

  filterIndp.onchange = function call() {
    checkIndp = !checkIndp;
    rowId = 3;
    filter();
  };

  filterState.onchange = function call() {
    stateValue = filterState.value;
    listState = [];
    listMembers.members.forEach((member) => {
      if (member.state == stateValue) {
        listState.push(member);
      }
    });

    filter();
  };
}

//
// INITIALISE FUNCTIONS
//

getData();

function init() {
  if (
    window.location.pathname.includes("/pages/senate.html") ||
    window.location.pathname.includes("/pages/house.html")
  ) {
    dynamicTable(listMembers.members);
    states(listMembers.members);
    document.getElementById("loader").classList.add("d-none");
  } else {
    addData(listMembers.members);
    createDataNos();
    document.getElementById("loader").classList.add("d-none");
  }
}
