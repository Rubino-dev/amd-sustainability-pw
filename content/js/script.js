
  // Utilizzato per impostare l'anno corrente nel footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Funzione utilizzata per tornare in cima alla pagina
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


//   Funzione creata per mettere in pausa il video, inoltre cambia anche la classe all'interno dell'elemento <i> così da visualizzare in tempo reale il tasto play o pausa
    function toggleVideo() {
    const video = document.getElementById('heroVideo');
    const icon = event.target.closest('button').querySelector('i');
    const text = document.getElementById('pause-text');
    
    if (video.paused) {
      video.play();
      icon.className = 'fa-solid fa-pause';
            text.textContent = "Metti in pausa";

    } else {
      video.pause();
      icon.className = 'fa-solid fa-play';
      text.textContent = "Fai ripartire";
    }
  }

  // Dati in formato json utilizzati per sostituire il contenuto nella sezione report. Viene richiamato dalla funzione changeReport in cui viene passato il valore da recuperare
  const reportData = {
  '2023-2024': {
    title: "Trasformazione e Responsabilità",
    desc: "AMD ha raggiunto traguardi significativi nel 2023-24, migliorando l'efficienza energetica e l'inclusività globale. Scarica il report per scoprire tutti i dettagli.",
    img: "./content/images/reporting/transformation-responsibility.jpeg",
    link: "./content/documents/2023-24-global-cr-report-summary.pdf"
  },
  '2022-2023': {
    title: "Innovazione e Impatto",
    desc: "Nel 2022-23 AMD ha innovato nel design dei chip a basso impatto ambientale e ha sostenuto le comunità locali.",
    img: "./content/images/reporting/innovation-impact.jpeg",
    link: "./content/documents/2022-23-global-cr-report-summary.pdf"
  },
  '2021-2022': {
    title: "Verso un futuro sostenibile",
    desc: "Obiettivi ESG rafforzati, investimenti in energie rinnovabili e maggiore trasparenza operativa.",
    img: "./content/images/reporting/future-sustainability.jpeg",
    link: "./content/documents/2021-22-global-cr-report-summary.pdf"
  },
  '2020-2021': {
    title: "Impegno in crescita",
    desc: "AMD ha introdotto la visione ESG 2030 e avviato importanti collaborazioni per la sostenibilità.",
    img: "./content/images/reporting/growing-commitment.jpeg",
    link: "./content/documents/2020-21-global-cr-report-summary.pdf"
  }
};

// funzione che aggiorna le informazioni nella sezione report
function changeReport(year) {
  document.querySelectorAll('.years-nav li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');

  const data = reportData[year];
  document.getElementById('report-year').textContent = year;
  document.getElementById('report-title').textContent = data.title;
  document.getElementById('report-desc').textContent = data.desc;
  document.getElementById('report-img').src = data.img;
  document.getElementById('report-link').href = data.link;
  document.getElementById('report-img').alt = `Report ${year}`;

  // animazione fade
  document.querySelectorAll('.animate-fade').forEach(el => {
    el.classList.remove('animate-fade');
    void el.offsetWidth;
    el.classList.add('animate-fade');
  });
}


// Crea un nuovo IntersectionObserver che monitora l'intersezione di elementi nel viewport
const observer = new IntersectionObserver(entries => {
  // Scorre tutti gli elementi osservati
  entries.forEach(entry => {
    // Se l'elemento è almeno per il 50% visibile nel viewport
    if (entry.isIntersecting) {
      // Aggiunge la classe 'active' (utile per attivare animazioni, stili, ecc.)
      entry.target.classList.add('active');
    } else {
      // Altrimenti la rimuove se esce dal viewport
      entry.target.classList.remove('active');
    }
  });
}, {
  // La soglia indica quanto dell'elemento deve essere visibile (50% in questo caso)
  threshold: 0.5
});


// Seleziona tutti gli elementi con classe .timeline-item
document.querySelectorAll('.timeline-item').forEach(item => {
  // Inizia ad osservare ogni elemento con il nostro observer
  observer.observe(item);
});


// Controlla che lo scroll abbiamo superato una certa altezza per far apparire o scomparire il go to top - in questo modo evitiamo di vederlo quando siamo in alto alla pagina
window.addEventListener('scroll', function () {
  const goTopBtn = document.querySelector('.go-top');
  if (window.scrollY > 100) {
    goTopBtn.classList.add('show');
  } else {
    goTopBtn.classList.remove('show');
  }
});

// creazione del json contenente l'oggetto come serve al grafico della libreria apex chart. Verrà passato nell'inizializzazione di ApexCharts
var options = {
  chart: {
    type: 'line',
    height: 350
  },
  series: [
    {
      name: 'Efficienza Energetica (indice)',
      data: [10, 20, 30, 40, 50]
    },
    {
      name: 'Riduzione dei Consumi (%)',
      data: [5, 10, 15, 22, 30]
    },
    {
      name: 'Efficienza Supercomputer (ranking)',
      data: [3, 2, 2, 1, 1]
    }
  ],
  xaxis: {
    categories: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25']
  },
  colors: ['#007c97', '#f26522', '#e03e2d'],
  stroke: {
    curve: 'smooth'
  },
  markers: {
    size: 5
  },
  tooltip: {
    shared: true,
    intersect: false
  }
};

// Nuova istanza di ApexCharts in cui viene definito l'id in cui dovrà renderizzarsi e i valori da renderizzare
var chart = new ApexCharts(document.querySelector("#sustainabilityChart"), options);
// metodo render di ApexCharts da richiamare quando siamo pronti ovvero dopo aver istanziato l'oggetto con i valori corretti
chart.render();




// Inizializza lo slider Glider per la sezione "Impatto Sociale" al caricamento della pagina
function socialImpact(){
    // Istanzia Glider su .glider (slider principale)
  const glider = new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,         // mostra una slide alla volta
    scrollLock: true,        // impedisce lo scroll oltre i limiti del contenitore
    draggable: true,         // consente il trascinamento (touch/mouse)
    dots: '.slider-dots',    // selettore per i dot indicatori
    duration: 0.5,           // velocità transizione (in secondi)
    rewind: true             // torna all’inizio alla fine
  });

  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.glider .card-box').length;

  // Avanza automaticamente alla slide successiva ogni 5 secondi
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    glider.scrollItem(currentSlide); // scrolla alla nuova slide
    resetProgressBar();              // resetta l’animazione della barra
  }, 5000);

  // Funzione per far ripartire l’animazione della progress bar verticale
  function resetProgressBar() {
    const fill = document.querySelector("#progress-bar-fill");
    fill.style.animation = 'none';           // rimuove temporaneamente l’animazione
    void fill.offsetHeight;                 // forza un reflow per riapplicare la proprietà
    fill.style.animation = 'fillProgress 5s linear forwards'; // riavvia l'animazione
  }
}

// Inizializza lo slider Glider per la sezione "Riconoscimenti" al caricamento della pagina
function recognition(){
    const gliderEl = document.querySelector('.recognition-glider-section .glider');

  // Istanza Glider per far scorrere i loghi orizzontalmente
  const glider = new Glider(gliderEl, {
    slidesToShow: 4,           // mostra 4 loghi alla volta su desktop
    slidesToScroll: 1,         // scrolla un logo per volta
    draggable: false,          // disabilita il trascinamento
    scrollLock: true,          // blocca oltre i margini
    rewind: true,              // torna all’inizio dopo l’ultimo
    duration: 3,               // transizione lenta e fluida
    responsive: [              // regole responsive per tablet e mobile
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1 } }
    ]
  });

  // Avanzamento automatico ogni 1 secondo (carousel infinito)
  setInterval(() => glider.scrollItem('next'), 1000);
}

// Chiamo in un solo load le due funzioni create sopra
window.addEventListener('load', function () {
  socialImpact();
  recognition();
});

  // Toggle mobile menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  });