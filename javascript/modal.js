SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'Buku';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;

let modalData;

fetch(FULL_URL).then(res => res.text()).then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    modalData = data;
})



let filteredModalData;
function showModal(bookId, isMobile){

    filteredModalData = modalData.table.rows.filter(row => {
        const filteredBookId = row.c[0]?.f;
        return filteredBookId === bookId;
    });
    
    let length = filteredModalData.length;
    for(let i=0; i<length; i++){
        let sheet_image_link = filteredModalData[i].c[5].v;

        let regex = /\/d\/(.*?)\//;
        let match = sheet_image_link.match(regex);
        let image_id;

        if(match && match[1]){
            image_id = match[1];
        }

        let modalBookImage = document.getElementById('modal-book-image');
        modalBookImage.setAttribute('src', `https://drive.google.com/thumbnail?id=${image_id}&sz=s4000`);
        modalBookImage.setAttribute('alt', filteredModalData[i].c[1].v);    

        let modalBookTitle = document.getElementById('modal-book-title');
        modalBookTitle.innerHTML = filteredModalData[i].c[1].v;

        let modalBookAuthor = document.getElementById('modal-book-author');
        modalBookAuthor.innerHTML = filteredModalData[i].c[2].v;

        let modalBookSynopsis = document.getElementById('modal-book-synopsis');
        modalBookSynopsis.innerHTML = filteredModalData[i].c[4].v;
        
    }

    let bookModal = document.getElementById('bookModal');
    bookModal.classList.add('book-modal-active');

    let modalBackdrop = document.getElementById('id-modal-backdrop');
    modalBackdrop.classList.add('modal-backdrop-active');
   
    if(!isMobile){
        let modalIconClose = document.getElementById('modal-icon-close');
        modalIconClose.addEventListener('click', () => {
            bookModal.classList.remove('book-modal-active');
            modalBackdrop.classList.remove('modal-backdrop-active');
            console.log("icon computer");
        });

        let modalButtonClose = document.getElementById('modal-button-close');        
        modalButtonClose.addEventListener('click', () => {
            bookModal.classList.remove('book-modal-active');
            modalBackdrop.classList.remove('modal-backdrop-active');
        });

    }else{
        
        let modalIconCloseMobile = document.getElementById('modal-icon-close');
        modalIconCloseMobile.addEventListener('click', () => {
            bookModal.classList.remove('book-modal-active');
            console.log("icon mobile");
        });

        modalBackdrop.addEventListener('click', () => {
            modalBackdrop.classList.remove('modal-backdrop-active');
            
            closeSearchResult();
        });

        let modalButtonClose = document.getElementById('modal-button-close');   
        modalButtonClose.addEventListener('click', () => {
            bookModal.classList.remove('book-modal-active');
            
        });
    }

    
};

let searchInputMobile = document.getElementById('id-input-search-mobile');
searchInputMobile.addEventListener('click', () => {
    let modalBackdrop = document.getElementById('id-modal-backdrop');
    modalBackdrop.classList.add('modal-backdrop-active');

    let searchBarMobileFrame = document.getElementById('id-search-bar-mobile-frame');
    searchBarMobileFrame.classList.add('search-bar-mobile-frame-active')

    modalBackdrop.addEventListener('click', () => {
        modalBackdrop.classList.remove('modal-backdrop-active');
        
        closeSearchResult();
    });

    let header = document.getElementById('id-header');
    header.classList.add('header-ontop-modal');
    document.body.classList.add('body-no-scroll');
});