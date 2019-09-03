var cat = document.getElementById("mover");
var angle = 0,
  lastTime = null;
function animate(time) {
  if (lastTime != null) {
    angle += (time - lastTime) * 0.01;
  }
  lastTime = time;
  cat.style.top = Math.sin(angle) * 20 + "px";
  cat.style.left = Math.cos(angle) * 20 + "px";
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Old school way of animating
var oldAnimatedCat = document.getElementById("oldMover");
var leftPos = 0;

setInterval(() => {
  leftPos += 2;
  oldAnimatedCat.style.left = leftPos + "px";
  if (leftPos == 500) {
    leftPos = 0;
  }
}, 10);

// requestAnimationFrame lesson
// Enter a callback that will get called whenever the browser is ready to repaint the window.
// Important notes:
// 1. the callback function is automatically passed a timestamp indicating the precise time requestAnimationFramee() was called.
// 2. requestAnimationFrame() returns a non 0 integer that can be passed into its nemesis counterpart cancelAnimationFrame() to cancel a requestAnimationFrame() call

// function testRequest(time) {
//   console.log(time);
//   requestAnimationFrame(testRequest);
// }

// requestAnimationFrame(testRequest);

var newAnimatedCat = document.getElementById("newMover");
var newLeftPos = 0;

// This is calling it only once, putting in only one request, telling the browser at its next chance run this code once, but we want to run it recursively. Request the animation, pass it the function to run, at the end of the function re run animate

// requestAnimationFrame(time => {
//   console.log(time);
//   newLeftPos += 5;
//   newAnimatedCat.style.left = newLeftPos + "px";
// });

function newMove(time) {
  newLeftPos += 5;
  newAnimatedCat.style.left = newLeftPos + "px";

  if (newLeftPos >= 500) {
    newLeftPos = 0;
  }
  requestAnimationFrame(newMove);
}

requestAnimationFrame(newMove);

// Lets take advantage of the timeStamp argument that requestAnimationFrame gives us for free through the callback.
const timedMover = document.getElementById("timedMover");
const percentDone = document.getElementById("percentDone");
const progressBar = document.getElementById("progressBar");
progressBar.style.backgroundColor = "green";
var startTime;

function moveIt(timeStamp, el, dist, duration) {
  let runTime = timeStamp - startTime;
  let progress = runTime / duration;
  percentDone.innerHTML = (progress * 100).toFixed(0) + "%";
  progressBar.innerHTML = "|";
  progressBar.style.width = (progress * 100).toFixed(0) + "%";
  progress = Math.min(progress, 1);
  el.style.left = (dist * progress).toFixed(2) + "px";
  if (runTime < duration) {
    requestAnimationFrame(function(timeStamp) {
      moveIt(timeStamp, el, dist, duration);
    });
  }
}

requestAnimationFrame(function(timeStamp) {
  startTime = timeStamp;
  moveIt(timeStamp, timedMover, 500, 60000);
});
