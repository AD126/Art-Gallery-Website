async function removeUserLike(artTitle) {
  const response = await fetch("/likes", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: artTitle }),
  });

  const text = await response.text();
  response.ok ? (alert(text), window.location.reload()) : alert(text);
}

async function unfollowArtist(artistId) {
  const response = await fetch("/follow", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: artistId }),
  });

  const text = await response.text();
  response.ok ? (alert(text), window.location.reload()) : alert(text);
}

async function removeUserComment(comment) {
  const response = await fetch("/comments", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comments: comment }),
  });

  const text = await response.text();
  response.ok ? (alert(text), window.location.reload()) : alert(text);
}

async function switchUserAccount() {
  const response = await fetch("/switchAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const text = await response.text();
  response.ok? (alert(text), window.location.reload()): (alert(text), window.location.href = "/addArt");
}

async function userLogout() {
  const response = await fetch("/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  const text = await response.text();
  response.ok? (alert(text), window.location.href = "/"): alert(text);
}
