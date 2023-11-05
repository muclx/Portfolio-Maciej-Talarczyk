const btnBurger = document.querySelector('.burger-nav')
const burgerIcon = document.querySelector('.fa-terminal')
const navItems = document.querySelector('.nav-items')
const navElements = document.querySelectorAll('.nav-items>a')
const xCode = document.querySelector('.fa-code')
const nav = document.querySelector('nav')
const textMe = document.querySelector('.text-me')
const year = document.querySelector('.year')
const tagJumpLegth = document.querySelectorAll('.tag-jump')
const appearBox = document.querySelectorAll('.appear-box');
const boxesPerspective = document.querySelectorAll('.perspective-box');
const sendBtn = document.querySelector('.btn-contact')
const email = document.querySelector('#email')
const username = document.querySelector('#name')
const message = document.querySelector('#message')
const body = document.querySelector('body')
const currentDate = new Date();

year.textContent = ` ${currentDate.getFullYear()} Maciej Talarczyk `;

const handleNav = () => {

    burgerIcon.classList.toggle('hide')
    navItems.classList.toggle('transform')
    xCode.classList.toggle('show')
    xCode.classList.toggle('hide')
    if (btnBurger.style.width === '100%') {
        btnBurger.style.width = '6.225rem'; // Przywracamy domyślną szerokość
        nav.style.paddingTop = '0.72rem'
        nav.style.paddingLeft = '0.72rem'
        btnBurger.style.borderRadius = '1.2rem'

    } else {
        btnBurger.style.width = '100%'; // Ustawiamy szerokość na 100%
        nav.style.padding = '0'
        btnBurger.style.borderRadius = '0'

    }
}
const closeNav = () => {
    burgerIcon.classList.toggle('hide')
    btnBurger.style.width = '6.225rem'; // Przywracamy domyślną szerokość
    btnBurger.style.borderRadius = '1.2rem'
    navItems.classList.remove('transform')
    xCode.classList.add('hide')
    nav.style.paddingTop = '0.72rem'
    nav.style.paddingLeft = '0.72rem'
}

async function apperingText() {
    let textContent = textMe.textContent
    let lengthText = textContent.length
    await sleep(7000)

    for (let i = lengthText; i > 1; i--) {
        textContent = textContent.slice(0, i)
        textMe.textContent = textContent + '|'
        await sleep(100)
        if (i == 2) {
            textContent = " Programmer"

            let lengthNewText = textContent.length
            for (let j = 0; j <= lengthNewText; j++) {
                textContent = " Programmer"
                textContent = textContent.slice(0, j)
                textMe.textContent = textContent + '|'
                await sleep(100)

            }
        }
    }
    textMe.textContent = " Programmer"
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const restartAnimation = () => {
    let randomNumber = getRandomNumber(1, tagJumpLegth.length);
    const element = document.querySelector(`.tag-jump:nth-child(${randomNumber})`);
    element.classList.remove('animation');
    void element.offsetWidth;
    element.classList.add('animation');
}
setInterval(restartAnimation, 10000)

const appearBoxes = () => {
    const viewportHeight = window.innerHeight;

    appearBox.forEach((box) => {
        const elementTop = box.getBoundingClientRect().top;

        if (elementTop < viewportHeight) {
            box.classList.add('visible');
            box.style.opacity = 1;

        }
    });
}
const showError = (input, msg) => {
    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-text')
    formBox.classList.add('error')
    errorMsg.textContent = msg
}
const checkForm = input => {
    input.forEach(el => {
        if (el.value === '')
            showError(el, el.placeholder)
        else {
            clearError(el)
        }
    })

}
const clearError = input => {
    const formBox = input.parentElement
    formBox.classList.remove('error')
}
const checkLenght = (input, min) => {

    if (input.value.length < min) {
        if (body.classList.contains('PL')) {
            showError(input, `${input.previousElementSibling.innerText} musi się składać z min. ${min} znaków.`)
        }
        else {
            showError(input, `${input.previousElementSibling.innerText} must consist of at least ${min} characters.`)
        }
    }
}
const checkMail = email => {

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ///wyrazenie regularne 
    if (re.test(email.value)) {
        clearError(email)
    }
    else {
        if (body.classList.contains('PL')) {
            showError(email, 'E-mail jest nie poprawny')
        }
        else {
            showError(email, 'E-mail is not valid')
        }
    }
}

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.input-contact')
    let errorCount = 0
    allInputs.forEach(el => {
        if (el.classList.contains('error'))
            errorCount++
    })
    if (errorCount === 0) {
        const input = [username, message, email]
        input.forEach(el => {
            el.value = ""
        })
    }
}
sendBtn.addEventListener('click', e => {
    e.preventDefault()
    checkForm([username, message, email])

    checkLenght(username, 3)
    checkLenght(message, 1)
    checkMail(email)
    checkErrors()
})

apperingText();
window.addEventListener('scroll', appearBoxes);
boxesPerspective.forEach((boxPerspective) => {
    boxPerspective.addEventListener('mouseenter', boxPerspective.addEventListener('mousemove', (e) => {
        const containerRect = boxPerspective.getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;

        const mouseX = e.clientX - containerCenterX;
        const mouseY = e.clientY - containerCenterY;

        boxPerspective.style.transform = `perspective(300px) rotateY(${mouseX * 0.03}deg) rotateX(${mouseY * 0.03}deg)`;
    }));

    boxPerspective.addEventListener('mouseleave', () => {
        boxPerspective.style.transform = `perspective(300px) rotateY(0) rotateX(0)`;
    });
});
btnBurger.addEventListener('click', handleNav)
navElements.forEach(element => {
    element.addEventListener('click', closeNav)
})