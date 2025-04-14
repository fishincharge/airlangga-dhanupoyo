SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'Buku';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;

let inputSearch = document.getElementById('id-input-search');
let inputSearchMobile = document.getElementById('id-input-search-mobile');

let searchBoxInner = document.getElementById('id-search-box-inner');
let searchResultFrame = document.getElementById('id-search-result-frame');

let globalDataSearch;
fetch(FULL_URL).then(res => res.text()).then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));
    // data.table.rows.splice(0,1);
    globalDataSearch = data;

    inputSearch.addEventListener('input', function(event){
        searchBoxInner.innerHTML = '';
        const searchValue = event.target.value;
        const isEmpty = searchValue.trim() === '';

        if(!isEmpty){
            searchResultFrame.classList.add('search-active');
        }else{
            searchResultFrame.classList.remove('search-active');
        }

        searchData(searchValue);    
    });

    inputSearchMobile.addEventListener('input', function(event){
        searchBoxInner.innerHTML = '';
        const searchValue = event.target.value;
        const isEmpty = searchValue.trim() === '';

        if(!isEmpty){
            searchResultFrame.classList.add('search-active');
        }else{
            searchResultFrame.classList.remove('search-active');
        }

        searchData(searchValue);    
    });
});

let filteredRowSearch;
function searchData(searchInput){
    if(!globalDataSearch) return;

    filteredRowSearch = globalDataSearch.table.rows.filter(row => {
        const bookTitle = row.c[1]?.v;
        if (!bookTitle || !searchInput) return false;
        
        const cleanTitle = bookTitle.toString().toLowerCase().trim();
        const cleanSearch = searchInput.toString().toLowerCase().trim();
        
        return cleanTitle.includes(cleanSearch);
    }).sort((a, b) => {
        const titleA = a.c[1]?.v?.toString().toLowerCase();
        const titleB = b.c[1]?.v?.toString().toLowerCase();
        const searchTerm = searchInput.toLowerCase();
        
        // Get the index of the search term in each title
        const indexA = titleA?.indexOf(searchTerm) ?? Infinity;
        const indexB = titleB?.indexOf(searchTerm) ?? Infinity;
        
        // First sort by position of match (earlier matches first)
        if (indexA !== indexB) {
        return indexA - indexB;
        }
        
        // If same position, sort alphabetically
        return titleA?.localeCompare(titleB) ?? 0;
    });
    
    displaySearch(filteredRowSearch);
};

function displaySearch(filteredRowSearch){

    let searchLength = filteredRowSearch.length;

    for(i=0; i<searchLength; i++){
        let sheet_image_link = filteredRowSearch[i].c[5].v;

        let regex = /\/d\/(.*?)\//;
        let match = sheet_image_link.match(regex);
        let image_id;

        if(match && match[1]){
            image_id = match[1];
        }

        let searchBoxCard = document.createElement('div');
        searchBoxCard.setAttribute('class', 'search-box-card');
        searchBoxCard.setAttribute('id', 'id-product-card');
        searchBoxCard.dataset.bookId = filteredRowSearch[i].c[0].v;
        searchBoxCard.setAttribute('data-bs-toggle', 'modal');
        searchBoxCard.setAttribute('data-bs-target', '#bookModal');

        let searchBoxImage = document.createElement('img');
        searchBoxImage.setAttribute('class', 'search-box-image');
        searchBoxImage.setAttribute('src', `https://drive.google.com/thumbnail?id=${image_id}&sz=s4000`);
        searchBoxImage.setAttribute('alt', filteredRowSearch[i].c[1].v);

        let searchBoxInfo = document.createElement('div');
        searchBoxInfo.setAttribute('class', 'search-box-info')

        let searchBookTitle = document.createElement('div');
        searchBookTitle.setAttribute('class', 'search-book-title');
        searchBookTitle.innerHTML = filteredRowSearch[i].c[1].v;

        let searchBookAuthor = document.createElement('div');
        searchBookAuthor.setAttribute('class', 'search-book-author');
        searchBookAuthor.innerHTML = filteredRowSearch[i].c[2].v;

        searchBoxCard.append(searchBoxImage);
        searchBoxInfo.append(searchBookTitle);
        searchBoxInfo.append(searchBookAuthor);
        searchBoxCard.append(searchBoxInfo);

        searchBoxInner.append(searchBoxCard);

    }

    initListener();
}