let URL;
let URLpos = [
  "https://api.propublica.org/congress/v1/113/senate/members.json",
  "https://api.propublica.org/congress/v1/113/house/members.json"
];
let currentLocation = 0;

if (
  window.location.pathname.includes("/pages/senate.html") ||
  window.location.pathname.includes("/pages/senate-attendance.html") ||
  window.location.pathname.includes("/pages/senate-loyalty.html")
) {
  URL = URLpos[0];
  currentLocation = 0;
} else if (
  window.location.pathname.includes("/pages/house.html") ||
  window.location.pathname.includes("/pages/house-attendance.html") ||
  window.location.pathname.includes("/pages/house-loyalty.html")
) {
  URL = URLpos[1];
  currentLocation = 1;
}

//
// CREATE DE AT GLANCE TABLES
//

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
    newData.innerHTML = listMembers.members.length;
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
    newData.innerHTML =
      (totalParty / listMembers.members.length).toFixed(2) + "%";
    newData.innerHTML =
      (totalParty / listMembers.members.length).toFixed(2) + "%";
    rowTotal.append(newData);
  }

  votedParty(globalStoreA, globalStoreB);
}

//
// CREATE ATTENDANCE AND LOYALTY TABLES
//

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

  let createName = (person) => {
    let name = "";
    if (person.middle_name == null) {
      name = person.first_name + " " + person.last_name;
    } else {
      name =
        person.first_name + " " + person.middle_name + " " + person.last_name;
    }
    return name;
  };

  let template = (localStore) => {
    return `<tr>
    <td class="text-center"><a href="${localStore.url}">${createName(
      localStore
    )}</a></td>
    <td class="text-center">${localStore.missed_votes}</td>
    <td class="text-center">${localStore.missed_votes_pct} %</td>
    </tr>`;
  };

  function createBottomTop(arr) {
    const perc = Math.floor((array.length / 100) * 10);
    let i = perc,
      j = perc;
    let bottomTen = document.getElementById("bottom10");
    let topTen = document.getElementById("top10");
    let lastData;
    let newRow = document.createElement("tr");

    arr.forEach((element) => {
      i--;
      if (i >= 0) {
        bottomTen.innerHTML += template(element);
      }
    });

    arr.reverse().forEach((element) => {
      j--;
      if (j >= 0) {
        topTen.innerHTML += template(element);
        lastData = element.missed_votes_pct;
      } else if (element.missed_votes_pct == lastData) {
        topTen.innerHTML += template(element);
      }
    });
  }
  createBottomTop(array);
}
