~~The website is live on http://dord.mynetgear.com:6894/~~<br>
~~Please log in with the account joeBloggs.~~

You can also require individual modules and combine them into a d3 object using `Object.assign`:
```
var d3 = Object.assign({}, require("d3-format"), require("d3-geo"), require("d3-geo-projection"));
```
