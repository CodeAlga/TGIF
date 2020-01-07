let URL;
let URLpos = [
  "https://api.propublica.org/congress/v1/113/senate/members.json",
  "https://api.propublica.org/congress/v1/113/house/members.json"
];
let currentLocation = 0;

if (
  window.location.pathname === "/pages/senate.html" ||
  window.location.pathname === "/pages/senate-attendance.html" ||
  window.location.pathname === "/pages/senate-loyalty.html"
) {
  URL = URLpos[0];
  currentLocation = 0;
} else if (
  window.location.pathname === "/pages/house.html" ||
  window.location.pathname === "/pages/house-attendance.html" ||
  window.location.pathname === "/pages/house-loyalty.html"
) {
  URL = URLpos[1];
  currentLocation = 1;
}

function createDataNos() {
  let rowDem;
  let rowRep;
  let rowIndp;
  let rowTotal;
  if (currentLocation === 0) {
    rowDem = document.getElementById("attGlanceDem");
    rowRep = document.getElementById("attGlanceRep");
    rowIndp = document.getElementById("attGlanceIndp");
    rowTotal = document.getElementById("attGlanceTotal");
  } else if (currentLocation === 1) {
    rowDem = document.getElementById("houseGlanceDem");
    rowRep = document.getElementById("houseGlanceRep");
    rowIndp = document.getElementById("houseGlanceIndp");
    rowTotal = document.getElementById("houseGlanceTotal");
  }
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
      if ((total / partyReps[i]).toFixed(2) == "NaN") {
        newData.innerHTML = "0%";
      } else {
        newData.innerHTML = (total / partyReps[i]).toFixed(2) + "%";
      }
      innArray1[i].append(newData);
      totalParty = totalParty + total;
    }
    newData = document.createElement("td");
    newData.className = "text-center";
    if (currentLocation == 0) {
      newData.innerHTML = (totalParty / 105).toFixed(2) + "%";
    } else if (currentLocation == 1) {
      newData.innerHTML = (totalParty / 450).toFixed(2) + "%";
    }
    rowTotal.append(newData);
  }

  votedParty(globalStoreA, globalStoreB);
}

function addData(array) {
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
        newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
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
        newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
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
        newData.innerHTML = "<a href=" + element.url + ">" + name + "</a>";
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
