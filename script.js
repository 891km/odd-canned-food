$(document).ready(function () {
  // 변수
  var zoom_btn = $("#zoom-btn");
  // sidebar
  var sidebar_btn = $("#sidebar-btn");
  var sidebar_wrap = $("#head-sidebar-wrap");
  var sidebar_width = $(sidebar).css("width");
  console.log(sidebar_width);
  // sidebar_wrap.css("transform", `translateX(-${sidebar_width})`);

  var cursor = $(".cursor");

  var cans = $(".cans");
  var can = $(".can");

  // modal
  var modal = $(".modal");
  var modal_img = $(".modal-img");
  var modal_title = $(".modal-title");
  var modal_para = $(".modal-para");
  var modal_from = $(".modal-from");
  var modal_category = $(".modal-category");
  var modal_gram = $(".modal-gram");
  var modal_kcal = $(".modal-kcal");
  var modal_width = parseInt($(".modal").css("width"));

  var tag = $(".categoryTag");

  var vw = $(window).width();
  $(window).resize(function () {
    vw = $(this).width();
    modal_width = parseInt($(".modal").css("width"));
  });

  // 기본 사이즈 설정
  $(":root").css("--canWidth", "180px");
  cans.css("bottom", "58px");

  // 태그 로테이션 랜덤으로
  tag.each(function () {
    var randomRot = Math.floor(Math.random() * 12 - 6);

    $(this).css("transform", "rotate(" + randomRot + "deg)");
  });

  // 줌 버튼
  zoom_btn.click(function () {
    if ($(":root").css("--canWidth") == "270px") {
      $(":root").css("--canWidth", "180px");
      cans.css("bottom", "58px");
    } else {
      $(":root").css("--canWidth", "270px");
      cans.css("bottom", "84px");
    }
  });

  // 사이드바 열고 닫기
  let isSideOpen = false;
  sidebar_btn.click(function () {
    if (isSideOpen) {
      sidebar_wrap.css("transform", `translateX(-${sidebar_width})`);
    } else {
      sidebar_wrap.css("transform", `translateX(0)`);
    }
    isSideOpen = !isSideOpen;
  });

  // 캔 click 시
  var canIsOpen = 0;
  can.mousedown(function () {
    canIsOpen = 1;

    cursor.css("visibility", "hidden");
    cursor.css("opacity", "0");

    modal.css("visibility", "visible");
    modal.css("opacity", "1");

    modal_title.text($(this).data("title"));
    modal_para.text($(this).data("para"));
    modal_img.attr("src", $(this).data("img"));

    modal_from.text($(this).data("from"));
    modal_category.text($(this).data("category"));
    modal_gram.text($(this).data("gram"));
    modal_kcal.text($(this).data("kcal"));
  });

  // 캔 unclick 시
  can.mouseup(function () {
    canIsOpen = 0;

    modal.css("visibility", "hidden");
    modal.css("opacity", "0");
  });

  // 캔 hover 시
  can.mouseover(function () {
    if (canIsOpen == 0) {
      cursor.css("visibility", "visible");
      cursor.css("opacity", "1");
    } else {
      cursor.css("visibility", "hidden");
      cursor.css("opacity", "0");
    }
  });

  // 캔 mouseout 시
  can.mouseout(function () {
    cursor.css("visibility", "hidden");
    cursor.css("opacity", "0");
  });

  // 캔에 mousemove 시
  can.mousemove(function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    var offsetX = (mouseX / vw) * modal_width;
    var offsetY = 64;

    modal.css("left", mouseX - offsetX + "px");
    modal.css("top", mouseY + offsetY + "px");

    cursor.css("left", mouseX + 15 + "px");
    cursor.css("top", mouseY - 25 + "px");
  });
});
