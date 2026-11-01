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

  const photoLink = document.querySelector('.hero-photo-link');
  const photo = document.querySelector('.hero-photo');
  const photoCount = document.getElementById('photo-count');
  const previousButton = document.getElementById('photo-previous');
  const nextButton = document.getElementById('photo-next');
  const languageToggle = document.getElementById('language-toggle');
  const frenchTexts = new Map(
    Array.from(document.querySelectorAll('[data-i18n]'), element => [element, element.textContent])
  );
  const bengaliTranslations = {
    'page.title': 'বিবাহের বায়োডাটা – এ. কে. সাইমন',
    'photo.open': 'ছবিটি বড় করে খুলুন',
    'photo.controls': 'ছবি দেখার নিয়ন্ত্রণ',
    'photo.previous': 'আগের ছবি',
    'photo.next': 'পরের ছবি',
    'photo.enlarge': 'বড় করে দেখুন',
    'hero.title': 'বিয়ের বায়োডাটা',
    'hero.tagline1': 'একজন উৎসাহী প্রকৌশলী,',
    'hero.tagline2': 'একজন আন্তরিক বিশ্বাসী,',
    'hero.tagline3': 'জীবনসঙ্গীর সন্ধানে।',
    'hero.birthdate': 'জন্ম: ০৩/০১/২০০০',
    'hero.country': 'ফ্রান্স',
    'hero.job': 'প্রকৌশলী',
    'hero.faith': 'সুন্নি',
    'hero.practice': 'নিয়মিত ধর্মচর্চা',
    'hero.scroll': 'পরিচিতি দেখুন',
    'toc.label': 'সূচিপত্র',
    'toc.title': 'সূচিপত্র',
    'section.about': 'ব্যক্তিগত তথ্য',
    'section.family': 'পরিবার',
    'section.education': 'শিক্ষা ও পেশা',
    'section.religion': 'ধর্মীয় অনুশীলন',
    'section.personality': 'ব্যক্তিত্ব ও পারিবারিক জীবন',
    'section.lifestyle': 'জীবনযাপন ও শখ',
    'section.search': 'আমি যা খুঁজছি',
    'personal.fullname.label': 'পূর্ণ নাম',
    'personal.birthdate.label': 'জন্মতারিখ',
    'personal.birthdate': '৩ জানুয়ারি ২০০০ · ',
    'personal.birthplace.label': 'জন্মস্থান',
    'personal.residence.label': 'বসবাসের স্থান',
    'personal.france': 'ফ্রান্স',
    'personal.nationality.label': 'জাতীয়তা',
    'personal.nationality': 'ফরাসি',
    'personal.origin.label': 'বংশপরিচয়',
    'personal.origin': 'বাংলাদেশি বংশোদ্ভূত · ',
    'personal.city': 'হাসনাবাদ',
    'personal.status.label': 'বৈবাহিক অবস্থা',
    'personal.status': 'অবিবাহিত',
    'personal.height.label': 'উচ্চতা ও ওজন',
    'personal.height': '১৭৩ সেমি · ৭১ কেজি',
    'family.father.label': 'পিতা',
    'family.alive': ' (জীবিত)',
    'family.retired': 'অবসরপ্রাপ্ত',
    'family.mother.label': 'মাতা',
    'family.alive.feminine': ' (জীবিত)',
    'family.homemaker': 'গৃহিণী',
    'family.siblings.label': 'ভাইবোন',
    'family.sister': '১ জন বড় বোন, বিবাহিত (রেস্তোরাঁ ব্যবসা)',
    'family.brother': '১ জন ছোট ভাই, অবিবাহিত (ব্যাংকে প্রকল্প ব্যবস্থাপক)',
    'education.degree.label': 'ডিগ্রি',
    'education.degree': 'ইঞ্জিনিয়ারিং ডিগ্রি · BAC+5',
    'education.specialty.label': 'বিশেষায়ন',
    'education.specialty': 'কম্পিউটার সায়েন্স · বিগ ডেটা',
    'education.profession.label': 'পেশা',
    'education.finances.label': 'আর্থিক অবস্থা',
    'education.finances': 'খুবই স্থিতিশীল (প্রকৌশলী)',
    'religion.school.label': 'মাজহাব',
    'religion.school': 'মালিকি (অন্যান্য মাজহাবের প্রতিও উন্মুক্ত)',
    'religion.daily.label': 'দৈনন্দিন আমল',
    'religion.daily': 'নিয়মিত সালাত আদায়, রমজানের রোজা রাখা ও যাকাত আদায়। হজ পালন করা একটি লক্ষ্য।',
    'religion.mosque.label': 'মসজিদে',
    'religion.mosque': 'মসজিদে জুমার সালাত ও তারাবিহ',
    'religion.food.label': 'খাদ্যাভ্যাস',
    'religion.food': 'সম্পূর্ণ হালাল খাবার গ্রহণ',
    'religion.studies.label': 'ইসলামি শিক্ষা',
    'religion.studies': 'একটি প্রতিষ্ঠানে পূর্ণাঙ্গ ইসলামি শিক্ষা গ্রহণ করছি ',
    'religion.institute': 'প্রতিষ্ঠান',
    'religion.quran': 'কুরআন',
    'religion.quote': '« আমি সবকিছু জানি না—এটা স্বীকার করি, ভুল হলে তা মেনে নিই, আর প্রতিদিন নিজেকে আরও ভালো করার চেষ্টা করি। »',
    'personality.traits.label': 'চারিত্রিক বৈশিষ্ট্য',
    'personality.traits': 'শান্ত · হাসিখুশি · গোছানো · যুক্তিবাদী',
    'personality.sociability.label': 'সামাজিকতা',
    'personality.sociability': 'অন্তর্মুখী · ছোট পরিসরে বেশি স্বচ্ছন্দ · বিশ্বাস তৈরি হলে সহজে মনের কথা বলি',
    'personality.offer.label': 'আমি যা দিতে চাই',
    'personality.offer': 'মানসিক নিরাপত্তা · দৈনন্দিন নির্ভরযোগ্য সহায়তা · মন দিয়ে শোনা',
    'personality.communication.label': 'যোগাযোগ ও মতবিরোধ',
    'personality.communication': 'পারস্পরিক শ্রবণ · গলা না চড়িয়ে নিজেদের মত প্রকাশ',
    'lifestyle.nature.label': 'প্রকৃতি ও বাইরের পরিবেশ',
    'lifestyle.nature': 'প্রকৃতির মাঝে হাঁটা · প্রকৃতি, দৃশ্যপট ও স্থাপত্য · ঘরের গাছের যত্ন',
    'lifestyle.creative.label': 'সৃজনশীলতা',
    'lifestyle.creative': 'ফটোগ্রাফি',
    'lifestyle.entertainment.label': 'বিনোদন ও সংস্কৃতি',
    'lifestyle.entertainment': 'নতুন প্রযুক্তি · ভিডিও গেম · মাঙ্গা · বোর্ড গেম',
    'lifestyle.sport.label': 'একসঙ্গে সময় ও খেলাধুলা',
    'lifestyle.swimming': 'সুস্থ থাকতে: সাঁতার',
    'lifestyle.friends': 'বন্ধুদের সঙ্গে সময় কাটাতে: ফুটবল, বাস্কেটবল, প্যাডেল',
    'lifestyle.travel.label': 'ভ্রমণ',
    'lifestyle.travel': 'সংযুক্ত আরব আমিরাত, থাইল্যান্ড, মালয়েশিয়া, নেদারল্যান্ডস, ইতালি, জার্মানি, তুরস্ক, ইংল্যান্ড, জাপান',
    'search.age.prefix': 'বয়স ',
    'search.age.connector': ' থেকে ',
    'search.age.suffix': ' বছর',
    'search.faith': 'আন্তরিক বিশ্বাসী, সালাত আদায়ে নিয়মিত এবং যাকাত প্রদানকারী',
    'search.learning': 'একসঙ্গে দ্বীনি জ্ঞান অর্জন চালিয়ে যেতে আগ্রহী',
    'search.work': 'নিজের পছন্দ ও ভারসাম্য অনুযায়ী পেশাজীবন চালিয়ে যেতে বা সংসারে সময় দিতে স্বাধীন',
    'search.character': 'কৌতূহলী, সহানুভূতিশীল ও পরোপকারী',
    'search.gratitude': 'দৈনন্দিন জীবনে কৃতজ্ঞ · সব সময় অভিযোগ না করে নিজের অসন্তুষ্টি প্রকাশ করতে জানেন',
    'search.home': 'ফ্রান্সে সুদমুক্ত ভাড়ার বাসায় স্বাধীনভাবে সংসার গড়ার ইচ্ছা',
    'search.family': 'পরিবার গড়ার এবং সন্তানদের লালন-পালন ও শিক্ষায় নিবেদিত হওয়ার গভীর ইচ্ছা',
    'contact.title': 'যোগাযোগ করুন',
    'contact.subtitle': 'যেকোনো প্রয়োজনে সরাসরি পরিবারের সঙ্গে যোগাযোগ করতে পারেন।',
    'contact.father': 'আমার বাবার সঙ্গে যোগাযোগ করুন',
    'footer.translation': '“আর তাঁর নিদর্শনাবলির মধ্যে রয়েছে—তিনি তোমাদের জন্য তোমাদেরই মধ্য থেকে জীবনসঙ্গিনী সৃষ্টি করেছেন, যাতে তোমরা তাদের কাছে প্রশান্তি লাভ করো।” — আর-রূম: ২১'
  };
  const photos = [
    { src: 'img/halouf_sous_costume.jpg', alt: 'Simon en costume', altBn: 'স্যুট পরা সাইমন' },
    { src: 'img/halouf_wsh_baisse_la_luminosite.jpeg', alt: 'Portrait de Simon en extérieur', altBn: 'বাইরে সাইমনের প্রতিকৃতি' },
    { src: 'img/halouf_il_se_croit_en_asie.jpeg', alt: 'Simon en tenue claire dans un jardin', altBn: 'বাগানে হালকা রঙের পোশাকে সাইমন' },
    { src: 'img/halouf_and_baba.jpg', alt: 'Simon avec son père', altBn: 'বাবার সঙ্গে সাইমন' },
    { src: 'img/halouf_il_tient_un_baton_ptdr.JPG', alt: 'Portrait de Simon en polo', altBn: 'পোলো শার্টে সাইমনের প্রতিকৃতি' },
    { src: 'img/halouf_jss_fier_du_mont_fuji.JPG', alt: 'Simon devant le mont Fuji', altBn: 'ফুজি পর্বতের সামনে সাইমন' }
  ];

  function toBengaliDigits(value) {
    return String(value).replace(/\d/g, digit => '০১২৩৪৫৬৭৮৯'[Number(digit)]);
  }

  function updateAge(language) {
    const format = language === 'bn' ? toBengaliDigits : String;
    const yearLabel = language === 'bn' ? ' বছর' : ' ans';
    if (ageHero) ageHero.textContent = format(age) + yearLabel;
    if (ageInfo) ageInfo.textContent = format(age) + yearLabel;
    if (ageRangeMin) ageRangeMin.textContent = format(age - 4);
    if (ageRangeMax) ageRangeMax.textContent = format(age + 1);
  }

  function applyLanguage(language) {
    const isBengali = language === 'bn';
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      element.textContent = isBengali ? bengaliTranslations[key] : frenchTexts.get(element);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      const key = element.dataset.i18nAriaLabel;
      const frenchLabel = element.getAttribute('aria-label');
      if (!element.dataset.frenchAriaLabel) element.dataset.frenchAriaLabel = frenchLabel;
      element.setAttribute('aria-label', isBengali ? bengaliTranslations[key] : element.dataset.frenchAriaLabel);
    });
    if (languageToggle) {
      languageToggle.textContent = isBengali ? 'Lire en français' : 'বাংলায় পড়ুন';
      languageToggle.setAttribute('aria-label', isBengali ? 'Afficher le biodata en français' : 'Afficher le biodata en bengali');
    }

    updateAge(language);
    if (photo) photo.alt = isBengali ? photos[currentPhoto].altBn : photos[currentPhoto].alt;
    if (photoLink) photoLink.setAttribute('aria-label', isBengali ? bengaliTranslations['photo.open'] : 'Ouvrir la photo en grand');
    if (photoCount) photoCount.textContent = `${isBengali ? toBengaliDigits(currentPhoto + 1) : currentPhoto + 1} / ${isBengali ? toBengaliDigits(photos.length) : photos.length}`;
  }

  function readSavedLanguage() {
    try {
      return window.localStorage.getItem('biodataLanguage') === 'bn' ? 'bn' : 'fr';
    } catch (error) {
      console.warn('Impossible de lire la langue enregistrée dans le navigateur.', error);
      return 'fr';
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem('biodataLanguage', language);
    } catch (error) {
      console.warn('Impossible d’enregistrer la préférence de langue dans le navigateur.', error);
    }
  }

  let currentLanguage = readSavedLanguage();
  let currentPhoto = 0;

  if (photoLink && photo && photoCount && previousButton && nextButton) {
    function showPhoto(index) {
      currentPhoto = (index + photos.length) % photos.length;
      photo.src = photos[currentPhoto].src;
      photo.alt = currentLanguage === 'bn' ? photos[currentPhoto].altBn : photos[currentPhoto].alt;
      photoLink.href = photos[currentPhoto].src;
      const format = currentLanguage === 'bn' ? toBengaliDigits : String;
      photoCount.textContent = `${format(currentPhoto + 1)} / ${format(photos.length)}`;
    }

    previousButton.addEventListener('click', function() {
      showPhoto(currentPhoto - 1);
    });
    nextButton.addEventListener('click', function() {
      showPhoto(currentPhoto + 1);
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', function() {
      currentLanguage = currentLanguage === 'fr' ? 'bn' : 'fr';
      applyLanguage(currentLanguage);
      saveLanguage(currentLanguage);
    });
  }
  applyLanguage(currentLanguage);
});

const sections = document.querySelectorAll('.section');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
sections.forEach(s => io.observe(s));
