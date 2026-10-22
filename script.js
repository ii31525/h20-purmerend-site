const form = document.getElementById('chatForm');
const input = document.getElementById('userInput');
const messages = document.getElementById('chatMessages');
const quickQuestions = document.querySelectorAll('.quick-question');

function addMessage(text, type = 'bot') {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${type}`;

  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  wrapper.appendChild(paragraph);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

function getBotReply(question) {
  const normalized = question.toLowerCase().trim();

  if (
    normalized.includes('hoelaat') ||
    normalized.includes('open') ||
    normalized.includes('opening') ||
    normalized.includes('sluit') ||
    normalized.includes('sluiting')
  ) {
    return 'H20 is meestal geopend vanaf ongeveer 10:00 uur. De exacte openingstijd kan per dag en evenement verschillen, dus controleer bij speciale activiteiten nog even de actuele planning.';
  }

  if (
    normalized.includes('waar') ||
    normalized.includes('locatie') ||
    normalized.includes('adres') ||
    normalized.includes('plek') ||
    normalized.includes('vinden')
  ) {
    return 'H20 Purmerend ligt in het centrum van Purmerend. Voor het exacte adres en routebeschrijving kun je het beste contact opnemen met de organisatie.';
  }

  if (
    normalized.includes('activiteit') ||
    normalized.includes('evenement') ||
    normalized.includes('programma') ||
    normalized.includes('wat') && normalized.includes('doen')
  ) {
    return 'H20 organiseert verschillende activiteiten en evenementen voor bezoekers van alle leeftijden. Kijk op de website of neem contact op voor het actuele aanbod.';
  }

  if (
    normalized.includes('contact') ||
    normalized.includes('mail') ||
    normalized.includes('telefoon') ||
    normalized.includes('help') ||
    normalized.includes('vragen')
  ) {
    return 'Je kunt contact opnemen via info@h20purmerend.nl of telefonisch via +31 (0)299 123 456. Wij helpen je graag verder.';
  }

  if (
    normalized.includes('prijs') ||
    normalized.includes('kosten') ||
    normalized.includes('tarief')
  ) {
    return 'De kosten kunnen per activiteit verschillen. Neem contact op voor de actuele tarieven en mogelijke abonnementen.';
  }

  if (
    normalized.includes('welkom') ||
    normalized.includes('hallo') ||
    normalized.includes('hoi')
  ) {
    return 'Hoi! Ik help je graag met vragen over H20 Purmerend. Bijvoorbeeld over openingstijden, activiteiten, locatie of contact.';
  }

  return 'Ik heb hier hulp bij. Je kunt vragen stellen over de openingstijden, locatie, activiteiten, evenementen of contactgegevens van H20 Purmerend.';
}

function handleQuestion(question) {
  if (!question) return;

  addMessage(question, 'user');

  const reply = getBotReply(question);

  setTimeout(() => {
    addMessage(reply, 'bot');
  }, 250);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = input.value.trim();
  handleQuestion(question);
  input.value = '';
  input.focus();
});

quickQuestions.forEach((button) => {
  button.addEventListener('click', () => {
    const question = button.textContent.trim();
    handleQuestion(question);
  });
});
