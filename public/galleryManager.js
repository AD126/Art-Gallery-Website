async function postComment() {
  const comment = document.getElementById("comments").value;
  document.getElementById("comments").value = "";
  const artId = new URL(window.location.href).pathname.split("/").pop();

  const response = await fetch("/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artLocation: artId, comments: comment }),
  });

  const text = await response.text();
  alert(response.ok ? text : text);
  if (response.ok) window.location.reload();
}

async function likeArt() {
  const artId = new URL(window.location.href).pathname.split("/").pop();

  const response = await fetch("/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artLocation: artId }),
  });

  const text = await response.text();
    alert(response.ok ? text : text);
    if (response.ok) window.location.reload();
}
