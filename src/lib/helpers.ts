export function scrollToElement(elem: string): void {
  const downloadElement = document.getElementById(elem);
  if (downloadElement) {
    const scrollOptions: ScrollToOptions = {
      top: downloadElement.offsetTop - 140,
      behavior: "smooth",
    };
    window.scrollTo(scrollOptions);
  } else {
    console.warn(`Element with ID '${elem}' not found.`);
  }
}

export const handleNavigationScroll = (
  elem: string,
  navigate: (path: string) => void
): void => {
  const { pathname } = window.location;

  if (pathname !== "/") {
    navigate("/");
    setTimeout(() => {
      scrollToElement(elem);
    }, 300);
  } else {
    scrollToElement(elem);
  }
};
