const menuButton = document.querySelector(".menu-toggle");
const navigationLinks = document.querySelector(".navigation__links");

if (menuButton && navigationLinks) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigationLinks.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    navigationLinks.classList.toggle("is-open", !isExpanded);
  });

  navigationLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const contactDialog = document.querySelector("#contact-dialog");
const contactDialogTrigger = document.querySelector(".contact-dialog-trigger");
const contactDialogClose = document.querySelector(".contact-dialog__close");

if (
  contactDialog instanceof HTMLDialogElement
  && contactDialogTrigger instanceof HTMLButtonElement
  && contactDialogClose instanceof HTMLButtonElement
) {
  contactDialogTrigger.addEventListener("click", () => contactDialog.showModal());
  contactDialogClose.addEventListener("click", () => contactDialog.close());
  contactDialog.addEventListener("click", (event) => {
    if (event.target === contactDialog) {
      contactDialog.close();
    }
  });
  contactDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    contactDialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contactDialog.open) {
      contactDialog.close();
    }
  });
}

document.querySelectorAll(".video-card__poster").forEach((poster) => {
  poster.addEventListener("click", () => {
    if (window.location.protocol === "file:") {
      if (!poster.querySelector(".video-card__message")) {
        const message = document.createElement("span");
        message.className = "video-card__message";
        message.setAttribute("role", "alert");
        message.textContent = "Open this page through a web server to play the video here.";
        poster.append(message);
      }
      return;
    }

    const videoCard = poster.closest(".video-card");
    const videoFrame = videoCard?.querySelector(".video-card__embed");
    const videoSource = videoFrame?.dataset.src;

    if (!(videoFrame instanceof HTMLIFrameElement) || !videoSource) {
      throw new Error("The video player is missing its embed URL.");
    }

    const embedUrl = new URL(videoSource);
    embedUrl.searchParams.set("autoplay", "1");
    embedUrl.searchParams.set("rel", "0");
    videoFrame.src = embedUrl.toString();
    videoCard.classList.add("video-card--playing");
    poster.remove();
    videoFrame.focus();
  });
});
