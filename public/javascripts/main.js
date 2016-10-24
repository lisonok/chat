$('#form').on('submit', function() {
  var form = $(this);
  $('#fieldset').attr('disabled', true);
  $('#error, #load').addClass('hide');
  $('#load').removeClass('hide');
  $.ajax({
    url: "/login",
    method: "POST",
    data: {
      'login': $('#login').val(),
      'password': $('#password').val()
    },
    complete: function() {
      $('#load').addClass('hide');
      $('#fieldset').removeAttr('disabled');
    },
    success: function() {
      window.location.href = '/';
    },
    error: function() {
      $('#error').removeClass('hide');
    }
  });
  return false;
});

$('#logout').on('click', function() {
  $.ajax({
    url: "/logout",
    method: "POST",
    complete: function() {
      window.location.href = '/';
    }
  });
  return false;
});
