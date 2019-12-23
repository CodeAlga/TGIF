function displaySenate(array) {
  var name = {
    first_name: "Placeholder",
    second_name: "Placeholder",
    last_name: "Placeholder"
  };
  var party = "Placeholder";
  var state = "Placeholder";
  var seniority = 0;
  var partyVotes = 0;
  var tempArray = [];

  let box = document.getElementById("senateTbody");
  let newRow;
  let newData;

  /* for (let i = 0, len = array.length; i < len; i++) {
      tempArray.push(senateData.results[0].members[i].first_name);
      newRow = document.createElement("tr");
      box.append(newRow);
      newData = document.createElement("td");
      newData.innerText = tempArray[i];
      newRow.append(newData);
  
      console.log(tempArray[i]);
    } */

  array.forEach(element => {
    newRow = document.createElement("tr");
    box.append(newRow);

    newData = document.createElement("td");
    newData.innerText = element.first_name + " " + element.last_name;
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

function displayHouse(array) {
  var name = {
    first_name: "Placeholder",
    second_name: "Placeholder",
    last_name: "Placeholder"
  };
  var party = "Placeholder";
  var state = "Placeholder";
  var seniority = 0;
  var partyVotes = 0;
  var tempArray = [];

  let box = document.getElementById("houseTbody");
  let newLine;
  let newData;

  /* for (let i = 0, len = array.length; i < len; i++) {
        tempArray.push(senateData.results[0].members[i].first_name);
        newRow = document.createElement("tr");
        box.append(newRow);
        newData = document.createElement("td");
        newData.innerText = tempArray[i];
        newRow.append(newData);
    
        console.log(tempArray[i]);
      } */

  array.forEach(element => {
    newRow = document.createElement("tr");
    box.append(newRow);

    newData = document.createElement("td");
    newData.innerText = element.first_name + " " + element.last_name;
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
