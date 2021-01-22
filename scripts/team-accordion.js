// const acc_btns = document.querySelectorAll(".team-btn");
// const acc_contents = document.querySelectorAll(".team-info");

// acc_btns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     acc_contents.forEach((acc) => {
//       if (
//         e.target.nextElementSibling !== acc &&
//         acc.classList.contains("active")
//       ) {
//         acc.classList.remove("active");
//         acc_btns.forEach((btn) => btn.classList.remove("active"));
//       }
//     });

//     const panel = btn.nextElementSibling;
//     panel.classList.toggle("active");
//     btn.classList.toggle("active");
//   });
// });

// window.onclick = (e) => {
//   if (!e.target.matches(".team-btn")) {
//     acc_btns.forEach((btn) => btn.classList.remove("active"));
//     acc_contents.forEach((acc) => acc.classList.remove("active"));
//   }
// };

const openItem = (item) => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
};

const closeEveryItem = (container) => {
  const items = container.find(".team__content");
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
};

$(".team__title").click((e) => {
  const $this = $(e.currentTarget);
  const container = $this.closest(".team");
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});
