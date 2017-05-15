function AutoAddressLoader(
  autoAddressSettings,
  targetElement,
  targetInputName,
  cssName
) {
  // manually append auto address and custome styles to head
  window.parent
    .$("head")
    .append(
      '<link rel="stylesheet" href="https://api.autoaddress.ie/2.0/control/css/autoaddress.min.css" type="text/css" />'
    );

  window.parent
    .$("head")
    .append(
      '<link rel="stylesheet" href="/WebResources/' +
        cssName +
        '" type="text/css" />'
    );

  var address1_line1 = Xrm.Page.getAttribute(targetInputName).getValue();
  var address1_line1_tabindex = window.parent
    .$("#" + targetElement.replace("_d", ""))
    .attr("tabindex");

  // loading the autoaddress controller script
  window.parent.jQuery
    .ajax({
      type: "GET",
      url: "https://api.autoaddress.ie/2.0/control/js/jquery.autoaddress.min.js",
      dataType: "script",
      cache: false
    })
    .done(function() {
      console.log("AutoAddress Load was performed.");

      window.parent.$("#" + targetElement).find("div").remove();
      window.parent.$("#" + targetElement).AutoAddress(autoAddressSettings);

      // add current value
      if (address1_line1 !== null) {
        window.parent
          .$("#" + targetElement)
          .AutoAddress()
          .setAddress(address1_line1);
      }

      // removes auto address default css classes and include ms ones
      window.parent.$(".autoaddress-control button").remove();
      window.parent
        .$("#" + targetElement + " input")
        .removeClass("autoaddress-text-box")
        .addClass("ms-crm-InlineInput")
        .attr("tabindex", address1_line1_tabindex);

      window.parent
        .$(".autoaddress-control")
        .addClass("ms-crm-Inline-Edit")
        .addClass("aa-address1-inline-padding")
        .removeAttr("style")
        .css("margin", "0");
      window.parent
        .$(".autoaddress-control input")
        .css("border", "1px solid #CCCCCC !important");

      // remove default event for tab key
      window.parent.$("#" + targetElement + " input").keydown(function(e) {
        var code = e.keyCode || e.which;

        if (code === 9) {
          e.preventDefault();
        }
      });
    });
}
