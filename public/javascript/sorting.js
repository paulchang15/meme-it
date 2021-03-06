async function postSortHandler(event) {
  event.preventDefault();
  console.log("============clicked===========");
  const sortBy = event.target.getAttribute("data-sort");
  const sort = await fetch("/api/posts/", {
    method: "GET",
    body: JSON.stringify({
      // pass in data from string to either be "default" or "vote"
      expression: sortBy,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
