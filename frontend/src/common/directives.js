export const outsideClick = {
  mounted(element, binding) {
    element.bodyClickHandler = function (evt) {
      if (element === evt.target || element.contains(evt.target)) {
        return;
      }

      binding.value(evt, element);
    };

    document.body.addEventListener("click", element.bodyClickHandler);
  },

  unmounted(element) {
    document.body.removeEventListener("click", element.bodyClickHandler);
  },
};
