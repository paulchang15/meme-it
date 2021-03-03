async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('input[name="post-content"]').value;
  const img_url = document.querySelector('input[name="img-url"]').value;

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
<<<<<<< HEAD
      img_url,
=======
      img_url  
>>>>>>> 1232bc42def5bf0b76ef88b2d1708fa525f380f8
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.addEventListener("", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
});

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
