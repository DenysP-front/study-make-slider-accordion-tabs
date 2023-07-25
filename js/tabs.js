const tabsBox = document.querySelector(".tabs"),
  tabsNav = document.querySelector(".tabs-nav"),
  tabsContent = document.querySelector(".tabs-content"),
  tabsNavBtn = tabsNav.children,
  tabsContentItems = tabsContent.children;

function getMessage(targetEl, startText) {
  const taskName = targetEl.closest('.task').querySelector('.task-head').textContent.slice(11);
  const eventName = `${startText} eлемент ${tabsNav.lastElementChild.textContent.slice(0, -17)}`
  checkMsg(taskName, eventName);
}

function addTab(e) {
  const titleTab = prompt("") || `Таб tabsNav.length + 1`;
  const titleText = prompt("") || `Заголовок контента`;
  const textContent = prompt("") || "Якийсь цікавий контент";

  removeClasses(tabsNav.children, "active");
  removeClasses(tabsContent.children, "active");
  const newTabDataset = tabsNav.length + 1;
  tabsNav.insertAdjacentHTML(
    "beforeend",
    `
                <li class="tabs-nav__item" data-id="${newTabDataset}">${titleTab}</li>
            `
  );
  tabsContent.insertAdjacentHTML(
    "beforeend",
    `
            <li class="tabs-content__item" data-content="${newTabDataset}">
            <div class="content">
                <p>${titleText}</p>
                <p>
                ${textContent}
                </p>
            </div>
              </li>
            `
  );
  lastTabBtnAddPlusMinus(tabsNav.lastElementChild);
  const target = e.target;
  getMessage(target, 'Додано')
  target.parentElement.children[1].remove();
  target.parentElement.children[0].remove();
  addClassActive(tabsNav.lastElementChild, tabsContent.lastElementChild);
}

function removeTab(e) {
  removeClasses(tabsNav.children, "active");
  removeClasses(tabsContent.children, "active");
  const targetEl = e.target.parentElement;
  getMessage(targetEl, 'Видалено')
  tabsNav.lastElementChild.remove();
  tabsContent.lastElementChild.remove();
  addClassActive(tabsNav.lastElementChild, tabsContent.lastElementChild);
  lastTabBtnAddPlusMinus(tabsNav.lastElementChild);
}

function lastTabBtnAddPlusMinus(targetEl) {
  if (targetEl !== null) {
    targetEl.insertAdjacentHTML(
      "beforeend",
      `
        <button type="button" title="Додати таб">+</button>
        <button type="button" title="Видалити таб">-</button>
    `
    );
  }
}

function addClassActive(itemTab, itemContent) {
  if (itemTab !== null) {
    itemTab.classList.add("active");
    itemContent.classList.add("active");
  }
}

function openTabs(e) {
  let currentBtn = e.target;
  let currentTab = tabsContent.querySelector(
    `[data-content="${currentBtn.dataset.id}"]`
  );
  removeClasses(tabsNav.children, "active");
  removeClasses(tabsContent.children, "active");
  addClassActive(currentBtn, currentTab);
}

window.addEventListener("load", () => {
  lastTabBtnAddPlusMinus(tabsNav.lastElementChild);
});

tabsBox.addEventListener("click", (event) => {
  if (event.target.classList.contains("tabs-nav__item")) {
    openTabs(event);
  }
  if (event.target.textContent === "-") {
    removeTab(event);
  }
  if (event.target.textContent === "+") {
    addTab(event);
  }
});
