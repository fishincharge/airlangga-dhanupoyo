SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'Buku';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;


let globalData;
let data;

let carouselProductFetch = document.getElementById('productCarousel');

fetch(FULL_URL).then(res => res.text()).then(rep => {
    data = JSON.parse(rep.substr(47).slice(0, -2));
    globalData = data;
    // console.log(globalData);
    
    initProductCard();

    initListener();
});

function initProductCard(){
    let carouselProduct = document.getElementById('productCarousel');

    let length = data.table.rows.length;

    for(let i = 0; i<length; i++){
        let sheet_image_link = data.table.rows[i].c[5].v;

        let regex = /\/d\/(.*?)\//;
        let match = sheet_image_link.match(regex);
        let image_id;

        if(match && match[1]){
            image_id = match[1];
        }

        let productCard = document.createElement('div');
        productCard.setAttribute('class', 'book-frame card shadow');
        productCard.setAttribute('id', 'id-product-card');
        productCard.dataset.bookId = data.table.rows[i].c[0].v;
        productCard.setAttribute('data-bs-toggle', 'modal');
        productCard.setAttribute('data-bs-target', '#bookModal');

        let productImage = document.createElement('img');
        productImage.setAttribute('class', 'card-img-top');
        productImage.setAttribute('src', `https://drive.google.com/thumbnail?id=${image_id}&sz=s4000`);
        productImage.setAttribute('alt', data.table.rows[i].c[1].v);

        let productCardBody = document.createElement('div');
        productCardBody.setAttribute('class', 'card-body');

        let productCardTitle = document.createElement('p');
        productCardTitle.setAttribute('class', 'book-title card-title');
        productCardTitle.innerHTML = data.table.rows[i].c[1].v;

        let productCardAuthor = document.createElement('p');
        productCardAuthor.setAttribute('class', 'book-author card-text');
        productCardAuthor.innerHTML = data.table.rows[i].c[2].v;

        let productCardCategory = document.createElement('p');
        productCardCategory.setAttribute('class', 'book-genre card-text');
        productCardCategory.innerHTML = data.table.rows[i].c[3].v;

        let productCardContainer = document.createElement('div');
        productCardContainer.setAttribute('class', 'product-card-container');

        productCard.appendChild(productImage);
        productCardBody.appendChild(productCardTitle);
        productCardBody.appendChild(productCardAuthor);
        productCardBody.appendChild(productCardCategory);
        productCard.appendChild(productCardBody);
        
        productCardContainer.append(productCard);

        carouselProduct.appendChild(productCardContainer);    
    }
}

function initListener(){
    let productCard = document.querySelectorAll('.book-frame');
    productCard.forEach(card => {
        card.addEventListener('click', () => {
            showModal(card.dataset.bookId);
        });
    });

    let searchBoxCard = document.querySelectorAll('.search-box-card');
    searchBoxCard.forEach(card => {
        card.addEventListener('click', () => {
            showModal(card.dataset.bookId);
        });
    });
};

let filteredRow;

function filterData(categoryText, isSelected){

    if(!globalData) return;

    filteredRow =  globalData.table.rows.filter(row => {
        const genre = row.c[3]?.v;
        return genre === categoryText;
    });

    if(isSelected){
        displayResults(filteredRow, isSelected);
    }else{
        displayResults(globalData.table.rows, isSelected);
        
    }
    
};

function displayResults(filteredRow, isSelected) {
    carouselProduct.textContent = '';

    let rows = filteredRow;

    length = filteredRow.length;

    let i = 0;

    for(isSelected ? i = 0 : i = 0; i<length; i++){
        let sheet_image_link = rows[i].c[5].v;

        let regex = /\/d\/(.*?)\//;
        let match = sheet_image_link.match(regex);
        let image_id;

        if(match && match[1]){
            image_id = match[1];
        }

        let productCard = document.createElement('div');
        productCard.setAttribute('class', 'book-frame card shadow');
        productCard.setAttribute('id', 'id-product-card');
        productCard.dataset.bookId = rows[i].c[0].v;
        productCard.setAttribute('data-bs-toggle', 'modal');
        productCard.setAttribute('data-bs-target', '#bookModal');

        let productImage = document.createElement('img');
        productImage.setAttribute('class', 'card-img-top');
        productImage.setAttribute('src', `https://drive.google.com/thumbnail?id=${image_id}&sz=s4000`);
        productImage.setAttribute('alt', rows[i].c[1].v);

        let productCardBody = document.createElement('div');
        productCardBody.setAttribute('class', 'card-body');

        let productCardTitle = document.createElement('p');
        productCardTitle.setAttribute('class', 'book-title card-title');
        productCardTitle.innerHTML = rows[i].c[1].v;

        let productCardAuthor = document.createElement('p');
        productCardAuthor.setAttribute('class', 'book-author card-text');
        productCardAuthor.innerHTML = rows[i].c[2].v;

        let productCardCategory = document.createElement('p');
        productCardCategory.setAttribute('class', 'book-author card-text');
        productCardCategory.innerHTML = rows[i].c[3].v;

        let productCardContainer = document.createElement('div');
        productCardContainer.setAttribute('class', 'product-card-container');

        productCard.appendChild(productImage);
        productCardBody.appendChild(productCardTitle);
        productCardBody.appendChild(productCardAuthor);
        productCardBody.appendChild(productCardCategory);
        productCard.appendChild(productCardBody);

        productCardContainer.append(productCard);

        carouselProductFetch.appendChild(productCardContainer);

    }

    initListener();
}

