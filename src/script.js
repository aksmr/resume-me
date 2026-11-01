// Calculer l'âge automatiquement
function calculateAge() {
  const birthDate = new Date(2000, 0, 3); // 3 janvier 2000
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Mettre à jour l'âge au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  const age = calculateAge();
  const ageHero = document.getElementById('age-hero');
  const ageInfo = document.getElementById('age-info');
  const ageRangeMin = document.getElementById('age-range-min');
  const ageRangeMax = document.getElementById('age-range-max');
  if (ageHero) ageHero.textContent = age + ' ans';
  if (ageInfo) ageInfo.textContent = age + ' ans';
  if (ageRangeMin) ageRangeMin.textContent = age - 4;
  if (ageRangeMax) ageRangeMax.textContent = age + 1;

  const photoLink = document.querySelector('.hero-photo-link');
  const photo = document.querySelector('.hero-photo');
  const photoCount = document.getElementById('photo-count');
  const previousButton = document.getElementById('photo-previous');
  const nextButton = document.getElementById('photo-next');
  const photos = [
    { src: 'img/halouf_sous_costume.jpg', alt: 'Simon en costume' },
    { src: 'img/halouf_wsh_baisse_la_luminosite.jpeg', alt: 'Portrait de Simon en extérieur' },
    { src: 'img/halouf_il_se_croit_en_asie.jpeg', alt: 'Simon en tenue claire dans un jardin' },
    { src: 'img/halouf_and_baba.jpg', alt: 'Simon avec son père' },
    { src: 'img/halouf_il_tient_un_baton_ptdr.JPG', alt: 'Portrait de Simon en polo' },
    { src: 'img/halouf_jss_fier_du_mont_fuji.JPG', alt: 'Simon devant le mont Fuji' }
  ];

  if (photoLink && photo && photoCount && previousButton && nextButton) {
    let currentPhoto = 0;

    function showPhoto(index) {
      currentPhoto = (index + photos.length) % photos.length;
      photo.src = photos[currentPhoto].src;
      photo.alt = photos[currentPhoto].alt;
      photoLink.href = photos[currentPhoto].src;
      photoCount.textContent = `${currentPhoto + 1} / ${photos.length}`;
    }

    previousButton.addEventListener('click', function() {
      showPhoto(currentPhoto - 1);
    });
    nextButton.addEventListener('click', function() {
      showPhoto(currentPhoto + 1);
    });
  }
});

const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
sections.forEach(s => io.observe(s));
