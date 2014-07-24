$(document).ready(function(){

  $('#searchSubmit').click(function(){
    searchValue = $('#searchValue').val();
    window.location = '/search/' + searchValue;
  });



});

$('#searchValue').keydown(function(e){
    if(e.keyCode == 13){
      window.location = '/search/' + $(this).val();
    }
  })