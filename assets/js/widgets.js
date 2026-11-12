/**
 * Reusable interactive widgets: FAQ accordion, before/after slider,
 * service filters, and generic form submit handling (frontend-only —
 * backend integration point clearly marked, see brief §33).
 */

(function () {
  // ---------------- FAQ Accordion ----------------
  function initFaqAccordions() {
    document.querySelectorAll(".faq-list").forEach((list) => {
      list.querySelectorAll(".faq-question").forEach((btn) => {
        btn.addEventListener("click", () => {
          const expanded = btn.getAttribute("aria-expanded") === "true";
          const panel = document.getElementById(btn.getAttribute("aria-controls"));
          btn.setAttribute("aria-expanded", String(!expanded));
          if (!expanded) {
            panel.style.maxHeight = panel.scrollHeight + "px";
          } else {
            panel.style.maxHeight = "0px";
          }
        });
      });
    });

    // FAQ search + category filter, combined so both work together
    const search = document.getElementById("faq-search");
    const pills = document.querySelectorAll("[data-faq-filter]");
    const noResults = document.getElementById("faq-no-results");

    function applyFaqFilters() {
      const q = (search?.value || "").trim().toLowerCase();
      const activePill = document.querySelector("[data-faq-filter][aria-pressed='true']");
      const cat = activePill ? activePill.getAttribute("data-faq-filter") : "all";
      let visibleCount = 0;

      document.querySelectorAll(".faq-item").forEach((item) => {
        const matchesCat = cat === "all" || item.getAttribute("data-category") === cat;
        const matchesQuery = !q || item.textContent.toLowerCase().includes(q);
        const show = matchesCat && matchesQuery;
        item.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });

      if (noResults) noResults.style.display = visibleCount === 0 ? "" : "none";
    }

    search?.addEventListener("input", applyFaqFilters);
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.setAttribute("aria-pressed", "false"));
        pill.setAttribute("aria-pressed", "true");
        applyFaqFilters();
      });
    });
  }

  // ---------------- Before / After Slider ----------------
  function initBeforeAfterSliders() {
    document.querySelectorAll(".ba-slider").forEach((slider) => {
      const after = slider.querySelector(".ba-slider__after");
      const handle = slider.querySelector(".ba-slider__handle");
      const btn = handle?.querySelector("button");
      if (!after || !handle || !btn) return;

      let dragging = false;

      function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        handle.style.left = `${pct}%`;
        btn.setAttribute("aria-valuenow", Math.round(pct));
      }

      function posFromClientX(clientX) {
        const rect = slider.getBoundingClientRect();
        return ((clientX - rect.left) / rect.width) * 100;
      }

      slider.addEventListener("pointerdown", (e) => {
        dragging = true;
        setPosition(posFromClientX(e.clientX));
      });
      window.addEventListener("pointermove", (e) => {
        if (dragging) setPosition(posFromClientX(e.clientX));
      });
      window.addEventListener("pointerup", () => (dragging = false));

      btn.setAttribute("role", "slider");
      btn.setAttribute("aria-label", "Drag to compare before and after images");
      btn.setAttribute("aria-valuemin", "0");
      btn.setAttribute("aria-valuemax", "100");
      btn.setAttribute("aria-valuenow", "50");
      btn.setAttribute("tabindex", "0");
      btn.addEventListener("keydown", (e) => {
        const current = parseFloat(handle.style.left) || 50;
        if (e.key === "ArrowLeft") setPosition(current - 5);
        if (e.key === "ArrowRight") setPosition(current + 5);
      });

      setPosition(50);
    });
  }

  // ---------------- Service filter grid ----------------
  function initServiceFilters() {
    const grid = document.getElementById("service-grid");
    if (!grid) return;
    const pills = document.querySelectorAll("[data-service-filter]");
    const search = document.getElementById("service-search");

    function applyFilters() {
      const activePill = document.querySelector("[data-service-filter][aria-pressed='true']");
      const cat = activePill ? activePill.getAttribute("data-service-filter") : "all";
      const q = (search?.value || "").trim().toLowerCase();
      grid.querySelectorAll(".card").forEach((card) => {
        const matchesCat = cat === "all" || card.getAttribute("data-category") === cat;
        const matchesQuery = !q || card.textContent.toLowerCase().includes(q);
        card.style.display = matchesCat && matchesQuery ? "" : "none";
      });
    }

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.setAttribute("aria-pressed", "false"));
        pill.setAttribute("aria-pressed", "true");
        applyFilters();
      });
    });
    search?.addEventListener("input", applyFilters);
  }

  // ---------------- Form handler ----------------
  // Contact + appointment forms open WhatsApp with the details already written
  // out, so the message reaches Jubilee directly. (Swap for a database insert
  // once Supabase is connected.) The newsletter form is still a placeholder.
  function initForms() {
    document.querySelectorAll("form[data-jubilee-form]").forEach((form) => {
      const status = form.querySelector(".form-status");
      const formType = form.getAttribute("data-jubilee-form");
      const val = (n) => {
        const el = form.elements[n];
        if (!el) return "";
        return el.tagName === "SELECT" ? (el.selectedOptions[0]?.textContent || "").trim() : (el.value || "").trim();
      };

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }

        if (formType === "newsletter") {
          status.className = "form-status form-status--success is-visible";
          status.textContent = "Thank you. You're on the list.";
          form.reset();
          return;
        }

        const rows = formType === "appointment"
          ? [["Name", val("name")], ["Phone", val("phone")], ["WhatsApp", val("whatsapp")], ["Email", val("email")],
             ["Preferred contact", val("contactMethod")], ["Service", val("service")], ["Preferred date", val("date")],
             ["Preferred time", val("time")], ["Message", val("message")]]
          : [["Name", val("name")], ["Email", val("email")], ["Phone", val("phone")], ["Subject", val("subject")], ["Message", val("message")]];
        const intro = formType === "appointment" ? "Hello Jubilee, I would like to request an appointment." : "Hello Jubilee, I have an enquiry.";
        const msg = intro + "\n\n" + rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
        const url = Jubilee.waLink(msg);

        const win = window.open(url, "_blank");
        if (win) win.opener = null;
        status.className = "form-status form-status--success is-visible";
        status.innerHTML = `WhatsApp is opening with your details ready. Press send there to reach Jubilee. <a href="${url}" target="_blank" rel="noopener">Tap here if it didn't open.</a>`;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFaqAccordions();
    initBeforeAfterSliders();
    initServiceFilters();
    initForms();
  });
})();
