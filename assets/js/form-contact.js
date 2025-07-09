$(document).ready(function () {
  $('form#main_contact_form').submit(function (e) {
    e.preventDefault(); // Prevent default form submission

    // Remove old errors
    $('.error').remove();
    let hasError = false;

    // Basic validation
    $('.form-control').each(function () {
      if ($.trim($(this).val()) === '') {
        $(this).after('<span class="error">This field is required</span>');
        hasError = true;
      }
    });

    if (!hasError) {
      const formData = $(this).serialize(); // Serialize form data

      $.ajax({
        type: 'POST',
        url: 'contact.php',
        data: formData,
        success: function (response) {
          if (response.trim() === 'success') {
            $('#main_contact_form').slideUp();
            $('#success_fail_info').html('<div class="success">✅ Message sent successfully!</div>');
          } else {
            $('#success_fail_info').html('<div class="error">❌ Failed to send: ' + response + '</div>');
          }
        }
      });
    }
  });
});
