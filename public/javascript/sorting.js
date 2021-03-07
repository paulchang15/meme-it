document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
  const selectEl = document.querySelector("#sort");

  async function postSortHandler(event) {
    event.preventDefault();
    console.log(selectEl);

    const sort = await fetch("/api/posts/", {
      method: "GET",
      params: JSON.stringify({
        // pass in data from string to either be "default" or "vote"
        sort: selectEl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  selectEl.addEventListener("change", postSortHandler);
});
// document
//   .querySelector("#sort-option")
//   .addEventListener("click", postSortHandler);
