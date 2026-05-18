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
  if (ageHero) ageHero.textContent = age + ' ans';
  if (ageInfo) ageInfo.textContent = age + ' ans';
});

const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
sections.forEach(s => io.observe(s));
