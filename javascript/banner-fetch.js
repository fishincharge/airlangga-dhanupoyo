SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'Banner';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_TITLE}&headers=1`;

let dataBanner;

fetch(FULL_URL).then(res => res.text()).then(rep => {
    dataBanner = JSON.parse(rep.substr(47).slice(0, -2));
    
    let bannerLength = dataBanner.table.rows.length;
    
    bannerNumbering(bannerLength);

    bannerDetails(dataBanner, bannerLength);

    const numberingCircle = document.querySelectorAll('.circle');
    const numberingFont = document.querySelectorAll('.circle p');
    const bannerButtons = document.querySelectorAll('.banner-numbering button');
    const carousel = document.querySelector('#carousel-promotion');

    numberingCircle[0]?.classList.add('active-circle');
    numberingFont[0]?.classList.add('active-numbering');

    // Function to update circle styles based on active slide
    function updateActiveCircle() {
        // Find the currently active carousel item
        const activeSlide = carousel.querySelector('.carousel-item.active');
        if (!activeSlide) return;
        
        // Get its index (from data-bs-slide-to or by position)
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).indexOf(activeSlide);
        
        // Remove all active classes from circles
        document.querySelectorAll('.circle, .circle p').forEach(el => {
        el.classList.remove('active-circle', 'active-numbering');
        });
        
        // Add active classes to corresponding circle
        if (bannerButtons[activeIndex]) {
        const circle = bannerButtons[activeIndex].querySelector('.circle');
        if (circle) {
            circle.classList.add('active-circle');
            const number = circle.querySelector('p');
            if (number) number.classList.add('active-numbering');
        }
        }
    }

    // Initial update
    updateActiveCircle();

    // Update when carousel slides
    carousel.addEventListener('slid.bs.carousel', updateActiveCircle);

    bannerButtons.forEach(button => {
        button.addEventListener('click', function(){
            numberingCircle.forEach(numberingCircle => numberingCircle.classList.remove('active-circle'));
            numberingFont.forEach(numberingFont => numberingFont.classList.remove('active-numbering'));

            const index = [...bannerButtons].indexOf(button);
            numberingCircle[index]?.classList.add('active-circle');
            numberingFont[index]?.classList.add('active-numbering');
        });
    });

});

function bannerNumbering(bannerLength){
    let bannerNumbering = document.getElementById('id-banner-numbering');
    
    for(i=0; i<bannerLength; i++){
        let numberingButton = document.createElement('button');
        setAttributes(numberingButton, {
            'type':'button',
            'data-bs-target' : '#carousel-promotion',
            'data-bs-slide-to' : `${i}`,
            'class':'active',
            'aria-current':'true',
            'aria-label':`Slide ${i+1}`
        });
        
        let numberingCircle = document.createElement('div');
        setAttributes(numberingCircle, {
            'class':'circle'
        });

        let numberingElementP = document.createElement('p');
        numberingElementP.innerHTML = `${i+1}`;

        let numberingLine = document.createElement('div');
        setAttributes(numberingLine, {
            'class':'line'
        });

        numberingCircle.append(numberingElementP);
        numberingButton.append(numberingCircle);

        bannerNumbering.append(numberingButton);
        if(!(i == bannerLength-1)) bannerNumbering.append(numberingLine);
    }
}

function bannerDetails(dataBanner, bannerLength){
    let carouselPromotionInner = document.getElementById('id-carousel-promotion-inner');
    
    for(let i=0; i<bannerLength; i++){
        let sheet_image_link = dataBanner.table.rows[i].c[3].v;

        let regex = /\/d\/(.*?)\//;
        let match = sheet_image_link.match(regex);
        let image_id;

        if(match && match[1]){
            image_id = match[1];
        }

        let bannerCarouselItems = document.createElement('div');
        setAttributes(bannerCarouselItems, {
            'class':'banner-carousel-items carousel-item'
        });
        if(i==0) bannerCarouselItems.classList.add('active');

        let banner = document.createElement('div');
        setAttributes(banner, {
            'class':'banner'
        });

        let bannerDetails = document.createElement('div');
        setAttributes(bannerDetails, {
            'class':'banner-details'
        });

        let bannerImage = document.createElement('img');
        setAttributes(bannerImage, {
            'class':'banner-image',
            'src':`https://drive.google.com/thumbnail?id=${image_id}&sz=s4000`,
            'alt':`${dataBanner.table.rows[i].c[0].v}`
        });

        let bannerDetailsContainer = document.createElement('div');
        setAttributes(bannerDetailsContainer, {
            'class':'banner-details-container'
        });

        let titleBanner = document.createElement('h1');
        setAttributes(titleBanner, {
            'class':'title-banner'
        });
        titleBanner.innerHTML = `${dataBanner.table.rows[i].c[0].v}`;

        let subTitle = document.createElement('h2');
        setAttributes(subTitle, {
            'class':'sub-title'
        });
        subTitle.innerHTML = `${dataBanner.table.rows[i].c[1].v}`;

        console.log(dataBanner.table.rows[i].c[2].v);
        console.log(dataBanner);

        bannerDetailsContainer.append(titleBanner);
        bannerDetailsContainer.append(subTitle);

        let descriptionListObject;
        if(dataBanner.table.rows[i].c[2].v.includes('\n- ') || dataBanner.table.rows[i].c[2].v.startsWith('- ')){
            // Split by newlines, remove the "- " prefix, and trim whitespace
            const rows = dataBanner.table.rows[i].c[2].v.split('\n').map(item => item.replace(/^- /, '').trim());

            // Create the JSON object
            descriptionListObject = { rows };

            console.log(descriptionListObject);

            let descriptionList = document.createElement('ul');
            setAttributes(descriptionList, {
                'class':'services-list'
            });

            let descriptionListLength = descriptionListObject.rows.length;

            for(let i=0; i<descriptionListLength; i++){
                let listItem = document.createElement('li');
                listItem.innerHTML = `${descriptionListObject.rows[i]}`;
                descriptionList.append(listItem);
            }

            bannerDetailsContainer.append(descriptionList);

        }else{
            let bannerDescription = document.createElement('p');
            setAttributes(bannerDescription, {
                'class':'banner-description'
            });
            bannerDescription.innerHTML = `${dataBanner.table.rows[i].c[2].v}`;

            bannerDetailsContainer.append(bannerDescription);
        }
        console.log('sampe kok');

        bannerDetails.append(bannerDetailsContainer);
        banner.append(bannerDetails);
        banner.append(bannerImage);
        bannerCarouselItems.append(banner);
        carouselPromotionInner.append(bannerCarouselItems);

    }
    
}


function setAttributes(el, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
}