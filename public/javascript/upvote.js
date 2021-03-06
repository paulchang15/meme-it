async function upvoteClickHandler(event) {
  event.preventDefault();
  console.log("clicked!!!!!!!!!");
  const id = event.target.getAttribute("data-post");
  console.log(id);
  const response = await fetch("/api/posts/upvote", {
    method: "POST",
    body: JSON.stringify({
      // user_id: id,
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log({ x: response.ok });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelectorAll(".upvote-btn").forEach((element) => {
  element.addEventListener("click", upvoteClickHandler);
});
