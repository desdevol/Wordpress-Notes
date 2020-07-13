# Child Theme Support Guide

[Source: Wordpress Developer Resources](https://developer.wordpress.org/themes/advanced-topics/child-themes/)

1. **Create a child theme folder**

   Create a new folder in your themes directory, located at `wp-content/themes`.
   Name it after the parent theme like `<parent>-child`. If you were making a child theme of `twentyfifteen`, then the directory would be named `twentyfifteen-child`.

2. **Create `style.css`.**

   Create a `style.css` at the child theme folder and put in the basic info.

```css
/*
 Theme Name:   Twenty Fifteen Child
 Description:  Twenty Fifteen Child Theme
 Author:       John Doe
 Template:     twentyfifteen
 Version:      1.0.0
*/
```

3. **Create `functions.php` and enqueue the stylesheets.**

```php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );

function my_theme_enqueue_styles() {
    $parenthandle = 'parent-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.
    $theme = wp_get_theme();
    wp_enqueue_style( $parenthandle, get_template_directory_uri() . '/style.css',
        array(),  // if the parent theme code has a dependency, copy it to here
        $theme->parent()->get('Version')
    );
    wp_enqueue_style( 'child-style', get_stylesheet_uri(),
        array( $parenthandle ),
        $theme->get('Version') // this only works if you have Version in the style header
    );
}
```

4. **Activate your child theme at Wordpress admin panel `Appearance > Themes`.**

![child theme activation](/child-theme-activation.png)

## Tagdiv Child Theme Support

[Source: Tagdiv Forum](https://forum.tagdiv.com/the-child-theme-support-tutorial/)

Tagdiv's Newspaper theme's file is located at different location from the usual parent theme. Check out their official guides for more details.
