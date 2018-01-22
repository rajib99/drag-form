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

      var txtareaInput = document.createElement('textarea');
      txtareaInput.setAttribute('name', 'txtareainput[]');

      if ( e.target.className == "dropzone" ) {
          e.target.style.background = "";

          makeElementDrop(dragged.dataset.input, dragged.dataset.type, e);
          //dropElement(e, createdElement);
      }

  }, false);


  function makeElementDrop(input, type, dropLocRef){
    console.log(input, type, dropLocRef);
    var inputField = document.createElement(input);
    if( input == 'textarea' || input == 'select' ){
      inputField.setAttribute('name', input+'input[]');
    }else{
      inputField.setAttribute('type', type);
      inputField.setAttribute('name', input+'input[]');
    }

    dropLocRef.target.appendChild( inputField );
    dropLocRef.target.classList.add('dropped');

    addInputOptions(inputField)

  }

  function addInputOptions(inputField){
    optionCnt = document.querySelector('#inputOptions')
    optionCnt.style.display = "block";
    saveBtn = document.querySelector("#saveAttr");
    var idAttr = document.querySelector("#attrId");
    var classAttr = document.querySelector("#attrClass");
    var placholderAttr = document.querySelector("#attrPlacholder");

    //if save button clicks,then add attributes to element
    saveBtn.addEventListener('click', function(){
      inputField.setAttribute('id', idAttr.value);
      inputField.setAttribute('class', classAttr.value);
      inputField.setAttribute('placeholder', placholderAttr.value);
      optionCnt.style.display = "none";
      idAttr.value = ""; classAttr.value = ""; placholderAttr.value = "";

    });

    //if close button clicks
    document.querySelector("#closeAttr").addEventListener('click', function(){
      optionCnt.style.display = "none";
    });
  }

}());
