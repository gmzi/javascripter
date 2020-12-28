Libraries to use AJAX:

1. ## Axios

Is a third party library that simplifies the JS syntax to make requests. The browsers built in methods are clunky, Axious simplifies the process. Can be also used on the server side with node.js.

2. ## fetch

3. ## XMLHttpRequest

Uses callbacks, just as a setTimeout.
(XHR for short)
Old tool for making requests from Javascript.
[docs](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

```javascript
const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function () {
  console.log(this.responseText);
});

firstReq.addEventListener('error', () => {
  console.log('Error!!!!!');
});

firstReq.open('GET', 'https://swapi.co/api/planets/');
firstReq.send();
```

4. Other libraries (jQuery, etc)

# AJAX

Asynchronous Javascript And Xml.
Start server before making requests.

It's a way to structure the interaction between codes.
Why to use it:

- Don't need to reload the entire page is something minor is changing.
- Interactive websites, the experience for the user is clean, doesn't have to go through a bunch of webpages and click on things. Stay on the same page and see content change.
- Fewer page loads from server.
- Less info goes accross the network.

Why not to use it:

- Harder to make accessible webistes (screen readers have a hard time understanding it, use Aria for this).
- Slower internet can make the user have an odd experience, since the requests happen without a "submit" button.
- Since search engines use the hmtl content to index sites, having less html can make it harder for SEO.

Making requests via JavaScript, in the browser, without the page refreshing.

1. Traditional browser requests, the browser makes the request, receive the response, replaces the entire resource with the new content. This happens when:

   - Entering a URL in the address bar
   - Clicking on a link
   - Submitting a form.

2. AJAX web request:
   - Made from Javascript in browser
   - Javascript makes request (GET, POST, etc)
   - You receive a response
   - Do whatever you want with the result (in general show the data to the user)

![graphic](images/ajax-request.png)

---

# API

Application Programming Interface. Interface for the code to interact with other code or applications. Different kind of APIs to communicate with robots, with servers, etc.
Companies provide APIs to retrieve data from them, or to send data.

Web based APIs are available through requests.

## Data formats

The interface for code is different from the interface for a human. When we browse on the web, we make HTTP requests and get HTML back. But HTML has a lot of page structure information, so APIs don't respond with HTML, because they respond with data.

### JSON

Javascript Object Notation. Single quotes don't work.
Can convert JSON object to JavaScript object.

```json
{
  "person": {
    "name": "Elie",
    "favoriteColor": "purple",
    "city": "San Francisco",
    "favoriteNumber": -97,
    "interests": ["CEOing", "eating Mediterranean food"],
    "futureDreams": null
  }
}
```

### XML

Similar to HTML, except tags are custom. It's an old format.

```xml
<person>
  <name>Elie</name>
  <favoriteColor>purple</favoriteColor>
  <city>San Francisco</city>
</person>
```

## curl

Tool to make requests to APIs. (Check terminal.md for commands)

## Documentation

APIs documentation are basically a bunch of HTTP request endpoints where we send a request to.
Usually they will have a BASE URL and then different endpoints.
`http://www.BASEURL.com/ENDPOINTS`
