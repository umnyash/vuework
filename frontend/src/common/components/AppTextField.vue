<template>
  <div class="text-field">
    <input
      class="text-field__control"
      :class="[errorText && 'text-field__control--error']"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span v-if="errorText" class="text-field__error-text">
      {{ errorText }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.text-field {
  position: relative;

  &__control {
    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 12px 16px;

    color: $gray-900;
    border: 1px solid $white-800;
    border-radius: 6px;

    &--error {
      border-color: $red-600;
    }
  }

  &__error-text {
    position: absolute;
    bottom: -12px;
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>
