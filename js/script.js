var timeout;

//Lista de videos
const videosJson = [
    {
        id: "video1",
        titulo: "¿Que no Lisa?",
        descripcion: "Video meme Simpsons",
        src: "../videos/1.mp4",
        miniaturaSrc: "../img/v1.PNG",
        subtitulosES: "../vtt/s1.vtt",
        subtitulosEN: "../vtt/e1.vtt"
    },
    {
        id: "video2",
        titulo: "Meme no meme",
        descripcion: "Meme Homer Peter",
        src: "../videos/2.mp4",
        miniaturaSrc: "../img/v2.PNG",
        subtitulosES: "../vtt/s2.vtt",
        subtitulosEN: "../vtt/e2.vtt"
    },
    {
        id: "video3",
        titulo: "No quiero trabajar",
        descripcion: "Video meme The office",
        src: "../videos/3.mp4",
        miniaturaSrc: "../img/v3.jpg",
        subtitulosES: "../vtt/s3.vtt",
        subtitulosEN: "../vtt/e3.vtt"
    },
    {
        id: "video4",
        titulo: "Toy Story",
        descripcion: "Video meme de Toy Story",
        src: "../videos/4.mp4",
        miniaturaSrc: "../img/v4.jpg",
        subtitulosES: "../vtt/s4.vtt",
        subtitulosEN: "../vtt/e4.vtt"
    },
    {
        id: "video5",
        titulo: "Conchasumadre",
        descripcion: "Video meme de la china",
        src: "../videos/5.mp4",
        miniaturaSrc: "../img/v5.jpg",
        subtitulosES: "../vtt/s5.vtt",
        subtitulosEN: "../vtt/e5.vtt"
    }
];

//Lista de canciones
const cancionesJson = [
    {
        id: "cancion1",
        titulo: "Estilo taraotarantino (one shot)",
        descripcion: "Ayax",
        src: "../canciones/estilo_taraotarantino.mp3",
        miniaturaSrc: "../img/estilo_taraotarantino.jpg"
    },
    {
        id: "cancion2",
        titulo: "Modo turbio",
        descripcion: "Kaze",
        src: "../canciones/modo_turbio.mp3",
        miniaturaSrc: "../img/kaze-modoturbio.png"
    },
    {
        id: "cancion3",
        titulo: "Rap sin corte",
        descripcion: "Foyone",
        src: "../canciones/rap_sin_corte.mp3",
        miniaturaSrc: "../img/rap_sin_corte.jpg"
    },
    {
        id: "cancion4",
        titulo: "L'enfant Terrible",
        descripcion: "Ayax",
        src: "../canciones/lenfant_terrible.mp3",
        miniaturaSrc: "../img/lenfant_terrible.jpg"
    },
    {
        id: "cancion5",
        titulo: "Yagas",
        descripcion: "II Madres",
        src: "../canciones/II_madres.mp3",
        miniaturaSrc: "../img/II_madres.jpg"
    }
];

var DOM = {
    //Slider para cambiar el theme del documento
    slider: document.querySelector(".slider"),
    //opciones audio y video
    opcionVideo: document.querySelector("#opcionVideo"),
    opcionAudio: document.querySelector("#opcionAudio"),
    //Botones del reproductor
    btnPlay: document.querySelector("#play"),
    btnPause: document.querySelector("#pause"),
    btnVolumeOn: document.querySelector("#volumeOn"),
    btnVolumeOff: document.querySelector("#volumeOff"),
    btnFullscreenOn: document.querySelector("#fullscreenOn"),
    btnFullscreenOff: document.querySelector("#fullscreenOff"),
    btnSubtitulos: document.querySelector("#subtitles"),
    rangeVolumen: document.querySelector("#rangeVolumen"),
    //Menu con las opciones de los subtitulos
    menuSubtitulos: document.querySelector("#menuSubtitulos"),
    //Div que contiene el punto en el que se encuentra el video/audio
    tiempo: document.querySelector("#tiempo"),
    //Elemento video/audio
    elementoMultimedia: document.querySelector("#multimedia"),
    progressBar: document.querySelector("#progreso"),
    //Lista de videos y canciones
    lista: document.querySelector("#lista"),
    //reproductor
    reproductor: document.querySelector("#reproductor"),
    //Div con los controles del video/audio
    controles: document.querySelector(".control"),
};

(function(){
    DOM.btnPause.addEventListener('click', pause);
    DOM.btnPlay.addEventListener('click', play);
    //Mutear audio
    DOM.btnVolumeOn.addEventListener("click", clickBtnVolume);
    //Desmutear audio
    DOM.btnVolumeOff.addEventListener("click", clickBtnVolume);
    //Pasa a pantalla completa
    DOM.btnFullscreenOn.addEventListener("click", toggleFullScreen);
    //Pasa a pantalla normal
    DOM.btnFullscreenOff.addEventListener("click", toggleFullScreen);

    DOM.btnSubtitulos.addEventListener("click", mostrarMenuSubtitulos);

    DOM.rangeVolumen.addEventListener("input", changeVolume);

    //selecciona la lista de videos
    DOM.opcionVideo.addEventListener("click", function(){
        document.querySelector("#seccionLista h3").textContent = "Lista de videos";
        DOM.opcionAudio.classList.remove("seleccionado");
        DOM.opcionVideo.classList.add("seleccionado");
        cargarLista(videosJson)
    });

    //selecciona la lista de canciones
    DOM.opcionAudio.addEventListener("click", function(){
        document.querySelector("#seccionLista h3").textContent = "Lista de canciones";
        DOM.opcionAudio.classList.add("seleccionado");
        DOM.opcionVideo.classList.remove("seleccionado");
        cargarLista(cancionesJson)
    });

    DOM.reproductor.addEventListener("mouseover", mostrarControles);

    //El ratón sale del reproductor, si este se está reproduciendo se dejan de mostrar los controles
    DOM.reproductor.addEventListener("mouseleave", function(){
        if(!DOM.btnPause.classList.contains("oculto")){
                DOM.menuSubtitulos.classList.remove("show");
                DOM.controles.classList.remove("show");
                DOM.reproductor.style.cursor = "none";
        }
    });
    
    DOM.slider.addEventListener("click", cambiarTema)

    DOM.menuSubtitulos.addEventListener("click", cambiarSubtitulos);

    //Cambia el punto en el que se reproduce el vídeo
    DOM.progressBar.addEventListener("click", changeCurrentTime);

    //Por defecto se carga la lista de canciones
    cargarLista(cancionesJson);

})();

//Reproduce el video o el audio
function play(){
    DOM.elementoMultimedia.play();
    DOM.btnPause.classList.remove("oculto");
    DOM.btnPlay.classList.add("oculto");
};

//Pausa el video o audio
function pause(){
    DOM.elementoMultimedia.pause();
    DOM.btnPlay.classList.remove("oculto");
    DOM.btnPause.classList.add("oculto");
};

//Mutea o desmutea
function clickBtnVolume(){
    DOM.btnVolumeOn.classList.toggle("oculto");
    DOM.btnVolumeOff.classList.toggle("oculto");
    if(DOM.elementoMultimedia.muted){
        DOM.elementoMultimedia.muted = false;
        DOM.rangeVolumen.value = 1;
    }
    else{
        DOM.elementoMultimedia.muted = true;
        DOM.rangeVolumen.value = 0;
    }
    
    mostrarControles();
};

//Evento final de pista de video o audio
function ended(){
    DOM.btnPause.classList.add("oculto");
    DOM.btnPlay.classList.remove("oculto");
}

//Actualiza la barra de progreso y el div con el punto en el que se encuentra el vídeo/audio
function timeupdate(event){
    DOM.progressBar.value = Math.round((event.currentTarget.currentTime / event.currentTarget.duration) * 100);
    DOM.tiempo.textContent = formatearDuracion(event.currentTarget.currentTime) + "/" + formatearDuracion(event.currentTarget.duration);
}

//Click en el video o audio
function clickElementoMultimedia(event){
    mostrarControles();
    DOM.menuSubtitulos.classList.remove("show");
    if(DOM.elementoMultimedia.paused){
        play();
    }
    else{
        pause()
    }
}

//Funcion que carga la lista que se pasa por parámetro
function cargarLista(lista){
    //Cuando carga la lista se deja de escuchar eventos de teclado
    document.body.removeEventListener("keydown", keyPressHandler);
    //La barra de progreso se pone a 0
    DOM.progressBar.value = 0;
    //Los controles pasan a por defecto
    DOM.btnPause.classList.add("oculto");
    DOM.btnPlay.classList.remove("oculto");
    //Se oculta el reproductor
    DOM.reproductor.classList.add("oculto");
    //Se borra el video o audio
    if(DOM.reproductor.querySelector("video") || DOM.reproductor.querySelector(".audio")){
        DOM.reproductor.removeChild(DOM.reproductor.firstChild);
    }
    document.querySelectorAll(".card").forEach(card => {
        DOM.lista.removeChild(card);
    })

    //Se carga desde la lista json
    lista.forEach(elemento => {
        //Crea la card desde el template
        let card =  document.importNode(document.getElementById("template-card").content, true);
        DOM.lista.appendChild(card);
        //Se guarda en la variable card la card ya creada ya que al hacer import node no tengo acceso a las mismas funciones
        card = DOM.lista.querySelectorAll(".card")[DOM.lista.querySelectorAll(".card").length -1];
        card.id = elemento.id;

        let miniatura = card.getElementsByTagName("div")[0];
        miniatura.style.backgroundImage = "url('" + elemento.miniaturaSrc + "')";

        let titulo = card.getElementsByTagName("div")[1].getElementsByTagName("h4")[0];
        titulo.innerText = elemento.titulo;
        let descripcion = card.getElementsByTagName("div")[1].getElementsByTagName("p")[0];
        descripcion.innerText = elemento.descripcion;

        //Si se trata de una cancion se le asigna el evento seleccionar canción
        if(card.id.includes("cancion")){
            card.addEventListener("click", seleccionarCancion);
        }
        //Si se trata de un vídeo se le asigna el evento seleccionar video
        else{
            card.addEventListener("click", seleccionarVideo);
        }
    })
}

//Se hace click en un video
function seleccionarVideo(event){
    //Se muestran los subtitulos
    DOM.btnSubtitulos.classList.remove("oculto");
    //Si había alguna card selecionada se deseleciona
    if(DOM.lista.querySelector(".seleccionado"))
        DOM.lista.querySelector(".seleccionado").classList.remove("seleccionado")
    //Se asigna la clase seleccionado a la card en la que se hizo click
    event.currentTarget.classList.add("seleccionado");
    //Se busca el video correspondiente en la lista
    let video = videosJson.find(video => video.id == event.currentTarget.id);

    let elementVideo = document.querySelector("video");
    if(elementVideo){
        DOM.reproductor.removeChild(elementVideo);
    }
    //Se crea el elemento video con los datos de la canción
    elementVideo = document.createElement("video");
    elementVideo.id = "multimedia";
    let source = document.createElement("source");
    source.src = video.src;
    elementVideo.poster = video.miniaturaSrc;
    elementVideo.appendChild(source);
    
    let trackEs = document.createElement("track");
    trackEs.kind = "captions";
    trackEs.label = "Español";
    trackEs.srclang = "es";
    trackEs.src = video.subtitulosES;
    elementVideo.appendChild(trackEs);
    let trackEn = document.createElement("track");
    trackEn.kind = "captions";
    trackEn.label = "Inglés";
    trackEn.srclang = "en";
    trackEn.src = video.subtitulosEN;
    elementVideo.appendChild(trackEn);

    DOM.reproductor.insertAdjacentElement("afterbegin",elementVideo);    
    DOM.elementoMultimedia = elementVideo;
    //Se asigna los eventos al vídeo
    elementVideo.addEventListener("ended", ended);
    elementVideo.addEventListener("timeupdate", timeupdate);
    elementVideo.addEventListener("click", clickElementoMultimedia);
    document.body.addEventListener("keydown", keyPressHandler);
    DOM.reproductor.classList.remove("oculto");
    DOM.menuSubtitulos.classList.remove("show");
    play();
    mostrarControles();
}

//Se hace click en una canción
function seleccionarCancion(event){
    //Se desactivan los subtitulos
    DOM.btnSubtitulos.classList.add("oculto");
    //Si había alguna card selecionada se deseleciona
    if(DOM.lista.querySelector(".seleccionado"))
        DOM.lista.querySelector(".seleccionado").classList.remove("seleccionado")
    //Se asigna la clase seleccionado a la card en la que se hizo click
    event.currentTarget.classList.add("seleccionado");
    //Se busca la canción correspondiente en la lista
    let cancion = cancionesJson.find(cancion => cancion.id == event.currentTarget.id);
    let divAudio = document.querySelector(".audio");
    if(divAudio){
        while(divAudio.firstChild){
            divAudio.removeChild(divAudio.firstChild);
        }
    }
    else{
        divAudio = document.createElement("div");
    }
    //Se crea el elemento audio con los datos de la canción
    divAudio.classList.add("audio");
    divAudio.style.backgroundImage = "url('" + cancion.miniaturaSrc + "')";
    let elementAudio = document.createElement("audio");
    elementAudio.id = "multimedia";
    elementAudio.src = cancion.src;
    DOM.reproductor.insertAdjacentElement("afterbegin",divAudio);
    divAudio.appendChild(elementAudio);
    DOM.elementoMultimedia = elementAudio;
    //Se le asignan los eventos al reproductor
    elementAudio.addEventListener("ended", ended);
    elementAudio.addEventListener("timeupdate", timeupdate);
    divAudio.addEventListener("click", clickElementoMultimedia);
    document.body.addEventListener("keydown", keyPressHandler);
    DOM.reproductor.classList.remove("oculto");
    DOM.menuSubtitulos.classList.remove("show");
    play();
    mostrarControles();
}

//Función que muestra los controles del reproductor y además los oculta tras un tiempo
function mostrarControles(){
    DOM.controles.classList.add("show");
    //En caso de que el contador ya estuviera corriendo se reinicia
    // para evitar que los controles se oculten mientras el usuario los está usando
    clearTimeout(timeout);
    DOM.reproductor.addEventListener("mousemove", function(){
        DOM.reproductor.style.cursor = "default";
        DOM.controles.classList.add("show");
        clearTimeout(timeout);
        if(!DOM.btnPause.classList.contains("oculto")){
            timeout = setInterval(function(){
                DOM.menuSubtitulos.classList.remove("show");
                DOM.controles.classList.remove("show");
                DOM.reproductor.style.cursor = "none";
            }, 2000)
        }    
    })
    if(!DOM.btnPause.classList.contains("oculto")){
        timeout = setInterval(function(){
            DOM.controles.classList.remove("show");
            DOM.reproductor.style.cursor = "none";
        }, 2000)
    }
}

function keyPressHandler(e){
    //En caso de que venga vacío el evento esto lo captura
    var event = window.event ? window.event : e;

    switch(event.key){
        //Pausa/reproduce el video/audio
        case ' ':{
            clickElementoMultimedia(event);
        }
        break;ç
        //Mutea/desmutea el video/audio
        case 'm':{
            clickBtnVolume();
        }
        break;
        //Entra o sale de pantalla completa
        case 'f':{
            toggleFullScreen();
        }
        break;
        case 'ArrowRight':{
            avanzarVideo();
        }
        break;
        case 'ArrowLeft':{
            retrocederVideo();
        }
        //Aumenta el volumen
        break;
        case 'ArrowUp':{
            let volumen = parseFloat(DOM.rangeVolumen.value);
            DOM.rangeVolumen.value = volumen + 0.1;
            changeVolume();
        }
        break;
        //baja el volumen
        case 'ArrowDown':{
            let volumen = parseFloat(DOM.rangeVolumen.value);
            DOM.rangeVolumen.value = volumen - 0.1;
            changeVolume();
        }
        break;
    }
    mostrarControles();
}

function toggleFullScreen(){
    if(DOM.reproductor.classList.contains("fullscreen")){
        document.exitFullscreen();
    }
    else{
        DOM.reproductor.requestFullscreen();
    }
    document.addEventListener("fullscreenchange", function(){
        if(!document.fullscreenElement){
            DOM.reproductor.classList.remove("fullscreen");
            DOM.btnFullscreenOn.classList.remove("oculto");
            DOM.btnFullscreenOff.classList.add("oculto");
        }
        else{
            DOM.reproductor.classList.add("fullscreen");
            DOM.btnFullscreenOff.classList.remove("oculto");
            DOM.btnFullscreenOn.classList.add("oculto");
        }
    });
}

function avanzarVideo(){
    DOM.elementoMultimedia.currentTime += 5;
}

function retrocederVideo(){
    DOM.elementoMultimedia.currentTime -= 5;
}

function cambiarTema(){
    DOM.slider.classList.toggle("ON");
    document.body.classList.toggle("theme-dark");
}

function mostrarMenuSubtitulos(){
    DOM.menuSubtitulos.classList.toggle("show");
}

function cambiarSubtitulos(event){
    switch(event.target.id){
        case "es":{
            DOM.elementoMultimedia.textTracks[0].mode = "showing";
            for(i = 0; i < DOM.elementoMultimedia.textTracks.length; i++){
                if(i != 0){
                    DOM.elementoMultimedia.textTracks[i].mode = "hidden";
                }
            }
        }
        break;
        case "en":{
            DOM.elementoMultimedia.textTracks[1].mode = "showing";
            for(i = 0; i < DOM.elementoMultimedia.textTracks.length; i++){
                if(i != 1){
                    DOM.elementoMultimedia.textTracks[i].mode = "hidden";
                }
            }
        }
        break;
        default:{
            for(i = 0; i < DOM.elementoMultimedia.textTracks.length; i++){
                    DOM.elementoMultimedia.textTracks[i].mode = "hidden";
            }
        }
    }
}
function changeVolume(){
    let volumen = DOM.rangeVolumen.value;
    if(volumen == 0){
        DOM.btnVolumeOn.classList.add("oculto");
        DOM.btnVolumeOff.classList.remove("oculto");
    }
    else{
        DOM.btnVolumeOn.classList.remove("oculto");
        DOM.btnVolumeOff.classList.add("oculto");
    }
    DOM.elementoMultimedia.volume = volumen;
    DOM.elementoMultimedia.muted = false;
}
function changeCurrentTime(event){
    var porcentaje = Math.floor((event.offsetX / this.offsetWidth) * 100);
    DOM.elementoMultimedia.currentTime  = DOM.elementoMultimedia.duration*(porcentaje/100);
}

//Función que pasa un numero de segundos a formato h:m:s
function formatearDuracion(tiempo){
    tiempo = Math.round(tiempo);
    let horas = Math.floor(tiempo/3600);
    if(horas < 10){
        horas = "0" + horas;
    }
    let minutos = Math.floor((tiempo % 3600) / 60);
    if(minutos < 10){
        minutos = "0" + minutos;
    }
    let segundos = (tiempo % 3600) % 60;
    if(segundos < 10){
        segundos = "0" + segundos;
    }
    let duration = [horas, minutos, segundos];
    return duration.join(":");
}