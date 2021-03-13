export const SHOW_MSG = 'show-msg';
import Vue from 'vue'

export const eventBusService = new Vue();



export function showMsg(txt, type = 'success') {
    eventBusService.$emit(SHOW_MSG, { txt, type });
}