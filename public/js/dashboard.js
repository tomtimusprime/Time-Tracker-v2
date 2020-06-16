$(document).ready(function () {
    // var userIdInput = $("#userId");
    var userList = $("tbody");
    var userContainer = $(".user-container");



    // $(document).on("click", ".delete-user", handleDeleteButtonPress);

    // Getting the initial list of users
    // getUsers();

    // Set the defaults for the dashboard-table display
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

    // Function for retrieving users and getting them ready to be rendered to the page
    function getUsers() {
        $.get("/api/dashboard", function (data) {
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
                rowsToAdd.push(createUserRow(data[i]));
            }
            renderUserList(rowsToAdd);
        });
    }
    

    // $("#submitUser").on("click", function (event) {
    //     console.log(userID);

    //     event.preventDefault();

    //     getUserById(userID);
    // });
    // var userID = $("#enteredUserId").val().trim();

    let userID;
 
    $.get("/api/dashboard/:id").then(function(data) {
        console.log("I am in the .get(//api/dashboard/:id/)");
        console.log(data);
        userID = data.id;
        console.log(userID);

        event.preventDefault();

        getUserById(userID);
      });

    function getUserById(userID) {

        console.log(userID);

        $.ajax({
            method: "GET",
            url: "/api/dashboard/" + userID
            
        })
            .then(getUsers);
    }

    
    // Function for creating a new list row for users
    function createUserRow(userData) {
        var newTr = $("<tr>");
        newTr.data("user", userData);
        newTr.append("<td>" + userData.id + "</td>");
        newTr.append("<td>" + userData.first_name + "</td>");
        newTr.append("<td>" + userData.last_name + "</td>");
        newTr.append("<td>" + userData.time_worked + "</td>");
        newTr.append("<td> $" + userData.wage + "</td>");
        newTr.append("<td>" + userData.total_time + "</td>");
        newTr.append("<td> $" + userData.total_earnings + "</td>");
        // newTr.append("<td><a style='cursor:pointer;color:red' class='delete-user'>Delete User</a></td>");
        // newTr.append("<td><button type='button' class='btn-red delete-user btn-sm m-0'>Delete User</button></td>");
        return newTr;
    }



    // A function for rendering the list of authors to the page
    function renderUserList(rows) {
        // $("#dashboard-table").DataTable({
        //     "retrieve": true,
        //     "scrollX": true,
        //     "searching": false,
        //     "language": {
        //         "lengthMenu": "",
        //         "zeroRecords": "",
        //         "info": "",
        //         "infoEmpty": ""
        //     }
        // });
        userList.children().not(":last").remove();
        userContainer.children(".alert").remove();
        if (rows.length) {
            console.log(rows);
            userList.prepend(rows);
        }
        else {
            renderEmpty();
        }
    }

    // Function for handling what to render when there are no users
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must create an User before you can create a Table of Users.");
        userContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    // function handleDeleteButtonPress() {
    //     var listItemData = $(this).parent("td").parent("tr").data("account");
    //     var id = listItemData.id;
    //     $.ajax({
    //         method: "DELETE",
    //         url: "/api/dashboard/" + id
    //     })
    //         .then(getUsers);
    // }
});