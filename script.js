//burger
let burgerButton = document.getElementById('toggle-Button');
let navBar = document.getElementById('navbar-id');
let firstLine = document.getElementById('burger1');
let secondline = document.getElementById('burger2');
let thirdline = document.getElementById('burger3')


burgerButton.addEventListener('click', function() {
    navBar.classList.toggle('activeNav');
    firstLine.classList.toggle('active');
    secondline.classList.toggle('active');
    thirdline.classList.toggle('active');

})


let data = [
    {
        id: 1,
        imageUrl: 'https://img-cdn.inc.com/image/upload/w_1920,h_1080,c_fill/images/panoramic/getty_1075599562_hpy86b.jpg',
        title: 'Programming',
        url: '#',
    },
    {
        id: 2,
        imageUrl: 'https://gripdesign.com/wp-content/uploads/2020/04/IMG_4022-copy.jpg',
        title: 'Grafic design',
        url: '#'
    },
    {
        id: 3,
        imageUrl: 'https://assets.entrepreneur.com/content/3x2/2000/1601904712-GettyImages-889461006.jpg',
        title: 'Copyrighting',
        url: '#'
    },
    {
        id: 4,
        imageUrl: 'https://images.ctfassets.net/jarihqritqht/7cW8y8TOZmcYjOvR9E8VWe/6bbe2ecc41f472e1ad497cf0d7460161/interior_designer_working_on_plans.jpeg',
        title: 'Interior design',
        url: '#'
    },
    {
        id: 5,
        imageUrl: 'https://blog.tubikstudio.com/wp-content/uploads/2015/07/Case_Study_Animation-tubikstudio.jpg',
        title: 'Moution design',
        url: '#'
    },
];

let arrowLeft = document.getElementById ('arrow-left');
let arrowRight = document.getElementById ('arrow-right');
let sliderContainer = document.getElementById ('slider');
let dotsList = document.getElementsByClassName ('dot');

let sliderIndex = 0;

function createATag (item) {
    let aTag = document.createElement('a');
    aTag.setAttribute('href', item.url);
    aTag.classList.add('slider-a');

    return aTag;
}

function createImgTag(item) {
    // let imgTag = document.body.style.backgroundImage = 'url(' + item.imageUrl + ')';
    sliderContainer.style.backgroundImage = 'url('+ item.imageUrl +')';
    sliderContainer.style.backgroundRepeat = "no-repeat";
    sliderContainer.style.backgroundSize = "cover";
}


function createH2Tag (item) {
    let h2Tag = document.createElement('a');
    h2Tag.setAttribute.href = item.url;
    h2Tag.classList.add('slider-title');
    h2Tag.append(item.title);

    return h2Tag;
}

function createDots() {
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach((element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id-1);

        dot.onclick = () => {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlider();
        }
        dots.appendChild(dot);
    })
    return dots;
}

function setSlider() {
    sliderContainer.innerText = '';
    createImgTag(data[sliderIndex]);
    let sliderItem = createATag (data[sliderIndex]);
    let title = createH2Tag (data[sliderIndex]);
    let dots = createDots();
    sliderItem.appendChild(title);
    sliderContainer.appendChild(sliderItem);
    sliderContainer.appendChild(dots);
    currentDotActive();
    
}

function currentDotActive () {
    dotsList[sliderIndex].classList.add('active')
}

function arrowLeftClick () {
    if (sliderIndex == 0) {
        sliderIndex = data.length;
     }
    sliderIndex--;
    setSlider();
}

function arrowRightClick () {   
    if(sliderIndex == data.length-1) {
        sliderIndex = -1;
    }
    sliderIndex++;
    setSlider();
}
//1.
arrowLeft.addEventListener('click', arrowLeftClick)
arrowRight.addEventListener('click', arrowRightClick)
//2.
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        arrowLeftClick();
    } else if (event.keyCode == 39) {
        arrowRightClick();
    }
})
//3.
setInterval( () => {
    arrowRightClick ();
}, 4000);

setSlider();

// accordion

let accordion = document.querySelectorAll('.accordion-div');
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active');
    })
}

// teachers
function getuser(page) {
    let request = new XMLHttpRequest();
    request.addEventListener('load', render);
    request.addEventListener('error', errorender);


    request.open('GET', 'https://reqres.in/api/users?page=' + page);
    request.send();

}
let currentPage = 1;
let totalPagesApi;

function render() {
    let response = this.responseText;
    let responsedata = JSON.parse(response);

    var fragment = document.createDocumentFragment();

    responsedata.data.forEach(item => {
        let image = document.createElement('img');
        image.src = item.avatar;
        image.classList.add('class', 'image-block');

        let li = document.createElement('li');

        let pemail = document.createElement('p');
        pemail.textContent = item.email;
        pemail.classList.add('class', 'p-email');

        li.classList.add('class', 'list');

        li.appendChild(image);
        li.appendChild(pemail);

        fragment.appendChild(li);

    })
    document.getElementById('ul-list').innerHTML = ' ';
    document.getElementById('ul-list').appendChild(fragment);
    totalPagesApi = responsedata.total_pages;


}
function errorender() {
    let error = document.createElement('p');
    error.textContent = 'Server error';

    document.getElementById('section2').appendChild(error);

}



document.getElementById('previous').addEventListener('click', function () {
    if (currentPage == 1) {
        return;
    }

    currentPage -= 1;
    getuser(currentPage);

})

document.getElementById('next').addEventListener('click', function () {
    if (currentPage == totalPagesApi) {
        return;
    }
    currentPage += 1;
    getuser(currentPage);
})

getuser(currentPage);


// registration-section

document.getElementById('registration').addEventListener('submit', function(event){
    event.preventDefault();

    let errors = {};
    let form = event.target;
    
    //username
    let username = document.querySelector('[name = "username"]').value;

    if (username.length < 4 || username == '') {
        errors.username = 'Username must be at least 4 characters'
    }

    //password
    let password = document.querySelector('[name = "password"]').value;
    let password2 = document.querySelector('[name = "password2"]').value;

    if (password == '' || password != password2 ) {
        errors.password = "Password can not be empty";
        errors.password2 = "Password don't match"
    }

    //checkbox
    let agree = document.querySelector('[name = "agree"]').checked;
    if (!agree) {
        errors.agree = "You must agree our terms and conditions";
    }

    //radio
    let age = false;
    form.querySelectorAll('[name = "age"]').forEach(element => {
        if (element.checked) {
            age = true;
        }
    })    
    
    if (!age) {
        errors.age = "Please select your age";
    }

    for (let  item in errors) {
        let errorSpan = document.getElementById('error_' + item);
        errorSpan.innerText = '';
        if (errorSpan) {
            errorSpan.innerText = errors[item];
        } 
    }

    if (Object.keys(errors).length == 0) {
        // form.submit();
        let h1Tag =document.createElement('h1');
        h1Tag.innerHTML = "Hello, "+username.toUpperCase() + ", I wish you the best day!";
        form.appendChild(h1Tag);
    }
});

let toggled = document.getElementById('toggleicon');
let toggled2 = document.getElementById('toggleicon2');
showHidePassword = () => {
    if (password.type == 'password') {
        password.setAttribute('type', 'text');
        password2.setAttribute('type', 'text');
        toggled.classList.remove('fa-eye-slash')
        toggled.classList.add('fa-eye');
        toggled2.classList.remove('fa-eye-slash')
        toggled2.classList.add('fa-eye');
    } else {
        toggled.classList.add('fa-eye-slash');
        toggled2.classList.add('fa-eye-slash');
        password.setAttribute('type', 'password');
        password2.setAttribute('type', 'password');
    }
}
toggled.addEventListener('click', showHidePassword);
toggled2.addEventListener('click', showHidePassword);

//email validation 
function validateEmail() {
    let emailField = document.getElementById('email').value;
    let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let span = document.getElementById('error_email');

    if (emailField.match(emailStructure)) {
        span.innerHTML = "Your email address is valid";
        span.style.color = 'green';
    } else {
        span.innerHTML = "Your email address is invalid";
        span.style.color = 'red';
    }
}