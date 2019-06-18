// Initialize Firebase
var config = {
    apiKey: "AIzaSyDycUg1jpUezAddUe_qdAMU7LRxuSLA6Zs",
    authDomain: "my-first-project-ba93a.firebaseapp.com",
    databaseURL: "https://my-first-project-ba93a.firebaseio.com",
    storageBucket: "train-times-93583.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  var trainData = firebase.database();
  
  // 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)
  // 3. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    // Prevent the default form submit behavior
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input")
      .val()
      .trim();
    var destination = $("#destination-input")
      .val()
      .trim();
    var firstTrain = $("#first-train-input")
      .val()
      .trim();
    var frequency = $("#frequency-input")
      .val()
      .trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads train data to the database
    trainData.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
  
    var timeArr = tFirstTrain.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;
  
    // If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrival = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    } else {
      // Calculate the minutes until arrival using hardcore math
      // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
      // and find the modulus between the difference and the frequency.
      var differenceTimes = moment().diff(trainTime, "minutes");
      var tRemainder = differenceTimes % tFrequency;
      tMinutes = tFrequency - tRemainder;
      // To calculate the arrival time, add the tMinutes to the current time
      tArrival = moment()
        .add(tMinutes, "m")
        .format("hh:mm A");
    }
    console.log("tMinutes:", tMinutes);
    console.log("tArrival:", tArrival);
  
    // Add each train's data into the table
    $("#train-table > tbody").append(
      $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes)
      )
    );
  });
  
  
// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyDycUg1jpUezAddUe_qdAMU7LRxuSLA6Zs",
//     authDomain: "my-first-project-ba93a.firebaseapp.com",
//     databaseURL: "https://my-first-project-ba93a.firebaseio.com",
//     projectId: "my-first-project-ba93a",
//     storageBucket: "my-first-project-ba93a.appspot.com",
//     messagingSenderId: "380354695639"
//     };
//     firebase.initializeApp(config);
    
//     // Reference granting access to database
//     var database = firebase.database();
    
//     // Setting initial values
//     var trainName;
//     var destination;
//     var firstTrain;
//     var frequency;
    
//     // Empties values in tables to take in user input
//     $("#exampleInputTrain1").val("");
//     $("#exampleInputCity1").val("");
//     $("#exampleInputTime1").val("");
//     $("#exampleInputFrequency1").val("");
    
//     // Event handler for retaining train info on screen upon click of submit button
//     $(".submit-form").on("click", function(event)    {
//     // Prevent page from refreshing
//         event.preventDefault();
//     // Values to be stored based on user input    
//         trainName = $("#exampleInputTrain1").val().trim();
//         destination = $("#exampleInputCity1").val().trim();
//         firstTrain = moment($("#exampleInputTime1").val().trim(), "HH:mm a").format("X");
//         frequency = $("#exampleInputFrequency1").val().trim();
//         console.log(trainName);
    
//     // Updates in Firebase
//         var trainInfo = ({
//             trainName: trainName,
//             destination: destination,
//             firstTrain: firstTrain,
//             frequency: frequency
//         });
    
//         database.ref().push(trainInfo);
//     });
//             database.ref().on("child_added", function(snapshot)   {
//             console.log(snapshot.val());
    
//     // Values to be stored in database        
//             trainName = snapshot.val().trainName;
//             destination = snapshot.val().destination;
//             firstTrain = snapshot.val().firstTrain;
//             frequency = snapshot.val().frequency;
    
//     // Variables to calculate next arrival in military time and how many minutes away
//             var nextArrivalPretty = moment.unix(firstTrain).format("HH:mm a");
//             var minutesAway = moment().diff(moment(nextArrivalPretty, "X"), "minutes");
//             var nextArrival = minutesAway * frequency;
//             nextArrival = moment().format("HH:mm a");

//             function time_convert(minutesAway)  {
//                 var minutes = minutesAway % 60;
//                 console.log(minutes);
//                 return minutes;
//             }  
    
//     // Row to be added with stored user input
//         var rowAdd = $("<tr>").append(
//             $("<td id='train-name'>").text(trainName),
//             $("<td id='train-city'>").text(destination),
//             $("<td id='frequency'>").text(frequency),
//             $("<td id='next-arrival'>").text(nextArrival),
//             $("<td id='minutes-away'>").text(time_convert(minutesAway))
//         );
    
//     // Appending user input to row
//             $("#train-table > tbody").append(rowAdd);
//         });
    
    