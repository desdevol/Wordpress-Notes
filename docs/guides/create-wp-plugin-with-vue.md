# Creating a Wordpress Plugin with Vue

This link provides the simple way to build a wordpress plugin with Vue.js integration

[Source: Sitepoint](https://www.sitepoint.com/building-a-wordpress-plugin-with-vue/)

However, it did not support Single File Component (SFC) writing style. I personally think
vue SFC is so much cleaner and easier to write with. So, I found another link:
[Source: Medium](https://medium.com/@romualdasromasdakeviius/using-vue-cli-to-build-wordpress-plugin-including-hmr-1a71dfdf05c2)

1. **Go to [https://wppb.me/](https://wppb.me/) and generate a Wordpress Plugin Boilerplate and put the plugin boilerplate in your plugin folder**

2. **Make sure you have installed `vue-cli`, if not:**

```bsh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

3. **In the plugin boilerplate folder:**

```bsh
vue create [your-folder-name]
```

4. **Create `vue.config.js` in the root folder of [your-folder-name]**

```js
module.exports = {
    productionSourceMap: false,
    publicPath:
        process.env.NODE_ENV === "production"
            ? "/wp-content/plugins/plugin_name/dist/"
            : "http://localhost:8080/",
    outputDir: "../dist",
    configureWebpack: {
        devServer: {
            contentBase: "/wp-content/plugins/plugin_name/dist/",
            allowedHosts: ["your-local-wp-host.test"],
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        },
        externals: {
            jquery: "jQuery",
        },
        output: {
            filename: "js/[name].js",
            chunkFilename: "js/[name].js",
        },
    },
    css: {
        extract: {
            filename: "css/[name].css",
            chunkFilename: "css/[name].css",
        },
    },
};
```

**Change `plugin_name` and `your-local-wp-host.test` to match your case.**

5. **Open `main.js`, replace the initialization code of Vue with:**

```js
document.addEventListener("DOMContentLoaded", () => {
    new Vue({
        render: (h) => h(App),
    }).$mount("#app");
});
```

6. **In the `class-your-plugin-public.php`, add:**

```php
private function is_develop_serve()
{
   $connection = @fsockopen('localhost', '8080');

   if ( $connection ) {
      return true;
   }

   return false;
}
```

**Use it:**

```php
if ($this->is_develop_serve()) {
    wp_enqueue_script($this->plugin_name  . '_dev', 'http://localhost:8080/js/app.js', [], $this->version, false);
    wp_enqueue_style($this->plugin_name . '_dev', 'http://localhost:8080/css/app.css', [], $this->version, 'all');
} else {
    wp_enqueue_script($this->plugin_name . '_chunks', plugin_dir_url(__DIR__) . 'dist/js/chunk-vendors.js', [], $this->version, false);
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__DIR__) . 'dist/js/app.js', [], $this->version, false);
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'dist/css/app.css', [], $this->version, 'all');
}
```

7. **Run `yarn serve` and you will be able to access your app by navigating to [http://localhost:8080](http://localhost:8080), run `yarn build` for production so it works in the wordpress application.**

**Note: For performance issue, you may want to remove `is_develop_serve` checking for production. Just simply delete the enqueue for the condition:**

```php
wp_enqueue_script($this->plugin_name . '_chunks', plugin_dir_url(__DIR__) . 'dist/js/chunk-vendors.js', [], $this->version, false);
    wp_enqueue_script($this->plugin_name, plugin_dir_url(__DIR__) . 'dist/js/app.js', [], $this->version, false);
    wp_enqueue_style($this->plugin_name, plugin_dir_url(__DIR__) . 'dist/css/app.css', [], $this->version, 'all');
```
