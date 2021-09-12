auth.onAuthStateChanged(user=> {
    getTodoList();
    setupUI(user);
})

const logout = document.querySelector('#logout');
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut();
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(()=>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.querySelector('.error').innerHTML = '';
        loginForm.reset();
    }).catch(err=>{
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then(()=>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.querySelector('.error').innerHTML = '';
        signupForm.reset();
    }).catch(err=>{
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})