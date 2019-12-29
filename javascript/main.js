let listDemo = [];
let listRep = [];
let listIndp = [];

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
      newData.innerHTML = name;
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

filterDem.onchange = function filter() {
  checkDem = !checkDem;
  displayDem(listDemo);
};

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
      newData.innerHTML = name;
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

filterRep.onchange = function filter() {
  checkRep = !checkRep;
  displayRep(listRep);
};

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
      newData.innerHTML = name;
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

filterIndp.onchange = function filter() {
  checkIndp = !checkIndp;
  displayIndp(listIndp);
};

function urlCheck() {
  if (window.location.pathname === "/pages/senate.html") {
    createLists(senateData.results[0].members);
  } else if (window.location.pathname === "/pages/house.html") {
    createLists(houseData.results[0].members);
  }
  displayDem(listDemo);
  displayRep(listRep);
  displayIndp(listIndp);
}
urlCheck();
