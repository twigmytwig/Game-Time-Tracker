document.getElementById("newGameSubmit").addEventListener("click", submitNewGame);

async function submitNewGame(){
    let gameName = document.getElementById("newGameName").value;

    const response = await fetch("http://127.0.0.1:5000/api/SubmitNewGame", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(gameName)
    });
    alert(response.json);
    return response.json();
}