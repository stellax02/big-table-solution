export default class Video {

    constructor(targetElementClass) {

        this.targetElementClass = targetElementClass;

        // Defining target data attributes

        this.baseElementAttr = '[data-' + 'video';                              // [data-video
        this.videoPlayerAttr = this.baseElementAttr + '="player"]';             // [data-video="player"]
        this.playBtnAttr = this.baseElementAttr + '="navPlay"]';                // [data-video="navPlay"]
        this.rewindBtnAttr = this.baseElementAttr + '="navRewind"]';            // [data-video="navRewind"]
        this.muteBtnAttr = this.baseElementAttr + '="navMute"]';                // [data-video="navMute"]

        this.volumeRangeAttr = this.baseElementAttr + '="volumeRange"]';        // [data-video="volumeRange"]
        this.volumeProgressAttr = this.baseElementAttr + '="volumeProgress"]';  // [data-video="volumeProgress"]
        this.volumeThumbAttr = this.baseElementAttr + '="volumeThumb"]';        // [data-video="volumeThumb"]

        this.seekRangeAttr = this.baseElementAttr + '="navSeekRange"]';         // [data-video="navSeekRange"]
        this.seekProgressAttr = this.baseElementAttr + '="navSeekProgress"]';        // [data-video="navSeekProgress"]
        this.seekThumbAttr = this.baseElementAttr + '="navSeekThumb"]';         // [data-video="navSeekThumb"]

        this.volumeBarAttr = this.baseElementAttr + '="navVolume"]';            // [data-video="navVolume"]
        this.rangeTimerAttr = this.baseElementAttr + '="navTimer"]';            // [data-video="navTimer"]
    }

    // Initialize all event listeners for video controls
    initializeControls() {
        const _self = this;
        const targetElementClass = this.targetElementClass;

        // Global button data attributes
        const videoPlayerAttr = this.videoPlayerAttr;
        const playBtnAttr = this.playBtnAttr;
        const rewindBtnAttr = this.rewindBtnAttr;
        const muteBtnAttr = this.muteBtnAttr;

        // Volume element data attributes
        const volumeRangeAttr = this.volumeRangeAttr;
        const volumeProgressAttr = this.volumeProgressAttr;
        const volumeThumbAttr = this.volumeThumbAttr;

        // Seekbar element data attributes
        const seekRangeAttr = this.seekRangeAttr;
        const seekProgressAttr = this.seekProgressAttr;
        const seekThumbAttr = this.seekThumbAttr;

        // Standalone element data attributes
        const volumeBarAttr = this.volumeBarAttr;
        const rangeTimerAttr = this.rangeTimerAttr;



        let targetElementsArray = document.querySelectorAll(targetElementClass);        
     
        for (let targetElement of targetElementsArray) {
          
            // Global button DOM elements
            let videoPlayer = targetElement.querySelector(videoPlayerAttr);
            let playButton = targetElement.querySelector(playBtnAttr);
            let rewindButton = targetElement.querySelector(rewindBtnAttr);
            let muteButton = targetElement.querySelector(muteBtnAttr);

            // Volume DOM elements
            let volumeRange = targetElement.querySelector(volumeRangeAttr);
            let volumeProgress = targetElement.querySelector(volumeProgressAttr);
            let volumeThumb = targetElement.querySelector(volumeThumbAttr);
            //let volumeBar = targetElement.querySelector(volumeBarAttr);

            // Seekbar DOM elements
            let seekRange = targetElement.querySelector(seekRangeAttr);
            let seekProgress = targetElement.querySelector(seekProgressAttr);
            let seekThumb = targetElement.querySelector(seekThumbAttr);

            let rangeTimer = targetElement.querySelector(rangeTimerAttr);
            

            /* video player initial values */

            
            // Initial setup for video native volume value
            videoPlayer.volume = 0.3;

            // Volume
            let volumeProgressValue = 0;
            let volumeValue = videoPlayer.volume;
            let volumeRangeSize = volumeRange.offsetWidth;
            let volumeThumbValue = volumeValue * 100;

            // Apply volume values to volume thumb element
            this.updateVolumeThumb(volumeThumb, volumeThumbValue);
            // Apply volume values to volume progress element 
            this.updateVolumeProgress(volumeProgress, videoPlayer.volume);


            // SeekBar
            let seekProgressValue = videoPlayer.currentTime;
            
            let seekThumbValue = 0;
            let seekRangeValue = 0;
            let timeValue = 0;
            let seekRangeSize = seekRange.offsetWidth;

            
            

            //Initial setup for range timer
            rangeTimer.innerHTML = "00:00";


            // Onchange states in an object - when an event is triggered what was the current state of the video player
            let onChange = {
                paused: false
            }

    

            playButton.addEventListener('click', () => {
            
                videoPlayer.paused ? this.playVideo(videoPlayer, playButton) : this.pauseVideo(videoPlayer, playButton);
            });

            rewindButton.addEventListener('click', () => {
                this.rewindVideo(videoPlayer);
            });

            muteButton.addEventListener('click', () => {
                this.toggleMute(videoPlayer, muteButton);
            });

             // Event listener for the video volume bar
             volumeRange.addEventListener("click", (event) => {

                volumeRangeSize = volumeRange.offsetWidth;
                let volumeRangeClickPos = event.offsetX;

                // Calculate the new time
                volumeValue = volumeRangeClickPos / volumeRangeSize;
                
                // Call function to update the video time 
                this.updateVolume(videoPlayer, volumeValue);
            });

            volumeThumb.addEventListener('mousedown', (event) => {

                event.preventDefault();
                let thumbPos = volumeThumbValue;
                
                let initX = event.clientX;
                let dragMouseEvent = null;


                document.addEventListener('mousemove', dragMouseEvent = function (event) {
                    dragMouse(event);
                }
                );
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', dragMouseEvent);
                    dragMouseEvent = null;
                });

                // Drag method and calculation
                let dragMouse = (event) => {

                   
                    // Calculation for mouse move
                    let moveX = event.clientX - initX;

                    // calculation for new thumb position which is initial thumb position + mouse moved on x axis
                    let newX = thumbPos + moveX;


                    // Bind the thumb position inside the range, so it cannot go over max or min values
                    if (newX < 0) {
                        newX = 0;
                    }
                    else if (newX > volumeRangeSize) {
                        newX = volumeRangeSize;
                    }

                    // Apply the new transform on the thumb values in css                  
                    this.updateVolumeThumb(volumeThumb, volumeThumbValue);

                    // Calculate the volume progress value so it can update at the same time as the thumb element
                    volumeProgressValue = 100 / volumeRangeSize * newX / 100;
                    
                    // Call update volume action method
                    this.updateVolume(videoPlayer, volumeProgressValue);
                }
            });

            // Event listener for the video volume bar
            videoPlayer.addEventListener("volumechange", (event) => {

                volumeThumbValue = videoPlayer.volume * 100;
                
                if(videoPlayer.muted){
                    // Call function to update the video time 
                    this.updateVolumeThumb(volumeThumb, 0);
                    // Call function to update the video time 
                    this.updateVolumeProgress(volumeProgress, 0);
                 
                }
                else{
                    // Call function to update the video time 
                    this.updateVolumeThumb(volumeThumb, volumeThumbValue);
                    // Call function to update the video time 
                    this.updateVolumeProgress(volumeProgress, videoPlayer.volume);
                 
                } 
            });

            // Event listener for the seek bar
            seekRange.addEventListener("click", (event) => {

                seekRangeSize = seekRange.offsetWidth;
                let seekRangeClickPos = event.offsetX;

                seekRangeValue = 100 / seekRangeSize * seekRangeClickPos / 100;

 
                // Calculate the new time
                timeValue = videoPlayer.duration * (seekRangeValue / 100) * 100;

                // Call function to update the video time 
                this.updateVideoTime(videoPlayer, timeValue);
                
            });

            // Event listener to update the seek bar as the video plays
            videoPlayer.addEventListener("timeupdate", () => {

                // Calculate the slider value
                seekProgressValue = videoPlayer.currentTime / videoPlayer.duration;
                seekThumbValue = 100 * seekProgressValue;

                // Update the slider value
                this.updateSeekProgress(seekProgress, seekProgressValue);
                this.updateSeekThumb(seekThumb, seekThumbValue);
                this.updateTimer(rangeTimer, videoPlayer.currentTime);

                if (seekProgressValue == 1)
                    this.pauseVideo(videoPlayer, playButton);
            });

            seekThumb.addEventListener('mousedown', (event) => {

                event.preventDefault();
                let thumbPos = seekThumbValue;
                
                let initX = event.clientX;
                let dragMouseEvent = null;
                

                document.addEventListener('mousemove', dragMouseEvent = function (event) {
                    dragMouse(event);
                }
                );
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', dragMouseEvent);
                    dragMouseEvent = null;
                });

                // Drag functions

                let dragMouse = (event) => {

                    let moveX = event.clientX - initX;
                    let newX = thumbPos + moveX;

                   

                    if (newX < 0) {
                        newX = 0;
                    }
                    else if (newX > seekRangeSize) {
                        newX = seekRangeSize;
                    }

                    seekThumb.style.transform = "translateX(" + newX + "px)";
                    seekRangeValue = 100 / seekRangeSize * newX / 100;
                    timeValue = videoPlayer.duration * (seekRangeValue / 100) * 100;
                  
                    this.updateVideoTime(videoPlayer, timeValue);
                }

            });

        }
    }


    // Action calls

    // Play video
    playVideo(videoPlayer, playButton) {
        playButton.classList.add('play');
        videoPlayer.play();
    }

    // Pause video
    pauseVideo(videoPlayer, playButton) {
        playButton.classList.remove('play');
        videoPlayer.pause();
    }

    // Rewind video
    rewindVideo(videoPlayer) {
        videoPlayer.currentTime = 0;
    }

    
    // Toggle video mute status
    toggleMute(videoPlayer, muteButton){
        videoPlayer.muted = !videoPlayer.muted;
        muteButton.classList.toggle('muted');
    }

    // Update Volume
    updateVolume(videoPlayer, volumeValue) {
        videoPlayer.volume = volumeValue;
    }

     // Update Volume Thumb position
     updateVolumeThumb(volumeThumb, volumeThumbValue) {
        volumeThumb.style.left = volumeThumbValue + "%";
    }

     // Update Volume Thumb position
     updateVolumeProgress(volumeProgress, volumeProgressValue) {
        volumeProgress.style.transform = "scaleX(" + volumeProgressValue + ")";
    }

     // Update position and value of the seek bar
     updateSeekProgress(seekProgress, seekProgressValue) {
        seekProgress.style.transform = "scaleX(" + seekProgressValue + ")";
    }

     // Update position and value of the seek bar
    updateSeekThumb(seekThumb, seekThumbValue) {
        seekThumb.style.left =  seekThumbValue + "%";
    }

    updateTimer(rangeTimer, timeValue) {
        let viewTimeValue = this.calculateTime(timeValue);
        rangeTimer.innerHTML = viewTimeValue;
    }

    // Update time value of the video player
    updateVideoTime(videoPlayer, time) {
        videoPlayer.currentTime = time;
        
    }

    // Update position and value of the seek bar
    updateSeekBar(seekBar, seekBarValue) {
        seekBar.value = seekBarValue;
       
    }

     // Helper actions

     calculateTime(timeValue) {
        timeValue = Number(timeValue);
        let h = Math.floor(timeValue / 3600);
        let m = Math.floor(timeValue % 3600 / 60);
        let s = Math.floor(timeValue % 3600 % 60);

        let hDisplay = h > 0 ? (h < 10 ? "0" + h + ":" : h + ":") : "00:";
        let mDisplay = m > 0 ? (m < 10 ? "0" + m + ":" : m + ":") : "00:";
        let sDisplay = s > 0 ? (s < 10 ? "0" + s : s) : "00";
        return hDisplay > 0 ? hDisplay + mDisplay + sDisplay : mDisplay + sDisplay;
    }
}




