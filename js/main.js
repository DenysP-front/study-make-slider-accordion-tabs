const messageBox = document.querySelector(".message-box"),
messageBoxClose = document.querySelector(".message-box__close"),
messageTarget = document.querySelector(".message-box__target"),
messageEvent = document.querySelector(".message-box__event");

function checkMsg(taskName, eventName) {
  messageBox.classList.add("show");
  messageTarget.textContent = `У завданні ${taskName}`;
  messageEvent.textContent = eventName
}

function closeMessage() {
  messageBox.classList.remove('show')
}

messageBoxClose.addEventListener('click', closeMessage)
function removeClasses(elements, className) {
  for(el of elements) {
    el.classList.remove(className);
  }
}