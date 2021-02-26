## full syntax:

base template:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/static/concha.css" />
    <title>{%block title%}{%endblock%}</title>
  </head>
  <body>
    <nav class="navbar">
      <a href="/">home</a>
      <a href="/form">Greeter form</a>
      <a href="/lucky">lucky</a>
      <a href="/hello">Hello</a>
    </nav>

    {% block content %} {% endblock %}

    <!-- Cool if check with templates: -->
    {% if request.cookies %}
    <fieldset>
      <label>Cookies Received By Flask</label>
      <ul>
        {% for name, value in request.cookies.items() %}
        <li>{{ name }} = "{{ value }}"</li>
        {% endfor %}
      </ul>
    </fieldset>
    {% endif %}

    <footer> this is a footer </footer>

    <script src="/static/app.js"></script>
  </body>
</html>
```

child template:

```html5
{% extends 'base.html' %}
{%block title%}Greeter{%endblock%}
{%block content%}
<h1>Hi {{username}}!!</h1>
{% if wants_compliments %}
<h2>Ok here are your compliments:</h2>
<ul>
  {% for compliment in compliments %}
  <li>{{compliment}}</li>
  {% endfor %}
</ul>
{% endif %}
{%endblock%}
```

## template inheritance

Prevent repetitio of html setting a parent template and extend that base template in other pages.

```html
<!-- Base template: -->
{% block name_of_block %} {% endblock %}
<!-- Child template: -->
{% extends 'name_of_base.html' %} {% block name_of_block%} {% endblock %}
```

1. create a parent template with full markup:
   - `base.html` (any name of file)
2. add blocks for each particular route's content:
   - `{% block name_of_block %} content {% endblock %}`
3. in child templates: `{% block name_of_block %} content {% endblock %}`

## jinja loops

```html
<body>
  {% for char in word %}
  <h3>{{char}}</h3>
  {% endfor%}
</body>
```

## jinja conditional expressions

In a same template, add different content according to different conditions (user loged in or not, etc)

```html
<ul>
  {% if (posts|le0)%} {% for post in%}
  <li>{{post.title}}</li>
  {%endfor%} {%else%}
  <p>No posts yet</p>
  {%endif%}
</ul>

{% if number == 2 %}
<h2>That's extra cool!!</h2>
{% else %}
<h2>I don't like that number {{number}}</h2>
{% endif %}
```

## dynamic variables

```html
Jinja will replace {{msg}} with the value of msg passed when rendering.
```

# jinja setup

1. create template directory, in the same directory that the app.py file. This is the directory model:

   - my_project_dir/
     - venv/
     - app.py
     - templates/
       - hello.html
     - static
       - my-css.css (in base.htm: `<link rel="stylesheet" href="/static/my-css.css">`)
       - my-script.js

2. Create hml files inside the templates directory
3. import `render_template` to app.py

Templates allows to return dynamic html, embeding variables and other stuff.
Jinja comes with flask, no need to install it.
