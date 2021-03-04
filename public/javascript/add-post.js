async function newFormHandler(event) {
  event.preventDefault();

  const url = document.getElementById("url");
  const title = document.querySelector('input[name="post-title"]').value;
  // const content = document.querySelector('input[name="post-content"]').value;
  // const img_url = document.querySelector('input[name="img-url"]').value;

  // const response = await fetch(`/api/posts`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     title,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const response = await fetch("/api/posts/", {
    method: "POST",
    body: JSON.stringify({ title, img_url: url.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
    // document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
