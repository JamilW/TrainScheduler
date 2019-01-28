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
date = new moment("date", "MM/DD/YYYY");
//var currentTime = moment().format("MMMM Do YYYY, hh:mm:ss a");

// Event handler for retaining train info on screen upon click of submit button
$(".submit-form").on("click", function(event)    {
// Prevent page from refreshing
    event.preventDefault();
// Values to be stored based on user input    
    trainName = $("#exampleInputTrain1").val().trim();
    destination = $("#exampleInputCity1").val().trim();
    firstTrain = $("#exampleInputTime1").val().trim();
    frequency = $("#exampleInputFrequency1").val().trim();
        console.log(trainName);
// Updates in Firebase
    var trainInfo = ({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
//    time = firebase.database().ServerValue.TIMESTAMP
//  minutesAway: nextArrival - currentTime
    });

    database.ref().push(trainInfo);
});
        database.ref().on("child_added", function(snapshot)   {
            console.log(snapshot.val());
    
        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        firstTrain = snapshot.val().firstTrain;
        frequency = snapshot.val().frequency;
    });
