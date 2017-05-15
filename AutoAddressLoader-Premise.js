function AutoAddressLoader(
  autoAddressSettings,
  targetElement,
  targetInputName,
  cssName
) {
  // manually append auto address and custome styles to head
  $("head").append(
    '<link rel="stylesheet" href="https://api.autoaddress.ie/2.0/control/css/autoaddress.min.css" type="text/css" />'
  );

  $("head").append(
    '<link rel="stylesheet" href="/WebResources/' +
      cssName +
      '" type="text/css" />'
  );

  var address1_line1 = Xrm.Page.getAttribute(targetInputName).getValue();
  var address1_line1_tabindex = $("#" + targetElement.replace("_d", "")).attr(
    "tabindex"
  );

  // loading the autoaddress controller script
  jQuery
    .ajax({
      type: "GET",
      url: "https://api.autoaddress.ie/2.0/control/js/jquery.autoaddress.min.js",
      dataType: "script",
      cache: false
    })
    .done(function() {
      console.log("AutoAddress Load was performed.");

      $("#" + targetElement).find("div").remove();
      $("#" + targetElement).AutoAddress(autoAddressSettings);

      // add current value
      if (address1_line1 !== null) {
        $("#" + targetElement).AutoAddress().setAddress(address1_line1);
      }

      // removes auto address default css classes and include ms ones
      $(".autoaddress-control button").remove();
      $("#" + targetElement + " input")
        .removeClass("autoaddress-text-box")
        .addClass("ms-crm-InlineInput")
        .attr("tabindex", address1_line1_tabindex);

      $(".autoaddress-control")
        .addClass("ms-crm-Inline-Edit")
        .addClass("aa-address1-inline-padding")
        .removeAttr("style")
        .css("margin", "0");
      $(".autoaddress-control input")
        .css("border", "1px solid #CCCCCC !important");

      // remove default event for tab key
      $("#" + targetElement + " input").keydown(function(e) {
        var code = e.keyCode || e.which;

        if (code === 9) {
          e.preventDefault();
        }
      });
    });
}
