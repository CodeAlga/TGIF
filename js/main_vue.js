//
// VUE JS FOR TABLE
//

let table = new Vue({
  el: "#tables",
  data: {
    members: [],
    //filteredMembers: [],
    topTenMembers: [],
    bottomTenMembers: [],

    demReps: 0,
    repReps: 0,
    indpReps: 0,
    totalReps: 0,
    demVoted: 0,
    repVoted: 0,
    indpVoted: 0,
    totalVoted: 0,

    partyFilter: [
      { name: "Democrats", value: "D" },
      { name: "Republicans", value: "R" },
      { name: "Independents", value: "I" }
    ],
    checkedFilters: ["D", "R", "I"],

    allStates: [],
    selectedState: "All States",

    alternate: false
  },

  methods: {
    getData: function() {
      let url = "";
      if (window.location.pathname.includes("senate")) {
        url = "https://api.propublica.org/congress/v1/113/senate/members.json";
      } else if (window.location.pathname.includes("house")) {
        url = "https://api.propublica.org/congress/v1/113/house/members.json";
      }

      fetch(url, {
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
          table.states(table.members);
          table.createData(table.members);
          table.topBottom(table.members);
        })
        .catch((error) => {
          console.log("Request failed: " + error.message);
        });
    },

    /* getData: function() {
      if (window.location.pathname.includes("senate")) {
        table.members = senateData.results[0].members;
      } else if (window.location.pathname.includes("house")) {
        table.members = houseData.results[0].members;
      }
    }, */

    states: function(array) {
      array.forEach((element) => {
        if (table.allStates.includes(element.state) == false) {
          table.allStates.push(element.state);
          table.allStates.sort();
        }
      });
      this.allStates.unshift("All States");
      this.alternate = !this.alternate;
    },

    topBottom: function(array) {
      array.sort(function(a, b) {
        if (a.missed_votes_pct < b.missed_votes_pct) {
          return 1;
        }
        if (a.missed_votes_pct > b.missed_votes_pct) {
          return -1;
        }
        return 0;
      });

      const perc = (table.totalReps / 100) * 10;
      let i = perc,
        j = perc;
      array.forEach((element) => {
        i--;
        if (i >= 0) {
          table.bottomTenMembers.push(element);
        }
      });
      let lastData;
      array.reverse().forEach((element) => {
        j--;
        if (j >= 0) {
          lastData = element.missed_votes_pct;
          table.topTenMembers.push(element);
        } else if (element.missed_votes_pct == lastData) {
          table.topTenMembers.push(element);
        }
      });
    },

    createData: function(array) {
      table.totalReps = table.members.length;
      array.forEach((element) => {
        table.totalVoted = table.totalVoted + element.votes_with_party_pct;
        if (element.party == "D") {
          table.demReps++;
          table.demVoted = table.demVoted + element.votes_with_party_pct;
        } else if (element.party == "R") {
          table.repReps++;
          table.repVoted = table.repVoted + element.votes_with_party_pct;
        } else if (element.party == "I") {
          table.indpReps++;
          table.indpVoted = table.indpVoted + element.votes_with_party_pct;
        }
      });

      table.demVoted = +(table.demVoted / table.demReps).toFixed(2) || 0;
      table.repVoted = +(table.repVoted / table.repReps).toFixed(2) || 0;
      table.indpVoted = +(table.indpVoted / table.indpReps).toFixed(2) || 0;
      table.totalVoted = +(table.totalVoted / table.totalReps).toFixed(2);
    },

    log(item) {
      console.log(item);
    }
  },

  computed: {
    filterMembers: function() {
      if (this.selectedState == "All States") {
        return this.members.filter((member) => {
          return table.checkedFilters.includes(member.party);
        });
      } else if (table.selectedState != "All States") {
        return this.members.filter(function(member) {
          return (
            table.checkedFilters.includes(member.party) &&
            table.selectedState.includes(member.state)
          );
        });
      }
    }
  },

  created() {
    this.getData();
  }
});

//table.getData();
// table.states(table.members);
//table.topBottom(table.members);
//table.createData(table.members);
