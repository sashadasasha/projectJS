
const app = new Vue({
    el: '#app',
    data: {
        isShowDetailsBrand: false,
        isShowDetailsCategory: false,
        isShowDetailsDesign: false,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },

        delJson(url, data){
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => this.$refs.error.setText(error));
        },
        showDetail(name) {
            if (name === "category") {
            if (this.isShowDetailsCategory) {
                this.isShowDetailsCategory = false;
              } else {
                this.isShowDetailsCategory = true;
              }
            } else if (name === "brand") {
                if (this.isShowDetailsBrand) {
                    this.isShowDetailsBrand= false;
                  } else {
                    this.isShowDetailsBrand = true;
                  }
            } else {
                if (this.isShowDetailsDesign) {
                    this.isShowDetailsDesign= false;
                  } else {
                    this.isShowDetailsDesign = true;
                  }
            }
        },
    }
})

