# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

document.ready =->
  live_search()

live_search = ->
  search = (page_number) ->
    q = $("#search-field").val();
    group_id = $('#group_id').val();
    $.ajax
      #beforeSend      : (request) -> request.setRequestHeader("Accept", "text/javascript"),
      data          : 'search_query=' + q + ';group_id=' + group_id + ';page_number=' + page_number,
      success       : (data) -> data,
      error         : (XMLHttpRequest, textStatus, errorThrown) -> alert(errorThrown),
      type          : 'POST',      
      url           :  '/provider_search/result'
      
      
  $("#search-field").keyup  ->
    search(1)
  
  $("#back").click ->
    page_number = $(this).attr("data-page-number")
    search(page_number)
    
  $("#forward").click ->
    page_number = $(this).attr("data-page-number")
    search(page_number)
    
  
  
  