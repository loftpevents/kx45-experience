const eventDate = new Date("2026-09-10T09:00:00-04:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = Math.max(0, eventDate - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

const eventDetails = {
  symposium: {
    title: "Professional Symposium",
    body: "Add the confirmed time, venue, featured speakers, session topics, parking instructions, attire, and registration requirements."
  },
  friday: {
    title: "Friday Events",
    body: "Add golf course information, check-in and tee times, pricing, pairings, transportation, and Welcome Reception details."
  },
  saturday: {
    title: "Saturday Events",
    body: "Add service project logistics, cookout details, family guidance, banquet timing, venue, attire, and seating information."
  },
  sunday: {
    title: "Sunday Events",
    body: "Add worship location, service time, farewell fellowship details, parking, and final weekend reminders."
  }
};

const dialog = document.getElementById("event-dialog");
const dialogContent = document.getElementById("dialog-content");
document.querySelectorAll("[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const detail = eventDetails[button.dataset.modal];
    dialogContent.innerHTML = `<p class="eyebrow">Event Details</p><h2>${detail.title}</h2><p>${detail.body}</p>`;
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});
