    let previous = document.querySelector('#pre');
    let play = document.querySelector('#play');
    let next = document.querySelector('#next');
    let title = document.querySelector('#title');
    let recent_volume= document.querySelector('#volume');
    let volume_show = document.querySelector('#volume_show');
    let slider = document.querySelector('#duration_slider');
    let show_duration = document.querySelector('#show_duration');
    let track_image = document.querySelector('#track_image');
    let auto_play = document.querySelector('#auto');
    let present = document.querySelector('#present');
    let total = document.querySelector('#total');
    let artist = document.querySelector('#artist');



    let timer;
    let autoplay = 0;

    let index_no = 0;
    let current_playlist_index=0;
    let Playing_song = false;

    //create a audio Element
    let track = document.createElement('audio');


    //All songs list
    let All_song = [];

    var playlists=[]

    function loadJSON(fileName,callback) {

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', './samples/'+fileName, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
    loadJSON('sample1.json',function(response) {
        // Parse JSON string into object
        var sample1 = JSON.parse(response);
        playlists.push(...sample1.playlists)
        loadJSON('sample2.json',function(response) {
            // Parse JSON string into object
            var sample2 = JSON.parse(response);
            playlists.push(...sample2.playlists)
            loadJSON('sample3.json',function(response) {
                // Parse JSON string into object
                var sample3 = JSON.parse(response);
                playlists.push(...sample3.playlists)
                playlists.forEach((p,index)=>{
                    $('.playlists').append('<div class="col-3"><button onclick="load_playlists('+index+')">'+p.name+'</button></div>')
                })
                });
            });
        
        });
        function go_back(){
        current_playlist_index=0;
        All_song=[];
            $('.playlists').show();
        $('.main').hide();
        }
    function load_playlists(index_no){
        current_playlist_index=index_no;
        All_song=playlists[current_playlist_index].tracks;
        load_track(0);
        $('.playlists').hide();
        $('.main').show();
    }

    // function load the track
    function load_track(index_no){
        clearInterval(timer);
        reset_slider();

        title.innerHTML = All_song[index_no].track_name;	
        artist.innerHTML = All_song[index_no].artist_name;
        track.load();

        total.innerHTML = All_song.length;
        present.innerHTML = index_no + 1;
    }

    load_track(index_no);


    //mute sound function
    function mute_sound(){
        track.volume = 0;
        volume.value = 0;
        volume_show.innerHTML = 0;
    }


    // checking.. the song is playing or not
    function justplay(){
        if(Playing_song==false){
            playsong();

        }else{
            pausesong();
        }
    }


    // reset song slider
    function reset_slider(){
        slider.value = 0;
    }

    // play song
    function playsong(){
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    }

    //pause song
    function pausesong(){
        track.pause();
        Playing_song = false;
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    }


    // next song
    function next_song(){
        if(index_no < All_song.length - 1){
            index_no += 1;
            load_track(index_no);
            playsong();
        }else{
            index_no = 0;
            load_track(index_no);
            playsong();

        }
    }


    // previous song
    function previous_song(){
        if(index_no > 0){
            index_no -= 1;
            load_track(index_no);
            playsong();

        }else{
            index_no = All_song.length;
            load_track(index_no);
            playsong();
        }
    }


    // change volume
    function volume_change(){
        volume_show.innerHTML = recent_volume.value;
        track.volume = recent_volume.value / 100;
    }

    // change slider position 
    function change_duration(){
        slider_position = track.duration * (slider.value / 100);
        track.currentTime = slider_position;
    }

    // autoplay function
    function autoplay_switch(){
        if (autoplay==1){
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
        }else{
        autoplay = 1;
        auto_play.style.background = "#01CBDB";
        }
    }


    function range_slider(){
        let position = 0;
            
            // update slider position
            if(!isNaN(track.duration)){
            position = track.currentTime * (100 / track.duration);
            slider.value =  position;
            }

        
        // function will run when the song is over
        if(track.ended){
            play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
            if(autoplay==1){
                index_no += 1;
                load_track(index_no);
                playsong();
            }
            }
        }
