function makesvg(percentage, inner_text=""){

  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  var classes = ""

  if(percentage <= 50){
    classes = "danger-stroke circle-chart__circle--negative";
  } else if(percentage > 0 && percentage <= 70){
    classes = "warning-stroke";
  } else{
    classes = "success-stroke";
  }

 var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
     + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
     + '<circle class="circle-chart__circle '+classes+'"'
     + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
     + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="17.9" y="15.5">'+percentage_str+'%</text>';

  if(inner_text){
    svg += '<text class="circle-chart__subline" x="16.91549431" y="22">'+inner_text+'</text>'
  }

  svg += ' </g></svg>';

  return svg
}

(function( $ ) {

    $.fn.circlechart = function() {
        this.each(function() {
            var percentage = $(this).data("percentage");
            var inner_text = $(this).text();
            $(this).html(makesvg(percentage, inner_text));
        });
        return this;
    };

}( jQuery ));

$("#submit").click (function() {
  $.ajax({
      type:$("form").attr("method"),
      url:$("form").attr("action"),
      data:$("form").serialize(),
      success:function(response){
        if (response.errors) {
          $(".invalid-feedback").remove();
          $("*").removeClass("is-invalid");
          for (var i = 0; i < response.errors.length; i++) {
            $("#"+response.errors[i].param+"-input").addClass("is-invalid");
            $("#"+response.errors[i].param+"-input").after('<span class="invalid-feedback d-block"><strong id="message-text">'+response.errors[i].msg+'</strong></span>');
          }
        }
        else{
          alert("Thank you, your message has been sent successfully");
          $('.form-control').each(function(){
            $('.form-control').val('');
          });
          $(".invalid-feedback").remove();
          $("*").removeClass("is-invalid");
        }
      },
      error:function(){
        document.write("error");
      },
    });
});
function rotate(name) {
        $('#'+name).toggleClass('rotate');
        $('#'+name).toggleClass('rotate2');
}
