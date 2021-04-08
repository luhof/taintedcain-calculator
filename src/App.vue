<template>
  <div id="app">
    <Calculator msg="Welcome to Your Vue.js App"/>
    <p style="margin : 30px;">
    Made by luhof (<a href="https://lucas.cool" target="_blank">Website</a> | <a href="https://twitter.com/luhof" target="_blank">Twitter</a>).<br/>
    Item data stolen from the <a href="https://github.com/Rchardon/RebirthItemTracker" target="_blank">Rebirth item tracker</a> and recipes from the <a href="https://bindingofisaacrebirth.fandom.com/wiki/Bag_of_Crafting_(Recipes)" target="_blank">wiki</a><br/>
    Want to thank me? Go play my game <a href="https://luhof.itch.io/niock-niock" target="_blank">NIOCK-NIOCK</a> :)<br/>
    </p>
  </div>
  
</template>

<script>
import Calculator from './components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

@font-face {
  font-family: "upheaval";
  src: local("upheaval"),
   url(./assets/upheaval/upheavtt.ttf) format("truetype");
};
@font-face {
  font-family: "silom";
  src: local("silom"),
   url(./assets/SilomBol.ttf) format("truetype");
};

html, body{
  min-height:100%;
}
body{
  background-color: rgb(220,201,179);
}
#app {
  font-family: 'silom', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  text-shadow: 2px 2px 0 #d3bba7;
  color : #3a322b;
}

h1, h2, h3{
  font-family: 'upheaval';
  font-weight:normal;
  font-size:4em;
  text-shadow: 2px 2px 0 #d3bba7
}

</style>
