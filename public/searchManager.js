async function performSearch() {
    const searchCriteria = {
        Medium: document.getElementById("medium").value,
        Category: document.getElementById("category").value
    };

    // Clear form fields
    Object.keys(searchCriteria).forEach(key => document.getElementById(key).value = '');

    if (searchCriteria.Medium != "" && searchCriteria.Category != "") {
        searchCriteria.Medium = { "Medium": searchCriteria.Medium };
        searchCriteria.Category = { "Category": searchCriteria.Category };
    }

    const response = await fetch("/search", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchCriteria)
    });

    const artResults = await response.json();
    if (artResults.length > 0) {
        alert("Search complete");
        let resultsHTML = "";
        artResults.forEach(artpiece => {
            resultsHTML += `<h4><a href="/gallery/${artpiece._id}">${artpiece.Title}</a></h4>`;
        });
        document.getElementById("login").innerHTML = resultsHTML;
    } else {
        alert("Nothing found");
    }
}