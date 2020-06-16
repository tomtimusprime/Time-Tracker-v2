$(document).ready(function () {
    // var userIdInput = $("#userId");
    var userList = $("tbody");
    var userContainer = $(".user-container");
    let userData;
    // const userId = document.querySelector("#user-id")
    const userFname = document.querySelector("#user-fname");
    const userLname = document.querySelector("#user-lname");
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
        // userId.textContent = userData.id;
        userFname.textContent = userData.first_name;
        userLname.textContent = userData.last_name;
        userWage.textContent = userData.wage;
        userTime.textContent = userData.total_time;
        userEarnings.textContent = userData.total_earnings;
    }



    $("#dashboard-table").DataTable({
        "paging": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "language":
        {
            "zeroRecords": "",
            "emptyTable": "",
            "infoEmpty": "",
            "info": "",
        }
    });

    main();

});