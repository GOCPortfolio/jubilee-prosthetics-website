/**
 * Jubilee shared components.
 * Renders header/nav, footer, WhatsApp FAB and the Jubilee Guide assistant
 * from SITE_CONFIG so every page stays in sync with one data source.
 */

(function () {
  const cfg = SITE_CONFIG;
  const waLink = (msg) =>
    `https://wa.me/${cfg.whatsappIntl}?text=${encodeURIComponent(msg)}`;
  const telLink = `tel:${cfg.phone}`;
  const mailLink = (subject) =>
    `mailto:${cfg.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  // Official Jubilee logo. Used by the header, mobile nav and footer.
  const jMark = `
    <img src="assets/images/brand/logo.png" alt="" aria-hidden="true" class="brand-mark__logo" />`;

  // ---------------------------------------------------------------------
  // HEADER
  // ---------------------------------------------------------------------
  function renderHeader(activePath) {
    const mount = document.getElementById("site-header");
    if (!mount) return;

    const links = cfg.nav
      .map(
        (item) => `<li><a href="${item.href}" ${
          activePath === item.href ? 'aria-current="page"' : ""
        }>${item.label}</a></li>`
      )
      .join("");

    mount.innerHTML = `
      <div class="container nav-inner">
        <a href="index.html" class="brand-mark">
          ${jMark}
          
        </a>
        <ul class="nav-links">${links}</ul>
        <div class="nav-actions">
          <a class="btn btn-outline btn-sm" href="${telLink}">${cfg.cta.call}</a>
          <a class="btn btn-primary btn-sm" href="book-appointment.html">${cfg.cta.bookAppointment}</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15" stroke="#0C3E6B" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>`;

    const header = document.querySelector(".site-header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile nav
    const mobileMount = document.getElementById("mobile-nav");
    if (mobileMount) {
      mobileMount.innerHTML = `
        <div class="mobile-nav__top">
          <a href="index.html" class="brand-mark" style="color:#fff">${jMark}<span>Jubilee</span></a>
          <button class="mobile-nav__close" id="mobile-nav-close" aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
        <ul class="mobile-nav__links">
          ${cfg.nav.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
        </ul>
        <div class="mobile-nav__actions">
          <a class="btn btn-primary" href="book-appointment.html">${cfg.cta.bookAppointment}</a>
          <a class="btn btn-whatsapp" href="${waLink("Hello Jubilee, I would like to learn more about your services.")}" target="_blank" rel="noopener">${cfg.cta.whatsapp}</a>
          <a class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.5)" href="${telLink}">${cfg.cta.call}</a>
        </div>`;

      const toggle = document.getElementById("nav-toggle");
      const close = document.getElementById("mobile-nav-close");
      const open = () => {
        mobileMount.classList.add("is-open");
        document.body.classList.add("nav-open");
        toggle.setAttribute("aria-expanded", "true");
        mobileMount.querySelector("a")?.focus();
      };
      const shut = () => {
        mobileMount.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      };
      toggle.addEventListener("click", open);
      close.addEventListener("click", shut);
      mobileMount.addEventListener("click", (e) => {
        if (e.target.tagName === "A") shut();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMount.classList.contains("is-open")) shut();
      });
    }
  }

  // ---------------------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------------------
  function renderFooter() {
    const mount = document.getElementById("site-footer");
    if (!mount) return;

    const socialIcons = [];
    if (cfg.social.facebook) {
      socialIcons.push(
        `<a href="${cfg.social.facebook}" aria-label="Jubilee on Facebook" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6C16.4 3.55 15.4 3.5 14.2 3.5c-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3.1h2.7v8h3.5z"/></svg></a>`
      );
    }
    const socialDefs = {
      instagram: ["Instagram", `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>`],
      linkedin: ["LinkedIn", `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 9.75h4V21H3V9.75zm6.5 0h3.8v1.6h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.55 4.77 5.87V21h-4v-5.1c0-1.2-.02-2.78-1.8-2.78-1.8 0-2.07 1.35-2.07 2.7V21h-4V9.75z"/></svg>`],
      tiktok: ["TikTok", `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.4 1.7 4 4 4.2v3.1c-1.5 0-2.9-.5-4-1.2v6.2c0 3.2-2.6 5.7-5.8 5.7S5 18.5 5 15.3s2.6-5.7 5.8-5.7c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 00-.9-.2 2.6 2.6 0 100 5.2c1.5 0 2.7-1.1 2.7-2.9V3h3.1z"/></svg>`],
    };
    Object.entries(socialDefs).forEach(([key, [label, icon]]) => {
      if (cfg.social[key]) {
        socialIcons.push(`<a href="${cfg.social[key]}" aria-label="Jubilee on ${label}" target="_blank" rel="noopener">${icon}</a>`);
      }
    });
    // X / YouTube stay omitted until real URLs are supplied.

    mount.innerHTML = `
      <div class="container footer-top">
        <div class="footer-brand">
          <a href="index.html" aria-label="Jubilee Prosthetics &amp; Orthotics, home"><img class="footer-logo" src="assets/images/brand/logo-white.png" alt="Jubilee Prosthetics &amp; Orthotics" /></a>
          <p>Prosthetic and orthotic services designed around mobility, independence and quality of life.</p>
          <div class="footer-social">${socialIcons.join("")}</div>
        </div>
        <div>
          <div class="footer-heading">SITE</div>
          <ul class="footer-links">
            ${cfg.nav.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("")}
            <li><a href="book-appointment.html">${cfg.cta.bookAppointment}</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-heading">CONTACT</div>
          <ul class="footer-links">
            <li><a href="${telLink}">${cfg.phoneDisplay}</a></li>
            <li><a href="${waLink('Hello Jubilee, I would like to learn more about your services.')}" target="_blank" rel="noopener">WhatsApp Jubilee</a></li>
            <li><a href="${mailLink()}">${cfg.email}</a></li>
            <li>${cfg.address.full}</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${cfg.siteName}. All rights reserved.</span>
        <nav>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms.html">Terms</a>
          <a href="accessibility.html">Accessibility</a>
          <a href="staff-login.html">Staff Login</a>
        </nav>
      </div>`;
  }

  // ---------------------------------------------------------------------
  // WHATSAPP FAB
  // ---------------------------------------------------------------------
  function renderWaFab() {
    const mount = document.getElementById("wa-fab");
    if (!mount) return;
    mount.innerHTML = `
      <a class="wa-fab" href="${waLink('Hello Jubilee, I would like to learn more about your services.')}" target="_blank" rel="noopener" aria-label="${cfg.cta.whatsapp}">
        <span class="wa-fab__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm5.7 14.2c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.8-4.2-4.94-4.4-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.57-.36.76-.36h.55c.18 0 .42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.3.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.45.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.64.77 1.92.91.29.14.48.21.55.33.07.12.07.68-.17 1.35z"/></svg></span>
        <span class="wa-fab__text">${cfg.cta.whatsapp}</span>
      </a>`;
  }

  // ---------------------------------------------------------------------
  // JUBILEE GUIDE (AI patient-support assistant, front-end UI)
  // ---------------------------------------------------------------------
  const GUIDE_SAFE_FALLBACK =
    "The Jubilee Guide can provide general information from Jubilee's approved resources, but it cannot diagnose or recommend treatment. Please contact Jubilee or a qualified healthcare professional for personal medical advice.";
  const GUIDE_UNKNOWN =
    "I don't have that information in Jubilee's approved resources yet. Please contact Jubilee directly, and the team will help.";

  const GUIDE_KB = [
    {
      test: /appointment|book/i,
      reply:
        "You can request an appointment through the Book an Appointment page, share your details and preferred time, and Jubilee will contact you to confirm availability.",
      cta: "book",
    },
    {
      test: /bring|prepare|what should i/i,
      reply:
        "General appointment preparation guidance from Jubilee will appear here once approved. In the meantime, Jubilee's team can tell you exactly what to bring when you reach out.",
      cta: "whatsapp",
    },
    {
      test: /where.*located|address|location/i,
      reply: `Jubilee is located at ${cfg.address.full}. A map will appear on the Contact page once the location link is confirmed.`,
      cta: "contact",
    },
    {
      test: /contact|reach|whatsapp|call|phone|email/i,
      reply: `You can reach Jubilee by WhatsApp or phone at ${cfg.phoneDisplay}, or by email at ${cfg.email}.`,
      cta: "whatsapp",
    },
    {
      test: /prosthe/i,
      reply:
        "Jubilee's Prosthetic Services support people who use artificial limbs, with care built around individual mobility goals. Explore the Services page for more detail.",
      cta: "services",
    },
    {
      test: /orthot/i,
      reply:
        "Orthotic Services are supportive devices that help with alignment, stability and movement. You'll find the full description on the Services page.",
      cta: "services",
    },
    {
      test: /mobility|resource/i,
      reply:
        "Jubilee's Resources section holds patient tips and educational articles once published. Take a look, or ask me something specific.",
      cta: "resources",
    },
    {
      test: /faq|question/i,
      reply: "You can browse Jubilee's Frequently Asked Questions for quick answers, organized by topic.",
      cta: "faq",
    },
    {
      test: /pain|emergency|urgent|bleeding|infection|hurt/i,
      reply:
        "This sounds like it may need urgent attention. The Jubilee Guide can't assess medical symptoms, please contact Jubilee directly or seek professional/emergency care right away.",
      cta: "whatsapp",
    },
    {
      test: /diagnos|treat|cure|prescri|what.*wrong with me/i,
      reply: GUIDE_SAFE_FALLBACK,
      cta: "whatsapp",
    },
  ];

  function guideRespond(text) {
    const hit = GUIDE_KB.find((k) => k.test.test(text));
    return hit || { reply: GUIDE_UNKNOWN, cta: "whatsapp" };
  }

  function ctaMarkup(kind) {
    const map = {
      book: `<a class="btn btn-primary btn-sm" href="book-appointment.html">${cfg.cta.bookAppointment}</a>`,
      whatsapp: `<a class="btn btn-whatsapp btn-sm" href="${waLink('Hello Jubilee, I have a question from the Jubilee Guide.')}" target="_blank" rel="noopener">${cfg.cta.whatsapp}</a>`,
      services: `<a class="btn btn-outline btn-sm" href="services.html">View Services</a>`,
      resources: `<a class="btn btn-outline btn-sm" href="resources.html">View Resources</a>`,
      faq: `<a class="btn btn-outline btn-sm" href="faq.html">View FAQ</a>`,
      contact: `<a class="btn btn-outline btn-sm" href="contact.html">View Contact</a>`,
    };
    return map[kind] || "";
  }

  function renderGuide() {
    const launcherMount = document.getElementById("jg-launcher");
    const panelMount = document.getElementById("jg-panel");
    if (!launcherMount || !panelMount) return;

    launcherMount.innerHTML = `
      <button class="jg-launcher" id="jg-open" aria-haspopup="dialog" aria-controls="jg-dialog">
        <span class="jg-launcher__icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 4.2L14 7l-4.2 1.8L8 13l-1.8-4.2L2 7l4.2-1.8L8 1z" fill="#0C3E6B"/></svg>
        </span>
        <span class="jg-launcher__text">Jubilee Guide</span>
      </button>`;

    panelMount.innerHTML = `
      <div class="jg-panel" id="jg-dialog" role="dialog" aria-modal="true" aria-labelledby="jg-title">
        <div class="jg-header">
          <div>
            <div class="jg-header__title" id="jg-title">
              <span class="jg-header__badge"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1l1.8 4.2L14 7l-4.2 1.8L8 13l-1.8-4.2L2 7l4.2-1.8L8 1z" fill="#0C3E6B"/></svg></span>
              Jubilee Guide
            </div>
            <div class="jg-header__sub">General information &amp; navigation help</div>
          </div>
          <button class="jg-close" id="jg-close" aria-label="Close Jubilee Guide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="jg-disclaimer">Jubilee Guide shares general information only. It does not diagnose conditions or recommend treatment.</div>
        <div class="jg-messages" id="jg-messages" role="log" aria-live="polite">
          <div class="jg-msg jg-msg--guide">Hi, I'm the Jubilee Guide. I can help you find services, resources, FAQs, or the best way to reach Jubilee. What would you like to know?</div>
        </div>
        <div class="jg-suggestions" id="jg-suggestions">
          <button class="jg-chip" data-q="What service might help me?">What service might help me?</button>
          <button class="jg-chip" data-q="How do I book an appointment?">How do I book an appointment?</button>
          <button class="jg-chip" data-q="Where is Jubilee located?">Where is Jubilee located?</button>
        </div>
        <div class="jg-cta-row">
          <a class="btn btn-primary btn-sm" href="book-appointment.html">${cfg.cta.bookAppointment}</a>
          <a class="btn btn-whatsapp btn-sm" href="${waLink('Hello Jubilee, I would like to learn more about your services.')}" target="_blank" rel="noopener">${cfg.cta.whatsapp}</a>
        </div>
        <form class="jg-input-row" id="jg-form">
          <label for="jg-input" class="visually-hidden">Ask the Jubilee Guide a question</label>
          <input id="jg-input" type="text" placeholder="Ask a question…" autocomplete="off" />
          <button type="submit" class="jg-send" aria-label="Send">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9l14-7-4 7 4 7-14-7z" fill="#fff"/></svg>
          </button>
        </form>
      </div>`;

    const openBtn = document.getElementById("jg-open");
    const closeBtn = document.getElementById("jg-close");
    const panel = panelMount.querySelector(".jg-panel");
    const messages = document.getElementById("jg-messages");
    const form = document.getElementById("jg-form");
    const input = document.getElementById("jg-input");

    const open = () => {
      panel.classList.add("is-open");
      input.focus();
    };
    const shut = () => {
      panel.classList.remove("is-open");
      openBtn.focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", shut);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) shut();
    });

    function addMsg(text, who, cta) {
      const div = document.createElement("div");
      div.className = `jg-msg jg-msg--${who}`;
      div.textContent = text;
      messages.appendChild(div);
      if (cta) {
        const ctaWrap = document.createElement("div");
        ctaWrap.style.marginTop = "0.6rem";
        ctaWrap.innerHTML = ctaMarkup(cta);
        div.appendChild(document.createElement("br"));
        div.appendChild(ctaWrap);
      }
      messages.scrollTop = messages.scrollHeight;
    }

    function ask(text) {
      if (!text.trim()) return;
      addMsg(text, "user");
      input.value = "";
      const typing = document.createElement("div");
      typing.className = "jg-msg jg-msg--guide jg-msg--typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
      setTimeout(() => {
        typing.remove();
        const { reply, cta } = guideRespond(text);
        addMsg(reply, "guide", cta);
      }, 650);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      ask(input.value);
    });
    document.getElementById("jg-suggestions").addEventListener("click", (e) => {
      const q = e.target.getAttribute("data-q");
      if (q) ask(q);
    });
  }

  // ---------------------------------------------------------------------
  // SCROLL REVEAL, single elements (.reveal), staggered groups
  // (.reveal-stagger. CSS handles the per-child nth-child delay once the
  // group gets .is-visible), and editorial image wipes (.media-wipe).
  // ---------------------------------------------------------------------
  function initReveal() {
    const els = document.querySelectorAll(".reveal, .reveal-stagger, .media-wipe");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
            { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave an image clipped or transparent if the observer
    // misses an element (zero-height parent, restored scroll position, etc.)
    setTimeout(() => els.forEach((el) => el.classList.add("is-visible")), 2500);
  }

  // ---------------------------------------------------------------------
  // PAGE TRANSITIONS, soft fade on load, and a brief fade-out before
  // navigating to another page on this site (skips new tabs, anchors,
  // tel/mailto links, and external sites). Off entirely under reduced
  // motion, where content should simply appear.
  // ---------------------------------------------------------------------
  function initPageTransitions() {
    requestAnimationFrame(() => document.body.classList.add("page-loaded"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (a.origin && a.origin !== window.location.origin) return;
      if (/^https?:\/\//i.test(href) && !href.startsWith(window.location.origin)) return;

      e.preventDefault();
      document.body.classList.add("page-exit");
      setTimeout(() => {
        window.location.href = href;
      }, 220);
    });
  }

  // ---------------------------------------------------------------------
  // MEDIA BLOCK, renders a real (swappable) stock photo with a small
  // "replace me" badge, or falls back to the dashed placeholder if no
  // stock image is supplied. Keeps every image slot easy to find and swap.
  // ---------------------------------------------------------------------
  function mediaBlock({ stock, label, path }) {
    const placeholder = `
      <div class="img-slot">
        <div class="img-slot__inner">
          <div class="img-slot__label">${label || "IMAGE SLOT"}</div>
          <span class="img-slot__path">${path || (stock && stock.src) || ""}</span>
        </div>
      </div>`;

    if (stock && stock.src) {
      // Local file expected at stock.src. Until it exists, the browser's
      // onerror fires and swaps in the labelled placeholder showing exactly
      // which path to drop the file into, no badge needed once it's real.
      const fallback = placeholder.replace(/\s+/g, " ").replace(/"/g, "&quot;");
      return `
        <div class="img-real">
          <img src="${stock.src}" alt="${stock.alt || ""}" loading="lazy"
               onerror="this.closest('.img-real').outerHTML='${fallback}';" />
        </div>`;
    }
    return placeholder;
  }

  // ---------------------------------------------------------------------
  // PORTRAIT BLOCK, same rename-and-drop workflow as mediaBlock, but for a
  // real, named person. If the file at `src` doesn't exist yet, falls back
  // to a designed branded panel (initials + name + title) instead of a
  // stock stranger's face, which would misrepresent someone by name.
  // ---------------------------------------------------------------------
  function portraitBlock({ src, alt, name, title, initials }) {
    const monogram = initials || (name || "").split(/\s+/).map((w) => w[0]).slice(0, 3).join("").toUpperCase();
    const fallback = `
      <div class="portrait-placeholder">
        <div class="portrait-placeholder__monogram" aria-hidden="true">${monogram}</div>
        <div class="portrait-placeholder__name">${name || ""}</div>
        <div class="portrait-placeholder__role">${title || ""}</div>
        <span class="portrait-placeholder__badge">PHOTO TO BE SUPPLIED</span>
      </div>`;
    const fallbackEscaped = fallback.replace(/\s+/g, " ").replace(/"/g, "&quot;");
    return `
      <div class="img-real">
        <img src="${src}" alt="${alt || name || ""}" loading="lazy"
             onerror="this.closest('.img-real').outerHTML='${fallbackEscaped}';" />
      </div>`;
  }

  // ---------------------------------------------------------------------
  // SCROLL PROGRESS BAR, thin gold→green line tracking read position
  // ---------------------------------------------------------------------
  function initScrollProgress() {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.innerHTML = '<div class="scroll-progress__fill" id="scroll-progress-fill"></div>';
    document.body.prepend(bar);
    const fill = bar.querySelector(".scroll-progress__fill");
    function update() {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // ---------------------------------------------------------------------
  // PARALLAX, subtle depth on large editorial images (skipped entirely
  // when the visitor prefers reduced motion)
  // ---------------------------------------------------------------------
  function initParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only the primary hero image, secondary editorial photos use the
    // clip-path wipe reveal instead, so the two effects never fight over
    // the same `transform` property.
    const els = document.querySelectorAll(".hero-visual--intro");
    if (!els.length) return;
    function update() {
      const wh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > wh) return;
        const center = rect.top + rect.height / 2;
        const offset = (center - wh / 2) / wh;
        el.style.transform = `translateY(${offset * 18}px)`;
      });
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // ---------------------------------------------------------------------
  // Expose helpers for page-specific scripts
  // ---------------------------------------------------------------------
  // Patient testimonial cards, one renderer shared by Home + Patient Stories.
  function renderStories(mount, stories) {
    if (!mount) return;
    const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    mount.innerHTML = stories.map((s) => `
      <figure class="story-card story-card--tall">
        <div class="story-card__media">
          <div class="img-real">
            <img src="${esc(s.photo)}" alt="${esc(s.alt)}" loading="lazy" style="object-position:${esc(s.position || "50% 50%")};" />
          </div>
        </div>
        <figcaption class="story-card__body">
          <blockquote class="story-card__quote">${s.quote.map((q, i) => `<p>${i === 0 ? "\u201C" : ""}${esc(q)}${i === s.quote.length - 1 ? "\u201D" : ""}</p>`).join("")}</blockquote>
          <div class="story-card__meta"><span>${esc(s.name)}</span><span>&middot;</span><span>${esc(s.service)}</span></div>
          <span class="story-card__consent">Shared with patient consent</span>
        </figcaption>
      </figure>`).join("");
  }

  window.Jubilee = {
    cfg,
    renderStories,
    waLink,
    telLink,
    mailLink,
    mediaBlock,
    portraitBlock,
    init(activePath) {
      renderHeader(activePath);
      renderFooter();
      renderWaFab();
      renderGuide();
      initScrollProgress();
      initReveal();
      initParallax();
      initPageTransitions();
    },
  };
})();
