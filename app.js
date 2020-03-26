const card_gif = (src, description, url) => {

  return `<div class='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3'>
    <div class="card" style="height: 200px;">
      <img src="${src}" class="card-img-top img-fluid" style="height: 130px;" alt="${description}">
      <div class="card-body">
        <a href="${url}" target="_blank" class="btn btn-primary btn-block">View</a>
      </div>
    </div>
  </div>`;
}

const mostrar_gif = () => {
  var palabra = (document.getElementById('palabra_gif').value).trim();
  if(palabra == ''){
    document.getElementById('resultados').innerHTML = '<div class="col-12"><div class="alert alert-danger" role="alert">Escribe algo :(</div></div>';
  }else{
    var s = document.getElementById('numero_gif');
    var no_resultados = s.options[s.selectedIndex].value;
    var key_tenor = 'write_key_api_tenor';
    var api_url = 'https://api.tenor.com/v1/search?key=' + key_tenor + '&q=' + palabra + '&limit=' + no_resultados;
    var div_resultados = document.getElementById('resultados');
    var html_resultados = '';

    html_resultados += '<div class="col-12"><div class="alert alert-info" role="alert">Mostrando ' + no_resultados + ' resultados de <b>' + palabra + '</b></div></div>';

    fetch(api_url).then((result) => {

      var result_json = result.json();
      result_json.then((json) => {
        var results = json.results;
        results.forEach((item, i) => {
          var url_tenor = item.url;
          var url_gif = item.media[0].gif.url;
          html_resultados += card_gif(url_gif, palabra, url_tenor);
        });
        div_resultados.innerHTML =  html_resultados;
      });
    })
  }
}
