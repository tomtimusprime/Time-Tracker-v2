$(document).ready(function () {
    let userData;
    const userFname = document.querySelector("#user-fname");
    const userLname = document.querySelector("#user-lname");
    const userEmail = document.querySelector("#user-email");
    const userWage = document.querySelector("#user-wage");
    const userTime = document.querySelector("#user-time");
    const userEarnings = document.querySelector("#user-earnings");



    const updateUserData = async () => {
        await
        $.get("/api/tracker/user_data").then(function (data) {
            console.log(data);
            userData = data;
        });
    }



   const main = async () =>{
       try {
        await updateUserData();
        await displayUserData();
       } catch (error) {
           console.log(error);
       }
   }

    const displayUserData=async()=>{
        userFname.textContent = userData.first_name;
        userLname.textContent = userData.last_name;
        userEmail.textContent = userData.email;
        userWage.textContent = userData.wage;
        userTime.textContent = ((parseInt(userData.total_time))/3600).toFixed(2);
        userEarnings.textContent = '$'+userData.total_earnings;
    }

    main();

});