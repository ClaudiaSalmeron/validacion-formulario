const firebaseConfig = {
       apiKey: "AIzaSyDw7KbQ9E1oa10PpzWfQXwPWQKHlGIltso",
        authDomain: "datos-de-formulario-fea19.firebaseapp.com",
       projectId: "datos-de-formulario-fea19",
        storageBucket: "datos-de-formulario-fea19.appspot.com",
        messagingSenderId: "179555783302",
       appId: "1:179555783302:web:270be89e11173e64cff707",
       measurementId: "G-RESM2XCH0N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener ('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por favor, introduce tú nombre'
        errorNombre.classList.add('error-message')

    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
        
    }
    //Validar correo ellectronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Patrón de validación básico para el correo
    
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un mail válido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message') 
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }
    //Si todos los campos son validos enviar formulario
  if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){

    //Backend que reciba la información

    db.collection("users").add({
      nombre: entradaNombre.value,
       email: emailEntrada.value,
        password: contrasenaEntrada.value
        
    })
   .then((docRef) => {
       alert('El formulario se ha enviado con éxito' , docRef.id)
       document.getElementById('formulario').reset();
    
    })
   .catch((error) => {
       alert(error)
    });
    

} 
})
