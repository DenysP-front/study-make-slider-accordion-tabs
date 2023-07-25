const accordionBox = document.querySelector(".accordion");

function getAccordionMessage(targetEl, startText) {
  console.log(targetEl)
  const taskName = targetEl.closest('.task').querySelector('.task-head').textContent.slice(11);
  const eventName = `${startText} eлемент ${targetEl.querySelector('.accordion__head').textContent}`
  checkMsg(taskName, eventName)
}

function addNewAccordionItem(
  accordionItem,
  accordionHead,
  contentTitle,
  contentText
) {
  accordionItem.insertAdjacentHTML(
    "afterend",
    `
  <div class="accordion__item">
                        <div class="accordion__head">${accordionHead}</div>
                        <div class="accordion__body">
                            <div class="accordion__content">
                                <p>${contentTitle}</p>
                                <p>${contentText}</p>
                            </div>
                            <div class="accordion__actions">
                                <button class="accordion__btn accordion__btn--add" type="button" title="Додати елемент">+</button>
                                <button class="accordion__btn accordion__btn--remove" type="button" title="Видалити елемент">-</button>
                            </div>
                        </div>
                    </div>
  `
  );
}

function addNewAccordionHandler(target) {
  const accordionItem = target.closest(".accordion__item");
  let accordionHead =
    prompt("Введіть назву елемента") ||
    `Елемент №${accordionBox.children.length + 1}`;
  let contentTitle = prompt("Введіть заголовок контент") || `Заголовок`;
  let contentText = prompt("Додайте контент") || `Контент`;
  addNewAccordionItem(accordionItem, accordionHead, contentTitle, contentText);
  getAccordionMessage(accordionItem.nextElementSibling, 'Додано')
}

function removeAccordionItem(target) {
  const accordionItem = target.closest(".accordion__item");
  getAccordionMessage(accordionItem, 'Видалено')
  accordionItem.remove();
}

function openCloseAccordion(targetEL) {
  if (targetEL.parentElement.classList.contains("open")) {
    targetEL.parentElement.classList.remove("open");
  } else {
    removeClasses(accordionBox.children, "open");
    targetEL.parentElement.classList.add("open");
  }
}

accordionBox.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("accordion__head")) {
    openCloseAccordion(target);
  }
  if (target.classList.contains("accordion__btn--add")) {
    addNewAccordionHandler(target);
  }
  if (target.classList.contains("accordion__btn--remove")) {
    removeAccordionItem(target);
  }
});
