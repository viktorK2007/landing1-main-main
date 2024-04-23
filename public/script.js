const feedbackForm = document.getElementsByClassName("form_box")[0];



function sendFeedback(feedback) {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      console.log("припиздярило");
    })
    .catch((error) => {
      console.log(error);
    });
}

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  console.log("feedbackFormData", feedbackFormData);
  const feedback = Object.fromEntries(feedbackFormData);
  console.log("feedback", feedback);

  sendFeedback(feedback);
});

feedbackForm.onsubmit = (e) => {
  e.target.reset()
}
console.log()