import Slider from "./slider.js"

const dropdownContent = document.querySelector('.dropdown-content')
const dropdown = document.getElementById('dropdown')
const hamburgerMenu = document.getElementById('hamburger')
const body = document.getElementById('body')
const htmlDOM = document.querySelector('html')


    // DROPDOWN
dropdown.addEventListener('mouseover', () => {
    dropdownContent.style.visibility = 'visible';
})
dropdown.addEventListener('mouseout', () => {
    dropdownContent.style.visibility = 'hidden';
})

    // HAMBURGER MENU
hamburgerMenu.addEventListener('click', createMenu)
body.addEventListener('click', closeMenu)

function createMenu() {
    const hamburgerContainer = document.createElement('div');
    hamburgerContainer.classList.add('hamburger-container')
    const hamburgerMenuContainer = document.createElement('div');
    hamburgerMenuContainer.classList.add('hamburger-menu-container')
    hamburgerContainer.appendChild(hamburgerMenuContainer);
    const hamburgerMenuUl = document.createElement('ul');
    hamburgerMenuUl.classList.add('hamburger-menu-ul')
    hamburgerMenuContainer.appendChild(hamburgerMenuUl);

    // Create the X (close button)
    const closeBtn = document.createElement('div')
    closeBtn.innerHTML = `<i class="fas fa-times fa-2x">`;
    closeBtn.classList.add('close-btn');
    hamburgerMenuContainer.appendChild(closeBtn);
    
    // Create the ul items
    const htmlCodeForDropdown = `
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#menu">Menu</a></li>
    <li><a href="#specials">Specials</a></li>
    <li><a href="#events">Events</a></li>
    <li><a href="#chefs">Chefs</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li id="dropdown">
        <a href="#">Dropdown <i class="fas fa-chevron-down"></i></a>
         <ul class="dropdown-content" >
             <li>Dropdown1</li>
             <li>Dropdown2</li>
             <li>Dropdown3</li>
             <li>Dropdown4</li>
             <li>Dropdown5</li>
         </ul>
    </li>
    <li><a href="#">Contact</a></li>`;

    hamburgerMenuUl.insertAdjacentHTML('beforeend', htmlCodeForDropdown);
    disableScroll(htmlDOM);

    document.getElementById('body').appendChild(hamburgerContainer);
    console.log(getComputedStyle(body).overflow)

    console.log('test')
}

function closeMenu(e) {
    if (e.target.parentElement.className === 'close-btn') {
        document.querySelector('.hamburger-container').remove();
        activateScroll(htmlDOM);
    }
}


    // CHANGE THE MENU"S BACKGROUND COLOR ON SCROLLING
const menu = document.querySelector(".header-container")    
window.addEventListener('scroll', () => {
    changeMenuBackgroundColor();
})

function changeMenuBackgroundColor() {

    if (window.pageYOffset > 50) {
        menu.style.backgroundColor = "rgb(10, 10, 10)"
        menu.style.borderColor = "rgb(217, 167, 20, 0.3)"
    } else {
        menu.style.backgroundColor = "rgba(3, 28, 26, 0.5)"
        menu.style.borderColor = "rgb(217, 167, 20, 0.0)"
    }
}

    // FOOD MENU 

const allBtn = document.getElementById('all')
const startersBtn = document.getElementById('starters')
const saladsBtn = document.getElementById('salads')
const specialtysBtn = document.getElementById('specialtys')
const foodItems = document.querySelectorAll('.menu-item')

allBtn.addEventListener('click', (e) => {
    e.preventDefault()
    showAllFoodItems()
})

startersBtn.addEventListener('click', (e) => {
    e.preventDefault()
    showAllStarters()
})

saladsBtn.addEventListener('click', (e) => {
    e.preventDefault()
    showAllSalads()
})

specialtysBtn.addEventListener('click', (e) => {
    e.preventDefault()
    showAllSpecialtys()
})

function showAllFoodItems() {
    foodItems.forEach(item => {
        item.style.display = 'flex';
    })
}

function showAllStarters() {
    foodItems.forEach(item => {
        if (!(item.classList.contains('starter'))) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    })
}
function showAllSalads() {
    foodItems.forEach(item => {
        if (!(item.classList.contains('salad'))) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    })
}
function showAllSpecialtys() {
    foodItems.forEach(item => {
        if (!(item.classList.contains('specialty'))) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    })
}


    // SPECIALTYS MENU

const specialtysListItems = document.querySelectorAll(".specials-navbar li");
const specialtyContent = document.querySelectorAll('.flex-item')

specialtysListItems.forEach((specialty, index) => {
    specialty.addEventListener('click', () => {
        showContent(index);
    })
})

function showContent(currentIndex) {
    specialtyContent.forEach((contentDiv, index) => {
        if (index != currentIndex) {
            contentDiv.style.display = 'none';
            specialtysListItems[index].classList.remove('active');
            specialtysListItems[index].style.color = 'var(--primary-text-color)';
        } else {
            contentDiv.style.display = 'flex';
            specialtysListItems[index].classList.add('active');
            specialtysListItems[index].style.color = 'black';
        }
    })
}

    // ON SCROLL  ANIMATION

const sections = document.querySelectorAll('section')
window.addEventListener('load', animateContent)
window.addEventListener('scroll', animateContent)

function animateContent() {
    const triggerPoint = window.innerHeight - 50;

    sections.forEach(section => {
        const elementTop = section.getBoundingClientRect().top
        if (elementTop < triggerPoint) {
            section.classList.add('show-section')
        }
    })
}

    // EVENTS AUTO-PLAY SLIDE-SHOW

const dots = document.querySelectorAll('[data-e-dot]');
console.log(dots)
const slidesContainer = document.querySelector('.slides-container');

const eventsSlideShow = new Slider(slidesContainer, -100, 2000, dots, 1);

    // TESTIMONIALS SLIDESHOW

const tDots = document.querySelectorAll('[data-t-dot]');
const testimonialsContainer = document.querySelector('.testimonials-slides-container')
const changeTranslateRateTriggerPoint = 1100;
let testimonialsContainerTranslateRate;
let firstSlideIndex;
if (window.innerWidth > changeTranslateRateTriggerPoint) {
    testimonialsContainerTranslateRate = -33;
    firstSlideIndex = 2;
} else {
    testimonialsContainerTranslateRate = -100;
    firstSlideIndex = 3;
}


let testimonialsSlideShow = new Slider(testimonialsContainer, testimonialsContainerTranslateRate, 3000, tDots, firstSlideIndex)

window.addEventListener('resize', () => {
    let isLowerThanTriggerPoint = window.innerWidth < changeTranslateRateTriggerPoint;

    if (isLowerThanTriggerPoint) {
        testimonialsSlideShow.slidePercentageRate = -100;
        testimonialsSlideShow.firstSlideIndex = 3;
    } else {
        testimonialsSlideShow.slidePercentageRate = -33;
        testimonialsSlideShow.firstSlideIndex = 2;
    }
})

    // GALERY LIHTBOX
const imgList = document.querySelectorAll('.gallery-container img');
const srcAtributeList = [];
let firstImageIndex;

imgList.forEach(img => {
    const srcAtribute = img.getAttribute('src');
    srcAtributeList.push(srcAtribute);
})

body.addEventListener('click', (e) => {
    if (e.target.parentElement.id === 'close-gallery-button') {
        const modalGallery = document.querySelector('.modal-gallery');
        modalGallery.remove();

        activateScroll()

        e.preventDefault()
    }

    if (e.target.parentElement.id === 'left-arrow') {
        firstImageIndex--;

        if (firstImageIndex < 0) firstImageIndex = srcAtributeList.length - 1;
        const currentModalImage = document.querySelector('#current-modal-image');
        currentModalImage.setAttribute('src', srcAtributeList[firstImageIndex])
        e.preventDefault()
    }

    if (e.target.parentElement.id === 'right-arrow') {
        firstImageIndex++;
        if (firstImageIndex >= srcAtributeList.length - 1) firstImageIndex = 0;
        const currentModalImage = document.querySelector('#current-modal-image');
        currentModalImage.setAttribute('src', srcAtributeList[firstImageIndex])
        e.preventDefault()
    }
})

imgList.forEach((img, imgIndex) => {
    img.addEventListener('click', () => {
        firstImageIndex = imgIndex;

        disableScroll()

        const modalGalleryHtmlCode = `
        <div class="modal-gallery">
            <div class="modal-img">
                <img id="current-modal-image" src="${srcAtributeList[imgIndex]}" alt="">
            </div>
            <button id="close-gallery-button"><i class="fas fa-times fa-3x"></i></button>
            <button id="left-arrow" class="arrow-btn"><i class="fas fa-chevron-left fa-3x"></i></button>
            <button id="right-arrow" class="arrow-btn"><i class="fas fa-chevron-right fa-3x"></i></button>
        </div>`
        body.insertAdjacentHTML('beforeend', modalGalleryHtmlCode);
        
    })
})

function disableScroll() {
    htmlDOM.classList.toggle('modal-open')
    
    console.log("Modal open :"+htmlDOM.classList)
}

function activateScroll() {
    htmlDOM.classList.toggle('modal-open')
    console.log("Modal close :"+htmlDOM.classList)
}


    // CHEFS SECTION

const chefs = document.querySelectorAll('.chef-item')
chefs.forEach(chef => {
    chef.addEventListener('mouseover', () => {
        chef.lastElementChild.style.display = 'flex';
    })

    chef.addEventListener('mouseout', () => {
        chef.lastElementChild.style.display = 'none';
    })
})

// SMOOTH SROLLING JQUERY
// SMOOTH SROLLING JQUERY
// SMOOTH SROLLING JQUERY

$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
// On-page links
if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
    // Only prevent default if animation is actually gonna happen
    event.preventDefault();
    $('html, body').animate({
        scrollTop: target.offset().top
    }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
        return false;
        } else {
        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
        };
    });
    }
}
});

   


    //GOOGLE MAP IMPLEMENTATION

function initMap() {

    const position = {
        zoom: 8,
        center: { lat: 44.4268, lng: 26.1025} 
    }
    const map = new google.maps.Map(document.getElementById('map'), position )
}



    









