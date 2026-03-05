// Mobile menu toggle
function toggleMenu(){
  const m = document.getElementById("mobileNav");
  if(!m) return;
  m.classList.toggle("show");
}

// Simple modal for "Book Now"
function openBookingModal(itemName){
  const backdrop = document.getElementById("modalBackdrop");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  if(!backdrop || !title || !body) return;

  title.textContent = "Booking (External Partner)";
  body.textContent = `You selected: ${itemName}. In a full version of this site, this button would take you to an external booking partner or a reservation form.`;
  backdrop.style.display = "flex";
  backdrop.setAttribute("aria-hidden", "false");
}

function closeBookingModal(){
  const backdrop = document.getElementById("modalBackdrop");
  if(!backdrop) return;
  backdrop.style.display = "none";
  backdrop.setAttribute("aria-hidden", "true");
}

// Close modal on backdrop click
document.addEventListener("click", (e) => {
  const backdrop = document.getElementById("modalBackdrop");
  if(!backdrop) return;
  if(e.target === backdrop) closeBookingModal();
});

// Search + filter for cards on Activities/Lodging pages
function setupCardSearch({inputId, cardSelector, titleSelector, tagSelector, emptyId}){
  const input = document.getElementById(inputId);
  const empty = document.getElementById(emptyId);
  const cards = Array.from(document.querySelectorAll(cardSelector));

  if(!input || cards.length === 0) return;

  function apply(){
    const q = input.value.trim().toLowerCase();
    let shown = 0;

    for(const c of cards){
      const title = (c.querySelector(titleSelector)?.textContent || "").toLowerCase();
      const tags = Array.from(c.querySelectorAll(tagSelector)).map(x => x.textContent.toLowerCase()).join(" ");
      const hay = `${title} ${tags}`;

      const match = hay.includes(q);
      c.style.display = match ? "" : "none";
      if(match) shown++;
    }

    if(empty) empty.style.display = (shown === 0) ? "" : "none";
  }

  input.addEventListener("input", apply);
  apply();
}

// Filter pills (Activities page)
function setupPillFilters({pillSelector, cardSelector, tagSelector, emptyId}){
  const pills = Array.from(document.querySelectorAll(pillSelector));
  const cards = Array.from(document.querySelectorAll(cardSelector));
  const empty = document.getElementById(emptyId);

  if(pills.length === 0 || cards.length === 0) return;

  function setActive(activePill){
    for(const p of pills){
      p.setAttribute("aria-pressed", p === activePill ? "true" : "false");
    }
  }

  function apply(filterValue){
    let shown = 0;
    for(const c of cards){
      const tags = Array.from(c.querySelectorAll(tagSelector)).map(x => x.textContent.toLowerCase());
      const match = (filterValue === "all") ? true : tags.includes(filterValue);
      c.style.display = match ? "" : "none";
      if(match) shown++;
    }
    if(empty) empty.style.display = (shown === 0) ? "" : "none";
  }

  for(const p of pills){
    p.addEventListener("click", () => {
      const v = p.dataset.filter;
      setActive(p);
      apply(v);
    });
  }

  // default
  const first = pills[0];
  if(first){
    setActive(first);
    apply(first.dataset.filter || "all");
  }
}