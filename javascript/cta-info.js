SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'CTA';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_TITLE}&headers=1`;


fetch(FULL_URL).then(res => res.text()).then(rep => {
    let dataCTA = JSON.parse(rep.substr(47).slice(0, -2));

    let lengthCTA = dataCTA.table.rows.length;
    for(let i=0; i<lengthCTA; i++){
        let ctaTitleTop = document.querySelector('.cta-title-top');
        ctaTitleTop.innerHTML = dataCTA.table.rows[i].c[0].v;

        let ctaTitleMiddle = document.querySelector('.cta-title-middle');
        ctaTitleMiddle.innerHTML = dataCTA.table.rows[i].c[1].v;

        let ctaTitleBottom = document.querySelector('.cta-title-bottom');
        ctaTitleBottom.innerHTML = dataCTA.table.rows[i].c[2].v;

        let ctaDescription = document.querySelector('.cta-description');
        ctaDescription.innerHTML = dataCTA.table.rows[i].c[3].v;

        let ctaButton = document.querySelector('.cta-button-container p');
        ctaButton.innerHTML = dataCTA.table.rows[i].c[4].v;
    }
});