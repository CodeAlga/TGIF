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
    getData() {
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        headers: {
          "X-API-Key": "E7gpCDZxoNHoNjc5XZE65kKGSRLMIUBHrFQUK9Hi"
        }
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function(data) {
          table.members = data.results[0].members;
        })
        .catch(function(error) {
          console.log("Request failed: " + error.message);
        });
    }
  },
  created() {
    this.getData();
  }
});
