//
// VUE JS FOR TABLE
//

let table = new Vue({
  el: "#listTbody",
  data: {
    members: []
  },
  methods: {
    log: function() {
      console.log(this.$data);
    },
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
    }
  }
  /* created() {
    this.getData();
  } */
});

let navigation = new Vue({
  el: "#navbarCollapse",
  data: {},

  methods: {}
});

table.getData();
