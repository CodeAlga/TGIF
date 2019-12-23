let listDemo = [];
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

creatLists(senateData.results[0].members);

var statistics = {
  noDemo: listDemo.length,
  noRep: listRep.length,
  noIndp: listIndp.length,
  noTotal: listDemo.length + listRep.length + listIndp.length,
  votDemo: 0,
  votRep: 0,
  votIndp: 0,
  votTotal: 0
};

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

  /*   function noReps(array) {
    var newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = listDemo.length;
    rowDem.append(newData);

    newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = listRep.length;
    rowRep.append(newData);

    newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = listIndp.length;
    rowIndp.append(newData);

    newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = listDemo.length + listRep.length + listIndp.length;
    rowTotal.append(newData);
  }
  noReps(listDemo);

    function votedPartyDemo(array) {
    var total = 0;

    array.forEach((element) => {
      total = total + element.votes_with_party_pct;
    });
    var newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = (total / 105).toFixed(2) + "%";
    rowDem.append(newData);
  }
  votedPartyDemo(listDemo);

  function votedPartyRep(array) {
    var total = 0;

    array.forEach((element) => {
      total = total + element.votes_with_party_pct;
    });
    var newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = (total / 105).toFixed(2) + "%";
    rowRep.append(newData);
  }
  votedPartyRep(listRep);

  function votedPartyIndp(array) {
    var total = 0;

    array.forEach((element) => {
      total = total + element.votes_with_party_pct;
    });
    var newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = (total / 105).toFixed(2) + "%";
    rowIndp.append(newData);
  }
  votedPartyIndp(listIndp);

  function votedPartyTotal(array) {
    var total = 0;

    array.forEach((element) => {
      total = total + element.votes_with_party_pct;
    });
    var newData = document.createElement("td");
    newData.className = "text-center";
    newData.innerHTML = (total / 105).toFixed(2) + "%";
    rowTotal.append(newData);
  }
  votedPartyTotal(senateData.results[0].members);
  */
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

  /* function createBottom(arr) {
    let bottomTen = document.getElementById("bottom10");

    let i = 10;
    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        let newRow = document.createElement("tr");
        bottomTen.append(newRow);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
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
  }

  createBottom(array);

  function createTop(arr) {
    let topTen = document.getElementById("top10");

    let i = 10;
    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
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

  createTop(array.reverse()); */

  function createBottomTop(arr) {
    const perc = Math.floor((array.length / 100) * 10);
    let i = perc,
      j = perc;
    let bottomTen = document.getElementById("bottom10");
    let topTen = document.getElementById("top10");
    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        let newRow = document.createElement("tr");
        bottomTen.append(newRow);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
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
    arr.reverse().forEach((element) => {
      j--;
      if (j >= 0) {
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.missed_votes_pct + "%";
        newRow2.append(newData);
      } else if (element.missed_votes_pct == 0.3) {
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
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

leastEngaged(senateData.results[0].members);

createDataNos();
