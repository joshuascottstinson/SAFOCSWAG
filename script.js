// Inject request checkboxes into every product card
document.querySelectorAll('.product-card').forEach(card => {
  const name = card.querySelector('.product-name').textContent.trim();
  const footer = card.querySelector('.product-footer');
  const label = document.createElement('label');
  label.className = 'request-check';
  label.innerHTML = `<input type="checkbox" class="item-checkbox" value="${name}" /> Add to request`;
  footer.after(label);
});

// Floating badge
const badge = document.createElement('button');
badge.className = 'request-badge';
badge.innerHTML = `<span class="request-badge-count" id="badge-count">0</span> View Request`;
badge.addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});
document.body.appendChild(badge);

document.addEventListener('change', e => {
  if (!e.target.classList.contains('item-checkbox')) return;
  const label = e.target.closest('.request-check');
  if (label) {
    label.classList.toggle('checked', e.target.checked);
    label.lastChild.textContent = e.target.checked ? ' ✓ Added' : ' Add to request';
  }
  const checked = Array.from(document.querySelectorAll('.item-checkbox:checked'));
  document.getElementById('item').value = checked.map(cb => cb.value).join(', ');
  document.getElementById('badge-count').textContent = checked.length;
  badge.style.display = checked.length ? 'flex' : 'none';
});

// Category filter
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// Product detail modal
function openModal(name, desc, category) {
  document.getElementById('modal-title').textContent = name;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-category').textContent = category;
  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== document.getElementById('modal-overlay') && !e.target.classList.contains('modal-close')) return;
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal({target: document.getElementById('modal-overlay')});
});

// Contact form (placeholder — wire to backend/Formspree later)
function submitForm(e) {
  e.preventDefault();
  document.querySelector('.contact-form').style.display = 'none';
  document.getElementById('form-success').style.display = 'block';
}
