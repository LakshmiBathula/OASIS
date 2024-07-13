document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupLink = document.getElementById('signupLink');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                alert('Login successful!');
        
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    signupLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Redirect to sign up page or handle sign up logic');

    });
});
