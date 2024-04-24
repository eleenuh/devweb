$(document).ready(function() {
    $('#searchBtn').click(function() {
        var poetName = $('#poetName').val(); // Get the value from the input field
        if (poetName) { // Check if the input is not empty
            $.ajax({
                url: `https://poetrydb.org/author/${encodeURIComponent(poetName)}`, // API endpoint with URL encoding
                type: 'GET',
                success: function(data) {
                    $('#poems').empty(); // Clear previous results
                    if (Array.isArray(data) && data.length) {
                        displayPoems(data); // Function to handle the display of poems
                    } else {
                        $('#poems').html('<p>No poems found for this poet. Try another search!</p>'); // Handle no results found
                    }
                },
                error: function(xhr, status, error) {
                    console.log("Error fetching data:", xhr.status, error); // Log error details
                    if (xhr.status === 404) {
                        $('#poems').html('<p>No results found for this poet. Please try another name.</p>');
                    } else {
                        $('#poems').html('<p>An unexpected error occurred. Please try again later.</p>');
                    }
                }
            });
        } else {
            $('#poems').html('<p>Please enter a poet\'s name.</p>'); // Prompt to enter a poet's name
        }
    });
});

function displayPoems(poems) {
    $.each(poems, function(index, poem) {
        var poemElement = $('<div class="poem"></div>'); // Create a div for each poem
        poemElement.append(`<h2>${poem.title}</h2>`); // Add the title
        poemElement.append(`<p>${poem.lines.join('<br>')}</p>`); // Add the lines, joining them with line breaks
        $('#poems').append(poemElement); // Append the poem to the poems container
    });
}
