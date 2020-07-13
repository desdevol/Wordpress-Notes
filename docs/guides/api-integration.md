# External API Integration

[Reference: WP Georgetown](https://wpgeorgetown.com/2018/10/04/integrating-3rd-party-apis-with-wordpress/)

## Example: API Integration Using Plugin and Shortcode

1. **Create a plugin. [Guide](./create-plugin)**

2. **In the plugin file, add shortcode function.**

_Example:_

```php
add_shortcode('programming-jokes', 'programming_jokes_shortcode');

function programming_jokes_shortcode()
{
    $url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random'; //API URL
    $response = wp_remote_get($url);
    $data = json_decode(wp_remote_retrieve_body($response));

    $rendered_html = render_content($data->quote);
    echo $rendered_html;
}

function render_content($data)
{
    $html_content = '<div class="quote-card">';
    $html_content .= '<div class="quote-genre">' . $data->quoteGenre . '</div>';
    $html_content .= '<div class="quote-text">' . $data->quoteText . '</div>';
    $html_content .= '<div class="quote-author">' . $data->quoteAuthor . '</div>';
    $html_content .= '</div>';

    return $html_content;
}
```
