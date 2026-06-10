const closeButton = document.getElementById("ncb")
if (closeButton) {
  closeButton.addEventListener("click", onCloseNewsletter)
}

function onCloseNewsletter() {
  const popup = document.getElementById("npp")
  if (popup) {
    popup.classList.add("hide")
  }
}


