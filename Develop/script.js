/* Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html. */

// References to DOM elements
var currentDayEl = $("#currentDay");
var timeBlockEls = $(".time-block"); // returns all elements with this class that we can iterate through

var currentDate = dayjs().format("dddd, MMMM D, YYYY");
var currentHour = parseInt(dayjs().format("HH")); // Military time (string)

$(function () {
  /* listener evemt for click events on the save button. Uses the id in the containing time-block as a key to save the user input in local storage. */
  $("button").click(function () {
    localStorage.setItem(
      $(this).parent().attr("id"),
      $(this).siblings(".description").val() // STUDY NOTE: val() needed instead of text() for inputs
    );
  });

  /* TODO: Add code to apply the past, present, or future class to each time
  block by comparing the id to the current hour. HINTS: How can the id
  attribute of each time-block be used to conditionally add or remove the
  past, present, and future classes?*/

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
  /* TODO: Add code to get any user input that was saved in localStorage and set
  the values of the corresponding textarea elements. HINT: How can the id
  attribute of each time-block be used to do this? */

  // Displays the current date in the header of the page.
  currentDayEl.text(currentDate);
});
