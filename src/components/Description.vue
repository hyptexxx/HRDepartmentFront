<template lang="pug">
  q-card.text-black
    q-card-section
      q-card
        q-card-section
          .text-h6 Electronic Enterntainment разрабатывает и предоставляет игры, контент и сетевые услуги для игровых систем, мобильных устройств и ПК. У компании EE свыше 300 миллионов зарегистрированных игроков по всему миру.Создание качественно новых возможностей требует постоянных инноваций и вовлечения талантливых и приверженных людей. Мы создаем новые уникальные игры, собирая идеальные команды, в которых творческие способности сочетаются с технологическими знаниями и опытом.
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import LoginStore from 'src/store/LoginStore'

@Component
export default class Description extends Mixins(LoginStore) {

}
</script>
