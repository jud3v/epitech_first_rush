document.getElementById("registre").addEventListener("submit", function(e) {
    /* stop the default effect of html */
    e.preventDefault()
    e.stopPropagation()

    /* Initialisation */
    let name = document.getElementById("name");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");
    let birthday = document.getElementById("birthday");
    let url = document.getElementById("url");
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('password-confirm');
    let urlError, phoneError, birthdayError, emailError, nameError, nameLengthError, radioError, passwordError, passwordConfirmError = undefined
    let nameErrorElement = document.getElementById('error-name')
    let emailErrorElement = document.getElementById('error-email')
    let phoneErrorElement = document.getElementById('error-phone')
    let urlErrorElement = document.getElementById('error-url')
    let radio = document.getElementsByName('sexe')
    let birthdayErrorElement = document.getElementById('error-birthday')
    let radioErrorElement = document.getElementById('error-radio')
    let passwordErrorElement = document.getElementById('error-password')
    let passwordConfirmErrorElement = document.getElementById('error-password-confirm')
    let validationNumber = 0;
    let notStrong = true;

    let sexeErrorElement = () => {
        for(let i = 0; i < radio.length; i++){
            if (! radio[i].checked){
                radio[i].classList.remove('bg-radio-red')
            }
        }
    }


    /* Verfication */
    if (!birthday.value) {
        birthdayError = "Veuillez renseigner une date de naissance valide";
        birthday.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!password.value) {
        passwordError = "Le mot de passe doit contenir une majuscule, chiffre et un caractère spécial";
        password.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!passwordConfirm.value) {
        passwordConfirmError = "Le mot de passe de confirmation ne peut être vide";
        passwordConfirm.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (passwordConfirm.value !== password.value) {
        passwordConfirmError = "Les mot des passe ne correspondent pas";
        passwordConfirm.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!url.value) {
        urlError = "Veuillez renseigner un url valide";
        url.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!phone.value) {
        phoneError = "Veuillez renseigner un numero de telephone valide";
        phone.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!email.value) {
        emailError = "Veuillez renseigner un email valide";
        email.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (!name.value) {
        nameError = "Veuillez renseigner votre nom";
        name.classList.add('bg-red')
    } else {
        validationNumber++
    }
    if (! radio[0].checked && !radio[1].checked && !radio[2].checked){
        radioError = "Vous devez sélectionner une valeur"
    } else {
        validationNumber++
    }
    if (name.value.length < 2) {
        nameLengthError = "Veuillez insérer minimum 2 caractères";
    } else {
        validationNumber++
    }
    let passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password.value.match(passw)){
        notStrong = false
        validationNumber++
        console.log('password looks great !')
    } else {
        notStrong = true;
        passwordError = "Le mot de passe n'est pas assez fort, il doit contenir une majuscule, un caractère spécial, un chiffre et doit faire au minimum 8 caractères."
    }


    /* Rendu des erreurs*/
    if (nameError !== undefined) {
        nameErrorElement.innerHTML = nameError;
    }
    if (emailError !== undefined) {
        emailErrorElement.innerHTML = emailError;
    }
    if (nameLengthError !== undefined) {
        nameErrorElement.innerHTML = nameLengthError;
    }
    if (phoneError !== undefined) {
        phoneErrorElement.innerHTML = phoneError;
    }
    if (urlError !== undefined) {
        urlErrorElement.innerHTML = urlError;
    }
    if (birthdayError !== undefined) {
        birthdayErrorElement.innerHTML = birthdayError;
    }
    if (radioError !== undefined) {
        radioErrorElement.innerHTML = radioError;
    }
    if (!password.value && passwordError !== undefined){
        passwordErrorElement.innerHTML = passwordError
    }
    if (!passwordConfirm.value && passwordConfirmError !== undefined){
        passwordConfirmErrorElement.innerHTML = passwordConfirmError
    }
    if (passwordConfirm.value !== password.value){
        passwordConfirmErrorElement.innerHTML = passwordConfirmError
    }
    if (notStrong){
        passwordErrorElement.innerHTML = passwordError
    }

    const getCheckedValue = () => {
        for (let i = 0; i < radio.length; i++){
            if(radio[i].checked){
                return radio[i].value
            }
        }
    }

    /* Suppression des erreur */
    setTimeout(() => {
        nameErrorElement.innerHTML = ''
        emailErrorElement.innerHTML = ''
        phoneErrorElement.innerHTML = ''
        urlErrorElement.innerHTML = ''
        birthdayErrorElement.innerHTML = ''
        radioErrorElement.innerHTML = ''
        passwordErrorElement.innerHTML = ''
        passwordConfirmErrorElement.innerHTML = ''
        sexeErrorElement()
        name.classList.remove('bg-red')
        url.classList.remove('bg-red')
        email.classList.remove('bg-red')
        phone.classList.remove('bg-red')
        birthday.classList.remove('bg-red')
        password.classList.remove('bg-red')
        passwordConfirm.classList.remove('bg-red')
    }, 20000)

    /* création de la requete ajax*/
    if (validationNumber === 11){
        const genre = getCheckedValue()
        let urlEncoded = url.value.replace('https://','') || url.value.replace('http://','')
        urlEncoded = urlEncoded.replace('/','')
        // requête ajax
        request('http://localhost:8888/exam2bonus/api/register/index.php','name='+name.value
            +'&password='+password.value
            +'&email='+email.value
            +'&birthday='+birthday.value
            +'&url='+urlEncoded
            +'&phone='+phone.value
            +'&genre='+genre,
            'POST')
    } else {
        console.log("Le formulaire contient des erreurs.")
    }

})

document.getElementById('toggle-password').addEventListener('click',function(e){
    e.preventDefault()
    let pwd = document.getElementById('password')
    let pwdc = document.getElementById('password-confirm')
    if (pwd.type && pwdc.type === 'password'){
        pwd.type = "text"
        pwdc.type = "text"
    } else {
        pwd.type = "password"
        pwdc.type = "password"
    }
})

function request(url, data, method){
    ajax(url, data, method)
}

function ajax(url, data, method){
    loader()
    let httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 6 et antérieurs
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open(method, url,true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.send(data);

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                stopLoading()
                alert('Vous vous êtes bien inscrit')
                    window.location.pathname = "/exam2bonus/login.php"
            } else {
                stopLoading()
                alert("Il y a eu un soucis avec la requête.")
            }
        }
    }
}


function loader(){
    document.getElementById('loading-message').classList.add('text-basic')
    document.getElementById('loading-message').innerHTML = 'Loading...'
}

function stopLoading(){
    document.getElementById('loading-message').classList.remove('text-basic')
    document.getElementById('loading-message').innerHTML = ''
}