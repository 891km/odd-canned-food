$(document).ready(function () {
  // 변수
  var zoom_btn = $(".zoom-btn");
  let isSideOpen = false;
  var sidebar_btn = $("#sidebar-btn");
  var sidebar = $("#sidebar");
  var sidebarWrap = $("#head-sidebar-wrap");
  // sidebarWrap.css("transform", `translateX(-${sidebarWidth}px)`);

  var cans = $(".cans");
  var can = $(".can");

  var cursor = $(".cursor");

  var modal = $(".modal");
  var modal_img = $(".modal_img");
  var modal_title = $(".modal_title");
  var modal_para = $(".modal_para");

  var modal_from = $(".tag_from");
  var modal_category = $(".tag_category");
  var modal_gram = $(".tag_gram");
  var modal_kcal = $(".tag_kcal");
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

  sidebar_btn.click(function () {
    var sidebarWidth = sidebar.width();
    console.log("clicked");

    if (isSideOpen) {
      sidebarWrap.css("transform", "translateX(0)");
    } else {
      sidebarWrap.css("transform", `translateX(-${sidebarWidth}px)`);
    }
    isSideOpen = !isSideOpen;
  });

  // 태그 로테이션 랜덤으로
  tag.each(function () {
    var randomRot = Math.floor(Math.random() * 12 - 6);

    $(this).css("transform", "rotate(" + randomRot + "deg)");
  });

  var canIsOpen = 0;
  // 캔 click 시
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
    // cursor.css("visibility", 'visible');
    // cursor.css("opacity", '1');

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
