const closeButton = document.getElementById("ncb")
const submitButton = document.getElementById("nsb")
const emailInput = document.getElementById("nei")
const nForm = document.getElementById("nf")
if (closeButton) {
  closeButton.addEventListener("click", onCloseNewsletter);
}
if (submitButton) {
  submitButton.addEventListener("click", onSubmitNewsletter);
}
if (nForm) {
  nForm.addEventListener('submit', function(event) { event.preventDefault(); } )
}

function onCloseNewsletter() {
  const popup = document.getElementById("npp");
  if (popup) {
    popup.classList.add("hide");
  }
}

async function onSubmitNewsletter(event) {
  const emailValue = emailInput.value;
  const response = await fetch('/functions/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailValue })
  });
  console.log(`sent: ${emailValue}`)
  event.preventDefault();
}