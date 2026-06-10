const closeButton = document.getElementById("ncb")
const submitButton = document.getElementById("nsb")
const emailInput = document.getElementById("nei")
const nForm = document.getElementById("nf")
const nTitle = document.getElementById("nt")
if (closeButton) {
  closeButton.addEventListener("click", onCloseNewsletter);
}
if (submitButton) {
  submitButton.addEventListener("click", onSubmitNewsletter);
}
if (nForm) {
  nForm.addEventListener('submit', function(event) { event.preventDefault(); } )
}
if (emailInput) {
  emailInput.addEventListener('input', setTitleToDefault);
}

function onCloseNewsletter() {
  const popup = document.getElementById("npp");
  if (popup) {
    popup.classList.add("hide");
  }
}

async function onSubmitNewsletter(event) {
  try {
  const emailValue = emailInput.value;
  const response = await fetch('/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailValue })
  });

  const body = await response.json();
  console.log("RESPONSE: ");
  console.log(body);

  const ret = body.return;
  if (ret === 0) {
    setTitleToSucess();
  } else {
    setTitleToError();
  }
  } catch (err) {
    setTitleToError();
    console.log("Error: " + err.message);
  }
  event.preventDefault();
}

// Title functions
function setTitleToSucess() {
  emailInput.value = "";
  nTitle.textContent = 'Check your inbox!';
  nTitle.classList.add("success_title");
}

function setTitleToError() {
  nTitle.textContent = 'Failed';
  nTitle.classList.add("failed_title");
}

function setTitleToDefault() {
  nTitle.textContent = 'Newsletter';
  nTitle.classList.remove("failed_title");
  nTitle.classList.remove("success_title");
}