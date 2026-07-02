/* ============================================================
 * main.js — 페이지 인터랙션
 * ------------------------------------------------------------
 * 모바일(<=560px) 햄버거 토글과 다크/라이트 테마 토글을 담당합니다.
 * layout.js 가 nav 를 주입한 뒤 window.INU.bindNav()·bindTheme() 를 호출합니다.
 * (테마의 최초 값은 각 페이지 <head> 의 FOUC 가드 스크립트가 paint 전에 설정)
 * ============================================================ */

window.INU = window.INU || {};

/** 주입된 nav 의 햄버거 토글을 바인딩 */
window.INU.bindNav = function bindNav() {
  const toggle = document.querySelector(".global-nav__toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // 링크 클릭 시 모바일 메뉴 닫기
  links.addEventListener("click", (e) => {
    if (e.target.matches(".global-nav__link")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
};

/** 다크 ↔ 라이트 테마 토글 (data-theme + localStorage 유지) */
window.INU.bindTheme = function bindTheme() {
  const btn = document.querySelector(".global-nav__theme");
  if (!btn) return;
  const root = document.documentElement;

  const label = () =>
    root.dataset.theme === "light" ? "☀ Light" : "☾ Dark";
  btn.textContent = label();

  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* localStorage 불가(사생활 모드 등) 시 세션 한정으로 동작 */
    }
    btn.textContent = label();
  });
};
