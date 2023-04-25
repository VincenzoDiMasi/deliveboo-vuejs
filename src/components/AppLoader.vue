<script>
export default {
    name: 'AppLoader',

};
</script>


<template>
    <div class="overlay text-center">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .text {
        text-transform: uppercase;
        letter-spacing: 2px;
    }
}
</style>