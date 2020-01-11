//
// VUE JS FOR TABLE
//

let table = new Vue({
  el: "#listTbody",
  data: {
    members: [],
    filteredMembers: [],
    partyFilter: [
      { name: "Democrats", value: "D" },
      { name: "Republicans", value: "R" },
      { name: "Independents", value: "I" }
    ],
    checkedFilters: ["D", "R", "I"],
    allStates: [],
    selectedState: ["All States"]
  },

  methods: {
    /*  getData() {
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        headers: {
          "X-API-Key": "E7gpCDZxoNHoNjc5XZE65kKGSRLMIUBHrFQUK9Hi"
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          table.members = data.results[0].members;
        })
        .catch((error) => {
          console.log("Request failed: " + error.message);
        });
    } */

    getData: function() {
      table.members = senateData.results[0].members;
    },

    states: function(array) {
      //let allStates = [];
      array.forEach((element) => {
        if (table.allStates.includes(element.state) === false) {
          table.allStates.push(element.state);
          table.allStates.sort();
        }
      });
      table.allStates.unshift("All States");
      /* filterState = document.getElementById("statesMenu");
      allStates.forEach((item) => {
        let newOption = document.createElement("option");
        newOption.className = "dropdown-item";
        newOption.value = item;
        newOption.innerText = item;
        filterState.append(newOption);
      }); */
    },

    log(item) {
      console.log(item);
    }
  },

  computed: {
    filterMembers: function() {
      /* return this.members.filter((member) =>
        this.checkedFilters.includes(member.party)
      ); */

      return this.members.filter(function(member) {
        return table.checkedFilters.includes(member.party);
      });
    }
  }
  /* created() {
    this.getData();
  } */
});

table.getData();
table.states(table.members);
