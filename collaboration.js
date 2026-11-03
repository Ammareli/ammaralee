// Add real collaborator information here. Leave unknown fields empty.
const collaborators = [
  { specialty: 'Software Engineering', name: '', image: '', description: '', linkedin: '', github: '', portfolio: '' },
  { specialty: 'AI Engineering', name: '', image: '', description: '', linkedin: '', github: '', portfolio: '' },
  { specialty: 'UI/UX Design', name: '', image: '', description: '', linkedin: '', github: '', portfolio: '' },
  { specialty: 'Mobile Development', name: '', image: '', description: '', linkedin: '', github: '', portfolio: '' },
  { specialty: 'Framer & Web Development', name: '', image: '', description: '', linkedin: '', github: '', portfolio: '' }
];

const network = document.querySelector('.constellation');
const detail = document.querySelector('#collaborator-detail');
const nodes = [...document.querySelectorAll('[data-node]')];
let selected = null;

function closeProfile() {
  selected = null;
  detail.hidden = true;
  detail.replaceChildren();
  nodes.forEach((node) => node.querySelector('button')?.setAttribute('aria-expanded', 'false'));
}

function showProfile(index) {
  const profile = collaborators[index];
  const links = [['LinkedIn', profile.linkedin], ['GitHub', profile.github], ['Portfolio', profile.portfolio]];
  detail.replaceChildren();
  const heading = document.createElement('h4');
  heading.textContent = profile.name || profile.specialty;
  detail.append(heading);
  if (profile.name) {
    const specialty = document.createElement('p');
    specialty.className = 'profile-specialty';
    specialty.textContent = profile.specialty;
    detail.append(specialty);
  }
  if (profile.description) {
    const description = document.createElement('p');
    description.textContent = profile.description;
    detail.append(description);
  }
  links.forEach(([label, url]) => {
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (!['https:', 'http:'].includes(parsed.protocol)) return;
      const link = document.createElement('a');
      link.href = parsed.href;
      link.textContent = label;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      detail.append(link);
    } catch { /* Ignore incomplete profile URLs. */ }
  });
  selected = index;
  detail.hidden = false;
  nodes.forEach((node, i) => node.querySelector('button')?.setAttribute('aria-expanded', String(i === index)));
}

nodes.forEach((node, index) => {
  const profile = collaborators[index];
  node.addEventListener('pointerenter', (event) => {
    network.dataset.active = String(index);
    if (event.pointerType === 'mouse' && hasDetails) showProfile(index);
  });
  node.addEventListener('pointerleave', () => { delete network.dataset.active; });
  const hasDetails = Boolean(profile.name || profile.description || profile.linkedin || profile.github || profile.portfolio);
  if (!hasDetails) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'constellation-node constellation-node--interactive';
  button.setAttribute('aria-controls', 'collaborator-detail');
  button.setAttribute('aria-expanded', 'false');
  if (profile.image) {
    const image = document.createElement('img');
    image.src = profile.image;
    image.alt = '';
    button.append(image);
  }
  const label = document.createElement('span');
  label.textContent = profile.name || profile.specialty;
  button.append(label);
  const cue = document.createElement('span');
  cue.className = 'profile-cue';
  cue.textContent = 'View profile';
  button.append(cue);
  node.replaceChildren(button);
  button.addEventListener('click', () => showProfile(index));
  button.addEventListener('focus', () => { network.dataset.active = String(index); });
  button.addEventListener('blur', () => { delete network.dataset.active; });
  button.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProfile(); });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      network.classList.add('is-entering');
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(network);
}
