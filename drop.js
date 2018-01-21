(function(){

var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {
    //console.log('drag',event);
  });

  document.addEventListener("dragstart", function( event ) {
      // store a ref. on the dragged elem
      dragged = event.target;
      //console.log('dragstart',event );
      //console.log( 'dragstart',event.target );
      // make it half transparent
      event.target.style.opacity = .5;
  });

  document.addEventListener("dragend", function( event ) {
      // reset the transparency
      //console.log( 'dragend',event.target )
      event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      //console.log( 'dragover',event.target )
      event.preventDefault();
  });

  document.addEventListener("dragenter", function( event ) {
      // highlight potential drop target when the draggable element enters it
      //console.log( 'dragenter',event.target )
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "#066896";
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
      // reset background of potential drop target when the draggable element leaves it
      if ( event.target.className == "dropzone" ) {
          event.target.style.background = "";
      }

  }, false);

  document.addEventListener("drop", function( e ) {
      // prevent default action (open as link for some elements)
      e.preventDefault();

      var txtInput = document.createElement('input');
      txtInput.setAttribute('type', 'text');
      txtInput.setAttribute('name', 'txtinput');

      if ( e.target.className == "dropzone" ) {
          e.target.style.background = "";
          if(dragged.id == 'text-input'){
            e.target.appendChild( txtInput );
          }
      }

  }, false);

}());