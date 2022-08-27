import './app.scss';

import $ from 'jquery';
import 'bootstrap/js/src/scrollspy';
window.$ = $;

$(() => {
  $('nav a[href^="#"]').on('click', (evt) => {
    evt.preventDefault();
    const hash = evt.target.hash;
    const navbarHeight = $('nav').height();
    const scrollTop = hash ? $(hash).offset().top - navbarHeight - 10 : 0;
    $('html,body').animate({ scrollTop }, 400);
  });
});
