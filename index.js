const questions = [
    {
        title: "The correct syntax for making a div is...",
        choices: ["<div>", "<div></div>", "<div/>", "<div><div/>"],
        answer: "<div></div>"
    },
    {
        title: "when linking a stylesheet, its best to enclose in a _____ tag?",
        choices: ["div", "a", "link", "p"],
        answer: "link"
    },
    {
        title: "when calling an id, you must use ____?",
        choices: ["You can only call classes, not id's", "$", ".", "#"],
        answer: "#"
    },
    {
        title: "The best way to debug code as well as making sure youre succesful is by using which function?",
        choices: ["console.log", "check.log", "writeToPage.log", "error.log"],
        answer: "console.log"
    },
    {
        title: "What's the popular coding acronym KISS stand for?",
        choices: ["Keep It Simple Silly", "Keep It Simple Stupid", "Keep Inventing Suitable Syntax", "Keep Investing in Suitable Syntax"],
        answer: "Keep It Simple Stupid"
    }
];

let currentIndex = 0;
let correct = 0;
let incorrect = 0;

$("#quiz-container").hide();
$("#all-done").hide();
$(".correct").hide();
$(".incorrect").hide();
$("#highscores-container").hide();

function setNextQuestion() {
    $("#askQuestion").text(questions[currentIndex].title);
    $("#option1").text(questions[currentIndex].choices[0]);
    $("#option2").text(questions[currentIndex].choices[1]);
    $("#option3").text(questions[currentIndex].choices[2]);
    $("#option4").text(questions[currentIndex].choices[3]);
    console.log(questions[currentIndex]);
    console.log('currentIndex', currentIndex);
}

$("#start-button").on("click", function () {
    $("#startScreen").hide();
    $("#highscore").hide();
    $("#quiz-container").show();
    setNextQuestion();

    let timeLeft = 75;
    let downloadTimer = setInterval(function () {
        $("#time").html("Time: " + timeLeft + " seconds remaining");
        timeLeft -= 1;
        if (timeLeft <= 0) {
            clearInterval(downloadTimer);
            $("#time").html("Finished");
            $("#quiz-container").hide();
            allDone();
        }
    }, 1000);

    $(".nextQuestion").on("click", function () {
        if ($(this).text() === questions[currentIndex].answer) {
            correct += 10;
            $(".correct").show();
            setTimeout(function () {
                $('.correct').fadeOut('fast');
            }, 1000);
        } else {
            incorrect++;
            $(".incorrect").show();
            setTimeout(function () {
                $('.incorrect').fadeOut('fast');
            }, 1000);
            timeLeft = timeLeft - 10;
        }
        if (currentIndex < 4) {
            currentIndex++;
            setNextQuestion();

        } else {
            $("#quiz-container").hide();
            allDone();
            clearInterval(downloadTimer);
            $("#time").html("Finished with " + timeLeft + " seconds left!");
        }
    });
})


function allDone() {
    $("#all-done").show();
    $("#finalScore").html("Your final score is " + correct + "!");
    $("#highscore").show();
}


// put score in local storage
let highScoreList = JSON.parse(localStorage.getItem('highScoreList')) || [];


function generateHighscore() {
    localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
    for (let i = 0; i < highScoreList.length; i++) {
        const currentUser = highScoreList[i];
        console.log(currentUser);
        $("#scoreList").prepend("<br><hr>" + currentUser.userInitials + " - " + currentUser.score);
    }
}


$("#submitInitials").on("click", function () {
    let newUser = {
        userInitials: $("#enterInitials").val(),
        score: correct
    }
    highScoreList.push(newUser);
    generateHighscore();
    $("#all-done").hide();
    $("#highscore").show();
    $("#highscores-container").show();
})


$("#highscore").on("click", function () {
    $("#highscores-container").show();
    $("#startScreen").hide();
    generateHighscore();
})


document.querySelector("#highscore").style.color = "blue";


$("#clearScores").on("click", function () {
    localStorage.clear();
    $("#scoreList").empty();
    highScoreList = [];
})