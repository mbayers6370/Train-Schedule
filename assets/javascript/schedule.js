window.onload = function () {
    var frequency;
    var minutesAway;
    var nextArrival;
    var first;
    var name;
    var dest;
    var counter = 0;

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBTETxTNVkRIvkoUvGc_pguSgGeRe6G65M",
        authDomain: "train-scheduler-73908.firebaseapp.com",
        databaseURL: "https://train-scheduler-73908.firebaseio.com",
        projectId: "train-scheduler-73908",
        storageBucket: "train-scheduler-73908.appspot.com",
        messagingSenderId: "684927012674",
        appId: "1:684927012674:web:32e4c202825338b48142db"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // setting database to a variable
    const db = firebase.database().ref();

    db.on("value", function(snapshot){
        if(counter < 1){ 
            $("#body").append("<tr><td>" + snapshot.val().name + "</td><td>" + snapshot.val().dest + "</td><td>" + snapshot.val().frequency + "</td><td>" + snapshot.val().nextArrival + "</td><td>" + snapshot.val().minutesAway + "</td></tr>")
            counter += 1;
        } 
    })

    // when clicking submit button
    $("#submit").on("click", function (event) {
        //setting variables from values obtained
        first = $("#first").val();
        name = $("#trainName").val();
        dest = $("#destination").val();
        frequency = $("#frequency").val();

        //calling function to compute times
        time();

        //sending variables to database
        db.set({
            name: name,
            dest: dest,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway
        });

        //adding new row to table
        $("#body").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>")

    });

    // function to calculate nextArrival & minutesAway
    function time() {
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // Time apart set to a positive number(remainder)
        var remainder = diffTime % frequency;

        // Minute Until Train
        minutesAway = frequency - remainder;

        // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextTrain).format("hh:mm");
    };

};