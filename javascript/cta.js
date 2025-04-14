SHEET_ID = '1kDuwr-kQTbtQKF-Uy3KgrjRDC29TP61VxIJ_YgYzpMA';
SHEET_TITLE = 'Kontak';

FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}`;

fetch(FULL_URL).then(res => res.text()).then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));

    let ctaButton = document.getElementById('id-cta-button');

    ctaButton.addEventListener('click', () => {
        sendMessage(data.table.rows[0].c[0].v, data.table.rows[0].c[1].v);
    });

});

function sendMessage(phoneNumber, message){
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
};

