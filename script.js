document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const singleUser = document.getElementById('single-user');
    const addUserForm = document.getElementById('add-user-form');
    const loginForm = document.getElementById('login-form');

    // Fetch all users
    async function fetchUsers() {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();
        userList.innerHTML = users.map(user => `<div class="user">${user.name.firstname} ${user.name.lastname} (${user.email})</div>`).join('');
    }

    // Fetch a single user by ID
    async function fetchUser(id) {
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        const user = await response.json();
        singleUser.innerHTML = `<div class="user">${user.name.firstname} ${user.name.lastname} (${user.email})</div>`;
    }

    // Add a new user
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const city = document.getElementById('city').value;
        const street = document.getElementById('street').value;
        const number = document.getElementById('number').value;
        const zipcode = document.getElementById('zipcode').value;
        const lat = document.getElementById('lat').value;
        const long = document.getElementById('long').value;
        const phone = document.getElementById('phone').value;

        const response = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                password,
                name: {
                    firstname,
                    lastname
                },
                address: {
                    city,
                    street,
                    number,
                    zipcode,
                    geolocation: {
                        lat,
                        long
                    }
                },
                phone
            })
        });
        const newUser = await response.json();
        alert(`User ${newUser.name.firstname} added!`);
        fetchUsers();
    });

    // User login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await response.json();
        alert(`Token: ${result.token}`);
    });

    // Initial fetch
    fetchUsers();
    fetchUser(1); // Fetch user with ID 1 for demonstration
});
