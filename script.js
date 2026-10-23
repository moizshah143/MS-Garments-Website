$(function () {
  // Animated entrance as sections appear in the viewport.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $(".reveal").each(function () { revealObserver.observe(this); });

  // Cart demo: persists its count in this browser.
  let cartCount = Number(localStorage.getItem("msGarmentsCart") || 0);
  $("#cartCount").text(cartCount);
  function toast(message) {
    $(".toast-message").text(message).addClass("show");
    window.clearTimeout(window.msToastTimer);
    window.msToastTimer = window.setTimeout(() => $(".toast-message").removeClass("show"), 2300);
  }
  $(".quick-add").on("click", function () {
    const name = $(this).data("product") || "Item";
    cartCount += 1;
    localStorage.setItem("msGarmentsCart", cartCount);
    $("#cartCount").text(cartCount);
    toast(name + " added to your demo cart!");
  });

  // Newsletter is front-end only until connected to a mailing service.
  $(".newsletter-form").on("submit", function (e) {
    e.preventDefault();
    const email = $(this).find("input").val().trim();
    if (email) { toast("Thanks for subscribing, " + email + "!"); this.reset(); }
  });

  // Contact form demo confirmation.
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    $("#formNotice").text("Thank you! Your message is ready. This demo form is not connected to email yet.");
    this.reset();
  });

  // Product sorting on collection pages.
  $("#sortProducts").on("change", function () {
    const mode = $(this).val();
    const cards = $("#productGrid .product-card").get();
    const priceOf = card => Number($(card).find("p").text().match(/Rs\.\s*([\d,]+)/)?.[1].replace(/,/g, "") || 0);
    if (mode === "low") cards.sort((a, b) => priceOf(a) - priceOf(b));
    else if (mode === "high") cards.sort((a, b) => priceOf(b) - priceOf(a));
    else cards.sort((a, b) => $(a).index() - $(b).index());
    $("#productGrid").append(cards);
  });

  // Small hero interaction, with alternate promotional messages.
  const heroSlides = [
    { line1: "STYLE", line2: "BUILDS", line3: "CONFIDENCE", text: "Premium quality clothing for a better you.<br>Modern styles. Timeless comfort." },
    { line1: "OWN", line2: "YOUR", line3: "STYLE", text: "Fresh everyday essentials.<br>Made to move with you." },
    { line1: "FIND", line2: "YOUR", line3: "NEXT FIT", text: "Streetwear with personality.<br>Comfort that lasts." }
  ];
  let slide = 0;
  function showSlide() {
    const $heading = $(".hero-text h1");
    if (!$heading.length) return;
    const s = heroSlides[slide];
    $heading.html(s.line1 + "<br><em>" + s.line2 + "</em><br>" + s.line3);
    $(".hero-text p").html(s.text);
    $(".hero-count").html("0" + (slide + 1) + " <small>/ 03</small> <span></span>");
  }
  $(".hero-next").on("click", function () { slide = (slide + 1) % heroSlides.length; showSlide(); });
  $(".hero-prev").on("click", function () { slide = (slide + heroSlides.length - 1) % heroSlides.length; showSlide(); });
});