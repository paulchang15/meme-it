async function postSortHandler(event) {
  event.preventDefault();
  console.log("============clicked===========");
  const sortBy = event.target.getAttribute("data-sort");
  console.log(sortBy);
  const sort = await fetch("/api/posts/", {
    method: "GET",
    params: JSON.stringify({
      // pass in data from string to either be "default" or "vote"
      sort: sortBy,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

document
  .getElementById("newest-post")
  .addEventListener("click", postSortHandler);
document
  .getElementById("vote-count")
  .addEventListener("click", postSortHandler);
