$(document).ready(function() {
	$("body").niceScroll({
    cursorcolor: "#181818",
    cursoropacitymin: 0,
    cursoropacitymax: 1,
    cursorwidth: "6px",
    cursorborder: "1px solid #fff",
    cursorborderradius: "3px",
    autohidemode: false,
    railalign: "right",
    railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
    emulatetouch: false,
    sensitiverail: true,
    background: "#ccc",
    zindex:99999,
    hidecursordelay: 4000,
    boxzoom: false,
    grabcursorenabled:true
  });

	$(document).click(() => {
    $("body").getNiceScroll().resize();
  });
});
