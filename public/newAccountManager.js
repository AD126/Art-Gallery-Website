async function createNewAccount() {
  const newUserInfo = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  // Clear form fields
  Object.keys(newUserInfo).forEach(
    (key) => (document.getElementById(key).value = "")
  );

  const response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUserInfo),
  });

  const text = await response.text();
  response.ok? (alert(text), (window.location.href = "/")): alert(text);
}
