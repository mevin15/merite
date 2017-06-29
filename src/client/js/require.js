var require = function(url, callback){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + '?' + (new Date().getTime());
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}