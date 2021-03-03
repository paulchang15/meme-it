async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="post-content"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      img_url,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(newPost.statusText);
  }
}

document.addEventListener("", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
