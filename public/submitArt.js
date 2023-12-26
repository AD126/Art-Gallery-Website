async function submitArt() {
  const artData = {
    title: document.getElementById("title").value,
    year: document.getElementById("year").value,
    category: document.getElementById("category").value,
    medium: document.getElementById("medium").value,
    description: document.getElementById("description").value,
    poster: document.getElementById("poster").value,
  };

  Object.keys(artData).forEach(
    (key) => (document.getElementById(key).value = "")
  );

  const titleCheckResponse = await fetch("/checkTitle", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "Title": artData.title }),
  });

  const titleCheckText = await titleCheckResponse.text();

  if (titleCheckResponse.ok) {
    artData.title = { "Title": artData.title, "Year": artData.year, "Category": artData.category, "Medium": artData.medium, "Description": artData.description, "Poster": artData.poster}
    const addArtResponse = await fetch("/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(artData.title),
    });

    const addArtText = await addArtResponse.text();
    alert(addArtResponse.ok ? "Art Added" : addArtText);
  } else {
    alert(titleCheckText);
  }
}
