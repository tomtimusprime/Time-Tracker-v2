$(document).ready(function () {

    // Getting references to our form and input
    var loginForm = $("form.login");


    // When the signup button is clicked, we validate the email and password are not blank
    loginForm.on("submit", function (event) {
        event.preventDefault();
        
        var emailInput = $("input#inputEmail");
        var passwordInput = $("input#inputPassword");
        console.log("email " + emailInput + ", password " + passwordInput );
        // if ($("#rememberMe").is(":checked")) {
        //     // save username and password
        //     localStorage.userName = emailInput;
        //     localStorage.password = passwordInput;
        //     localStorage.checkBoxValidation = $("#rememberMe").val();
        // } else {
        //     localStorage.userName = "";
        //     localStorage.password = "";
        //     localStorage.checkBoxValidation = "";
        // }
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        loginUser(userData);
        emailInput.val("");
        passwordInput.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function loginUser(userData) {
        console.log(userData);
        $.post("/login", userData)
            .then(function () {
                //   window.location.replace("/login");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});