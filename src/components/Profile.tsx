import ImageAvatar from "../images/avatar.jpg";
import ImageGithub from "../images/github.svg";
import ImageLinkedIn from "../images/linkedin.svg";

export default function Profile() {
  return (
    <section class="l-section--fullsize l-section--center l-section--column l-profile">
      <img src={ImageAvatar} class="c-avatar"  alt="Javier - Avatar" />

      <div class="l-profile__link">
        <a href="https://github.com/javierdwd/"
          rel="noopener noreferrer"
          target="_blank"
          class="c-link c-link--bigger">
          <span class="c-link__icon">
            <img src={ImageGithub} alt="Github" />
          </span>
          <span class="c-link__animated-text">javierdwd</span>
        </a>
      </div>
      <div class="l-profile__link">
        <a href="https://www.linkedin.com/in/javier-van-breedan/"
          rel="noopener noreferrer"
          target="_blank"
          class="c-link c-link--bigger">
          <span class="c-link__icon">
            <img src={ImageLinkedIn} alt="Github" />
          </span>
          <span class="c-link__animated-text">javier</span>
        </a>
      </div>
    </section>
  );
};