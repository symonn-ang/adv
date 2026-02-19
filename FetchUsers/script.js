
async function getUser() {

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
            throw new Error(`Fetch Failed: ${res.status}`)
        }

        const data = await res.json();
        const userList = document.getElementById("userList");

        userList.innerHTML = data.map(user => `
            <div>
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>City: ${user.address.city}</p>
            </div>
        `).join("");

    }
    catch (error) {
        console.log(`Error: ${error}`)
    }

}

getUser()