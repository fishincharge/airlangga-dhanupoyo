SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'KategoriBuku';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;

let carouselFrame = document.getElementById('carousel-category-book');

let carouselInner = document.createElement('div');
carouselInner.className = 'catalogue-inner carousel-inner';

let carouselItem = document.createElement('div');
carouselItem.className = 'catalogue-item carousel-item active';

let divBookCategoryTop = document.createElement('div');
divBookCategoryTop.className = 'book-category-top';
divBookCategoryTop.id = 'id-book-category-top';

let divBookCategoryMiddle = document.createElement('div');
divBookCategoryMiddle.className = 'book-category-middle';
divBookCategoryMiddle.id = 'id-book-category-middle';

let divBookCategoryBottom = document.createElement('div');
divBookCategoryBottom.className = 'book-category-bottom';
divBookCategoryBottom.id = 'id-book-category-bottom';

carouselItem.appendChild(divBookCategoryTop);
carouselItem.appendChild(divBookCategoryMiddle);
carouselItem.appendChild(divBookCategoryBottom);
carouselInner.appendChild(carouselItem);
carouselFrame.prepend(carouselInner);

let counterTop = 0;
let counterMiddle = 0;
let counterBottom = 0;

fetch(FULL_URL).then(res => res.text()).then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));

    for(let i = 1; i<data.table.rows.length; i++){
        let row = data.table.rows[i];


        if (counterMiddle < 3) {
            createAndAppendButton(row.c[0].v, divBookCategoryMiddle);
            counterMiddle++;
        } else if (counterMiddle === 3 && counterTop < 1) {
            createAndAppendButton(row.c[0].v, divBookCategoryTop);
            counterTop++;
        } else if (counterMiddle === 3 && counterTop < 2 && counterBottom < 1) {
            createAndAppendButton(row.c[0].v, divBookCategoryBottom);
            counterBottom++;
        } else if (counterMiddle === 3 && counterTop === 1 && counterBottom === 1) {
            createAndAppendButton(row.c[0].v, divBookCategoryTop);
            counterTop++;
        } else if (counterMiddle === 3 && counterTop === 2 && counterBottom === 1) {
            createAndAppendButton(row.c[0].v, divBookCategoryBottom);
            counterBottom++;
        } else if(counterTop + counterMiddle + counterBottom === 7){
           createCategoryItem();
           createAndAppendButton(row.c[0].v, divBookCategoryMiddle);
           counterMiddle++;
        }
        
    };
    
});

function createCategoryItem(){
    counterTop = 0;
    counterMiddle = 0;
    counterBottom = 0;

    divBookCategoryTop = document.createElement('div');
    divBookCategoryTop.setAttribute('class', 'book-category-top');
    divBookCategoryTop.setAttribute('id', 'id-book-category-top');

    divBookCategoryMiddle = document.createElement('div');
    divBookCategoryMiddle.setAttribute('class', 'book-category-middle');
    divBookCategoryMiddle.setAttribute('id', 'id-book-category-middle');

    divBookCategoryBottom = document.createElement('div');
    divBookCategoryBottom.setAttribute('class', 'book-category-bottom');
    divBookCategoryBottom.setAttribute('id', 'id-book-category-bottom');
    
    carouselItem = document.createElement('div');
    carouselItem.className = 'catalogue-item carousel-item';

    carouselItem.appendChild(divBookCategoryTop);
    carouselItem.appendChild(divBookCategoryMiddle);
    carouselItem.appendChild(divBookCategoryBottom);
    carouselInner.appendChild(carouselItem);
    
}


function createAndAppendButton(text, parentElement) {
    const button = document.createElement('button');
    // button.setAttribute('onclick', `filterData('${text}')`);
    button.setAttribute('class', 'filter-button');
    button.innerHTML = text;

    
    button.addEventListener('click', () => {
        
        document.querySelectorAll('.filter-button').forEach(buttonNotClicked =>{
            if(buttonNotClicked !== button){
                buttonNotClicked.classList.remove('button-active');
            }
            
        });
            
        button.classList.toggle('button-active');

        filterData(text, button.classList.contains('button-active'));
    });
    
    parentElement.appendChild(button);
}

