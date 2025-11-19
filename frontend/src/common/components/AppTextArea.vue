<template>
  <div class="text-area">
    <textarea
      class="text-area__control"
      :class="[errorText && 'text-area__control--error']"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span v-if="errorText" class="text-area__error-text">
      {{ errorText }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorText: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.text-area {
  position: relative;

  &__control {
    display: block;

    box-sizing: border-box;
    width: 100%;
    height: 90px;
    margin-top: 16px;
    padding: 16px;

    resize: none;
    transition: border-color $animationSpeed;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;

    &:focus {
      border-color: $blue-600;
    }

    &--error {
      border-color: $red-600;
    }
  }

  &__error-text {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>
