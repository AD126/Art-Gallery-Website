async function submitWorkshop() {
  const workshopData = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
  };

  // Clear form fields
  Object.keys(workshopData).forEach(
    (key) => (document.getElementById(key).value = "")
  );

  // Add workshop
  const response = await fetch("/workshop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(workshopData),
  });

  const text = await response.text();
  alert(text);
}
