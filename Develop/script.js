/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. */

// References to DOM elements
var currentDayEl = $("#currentDay");
var timeBlockEls = $(".time-block"); // returns all elements with this class that we can iterate through
var textAreaEls = $(".description");

var currentDate = dayjs().format("dddd, MMMM D, YYYY");
var currentHour = parseInt(dayjs().format("HH")); // Military time (converted to int)

$(function () {
  /* Creates listener event for click events on the save button. Uses the id in the containing time-block as a key to save the user input in local storage. */
  $("button").click(function () {
    localStorage.setItem(
      $(this).parent().attr("id"),
      $(this).siblings(".description").val() // STUDY NOTE: val() needed instead of text() for inputs
    );
  });

  /* Applies the past, present, or future class to each time block by comparing the id to the current hour. */

  for (i = 0; i < timeBlockEls.length; i++) {
    var timeStr = $(timeBlockEls[i]).attr("id").slice(-2);
    var timeNum = parseInt(timeStr);

    if (currentHour > timeNum) {
      $(timeBlockEls[i]).addClass("past");
    } else if (currentHour < timeNum) {
      $(timeBlockEls[i]).addClass("future");
    } else {
      $(timeBlockEls[i]).addClass("present");
    }
  }

  //
  /* Retrieves any user input that was saved in localStorage and sets
  the values of the corresponding textarea elements. */

  for (i = 0; i < timeBlockEls.length; i++) {
    var elementID = $(timeBlockEls[i]).attr("id");
    var rowText = localStorage.getItem(elementID);

    if (rowText !== null) {
      $(timeBlockEls[i]).children(".description").val(rowText);
    }
  }

  // Displays the current date in the header of the page.
  currentDayEl.text(currentDate);
});
