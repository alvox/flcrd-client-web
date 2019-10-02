import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {messages} from '../assets/copy'
import {SettingsService} from "./settings";

Vue.use(VueI18n);

export const i18n = new VueI18n({
    locale: SettingsService.getLang(),
    messages,
});