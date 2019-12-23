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

function senateGlance() {
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
senateGlance();

function senateLoyalty(array) {
  const perc = Math.floor((array.length / 100) * 10);
  let i = perc,
    j = perc;

  array.sort(function(a, b) {
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
      return 1;
    }
    if (a.votes_with_party_pct < b.votes_with_party_pct) {
      return -1;
    }
    return 0;
  });

  let bottomTen = document.getElementById("bottom10");
  let topTen = document.getElementById("top10");

  function createLoyaltyTable(arr) {
    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        console.log(i);

        let newRow = document.createElement("tr");
        bottomTen.append(newRow);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
        newRow.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.total_votes;
        newRow.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.votes_with_party_pct + "%";
        newRow.append(newData);
      }
    });

    arr.reverse().forEach((element) => {
      j--;
      if (j >= 0) {
        console.log(j);
        let newRow2 = document.createElement("tr");
        topTen.append(newRow2);
        let newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.first_name + " " + element.last_name;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.total_votes;
        newRow2.append(newData);
        newData = document.createElement("td");
        newData.className = "text-center";
        newData.innerHTML = element.votes_with_party_pct + "%";
        newRow2.append(newData);
      }
    });
  }
  createLoyaltyTable(array);
}

senateLoyalty(senateData.results[0].members);
