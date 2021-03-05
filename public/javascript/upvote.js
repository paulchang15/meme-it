async function upvoteClickHandler(event) {
  event.preventDefault();
  console.log("clicked!!!!!!!!!");
  // const id = document.getElementById("user").getAttribute("data-user");
  // let postId = document.getElementById("user").getAttribute("href");
  // await postId.split("/post/");

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id);
  const response = await fetch("/api/posts/upvote", {
    method: "PUT",
    body: JSON.stringify({
      // user_id: id,
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".upvote-btn")
  .addEventListener("click", upvoteClickHandler);
