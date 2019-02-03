// Initialize Firebase
var config = {
    apiKey: "AIzaSyDycUg1jpUezAddUe_qdAMU7LRxuSLA6Zs",
    authDomain: "my-first-project-ba93a.firebaseapp.com",
    databaseURL: "https://my-first-project-ba93a.firebaseio.com",
    projectId: "my-first-project-ba93a",
    storageBucket: "my-first-project-ba93a.appspot.com",
    messagingSenderId: "380354695639"
    };
    firebase.initializeApp(config);
    
    // Reference granting access to database
    var database = firebase.database();
    
    // Setting initial values
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    
    // Empties values in tables to take in user input
    $("#exampleInputTrain1").val("");
    $("#exampleInputCity1").val("");
    $("#exampleInputTime1").val("");
    $("#exampleInputFrequency1").val("");
    
    // Event handler for retaining train info on screen upon click of submit button
    $(".submit-form").on("click", function(event)    {
    // Prevent page from refreshing
        event.preventDefault();
    // Values to be stored based on user input    
        trainName = $("#exampleInputTrain1").val().trim();
        destination = $("#exampleInputCity1").val().trim();
        firstTrain = moment($("#exampleInputTime1").val().trim(), "HH:mm a").format("X");
        frequency = $("#exampleInputFrequency1").val().trim();
        console.log(trainName);
    
    // Updates in Firebase
        var trainInfo = ({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
        });
    
        database.ref().push(trainInfo);
    });
            database.ref().on("child_added", function(snapshot)   {
            console.log(snapshot.val());
    
    // Values to be stored in database        
            trainName = snapshot.val().trainName;
            destination = snapshot.val().destination;
            firstTrain = snapshot.val().firstTrain;
            frequency = snapshot.val().frequency;
    
    // Variables to calculate next arrival in military time and how many minutes away
            var nextArrivalPretty = moment.unix(firstTrain).format("HH:mm a");
            var minutesAway = moment().diff(moment(nextArrivalPretty, "X"), "minutes");
            var nextArrival = minutesAway * frequency;
            nextArrival = moment().format("HH:mm a");

            function time_convert(minutesAway)  {
                var minutes = minutesAway % 60;
                console.log(minutes);
                return minutes;
            }  
    
    // Row to be added with stored user input
        var rowAdd = $("<tr>").append(
            $("<td id='train-name'>").text(trainName),
            $("<td id='train-city'>").text(destination),
            $("<td id='frequency'>").text(frequency),
            $("<td id='next-arrival'>").text(nextArrival),
            $("<td id='minutes-away'>").text(time_convert(minutesAway))
        );
    
    // Appending user input to row
            $("#train-table > tbody").append(rowAdd);
        });
    
    