# Create Widget

For more detail widget guide visit the link below, this guide is just for simple widget without dashboard configuration.

[Source: WPExplorer](https://www.wpexplorer.com/create-widget-plugin-wordpress/)

1. **Create a plugin.** ([See here](./create-plugin))
2. **Add the following code**:

```php
// The widget class
class My_Custom_Widget extends WP_Widget {

	// Main constructor
	public function __construct() {
		/* ... */
	}

	// The widget form (for the backend )
	public function form( $instance ) {
		/* ... */
	}

	// Update widget settings
	public function update( $new_instance, $old_instance ) {
		/* ... */
	}

	// Display the widget
	public function widget( $args, $instance ) {
		/* ... */
	}

}

// Register the widget
function my_register_custom_widget() {
	register_widget( 'My_Custom_Widget' );
}
add_action( 'widgets_init', 'my_register_custom_widget' );
```

Replace class name `My_Custom_Widget` with your own name.

Replace function name `my_register_custom_widget` with your own init function name (make sure don't clash with other functions.)

3. **Put this code in constructor & replace the name with your own**

```php
parent::__construct(
    'my_custom_widget',
    __( 'My Custom Widget', 'text_domain' ),
    array(
        'customize_selective_refresh' => true,
    )
);
```

4. **Develop the widget**

-   `form()` is the one that creates the widget form settings in the WordPress admin area.
-   `update()` functions are for update the data in `form()` into database.
-   If you just want to do a static widget all you need to do is update at `widget()` function.

Example:

```php
public function widget($args, $instance)
    {
        $this->render_component();
        wp_enqueue_script('sticky-side-buttons', plugin_dir_url(__DIR__) . 'assets/ethoz-sticky-side-buttons.js');
    }

    // Render HTML
    private function render_component()
    {
        echo $before_widget;

        $html = '<div class="sticky-sidebuttons-wrapper">';

        // ============================== Left Panel ==============================
        $html .= '<div class="left-sticky-panel">';
        $html .= '  <a id="enquiry-modal-trigger" onclick="openEnquiryModal()">';
        $html .= '      <i class="far fa-envelope sticky-panel-item"></i>';
        $html .= '  </a>';
        $html .= '  <a href="tel: +6563198000">';
        $html .= '      <i class="fas fa-phone sticky-panel-item"></i>';
        $html .= '  </a>';
        $html .= '  <a href="' . site_url() . '/contact/singapore/#locateus' . '">';
        $html .= '      <i class="fas fa-map-marker-alt sticky-panel-item"></i>';
        $html .= '  </a>';
        $html .= '</div>';

        $html .= '</div>';

        echo $html;

        echo $after_widget;
    }
```

**Note:** Always include `echo $before_widget;` and `echo $after_widget;` in you widget code.
For the meaning of these hooks, ![see this](https://stackoverflow.com/questions/17768968/whats-the-meaning-of-before-widget-and-after-widget)

5. **The widget will be ready to be used after the plugin activation.**
