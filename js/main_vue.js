//
// VUE JS FOR TABLE
//
/* 
Vue.component("dynamicTable", {
  data: function() {
    return {
      people: []
    };
    console.log(people);
  },

  template:
    '<tbody><tr v-for="member of members"><td><a v-bind:href="member.url">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a></td><td>{{ member.party }}</td><td>{{ member.state }}</td><td>{{ member.seniority }}</td><td>{{ member.votes_with_party_pct }}</td></tr></tbody>'
});
 */

let table = new Vue({
  el: "#listTbody",
  data: {
    members: []
  },

  template:
    '<tbody><tr v-for="member of members"><td><a v-bind:href="member.url">{{ member.first_name }} {{ member.middle_name }} {{ member.last_name }}</a></td><td>{{ member.party }}</td><td>{{ member.state }}</td><td>{{ member.seniority }}</td><td>{{ member.votes_with_party_pct }}</td></tr></tbody>',
  methods: {
    /* getData() {
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
      let allStates = ["All States"];
      filterState = document.getElementById("statesMenu");
      let newOption = document.createElement("option");
      newOption.className = "dropdown-item";
      newOption.value = allStates[0];
      filterState.append(newOption);
      newOption.innerHTML = allStates[0];
      array.forEach((element) => {
        if (allStates.includes(element.state) === false) {
          allStates.push(element.state);
          let newOption = document.createElement("option");
          newOption.className = "dropdown-item";
          newOption.value = element.state;
          filterState.append(newOption);
          newOption.innerHTML = element.state;
        }
      });
    }
  }
  /* created() {
    this.getData();
  } */
});

table.getData();
table.states(table.members);
