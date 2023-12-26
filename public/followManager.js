async function followArtist() {
  const artistId = new URL(window.location.href).pathname.split("/").pop();

  const response = await fetch("/follow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ artistId }),
  });

  const text = await response.text();
  alert(response.ok ? "Following successful" : text);
}
