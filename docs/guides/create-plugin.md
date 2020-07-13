# Create a WordPress Plugin

[Source: Beaver Builder](https://www.wpbeaverbuilder.com/creating-wordpress-plugin-easier-think/)

1. **Make a new folder for the plugin at `/wp-content/plugins/`.**

2. **Make a new php file for the plugin and setup the plugin information.**

```php
<?php
/**
 * Plugin Name: My First Plugin
 * Description: The very first plugin that I have ever created.
 * Version: 1.0
 * Author: Your Name
 */
```

3. **Add simple function to test your plugin.**

```php
add_action( 'the_content', 'my_thank_you_text' );

function my_thank_you_text ( $content ) {
    return $content .= '<p>Thank you for reading!</p>';
}
```

This code hooks into `the_content` action that fires when WordPress renders the post content for your site. When that action fires, WordPress will call our `my_thank_you_text` function that is defined below the `add_action` call.

4. **Activate your plugin at the Wordpress admin panel.**
