function load(licenceKey) {
  // settings
  var autoAddressSettings = {
    key: licenceKey,
    language: "en",
    autocomplete: true,
    autocompleteMinChars: 3,
    optionsLimit: -1,
    vanityMode: false,
    addressProfile: "DemoApi5Line",
    incompleteAddressLabel: "",
    addressFoundLabel: "",
    partialAddressLabel: "",
    nuaAddressFoundLabel: "",
    noResultFoundLabel: "",
    errorMessageLabel: "",
    width: "auto",
    hoverOptionPanel: true,
    onAddressFound: myAutoAddressHandler
  };
  var targetElement =
    "address1_composite_compositionLinkControl_address1_line1_d";
  var targetInputName = "address1_line1";
  var cssName = "new_CompositeAddress.css";

  AutoAddressLoader(
    autoAddressSettings,
    targetElement,
    targetInputName,
    cssName
  );
}

function myAutoAddressHandler(args) {
  // do nothing if auto address response is empty
  if (!args) return;

  // set  input
  window.parent.Xrm.Page
    .getAttribute("address1_line1")
    .setValue(args.reformattedAddress[0]);

  window.parent
    .$("#address1_composite_compositionLinkControl_address1_line1_d")
    .AutoAddress()
    .setAddress(args.reformattedAddress[0]);

  window.parent.Xrm.Page
    .getAttribute("address1_line2")
    .setValue(args.reformattedAddress[1]);

  window.parent.Xrm.Page
    .getAttribute("address1_line3")
    .setValue(args.reformattedAddress[2]);

  window.parent.Xrm.Page
    .getAttribute("address1_city")
    .setValue(args.reformattedAddress[3]);
  window.parent.Xrm.Page
    .getAttribute("address1_stateorprovince")
    .setValue(args.reformattedAddress[4]);
  window.parent.Xrm.Page
    .getAttribute("address1_postalcode")
    .setValue(args.postcode);
}
