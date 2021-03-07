document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
  const selectEl = document.querySelector("#sort");

  async function postSortHandler(event) {
    event.preventDefault();
    console.log(selectEl);

    const sort = await fetch(`/api/posts/?sort=${selectEl.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (sort.ok) {
      document.location.replace("/dashboard");
      // document.location.reload();
    } else {
      alert(sort.statusText);
    }
  }

  selectEl.addEventListener("change", postSortHandler);
});
// document
//   .querySelector("#sort-option")
//   .addEventListener("click", postSortHandler);
