window.onload = function () {
    const vm = new Vue({
    el: '#app',
    data() {
        return {
            error: ""
        };
    },
    methods: {
        async register() {
            await axios.post(
                "rest/users",
                {
                    username: this.username,
                    password: this.password,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    gender: this.picked,
                    dateOfBirth: this.dateOfBirth,
                    role: "Customer",
                    email: this.email
                }
            )
            .then( response =>{
                window.location.href = 'sportsObjects.html';
            })
            .catch( error => {
                this.error = 'Postoji korisnik sa datim korisnickim imenom';
            })
        },
        getFormValues (submitEvent) {
            this.register();
        }
    }
});
}