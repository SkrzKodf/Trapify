document.getElementById('reg').style.display = 'none';
document.getElementById('login').style.display = 'block';

document.getElementById('showReg').addEventListener('click', function (event) {
    document.getElementById('reg').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    event.preventDefault();
});

document
    .getElementById('showLogin')
    .addEventListener('click', function (event) {
        document.getElementById('reg').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        event.preventDefault();
    });
