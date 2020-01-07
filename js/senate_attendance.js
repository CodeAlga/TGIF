/* let listDemo = [];
let listRep = [];
let listIndp = [];

function creatLists(array) {
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

creatLists(listMembers.members); */

/* var statistics = {
  noDemo: listDemo.length,
  noRep: listRep.length,
  noIndp: listIndp.length,
  noTotal: listDemo.length + listRep.length + listIndp.length,
  votDemo: 0,
  votRep: 0,
  votIndp: 0,
  votTotal: 0
}; */

function createDataNos() {
  let rowDem = document.getElementById("attGlanceDem");
  let rowRep = document.getElementById("attGlanceRep");
  let rowIndp = document.getElementById("attGlanceIndp");
  let rowTotal = document.getElementById("attGlanceTotal");
  var partyReps = [];
  let globalStoreA = [rowDem, rowRep, rowIndp];
  let globalStoreB = [listDemo, listRep, listIndp];

  function distributeData(innArray1, innArray2) {
    for (let i = 0, len = innArray2.length; i < len; i++) {
      var newData = document.createElement("td");
      newData.className = "text-center";
      newData.innerHTML = innArray2[i].length;
      innArray1[i].append(newData);
      partyReps.push(innArray2[i].length);
    }
    newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = listDemo.length + listRep.length + listIndp.length;
    rowTotal.append(newData);
  }
  distributeData(globalStoreA, globalStoreB);

  function votedParty(innArray1, innArray2) {
    var totalParty = 0;

    for (let i = 0, len = innArray2.length; i < len; i++) {
      let total = 0;

      for (let j = 0, llar = innArray2[i].length; j < llar; j++)
        total = total + innArray2[i][j].votes_with_party_pct;

      var newData = document.createElement("td");
      newData.className = "text-center";
      newData.innerHTML = (total / partyReps[i]).toFixed(2) + "%";

      innArray1[i].append(newData);
      totalParty = totalParty + total;
    }
    newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = (totalParty / 105).toFixed(2) + "%";
    rowTotal.append(newData);
  }

  votedParty(globalStoreA, globalStoreB);
}

function leastEngaged(array) {
  array.sort(function(a, b) {
    if (a.missed_votes_pct < b.missed_votes_pct) {
      return 1;
    }
    if (a.missed_votes_pct > b.missed_votes_pct) {
      return -1;
    }
    return 0;
  });

  function createBottomTop(arr) {
    const perc = Math.floor((array.length / 100) * 10);
    let i = perc,
      j = perc;
    let bottomTen = document.getElementById("bottom10");
    let topTen = document.getElementById("top10");

    let name = "";
    function createName(person) {
      if (person.middle_name == null) {
        name = person.first_name + " " + person.last_name;
      } else {
        name =
          person.first_name + " " + person.middle_name + " " + person.last_name;
      }
    }

    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        let newRow = document.createElement("tr");
        bottomTen.append(newRow);
        let newData = document.createElement("td");
        newData.className = "text-center";
        createName(element);
        newData.innerHTML = name;
        newRow.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes;
        newRow.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes_pct + "%";
        newRow.append(newData);
      }
    });
    let lastData;

    arr.reverse().forEach((element) => {
      j--;

      if (j >= 0) {
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        createName(element);
        newData.innerHTML = name;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes_pct + "%";
        newRow2.append(newData);
        lastData = element.missed_votes_pct;
      } else if (element.missed_votes_pct == lastData) {
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        createName(element);
        newData.innerHTML = name;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes_pct + "%";
        newRow2.append(newData);
      }
    });
  }
  createBottomTop(array);
}

/* leastEngaged(senateData.results[0].members); */

/* createDataNos(); */
