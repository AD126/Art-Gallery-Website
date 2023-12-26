async function enrollInWorkshop() {
  const workshopId = new URL(window.location.href).pathname.split("/").pop();

  const response = await fetch("/enroll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: workshopId }),
  });

  const text = await response.text();
  alert(text);
}
