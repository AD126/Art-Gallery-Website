async function userLogin() {
  const credentials = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  // Clear form fields
  Object.keys(credentials).forEach(
    (key) => (document.getElementById(key).value = "")
  );

  const response = await fetch("/login", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const text = await response.text();
  response.ok? (alert(text), (window.location.href = "/profile")): alert(text);
}
